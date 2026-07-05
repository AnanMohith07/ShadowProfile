import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.entity_detector import EntityDetector
from services.nlp_analyzer import NLPAnalyzer
from services.recommendation import RecommendationEngine
from services.privacy_risk import PrivacyRisk

import json

detector = EntityDetector()
analyzer = NLPAnalyzer()
risk_engine = PrivacyRisk()
recommendation_engine = RecommendationEngine()

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
category_scores = risk_engine.calculate_category_scores(grouped)
recommendations = recommendation_engine.generate_recommendations(grouped, category_scores)

print(json.dumps(recommendations, indent=4))