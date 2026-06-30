from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/portfolio')
def portfolio():
    return render_template('portfolio.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '').lower()
    
    # Simple chatbot responses
    responses = {
        'hello': 'Hello! Welcome to Techluxe. How can I help you today?',
        'hi': 'Hi there! Welcome to Techluxe. What would you like to know?',
        'services': 'We offer web development, mobile app development, UI/UX design, and consulting services.',
        'portfolio': 'Check out our portfolio page to see our latest projects and client work.',
        'about': 'Techluxe is a cutting-edge development company focused on creating innovative digital solutions.',
        'contact': 'You can reach us at contact@techluxe.com or call us at 423-834-0552.',
        'price': 'Our pricing varies based on project scope. Please contact us for a custom quote.',
        'experience': 'We have over 10 years of experience in software development and design.',
        'technologies': 'We work with Python, JavaScript, React, Flask, Django, and many modern technologies.'
    }
    
    # Check for keywords in user message
    for keyword, response in responses.items():
        if keyword in user_message:
            return jsonify({'reply': response})
    
    # Default response
    default_responses = [
        "Thank you for your question! For more information, please check our services page or contact us directly.",
        "I'm here to help! You can learn more about our services, portfolio, or contact us for specific inquiries.",
        "Great question! Feel free to explore our website or reach out to our team for personalized assistance."
    ]
    
    import random
    return jsonify({'reply': random.choice(default_responses)})

if __name__ == '__main__':
    app.run(debug=True)