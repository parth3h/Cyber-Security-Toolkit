from flask import jsonify
import requests

# Replace with your AbuseIPDB API key
ABUSEIPDB_API_KEY = "30cb42af4cb85329dd320e2e044119f77fcd65068ad9a2531a16ec6c2f6031cb6c24abe808cc4fb7"

def lookup_ip(ip):
    try:
        # 🌍 Step 1: Get Geolocation Data
        geo_response = requests.get(f"http://ip-api.com/json/{ip}")
        geo_data = geo_response.json()

        # 📌 Step 2: Get AbuseIPDB Data
        headers = {
            "Key": ABUSEIPDB_API_KEY,
            "Accept": "application/json"
        }
        params = {"ipAddress": ip}
        abuse_response = requests.get("https://api.abuseipdb.com/api/v2/check", headers=headers, params=params)
        abuse_data = abuse_response.json()

        # ✅ Construct Final Response
        result = {
            "ip": ip,
            "country": geo_data.get("country", "Unknown"),
            "region": geo_data.get("regionName", "Unknown"),
            "city": geo_data.get("city", "Unknown"),
            "isp": geo_data.get("isp", "Unknown"),
            "org": geo_data.get("org", "Unknown"),
            "as": geo_data.get("as", "Unknown"),
            "abuse_score": abuse_data.get("data", {}).get("abuseConfidenceScore", 0),
            "total_reports": abuse_data.get("data", {}).get("totalReports", 0),
            "last_reported": abuse_data.get("data", {}).get("lastReportedAt", "Never")
        }

        return result

    except Exception as e:
        return {"error": str(e)}

# ✅ Export function
__all__ = ["lookup_ip"]
