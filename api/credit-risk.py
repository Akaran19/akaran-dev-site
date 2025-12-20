def handler(request):
    """Simple Vercel function"""
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "text/html"},
        "body": "<h1>Hello from Vercel Python!</h1><p>Credit Risk App Test</p>"
    }
