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
        <p>Current working directory: ''' + str(__file__) + '''</p>
    </body>
    </html>
    '''

@app.route('/api/test')
def test():
    return {'message': 'API is working!', 'status': 'success'}