import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.privacy_risk import PrivacyRisk
from services.entity_detector import EntityDetector
from services.nlp_analyzer import NLPAnalyzer

detector = EntityDetector()
analyzer = NLPAnalyzer()
risk_engine = PrivacyRisk()

text = """
My name is Anan Mohith.
Email: anan@gmail.com
Phone: 9876543210
Password: hello123
GitHub: https://github.com/AnanMohith07
"""

entities = detector.analyze_text(text)

grouped = analyzer.group_entities(entities)

scores = risk_engine.calculate_category_scores(grouped)

print(grouped)
print(scores)