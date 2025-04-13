from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for React frontend

    from app.routes import main_bp
    from app.services.firewall import firewall_bp  # ✅ Import firewall blueprint

    app.register_blueprint(main_bp)  # Register main routes
    app.register_blueprint(firewall_bp, url_prefix="/firewall")  # ✅ Register firewall routes

    return app
