# spam_detector_simple.py

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Sample data for demonstration (you can expand it)
messages = [
    "Win money now!",                   # Spam
    "Hello, how are you?",              # Not spam
    "Claim your free prize!!!",         # Spam
    "Let's meet for lunch tomorrow",    # Not spam
    "Congratulations! You've won!"      # Spam
]

labels = [1, 0, 1, 0, 1]  # 1 = spam, 0 = not spam

# Vectorizing the text data
vectorizer = CountVectorizer()
features = vectorizer.fit_transform(messages)

# Training a simple Naive Bayes model
model = MultinomialNB()
model.fit(features, labels)

# Test the model with user input
test_msg = input("Enter a message to check if it's spam: ")
test_vector = vectorizer.transform([test_msg])
prediction = model.predict(test_vector)

print("Spam" if prediction[0] == 1 else "Not Spam")
