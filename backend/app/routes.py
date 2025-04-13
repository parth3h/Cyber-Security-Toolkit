from flask import Blueprint, jsonify, request
from app.services.port_scanner import scan_ports
from app.services.firewall import firewall_bp
from app.services.ip_checker import lookup_ip
from app.services.software_checker import list_software
from app.services.malware_checker import scan_files
from app.services.password_checker import check_password

main_bp = Blueprint('main', __name__)

@main_bp.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the CyberSecurity ToolKit API"}), 200


@main_bp.route('/port-scanner', methods=['POST'])
def port_scanner():
    data = request.json
    target = data.get("target")  # Extract target from JSON request

    if not target:
        return jsonify({"error": "Target is required"}), 400

    result = scan_ports(target)  # ✅ Pass target as an argument
    return jsonify(result)

@main_bp.route('/firewall', methods=['POST'])
def firewall():
    data = request.json

    # ✅ Directly call monitor_firewall instead of making a request
    from app.services.firewall import monitor_firewall  
    return monitor_firewall()



@main_bp.route('/ip-checker', methods=['POST'])
def ip_checker():
    ip = request.json.get("ip")
    result = lookup_ip(ip)
    return jsonify(result)

@main_bp.route('/software-checker', methods=['GET'])
def software_checker():
    result = list_software()
    return jsonify(result)

@main_bp.route('/malware/scan', methods=['POST'])
def malware_scan():
    data = request.json
    directory = data.get("directory")
    result = scan_files()
    return result

@main_bp.route('/password-checker', methods=['POST'])
def password_checker():
    data = request.json
    result = check_password(data.get("password"))
    return jsonify(result)
