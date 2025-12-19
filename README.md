# Credit Risk Prediction App

A multilingual Streamlit web application for predicting credit risk using machine learning. The app supports both English and Danish languages and provides an intuitive interface for assessing creditworthiness.

## 🚀 Features

- **Multilingual Support**: Available in English and Danish
- **Interactive UI**: User-friendly Streamlit interface
- **Machine Learning**: XGBoost model for accurate predictions
- **Real-time Predictions**: Instant risk assessment
- **Comprehensive Input Validation**: Ensures data quality

## 📊 Dataset

This project uses the German Credit Dataset, which contains information about credit applicants and their credit risk assessment. The dataset includes features such as:

- Age
- Sex
- Job type
- Housing situation
- Saving accounts balance
- Checking account balance
- Credit amount
- Duration

## 🛠️ Technologies Used

- **Python 3.13**
- **Streamlit** - Web framework
- **scikit-learn** - Machine learning
- **XGBoost** - Gradient boosting algorithm
- **pandas** - Data manipulation
- **joblib** - Model serialization

## 📁 Project Structure

```
CreditRiskModelling/
├── app.py                 # Main Streamlit application
├── app_simple.py          # Simplified version (English only)
├── analysis_model.ipynb   # Jupyter notebook with model development
├── german_credit_data.csv # Dataset
├── requirements.txt       # Python dependencies
├── .gitignore            # Git ignore file
├── XGBoost_credit_model.pkl          # Trained model
├── *_encoder.pkl         # Label encoders for categorical variables
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/credit-risk-prediction.git
   cd credit-risk-prediction
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   streamlit run app.py
   ```

5. **Open your browser** and go to `http://localhost:8501`

## 🌐 Usage

1. **Select Language**: Choose between English and Danish using the sidebar
2. **Enter Applicant Details**:
   - Age (18-80)
   - Sex
   - Job type (0-3)
   - Housing situation
   - Saving accounts balance
   - Checking account balance
   - Credit amount
   - Loan duration in months
3. **Click "Predict Risk"** to get the assessment
4. **View Results**: The app will display whether the credit risk is GOOD or BAD

## 🔧 Model Details

- **Algorithm**: XGBoost Classifier
- **Training Data**: German Credit Dataset
- **Features**: 8 input features
- **Target**: Binary classification (Good/Bad credit risk)
- **Performance**: Trained on historical credit data

## 📈 Model Performance

The XGBoost model was trained and evaluated on the German Credit Dataset, achieving good predictive performance for credit risk assessment.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sivakumar**
- Portfolio: [akaran.dev](https://akaran.dev)
- GitHub: [yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- German Credit Dataset from UCI Machine Learning Repository
- Streamlit for the amazing web framework
- XGBoost for the powerful ML algorithm