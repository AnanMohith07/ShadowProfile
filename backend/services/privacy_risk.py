import json
import os


class PrivacyRisk:
    def __init__(self):
        self.weights = self.load_risk_weights()
        print("Privacy Risk Engine initialized successfully!")

    def load_risk_weights(self):
        current_dir = os.path.dirname(__file__)
        file_path = os.path.join(
            current_dir,
            "..",
            "knowledge_base",
            "risk_weights.json"
        )
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
    
    def calculate_category_scores(self, grouped_entities):
        scores = {}
        print(json.dumps(grouped_entities, indent=4))
        for category, entities in grouped_entities.items():
            category_score = 0
            for entity in entities:
                risk_key = entity.get("risk_key")
                if risk_key:
                    category_score += self.weights.get(risk_key, 0)
            scores[category] = category_score
        return scores