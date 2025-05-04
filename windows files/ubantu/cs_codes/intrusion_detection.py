import os
import re
import json
from datetime import datetime

# Simulated log files (In a real scenario, these would be collected from multiple network nodes)
log_files = {
    "user1.log": [
        "192.168.1.10 - Failed login attempt",
        "192.168.1.11 - SSH connection established",
        "192.168.1.10 - Failed login attempt",
        "192.168.1.10 - Failed login attempt",
        "192.168.1.50 - Port scan detected",
    ],
    "user2.log": [
        "192.168.2.20 - Failed login attempt",
        "192.168.2.20 - Failed login attempt",
        "192.168.2.20 - Failed login attempt",
        "192.168.2.30 - Suspicious traffic detected",
    ],
    "user3.log": [
        "192.168.3.40 - Failed login attempt",
        "192.168.3.40 - Failed login attempt",
        "192.168.3.41 - Unusual network activity",
    ],
}

# Attack patterns to detect
attack_patterns = {
    "Failed login attempt": "Brute Force Attack",
    "Port scan detected": "Port Scanning",
    "Suspicious traffic detected": "Malware Activity",
    "Unusual network activity": "Possible Intrusion"
}

# Function to analyze logs and detect attacks
def analyze_logs(log_files):
    intrusion_reports = {}

    for log_file, logs in log_files.items():
        for log_entry in logs:
            for pattern, attack_type in attack_patterns.items():
                if pattern in log_entry:
                    ip = re.search(r"\d+\.\d+\.\d+\.\d+", log_entry).group()  # Extract IP address
                    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                    if ip not in intrusion_reports:
                        intrusion_reports[ip] = []
                    
                    intrusion_reports[ip].append({
                        "attack_type": attack_type,
                        "log_file": log_file,
                        "timestamp": timestamp,
                        "log_entry": log_entry
                    })
    
    return intrusion_reports

# Analyze logs and prepare a security report
intrusion_report = analyze_logs(log_files)

# Save report as JSON file
report_file = "intrusion_report.json"
with open(report_file, "w") as file:
    json.dump(intrusion_report, file, indent=4)

# Display report summary
print("\n🔹 Intrusion Detection Report 🔹")
for ip, attacks in intrusion_report.items():
    print(f"\n[!] Intrusion detected from IP: {ip}")
    for attack in attacks:
        print(f" - Type: {attack['attack_type']}, Log: {attack['log_entry']}, Time: {attack['timestamp']}")

print(f"\n📌 Detailed report saved in: {report_file}")
