import os
import re
import json
import csv
from rich import text
import spacy

nlp = spacy.load("en_core_web_sm")
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

KB_DIR = os.path.join(BASE_DIR, "knowledge_base")

class EntityDetector:

    def __init__(self):
        self.regex_patterns = self.load_regex_patterns()
        self.privacy_keywords = self.load_privacy_keywords()
        self.platform_keywords = self.load_platform_keywords()

    def load_regex_patterns(self):
        path = os.path.join(KB_DIR, "regex_patterns.json")
        with open(path, "r",encoding="utf-8") as file:
            return json.load(file)
        
    def load_privacy_keywords(self):
        keywords = []
        path = os.path.join(KB_DIR, "privacy_keywords.csv")
        with open(path, newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                keywords.append(row)
        return keywords
    
    def load_platform_keywords(self):
        platforms = []
        path = os.path.join(KB_DIR, "platform_keywords.csv")
        with open(path, newline='', encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                platforms.append(row)
        return platforms
    
    def detect_regex(self, text):
        results = []
        for entity, details in self.regex_patterns.items():
            pattern = details["pattern"]
            matches = re.findall(pattern, text)
            for match in matches:
                results.append({
                    "type": entity,
                    "value": match,
                    "method": "Regex",
                    "risk": details["risk"],
                    "description": details["description"],
                    "risk_key": entity
                })
        return results
    
    def detect_spacy(self, text):
        results = []
        doc = nlp(text)
        VALID_LABELS = {
            "PERSON",
            "ORG",
            "GPE",
            "LOC"
        }
        # Ignore common false positives
        IGNORE_WORDS = {
            "otp",
            "password",
            "email",
            "phone",
            "aadhaar",
            "pan",
            "github",
            "instagram",
            "gmail",
            "linkedin",
            "discord"
        }

        for entity in doc.ents:
            if entity.label_ not in VALID_LABELS:
                continue

            if entity.text.lower() in IGNORE_WORDS:
                continue

            results.append({
                "type": entity.label_,
                "value": entity.text,
                "method": "spaCy",
                "risk_key": entity.label_.upper()
            })
        return results

    def detect_keywords(self, text):
        results = []
        text_lower = text.lower()
        for keyword in self.privacy_keywords:
           if keyword["keyword"].lower() in text_lower:
                results.append({
                    "type": keyword["category"],
                    "category": keyword["category"],
                    "value": keyword["keyword"],
                    "method": "Keyword",
                    "risk": keyword["risk"],
                    "risk_key": keyword["keyword"].upper().replace(" ", "_")
                })
        return results
    
    def detect_platforms(self, text):
        results = []
        text_lower = text.lower()
        category_map = {
            "Social Media": "SOCIAL_MEDIA",
            "Developer": "DEVELOPER_PLATFORM",
            "Professional": "PROFESSIONAL_PLATFORM",
            "Email": "EMAIL_PLATFORM"
        }
        for platform in self.platform_keywords:
            if platform["platform"].lower() in text_lower:
                results.append({
                    "type": "PLATFORM",
                    "category": platform["category"],
                    "value": platform["platform"],
                    "method": "Keyword",
                    "risk": platform["risk"],
                    "description": platform["description"],
                    "risk_key": category_map.get(platform["category"], "PLATFORM")
                })
        return results

    def analyze_text(self, text):
        results = []
        results.extend(self.detect_regex(text))
        results.extend(self.detect_spacy(text))
        results.extend(self.detect_keywords(text))
        results.extend(self.detect_platforms(text))
        return results