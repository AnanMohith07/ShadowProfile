import sys
import json
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__),"..")))

from services.simulation import Simulation
from services.entity_detector import EntityDetector
from services.nlp_analyzer import NLPAnalyzer

simulation = Simulation()
detector = EntityDetector()
analyzer = NLPAnalyzer()


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

simulation_result = simulation.generate_simulation(grouped)
print(json.dumps(simulation_result, indent=4))