import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: "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", // Keep API key server-side only
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageBase64, vehicleInfo } = req.body;

    const xmlPrompt = `
You are an insurance claims AI. Analyze the attached image and detect any scratches, dents, broken lamps, shattered glass, or flat tires.
For each damage type you see, output one <damage> element in EXACTLY the XML schema below.
Also realistically and pessimistically estimate the USD cost to repair each, and compute a totalEstimatedCostUSD.
Consider the vehicle is a ${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model} when estimating costs.
Do NOT output anything but valid XML, matching this schema:

<damageReport>
  <damage type="Scratch" severity="Minor|Moderate|Severe" location="Front Bumper|Door|Hood|etc" estimatedCostUSD="..."/>
  <damage type="Dent" severity="Minor|Moderate|Severe" location="Front Bumper|Door|Hood|etc" estimatedCostUSD="..."/>
  <totalEstimatedCostUSD>…</totalEstimatedCostUSD>
  <notes>Brief summary of overall damage assessment</notes>
</damageReport>

Analyze the following image for vehicle damage:
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: xmlPrompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64
              }
            }
          ]
        }
      ],
      temperature: 0.0,
      max_tokens: 1000
    });

    const xmlOutput = response.choices[0].message.content;
    const parsedResult = parseXMLResponse(xmlOutput, vehicleInfo);
    
    res.status(200).json(parsedResult);

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze image',
      details: error.message 
    });
  }
}

function parseXMLResponse(xmlString, vehicleInfo) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    const parserError = xmlDoc.querySelector("parsererror");
    if (parserError) {
      throw new Error("XML parsing error");
    }
    
    const damageElements = xmlDoc.querySelectorAll("damage");
    const damages = Array.from(damageElements).map(damage => ({
      damageType: damage.getAttribute("type") || "Unknown",
      severity: damage.getAttribute("severity") || "Unknown",
      location: damage.getAttribute("location") || "Unknown Area",
      repairCost: parseInt(damage.getAttribute("estimatedCostUSD")) || 0,
      confidence: 95,
      description: `${damage.getAttribute("severity")} ${damage.getAttribute("type")} detected on ${damage.getAttribute("location")}`
    }));
    
    const totalCostElement = xmlDoc.querySelector("totalEstimatedCostUSD");
    const totalRepairCost = totalCostElement ? parseInt(totalCostElement.textContent) : 
                           damages.reduce((sum, damage) => sum + damage.repairCost, 0);
    
    const notesElement = xmlDoc.querySelector("notes");
    const notes = notesElement ? notesElement.textContent : "Analysis completed successfully";
    
    // Estimate vehicle value
    const vehicleValue = estimateVehicleValue(vehicleInfo);
    
    return {
      damages,
      totalRepairCost,
      vehicleValue,
      recommendedAction: totalRepairCost > 1000 ? 
        "Recommended: File insurance claim - damage significantly exceeds deductible" :
        "Consider: Minor damage, may not exceed deductible",
      confidenceBoost: 0,
      multiAngleAnalysis: false,
      notes
    };
    
  } catch (error) {
    console.error('Error parsing XML response:', error);
    return {
      damages: [{
        damageType: "Analysis Error",
        severity: "Unknown",
        location: "Unknown",
        confidence: 0,
        repairCost: 0,
        description: "Unable to parse damage analysis results"
      }],
      totalRepairCost: 0,
      vehicleValue: estimateVehicleValue(vehicleInfo),
      recommendedAction: "Please try again or contact support",
      confidenceBoost: 0,
      multiAngleAnalysis: false,
      notes: "Error occurred during analysis"
    };
  }
}

function estimateVehicleValue(vehicleInfo) {
  const currentYear = new Date().getFullYear();
  const vehicleAge = currentYear - parseInt(vehicleInfo.year || currentYear);
  const mileage = parseInt(vehicleInfo.mileage?.replace(/,/g, '') || '0');
  
  const makeValues = {
    'mercedes-benz': 45000,
    'bmw': 42000,
    'audi': 40000,
    'lexus': 38000,
    'toyota': 25000,
    'honda': 23000,
    'ford': 22000,
    'chevrolet': 21000,
    'nissan': 20000,
  };
  
  const baseMake = vehicleInfo.make?.toLowerCase() || '';
  let baseValue = makeValues[baseMake] || 25000;
  
  for (let i = 0; i < vehicleAge; i++) {
    const depreciationRate = i < 5 ? 0.15 : 0.10;
    baseValue *= (1 - depreciationRate);
  }
  
  const expectedMileage = vehicleAge * 15000;
  const excessMileage = Math.max(0, mileage - expectedMileage);
  baseValue -= (excessMileage * 0.10);
  
  return Math.max(5000, Math.round(baseValue));
}