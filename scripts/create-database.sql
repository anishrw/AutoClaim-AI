-- Create database schema for ClaimScan AI

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    mileage INTEGER,
    vin VARCHAR(17),
    current_value DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Damage analyses table
CREATE TABLE IF NOT EXISTS damage_analyses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    vehicle_id INTEGER REFERENCES vehicles(id),
    analysis_data JSONB NOT NULL,
    total_repair_cost DECIMAL(10,2) NOT NULL,
    vehicle_value DECIMAL(10,2),
    deductible DECIMAL(10,2),
    expected_payout DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Damage images table
CREATE TABLE IF NOT EXISTS damage_images (
    id SERIAL PRIMARY KEY,
    analysis_id INTEGER REFERENCES damage_analyses(id),
    image_url TEXT NOT NULL,
    image_type VARCHAR(50),
    upload_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Community posts table
CREATE TABLE IF NOT EXISTS community_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    analysis_id INTEGER REFERENCES damage_analyses(id),
    title VARCHAR(255),
    description TEXT,
    actual_repair_cost DECIMAL(10,2),
    actual_payout DECIMAL(10,2),
    insurance_company VARCHAR(100),
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post likes table
CREATE TABLE IF NOT EXISTS post_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES community_posts(id),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Post comments table
CREATE TABLE IF NOT EXISTS post_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES community_posts(id),
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insurance claims data (for historical analysis)
CREATE TABLE IF NOT EXISTS insurance_claims (
    id SERIAL PRIMARY KEY,
    vehicle_make VARCHAR(100),
    vehicle_model VARCHAR(100),
    vehicle_year INTEGER,
    damage_type VARCHAR(100),
    damage_location VARCHAR(100),
    repair_cost DECIMAL(10,2),
    payout_amount DECIMAL(10,2),
    deductible DECIMAL(10,2),
    insurance_company VARCHAR(100),
    claim_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_damage_analyses_user_id ON damage_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_damage_analyses_created_at ON damage_analyses(created_at);
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_insurance_claims_vehicle ON insurance_claims(vehicle_make, vehicle_model, vehicle_year);
CREATE INDEX IF NOT EXISTS idx_insurance_claims_damage ON insurance_claims(damage_type, damage_location);
