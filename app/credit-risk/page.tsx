export default function CreditRiskPage() {
  return (
    <div style={{ 
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
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
        </p>
        
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>🚧 Under Construction</h2>
          <p>The credit risk prediction feature is being implemented.</p>
          <p>Please check back soon!</p>
        </div>
      </div>
    </div>
  );
}
