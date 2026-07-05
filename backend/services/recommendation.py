import json
import os
  
  
class RecommendationEngine:
    def __init__(self):
        self.recommendations = self.load_recommendations()
        print("Recommendation Engine initialized successfully!")
    
    def load_recommendations(self):
        base_path = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(
            base_path,
            "..",
            "knowledge_base",
            "recommendations.json"
        )
        with open(file_path, "r", encoding="utf-8") as file:
            return json.load(file)
        
    def generate_recommendations(self, grouped_entities, category_scores):
        recommendations = []
        seen = set()
        total_score = sum(category_scores.values())
        overall = {
            "level": "LOW",
            "message": ""
         }
        if total_score <= 25:
            overall["level"] = "LOW"
            overall["message"] = "Your digital footprint appears relatively safe."

        elif total_score <= 75:
            overall["level"] = "MEDIUM"
            overall["message"] = "Some sensitive information is publicly visible. Review your online profiles."

        elif total_score <= 150:
            overall["level"] = "HIGH"
            overall["message"] = "Multiple sensitive details have been detected. Consider removing unnecessary personal information."

        else:
            overall["level"] = "CRITICAL"
            overall["message"] = "Highly sensitive information has been detected. Immediate action is recommended."
        for category, entities in grouped_entities.items():
            for entity in entities:
                risk_key = entity.get("risk_key")
                if risk_key in self.recommendations and risk_key not in seen:
                    seen.add(risk_key)
                    recommendation_data = self.recommendations[risk_key]
                    recommendations.append({
                        "type": risk_key,
                        "risk": recommendation_data["risk"],
                        "recommendation": recommendation_data["recommendation"]
                    })
        return {
            "overall": overall,
            "entity_recommendations": recommendations
        }
    
    