import streamlit as st
import pandas as pd
import joblib

# 1 Good (lower risk) 0 Bad (higher risk)

# Translations dictionary
translations = {
    'en': {
        'title': 'Credit Risk Prediction App',
        'description': 'Enter the details of the applicant to predict if the credit risk is good or bad.',
        'age': 'Age',
        'sex': 'Sex',
        'job': 'Job (0-3)',
        'job_help': '0: Unskilled and non-resident, 1: Unskilled and resident, 2: Skilled, 3: Highly skilled',
        'housing': 'Housing',
        'housing_help': 'own: Owns property, free: Lives rent-free (e.g., with family), rent: Rents accommodation',
        'saving_accounts': 'Saving accounts',
        'saving_help': 'little: < 50 €, moderate: 50-250 €, rich: 250-500 €, quite rich: > 500 €',
        'checking_account': 'Checking account',
        'checking_help': 'little: < 0 €, moderate: 0-100 €, rich: > 100 €',
        'credit_amount': 'Credit Amount',
        'duration': 'Duration (months)',
        'predict_button': 'Predict Risk',
        'good_risk': 'The predicted credit risk is **GOOD**.',
        'bad_risk': 'The predicted credit risk is **BAD**.',
        'sex_options': ['male', 'female'],
        'housing_options': ['own', 'free', 'rent'],
        'saving_options': ['little', 'moderate', 'rich', 'quite rich'],
        'checking_options': ['little', 'moderate', 'rich'],
        'language': 'Language'
    },
    'da': {
        'title': 'Kreditrisiko ForudsigelsesApp',
        'description': 'Indtast ansøgerens oplysninger for at forudsige om kreditrisikoen er god eller dårlig.',
        'age': 'Alder',
        'sex': 'Køn',
        'job': 'Job (0-3)',
        'job_help': '0: Ufaglært uden opholdstilladelse, 1: Ufaglært med opholdstilladelse, 2: Faglært, 3: Højt kvalificeret',
        'housing': 'Bolig',
        'housing_help': 'ejet: Ejer ejendom, gratis: Bor leje-frit (f.eks. hos familie), lejet: Lejer bolig',
        'saving_accounts': 'Opsparingskonti',
        'saving_help': 'lidt: < 50 €, moderat: 50-250 €, rig: 250-500 €, meget rig: > 500 €',
        'checking_account': 'Lønkonto',
        'checking_help': 'lidt: < 0 €, moderat: 0-100 €, rig: > 100 €',
        'credit_amount': 'Kreditbeløb',
        'duration': 'Varighed (måneder)',
        'predict_button': 'Forudsig Risiko',
        'good_risk': 'Den forudsagte kreditrisiko er **GOD**.',
        'bad_risk': 'Den forudsagte kreditrisiko er **DÅRLIG**.',
        'sex_options': ['mand', 'kvinde'],
        'housing_options': ['ejet', 'gratis', 'lejet'],
        'saving_options': ['lidt', 'moderat', 'rig', 'meget rig'],
        'checking_options': ['lidt', 'moderat', 'rig'],
        'language': 'Sprog'
    }
}

# Mapping dictionaries to convert translated options back to English for encoders
option_mappings = {
    'sex': {'mand': 'male', 'kvinde': 'female', 'male': 'male', 'female': 'female'},
    'housing': {'ejet': 'own', 'gratis': 'free', 'lejet': 'rent', 'own': 'own', 'free': 'free', 'rent': 'rent'},
    'saving_accounts': {
        'lidt': 'little', 'moderat': 'moderate', 'rig': 'rich', 'meget rig': 'quite rich',
        'little': 'little', 'moderate': 'moderate', 'rich': 'rich', 'quite rich': 'quite rich'
    },
    'checking_account': {
        'lidt': 'little', 'moderat': 'moderate', 'rig': 'rich',
        'little': 'little', 'moderate': 'moderate', 'rich': 'rich'
    }
}

model = joblib.load('XGBoost_credit_model.pkl')
encoders = {col: joblib.load(f'{col}_encoder.pkl') for col in ['Sex', 'Housing', 'Saving accounts', 'Checking account']}

# Language selector in sidebar
with st.sidebar:
    language = st.selectbox(translations['en']['language'], options=['en', 'da'], format_func=lambda x: 'English' if x == 'en' else 'Dansk')

# Get current language translations
t = translations[language]

st.title(t['title'])
st.write(t['description'])

age = st.number_input(t['age'], min_value=18, max_value=80, value=30)
sex = st.selectbox(t['sex'], options=t['sex_options'])
job = st.number_input(t['job'], min_value=0, max_value=3, value=1)
st.caption(t['job_help'])
housing = st.selectbox(t['housing'], options=t['housing_options'])
st.caption(t['housing_help'])
saving_accounts = st.selectbox(t['saving_accounts'], options=t['saving_options'])
st.caption(t['saving_help'])
checking_account = st.selectbox(t['checking_account'], options=t['checking_options'])
st.caption(t['checking_help'])
credit_amount = st.number_input(t['credit_amount'], min_value=0, value=1000)
duration = st.number_input(t['duration'], min_value=1, value=12)

input_df = pd.DataFrame({
    'Age': [age],
    'Sex': [encoders['Sex'].transform([option_mappings['sex'][sex]])[0]],
    'Job': [job],
    'Housing': [encoders['Housing'].transform([option_mappings['housing'][housing]])[0]],
    'Saving accounts': [encoders['Saving accounts'].transform([option_mappings['saving_accounts'][saving_accounts]])[0]],
    'Checking account': [encoders['Checking account'].transform([option_mappings['checking_account'][checking_account]])[0]],
    'Credit amount': [credit_amount],
    'Duration': [duration]
})

if st.button(t['predict_button']):
    pred = model.predict(input_df)[0]

    if pred == 1:
        st.success(t['good_risk'])
    else:
        st.error(t['bad_risk'])