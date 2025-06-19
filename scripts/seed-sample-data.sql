-- Seed sample data for ClaimScan AI

-- Insert sample users
INSERT INTO users (email, name, avatar_url, location) VALUES
('sarah.johnson@email.com', 'Sarah Johnson', '/placeholder.svg?height=40&width=40', 'Austin, TX'),
('mike.chen@email.com', 'Mike Chen', '/placeholder.svg?height=40&width=40', 'San Francisco, CA'),
('jennifer.lopez@email.com', 'Jennifer Lopez', '/placeholder.svg?height=40&width=40', 'Miami, FL'),
('david.smith@email.com', 'David Smith', '/placeholder.svg?height=40&width=40', 'Chicago, IL'),
('lisa.wang@email.com', 'Lisa Wang', '/placeholder.svg?height=40&width=40', 'Seattle, WA');

-- Insert sample vehicles
INSERT INTO vehicles (user_id, make, model, year, mileage, current_value) VALUES
(1, 'Honda', 'Civic', 2019, 45000, 18500),
(2, 'Tesla', 'Model 3', 2021, 25000, 35000),
(3, 'BMW', 'X5', 2020, 35000, 42000),
(4, 'Toyota', 'Camry', 2018, 60000, 16000),
(5, 'Ford', 'F-150', 2022, 15000, 38000);

-- Insert sample damage analyses
INSERT INTO damage_analyses (user_id, vehicle_id, analysis_data, total_repair_cost, vehicle_value, deductible, expected_payout, status) VALUES
(1, 1, '{"damages": [{"type": "Dent", "location": "Rear bumper", "severity": "Moderate", "cost": 1200}]}', 1200, 18500, 500, 700, 'completed'),
(2, 2, '{"damages": [{"type": "Scratch", "location": "Driver door", "severity": "Minor", "cost": 450}]}', 450, 35000, 500, 0, 'completed'),
(3, 3, '{"damages": [{"type": "Hail damage", "location": "Hood and roof", "severity": "Severe", "cost": 3200}]}', 3200, 42000, 500, 2700, 'completed');

-- Insert sample community posts
INSERT INTO community_posts (user_id, analysis_id, title, description, actual_repair_cost, actual_payout, insurance_company, likes_count, comments_count) VALUES
(1, 1, 'Rear-end collision damage assessment', 'Got rear-ended at a red light. ClaimScan estimated $1,200 but actual repair was $1,350. Still pretty accurate! Insurance covered most of it.', 1350, 850, 'State Farm', 24, 8),
(2, 2, 'Minor door ding evaluation', 'Small door ding from parking lot. ClaimScan was spot on with the estimate. Decided not to file since it was under my deductible.', 425, 0, 'Geico', 12, 3),
(3, 3, 'Hail damage assessment', 'Caught in a hailstorm last week. Multiple dents on hood and roof. ClaimScan helped me understand the extent before talking to insurance.', 3450, 2950, 'Allstate', 45, 15);

-- Insert historical insurance claims data for analysis
INSERT INTO insurance_claims (vehicle_make, vehicle_model, vehicle_year, damage_type, damage_location, repair_cost, payout_amount, deductible, insurance_company, claim_date) VALUES
('Honda', 'Civic', 2019, 'Rear collision', 'Rear bumper', 1350, 850, 500, 'State Farm', '2024-01-10'),
('Tesla', 'Model 3', 2021, 'Door ding', 'Driver door', 425, 0, 500, 'Geico', '2024-01-12'),
('BMW', 'X5', 2020, 'Hail damage', 'Hood', 3450, 2950, 500, 'Allstate', '2024-01-08'),
('Toyota', 'Camry', 2018, 'Front collision', 'Front bumper', 2100, 1600, 500, 'Progressive', '2024-01-05'),
('Ford', 'F-150', 2022, 'Side impact', 'Driver door', 2800, 2300, 500, 'State Farm', '2024-01-03'),
('Honda', 'Accord', 2020, 'Scratch', 'Passenger door', 650, 150, 500, 'Geico', '2024-01-01'),
('Toyota', 'RAV4', 2021, 'Rear collision', 'Rear bumper', 1800, 1300, 500, 'Allstate', '2023-12-28'),
('Chevrolet', 'Silverado', 2019, 'Hail damage', 'Hood and roof', 4200, 3700, 500, 'Progressive', '2023-12-25'),
('Nissan', 'Altima', 2018, 'Side swipe', 'Passenger side', 1900, 1400, 500, 'State Farm', '2023-12-22'),
('Hyundai', 'Elantra', 2020, 'Front collision', 'Front end', 3200, 2700, 500, 'Geico', '2023-12-20');
