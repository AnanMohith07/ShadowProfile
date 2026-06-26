CREATE DATABASE IF NOT EXISTS shadowprofile;

USE shadowprofile;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analyses (
    analysis_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    input_type ENUM('text','url','mixed') NOT NULL,
    input_content TEXT,
    sentiment VARCHAR(20),
    privacy_score DECIMAL(5,2),
    reputation_score DECIMAL(5,2),
    risk_level ENUM('Low','Medium','High'),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

CREATE TABLE social_profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    analysis_id INT NOT NULL,
    platform VARCHAR(50),
    profile_url VARCHAR(255),

    FOREIGN KEY(analysis_id)
        REFERENCES analyses(analysis_id)
        ON DELETE CASCADE
);

CREATE TABLE detected_entities (
    entity_id INT AUTO_INCREMENT PRIMARY KEY,
    analysis_id INT NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_value TEXT NOT NULL,
    risk_category VARCHAR(50),
    confidence DECIMAL(4,2),
    risk_score DECIMAL(5,2),

    FOREIGN KEY(analysis_id)
        REFERENCES analyses(analysis_id)
        ON DELETE CASCADE
);

CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    analysis_id INT NOT NULL,
    report_type VARCHAR(50),
    report_path VARCHAR(255),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(analysis_id)
        REFERENCES analyses(analysis_id)
        ON DELETE CASCADE
);