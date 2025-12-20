from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Credit Risk App - Test</title>
    </head>
    <body>
        <h1>Credit Risk App is working!</h1>
        <p>This is a test page to verify the Flask app is running on Vercel.</p>
        <p>Flask app successfully deployed!</p>
    </body>
    </html>
    '''

# Vercel expects the Flask app to be exported as 'app'
# This is required for Vercel to find and run the Flask application