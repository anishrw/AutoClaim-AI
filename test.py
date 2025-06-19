import os
import base64
from openai import OpenAI

# 1) Configure your key
client = OpenAI(
  api_key="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"
)

# 3) Build the prompt
xml_prompt = f"""
You are an insurance claims AI. Analyze the attached image (supplied via image_url)
and detect any scratches, dents, broken lamps, shattered glass, or flat tires.
For each damage type you see, output one <damage> element in EXACTLY the XML schema below.
Also realistically and pessimistically estimate the USD cost to repair each, and compute a totalEstimatedCostUSD.
Do NOT output anything but valid XML, matching this schema:

<damageReport>
  <damage type="Scratch" severity="Minor|Moderate|Severe" estimatedCostUSD="..."/>
  <damage type="Dent"     severity="Minor|Moderate|Severe" estimatedCostUSD="..."/>
  <!-- … -->
  <totalEstimatedCostUSD>…</totalEstimatedCostUSD>
  <notes>…</notes>
</damageReport>

Here is the image:
"""

# 4) Call the vision-enabled model
resp = client.chat.completions.create(
    model="gpt-4o",  # Use gpt-4o for better vision capabilities
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": xml_prompt
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://images.fosterwebmarketing.com/880/Car-accident-on-road-front-view.jpeg"
                    }
                }
            ]
        }
    ],
    temperature=0.0
)

# "url": "https://elmersautobody.com/wp-content/uploads/2024/04/Does-My-Dented-Door-Need-to-Be-Repaired-in-South-Jersey_.jpeg"
# 5) Grab the XML
xml_output = resp.choices[0].message.content
print(xml_output)
