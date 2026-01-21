'use client';

import { useState } from 'react';

export default function CreditRiskPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/credit-risk/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseInt(data.age as string),
          sex: data.sex,
          job: parseInt(data.job as string),
          housing: data.housing,
          saving_accounts: data.saving_accounts,
          checking_account: data.checking_account,
          credit_amount: parseInt(data.credit_amount as string),
          duration: parseInt(data.duration as string),
        }),
      });

      const result = await response.json();

      if (result.prediction === 1) {
        setResult('good');
      } else {
        setResult('bad');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      background: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ color: "#2c3e50", textAlign: "center", marginBottom: "30px" }}>
          💳 Credit Risk Prediction App
        </h1>
        <p style={{ textAlign: "center", color: "#7f8c8d", marginBottom: "30px" }}>
          Enter the applicant details below to predict credit risk assessment.
          <br />
          <small style={{ fontSize: "12px", color: "#95a5a6" }}>
            Dataset: German Credit Data from Kaggle (<a href="https://www.kaggle.com/datasets/kabure/german-credit-data-with-risk?resource=download" target="_blank" rel="noopener noreferrer" style={{ color: "#667eea" }}>link</a>)
          </small>
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#34495e" }}>
                Age:
              </label>
              <input
                type="number"
                name="age"
                min="18"
                max="80"
                defaultValue="30"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e8ed",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#34495e" }}>
                Sex:
              </label>
              <select
                name="sex"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e8ed",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#34495e" }}>
                Job (0-3):
              </label>
              <input
                type="number"
                name="job"
                min="0"
                max="3"
                defaultValue="1"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e8ed",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              />
              <small style={{ color: "#7f8c8d", fontSize: "12px" }}>
                0: Unskilled, 1: Semi-skilled, 2: Skilled, 3: Highly skilled
              </small>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#34495e" }}>
                Housing:
              </label>
              <select
                name="housing"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e8ed",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              >
                <option value="own">Own</option>
                <option value="rent">Rent</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#34495e" }}>
                Saving accounts:
              </label>
              <select
                name="saving_accounts"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e8ed",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              >
                <option value="little">Little (&lt; 50 €)</option>
                <option value="moderate">Moderate (50-250 €)</option>
                <option value="rich">Rich (250-500 €)</option>
                <option value="quite rich">Quite rich (&gt; 500 €)</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#34495e" }}>
                Checking account:
              </label>
              <select
                name="checking_account"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e8ed",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              >
                <option value="little">Little (&lt; 0 €)</option>
                <option value="moderate">Moderate (0-100 €)</option>
                <option value="rich">Rich (&gt; 100 €)</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#34495e" }}>
                Credit Amount (€):
              </label>
              <input
                type="number"
                name="credit_amount"
                min="0"
                defaultValue="1000"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e8ed",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "600", color: "#34495e" }}>
                Duration (months):
              </label>
              <input
                type="number"
                name="duration"
                min="1"
                defaultValue="12"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid #e1e8ed",
                  borderRadius: "6px",
                  fontSize: "16px"
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#95a5a6" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              padding: "15px 30px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
              transition: "transform 0.2s"
            }}
          >
            {loading ? "🔄 Analyzing credit risk..." : "🔮 Predict Credit Risk"}
          </button>
        </form>

        {result && (
          <div style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "6px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "600",
            background: result === 'good' ? '#d4edda' : result === 'bad' ? '#f8d7da' : '#fff3cd',
            color: result === 'good' ? '#155724' : result === 'bad' ? '#721c24' : '#856404',
            border: `1px solid ${result === 'good' ? '#c3e6cb' : result === 'bad' ? '#f5c6cb' : '#ffeaa7'}`
          }}>
            {result === 'good' && (
              <>
                ✅ GOOD CREDIT RISK
                <br />
                <small>The applicant is likely to repay the loan successfully.</small>
              </>
            )}
            {result === 'bad' && (
              <>
                ❌ BAD CREDIT RISK
                <br />
                <small>The applicant may have difficulty repaying the loan.</small>
              </>
            )}
            {result === 'error' && (
              <>
                ❌ Error making prediction. Please try again.
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
