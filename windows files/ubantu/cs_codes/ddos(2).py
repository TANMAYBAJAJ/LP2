import threading
import requests
from flask import Flask
import time

# --- Flask server setup ---
app = Flask(__name__)

@app.route('/')
def home():
    return "Server is running!"

def run_server():
    # Start Flask app on a different thread
    app.run(host="127.0.0.1", port=5000)

# --- DDoS-like attack function ---
target_url = "http://127.0.0.1:5000"  # Match Flask port

def attack():
    while True:
        try:
            response = requests.get(target_url)
            print(f"Sent request, response: {response.status_code}")
        except requests.exceptions.RequestException:
            print("Server Down!")

# Start Flask server thread
server_thread = threading.Thread(target=run_server)
server_thread.daemon = True  # So it closes when main thread ends
server_thread.start()

# Optional: give the server a second to start up
time.sleep(1)

# Start attack threads
for _ in range(100):
    thread = threading.Thread(target=attack)
    thread.start()
