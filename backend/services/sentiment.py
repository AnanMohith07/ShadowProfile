import json
import os


class BehaviorAnalyzer:
    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        json_path = os.path.join(
            base_dir,
            "knowledge_base",
            "behavior_patterns.json"
        )

        with open(json_path, "r", encoding="utf-8") as f:
            self.patterns = json.load(f)

        print("Behavior Analyzer initialized successfully!")

    def analyze_behavior(self, text):
        sentences = text.split(".")
        behaviors = []

        for sentence in sentences:
            sentence = sentence.strip()

            if not sentence:
                continue

            sentence_lower = sentence.lower()

            for keyword in self.patterns["profession"]:
                if keyword in sentence_lower:
                    behaviors.append({
                        "type": "Profession",
                        "value": sentence,
                        "risk": "Medium"
                    })

            for keyword in self.patterns["routine"]:
                if keyword in sentence_lower:
                    behaviors.append({
                        "type": "Routine",
                        "value": sentence,
                        "risk": "Low"
                    })

            for keyword in self.patterns["travel"]:
                if keyword in sentence_lower:
                    behaviors.append({
                        "type": "Travel",
                        "value": sentence,
                        "risk": "Medium"
                    })

            for keyword in self.patterns["interest"]:
                if keyword in sentence_lower:
                    behaviors.append({
                        "type": "Interest",
                        "value": sentence,
                        "risk": "Low"
                    })

        unique = []
        seen = set()
        for item in behaviors:
            key = (item["type"], item["value"])
            if key not in seen:
                seen.add(key)
                unique.append(item)
        
        return {
            "behaviors": unique
        }