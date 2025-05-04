from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Test Server Running"

if __name__ == '__main__':
    app.run(port=5000)  # Use 5000 instead of 80
