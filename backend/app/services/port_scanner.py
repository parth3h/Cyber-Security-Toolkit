import subprocess
import json
import re

def scan_ports(target):
    try:
        # Run Nmap command
        result = subprocess.run(["nmap", "-p-", target], capture_output=True, text=True)
        
        # Extract relevant information from the output
        output = result.stdout
        
        # Extract open ports using regex
        port_pattern = re.findall(r"(\d+/tcp)\s+(\w+)\s+([\w-]+)", output)

        # Format the extracted data into JSON
        ports_info = [
            {"port": port.split('/')[0], "state": state, "service": service}
            for port, state, service in port_pattern
        ]

        return {"target": target, "open_ports": ports_info}

    except Exception as e:
        return {"error": str(e)}
