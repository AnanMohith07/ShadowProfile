from services.entity_detector import EntityDetector

class NLPAnalyzer:
    def __init__(self):
        self.detector = EntityDetector()

    def analyze(self, text):
        entities = self.detector.analyze_text(text)
        grouped = self.group_entities(entities)
        return grouped

    def group_entities(self, entities):

        grouped = {
            "identity": [],
            "contact": [],
            "government_ids": [],
            "credentials": [],
            "financial": [],
            "platforms": [],
            "organizations": [],
            "locations": [],
            "other": []
        }

        for entity in entities:
            entity_type = entity["type"]
            if entity_type == "PERSON":
                grouped["identity"].append(entity)
            elif entity_type in ["EMAIL", "PHONE"]:
                grouped["contact"].append(entity)
            elif entity_type in ["AADHAAR", "PAN", "PASSPORT", "VOTER_ID"]:
                grouped["government_ids"].append(entity)
            elif entity_type == "Credentials":
                grouped["credentials"].append(entity)
            elif entity_type in ["BANK_ACCOUNT", "UPI", "CREDIT_CARD"]:
                grouped["financial"].append(entity)
            elif entity_type == "PLATFORM":
                grouped["platforms"].append(entity)
            elif entity_type == "ORG":
                grouped["organizations"].append(entity)
            elif entity_type in ["GPE", "LOC"]:
                grouped["locations"].append(entity)
            else:
                grouped["other"].append(entity)
        return grouped