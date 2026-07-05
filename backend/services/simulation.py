import json
import os


class Simulation:
    def __init__(self):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        attack_path = os.path.join(
            base_dir,
            "knowledge_base",
            "attack_simulations.json"
        )

        template_path = os.path.join(
            base_dir,
            "knowledge_base",
            "templates.json"
        )

        with open(attack_path, "r", encoding="utf-8") as f:
            self.attack_db = json.load(f)

        with open(template_path, "r", encoding="utf-8") as f:
            self.templates = json.load(f)

        print("Simulation Engine initialized successfully!")

    def simulate_attacks(self, grouped_entities):
        possible_attacks = []
        seen_attacks = set()

        for category, entities in grouped_entities.items():
            for entity in entities:
                risk_key = entity.get("risk_key")

                if not risk_key:
                    continue

                if risk_key not in self.attack_db:
                    continue

                for attack in self.attack_db[risk_key]:
                    attack_name = attack["attack"]

                    if attack_name in seen_attacks:
                        continue

                    seen_attacks.add(attack_name)
                    possible_attacks.append(attack.copy())
        return {
            "possible_attacks": possible_attacks
        }
    
    def extract_context(self, grouped_entities):

        context = {
            "name": "User",
            "organization": "your organization",
            "location": "your location"
        }

        # Name
        if grouped_entities.get("identity"):
            context["name"] = grouped_entities["identity"][0].get("value", "User")

        # Organization
        if grouped_entities.get("organizations"):
            context["organization"] = grouped_entities["organizations"][0].get("value", "your organization")

        # Location
        if grouped_entities.get("locations"):
            context["location"] = grouped_entities["locations"][0].get("value", "your location")

        return context
    
    def generate_awareness_examples(self, grouped_entities):
        examples = []
        context = self.extract_context(grouped_entities)

        if grouped_entities.get("identity"):
            examples.append("identity_awareness")

        if grouped_entities.get("contact"):
            examples.append("contact_awareness")

        if grouped_entities.get("organizations"):
            examples.append("employment_alert")

        if grouped_entities.get("locations"):
            examples.append("location_awareness")

        awareness_examples = []

        for key in examples:
            template = self.templates[key]

            awareness_examples.append({
                "title": template["title"],
                "description": template["description"],
                "subject": template["template"]["subject"].format(**context),
                "body": template["template"]["body"].format(**context)
            })

        return {
            "awareness_examples": awareness_examples
        }
    
    def generate_simulation(self, grouped_entities):
        attacks = self.simulate_attacks(grouped_entities)
        awareness = self.generate_awareness_examples(grouped_entities)

        return {
            **attacks,
            **awareness
        }