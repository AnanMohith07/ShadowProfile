import sys
import os
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.nlp_analyzer import NLPAnalyzer

analyzer = NLPAnalyzer()

text = """
My name is Anan Mohith.

Email:
anan@gmail.com

Phone:
9876543210

Password:
secret123

GitHub:
github.com/AnanMohith07
"""

result = analyzer.analyze(text)
print(json.dumps(result, indent=4))