from flask import Blueprint, request, jsonify
from scapy.all import sniff, IP, TCP, UDP
import socket

firewall_bp = Blueprint("firewall", __name__)

my_ip = socket.gethostbyname(socket.gethostname())

# 🔴 Global flag for monitoring
monitoring_active = False

def packet_callback(packet, direction, blocked_ports, allowed_ports, specific_port):
    if packet.haslayer(IP):
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst
        port = None

        if direction == "incoming" and dst_ip != my_ip:
            return
        elif direction == "outgoing" and src_ip != my_ip:
            return

        if packet.haslayer(TCP) or packet.haslayer(UDP):
            port = packet[TCP].dport if packet.haslayer(TCP) else packet[UDP].dport

        if specific_port is not None and port != specific_port:
            return

        is_suspicious = False
        reason = ""

        if port in blocked_ports:
            is_suspicious = True
            reason = f"Blocked Port {port}"

        if allowed_ports is not None and port not in allowed_ports:
            is_suspicious = True
            reason = f"Port {port} not in allowed list"

        log = {
            "src_ip": src_ip,
            "dst_ip": dst_ip,
            "port": port,
            "status": "Suspicious" if is_suspicious else "Normal",
            "reason": reason
        }
        return log

@firewall_bp.route("/")
def firewall_home():
    return jsonify({"message": "Firewall module is working! Use /monitor to start monitoring."})

@firewall_bp.route("/monitor", methods=["POST"])
def monitor_firewall():
    global monitoring_active
    monitoring_active = True

    data = request.json
    direction = data.get("direction", "incoming")
    blocked_ports = data.get("blocked_ports", [])
    allowed_ports = data.get("allowed_ports", None)
    specific_port = data.get("specific_port", None)

    logs = []

    def packet_handler(packet):
        if not monitoring_active:
            return False  # ⛔ Stop sniffing
        log_entry = packet_callback(packet, direction, blocked_ports, allowed_ports, specific_port)
        if log_entry:
            logs.append(log_entry)

    sniff(filter="ip", prn=packet_handler, store=0, timeout=30)  # You can increase timeout if needed

    return jsonify({"logs": logs})

# 🆕 Stop endpoint
@firewall_bp.route("/stop", methods=["POST"])
def stop_firewall_monitoring():
    global monitoring_active
    monitoring_active = False
    return jsonify({"message": "Firewall monitoring stopped."})

# ✅ Ensure this is at the bottom of the file
__all__ = ["firewall_bp"]
