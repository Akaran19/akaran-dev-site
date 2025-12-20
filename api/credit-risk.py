def handler(event, context):
    """Simple Vercel serverless function"""
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        },
        'body': '''
<!DOCTYPE html>
<html>
<head>
    <title>Credit Risk Prediction App</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #34495e;
        }
        input, select {
            width: 100%;
            padding: 12px;
            border: 2px solid #e1e8ed;
            border-radius: 6px;
            font-size: 16px;
            transition: border-color 0.3s;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #3498db;
        }
        .row {
            display: flex;
            gap: 20px;
        }
        .col {
            flex: 1;
        }
        button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: transform 0.2s;
        }
        button:hover {
            transform: translateY(-2px);
        }
        .result {
            margin-top: 30px;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
            font-size: 18px;
            font-weight: 600;
        }
        .good {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .bad {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .loading {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>💳 Credit Risk Prediction App</h1>
        <p style="text-align: center; color: #7f8c8d; margin-bottom: 30px;">
            Enter the applicant details below to predict credit risk assessment.
        </p>

        <form id="predictionForm">
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="age">Age:</label>
                        <input type="number" id="age" name="age" min="18" max="80" value="30" required>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="sex">Sex:</label>
                        <select id="sex" name="sex" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="job">Job (0-3):</label>
                        <input type="number" id="job" name="job" min="0" max="3" value="1" required>
                        <small style="color: #7f8c8d; font-size: 12px;">
                            0: Unskilled, 1: Semi-skilled, 2: Skilled, 3: Highly skilled
                        </small>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="housing">Housing:</label>
                        <select id="housing" name="housing" required>
                            <option value="own">Own</option>
                            <option value="rent">Rent</option>
                            <option value="free">Free</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="saving_accounts">Saving accounts:</label>
                        <select id="saving_accounts" name="saving_accounts" required>
                            <option value="little">Little (&lt; 50 €)</option>
                            <option value="moderate">Moderate (50-250 €)</option>
                            <option value="rich">Rich (250-500 €)</option>
                            <option value="quite rich">Quite rich (&gt; 500 €)</option>
                        </select>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="checking_account">Checking account:</label>
                        <select id="checking_account" name="checking_account" required>
                            <option value="little">Little (&lt; 0 €)</option>
                            <option value="moderate">Moderate (0-100 €)</option>
                            <option value="rich">Rich (&gt; 100 €)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="credit_amount">Credit Amount (€):</label>
                        <input type="number" id="credit_amount" name="credit_amount" min="0" value="1000" required>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="duration">Duration (months):</label>
                        <input type="number" id="duration" name="duration" min="1" value="12" required>
                    </div>
                </div>
            </div>

            <button type="submit">🔮 Predict Credit Risk</button>
        </form>

        <div id="result"></div>
    </div>

    <script>
        document.getElementById('predictionForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<div class="result loading">🔄 Analyzing credit risk...</div>';

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch('/api/credit-risk/predict', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (result.prediction === 1) {
                    resultDiv.innerHTML = '<div class="result good">✅ GOOD CREDIT RISK<br><small>The applicant is likely to repay the loan successfully.</small></div>';
                } else {
                    resultDiv.innerHTML = '<div class="result bad">❌ BAD CREDIT RISK<br><small>The applicant may have difficulty repaying the loan.</small></div>';
                }
            } catch (error) {
                console.error('Error:', error);
                resultDiv.innerHTML = '<div class="result bad">❌ Error making prediction. Please try again.</div>';
            }
        });
    </script>
</body>
</html>
        '''
    }