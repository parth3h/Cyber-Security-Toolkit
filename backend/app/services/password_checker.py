import re
from flask import request, jsonify

def check_password_strength(password):
    """Determine password strength using a scoring system."""
    score = 0
    
    if len(password) >= 8:
        score += 1
    if re.search(r'[A-Z]', password):
        score += 1
    if re.search(r'[a-z]', password):
        score += 1
    if re.search(r'[0-9]', password):
        score += 1
    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        score += 1

    if score == 5:
        return "Very Strong"
    elif score == 4:
        return "Strong"
    elif score == 3:
        return "Moderate"
    else:
        return "Weak"

def check_password(password):
    """Check password strength via API."""
    if not password:
        return {"error": "Password is required"}, 400

    strength = check_password_strength(password)
    return {"password_strength": strength}
