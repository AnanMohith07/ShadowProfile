import os
import re
import json
import csv
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
                    "description": details["description"]
                })
        return results