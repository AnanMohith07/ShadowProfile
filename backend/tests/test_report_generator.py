import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.entity_detector import EntityDetector
from services.nlp_analyzer import NLPAnalyzer
from services.privacy_risk import PrivacyRisk
from services.recommendation import RecommendationEngine
from services.report_generator import ReportGenerator

import json

detector = EntityDetector()
analyzer = NLPAnalyzer()
risk_engine = PrivacyRisk()
recommendation_engine = RecommendationEngine()
report_generator = ReportGenerator()

text = """
My name is Anan Mohith.

Email: anan@gmail.com

Phone: 9876543210

Password: hello123

GitHub:
https://github.com/AnanMohith07
"""

entities = detector.analyze_text(text)
grouped = analyzer.group_entities(entities)
scores = risk_engine.calculate_category_scores(grouped)
recommendations = recommendation_engine.generate_recommendations(
    grouped,
    scores
)
report = report_generator.generate_report(
    grouped,
    scores,
    recommendations
)
#json_path = report_generator.save_json(report)
#print(json_path)

pdf_path = report_generator.export_pdf(report)
print(pdf_path)
#print(json.dumps(report, indent=4))