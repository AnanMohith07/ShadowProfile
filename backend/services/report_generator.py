import json
import os

class ReportGenerator:
    def __init__(self):
        print("Report Generator initialized successfully!")

    def generate_report(self, grouped_entities, category_scores, recommendations):
        report = {
            "entities": grouped_entities,
            "category_scores": category_scores,
            "recommendations": recommendations
        }
        return report
    