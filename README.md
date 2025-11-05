# statefarm-hackday-2025

🧠 AutoClaim AI — Risk Scoring & Payout Optimization System
(State Farm Hackathon, June 2025)

AutoClaim AI is a machine-learning-driven insurance intelligence platform that predicts post-accident claim payouts and actuarial risk levels from real-world crash data.
It combines computer vision, loss modeling, and dynamic payout optimization to simulate how insurers assess and price claims in modern financial systems.

🚀 Features

Risk Scoring Model (Python / PyTorch):
Trained on 5.5 K+ annotated vehicle-damage images using transfer learning, achieving 91 % accuracy in predicting loss severity.

Payout Optimization Engine:
Implements a simplified actuarial risk function that adjusts payout estimates based on driver history, claim frequency, and regional risk coefficients.

Interactive Claims Dashboard (React + GraphQL):

Browse 100 + realistic claim cases by risk tier, payout probability, and ZIP code.

Filter and visualize claim trends to see how risk profiles impact expected payouts.

Microservice Architecture (Node + Docker):

Scalable containerized backend with Apollo GraphQL API and DynamoDB storage.

Deployed with Firebase Authentication for secure user access.

Actuarial Insights Visualization:
React charts illustrate loss distribution, expected value curves, and regional risk heatmaps.

🧰 Tech Stack
Layer	Technologies
Frontend	React JS, Tailwind CSS, Apollo Client
Backend	Node JS, Express, Apollo GraphQL, DynamoDB
AI Service	PyTorch, NumPy, Pandas, Flask API
Infra / DevOps	Docker, Firebase Auth, AWS EC2 / Lambda
Data	5.5 K annotated crash images + synthetic policy data
🧮 Core Algorithm

Image Processing: Extract damage regions via CNN transfer learning.

Severity Prediction: Output damage score ∈ [0, 1].

Risk Weighting: Adjust score with policyholder and geographic risk factors.

Payout Computation: Apply expected loss model:

Payout
=
Base_Limit
×
(
1
−
𝑒
−
𝛼
×
RiskScore
)
Payout=Base_Limit×(1−e
−α×RiskScore
)

Visualization Layer: Frontend renders risk tier and payout distribution graphs.

🧑‍💻 Getting Started
# Clone the repo
git clone https://github.com/anishrw/AutoClaim-AI.git
cd AutoClaim-AI

# Backend
cd server
npm install
npm start

# Frontend
cd ../client
npm install
npm run dev

# AI Service
cd ../model
pip install -r requirements.txt
python app.py


Open http://localhost:5173 to view the dashboard.

🔐 Environment Variables

Create a .env file in each service:

OPENAI_API_KEY=<your_key>
DYNAMO_URI=<your_database_uri>
FIREBASE_API_KEY=<firebase_key>


(These are ignored by Git via .gitignore.)

📊 Results Summary
Metric	Value
Damage-to-payout accuracy	91 %
Avg. inference time	120 ms
Coverage across risk tiers	98 %
🧠 Financial Relevance

AutoClaim AI demonstrates practical FinTech concepts:

Actuarial risk modeling & loss distribution

Claims automation & payout forecasting

Data-driven underwriting intelligence

Integration of AI with financial decision systemskeep going. You can also make an explicit request for maintainers.
