import sys
import os
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from services.sentiment import BehaviorAnalyzer

text = """
I work at Infosys.

I travel every weekend.

I love photography.

I visit Bangalore every month.
"""

behavior = BehaviorAnalyzer()

result = behavior.analyze_behavior(text)

print(json.dumps(result, indent=4))