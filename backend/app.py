# from flask import Flask, render_template, request, jsonify
# import pickle
# import pandas as pd
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "*"}})


# # Load the trained model
# with open('last_model.pkl', 'rb') as file:
#     model = pickle.load(file)

# threshold = 0.5

# @app.route('/')
# def home():
#     return render_template('InputForm.js')

# @app.route('/predict', methods=['POST'])
# def predict():
#     print("Route is been called...")
#     data = request.json

#     if not data:
#         return jsonify({"status":"failed-please send some data.."})

#     sex = int(data.get('sex', "0") or "0")
#     age = int(data.get('age', "23") or "23")
#     currentSmoker = int(data.get('currentSmoker', "0") or "0")
#     cigsPerDay = int(data.get('cigsPerDay', "25") or "25")
#     BPMeds = int(data.get('BPMeds', "0") or "0")
#     prevalentStroke = int(data.get('prevalentStroke', "0") or "0")
#     prevalentHyp = int(data.get('prevalentHyp', "1") or "1")
#     diabetes = int(data.get('diabetes', "0") or "0")
#     totChol = float(data.get('totChol', "230") or "230")
#     sysBP = float(data.get('sysBP', "120") or "120")
#     diaBP = float(data.get('diaBP', "88") or "88")
#     BMI = float(data.get('BMI', "24.3") or "24.3")
#     heartRate = float(data.get('heartRate', "99") or "99")
#     glucose = float(data.get('glucose', "120") or "120")

#     input_data = pd.DataFrame([[sex, age, currentSmoker, cigsPerDay, BPMeds, prevalentStroke, prevalentHyp,
#                                 diabetes, totChol, sysBP, diaBP, BMI, heartRate, glucose]],
#                               columns=["sex", "age", "currentSmoker", "cigsPerDay", "BPMeds", "prevalentStroke",
#                                        "prevalentHyp", "diabetes", "totChol", "sysBP", "diaBP", "BMI", "heartRate",
#                                        "glucose"])

#     probability_adjustment = 0

#     if input_data['totChol'].values[0] > 240:
#         probability_adjustment += 0.3
#     elif 200 <= input_data['totChol'].values[0] <= 239:
#         probability_adjustment += 0.2

#     if input_data['glucose'].values[0] > 100:
#         probability_adjustment += 0.2

#     if input_data['sysBP'].values[0] > 190 or input_data['diaBP'].values[0] > 110:
#         probability_adjustment += 0.3
#     elif 120 <= input_data['sysBP'].values[0] <= 190 or 80 <= input_data['diaBP'].values[0] <= 110:
#         probability_adjustment += 0.2

#     max_heart_rate = 220 - input_data['age'].values[0]
#     if input_data['heartRate'].values[0] > max_heart_rate:
#         probability_adjustment += 0.2

#     if input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 10:
#         probability_adjustment += 0.2

#     heart_rate = input_data['heartRate'].values[0]
#     sysBP = input_data['sysBP'].values[0]
#     diaBP = input_data['diaBP'].values[0]

#     if heart_rate < 60 or heart_rate > 100 or sysBP > 140 or diaBP > 90:
#         stress_level = "High"
#     elif heart_rate < 70 or heart_rate > 90 or sysBP < 120 or diaBP < 80:
#         stress_level = "Medium"
#     else:
#         stress_level = "Low"

#     predicted_probabilities = model.predict_proba(input_data)
#     adjusted_probability = predicted_probabilities[:, 1] + probability_adjustment

#     adjusted_probability = min(adjusted_probability, 1.0)

#     risk_level_percentage = adjusted_probability * 100

#     if risk_level_percentage >= 75:
#         result = "High"
#     elif risk_level_percentage >= 50:
#         result = "Medium"
#     else:
#         result = "Low"

#     return jsonify({
#         "risk_level_percentage": risk_level_percentage,
#         "result": result,
#         "stress_level": stress_level
#     })
# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
import pickle
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the trained model
with open('last_model.pkl', 'rb') as file:
    model = pickle.load(file)

threshold = 0.5

@app.route('/predict', methods=['POST'])
def predict():
    print("Route is been called...")
    data = request.json

    if not data:
        return jsonify({"status":"failed-please send some data.."})

    # Parse input data
    sex = int(data.get('sex', "0") or "0")
    age = int(data.get('age', "23") or "23")
    currentSmoker = int(data.get('currentSmoker', "0") or "0")
    cigsPerDay = int(data.get('cigsPerDay', "25") or "25")
    BPMeds = int(data.get('BPMeds', "0") or "0")
    prevalentStroke = int(data.get('prevalentStroke', "0") or "0")
    prevalentHyp = int(data.get('prevalentHyp', "1") or "1")
    diabetes = int(data.get('diabetes', "0") or "0")
    totChol = float(data.get('totChol', "230") or "230")
    sysBP = float(data.get('sysBP', "120") or "120")
    diaBP = float(data.get('diaBP', "88") or "88")
    BMI = float(data.get('BMI', "24.3") or "24.3")
    heartRate = float(data.get('heartRate', "99") or "99")
    glucose = float(data.get('glucose', "120") or "120")

    input_data = pd.DataFrame([[sex, age, currentSmoker, cigsPerDay, BPMeds, prevalentStroke, prevalentHyp,
                                diabetes, totChol, sysBP, diaBP, BMI, heartRate, glucose]],
                              columns=["sex", "age", "currentSmoker", "cigsPerDay", "BPMeds", "prevalentStroke",
                                       "prevalentHyp", "diabetes", "totChol", "sysBP", "diaBP", "BMI", "heartRate",
                                       "glucose"])

    probability_adjustment = 0

    if input_data['totChol'].values[0] > 240:
        probability_adjustment += 0.3
    elif 200 <= input_data['totChol'].values[0] <= 239:
        probability_adjustment += 0.2

    if input_data['glucose'].values[0] > 100:
        probability_adjustment += 0.2

    if input_data['sysBP'].values[0] > 190 or input_data['diaBP'].values[0] > 110:
        probability_adjustment += 0.3
    elif 120 <= input_data['sysBP'].values[0] <= 190 or 80 <= input_data['diaBP'].values[0] <= 110:
        probability_adjustment += 0.2

    max_heart_rate = 220 - input_data['age'].values[0]
    if input_data['heartRate'].values[0] > max_heart_rate:
        probability_adjustment += 0.2

    if input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 1:
        probability_adjustment += 0.036
    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 2:
        probability_adjustment += 0.072
    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 3:
        probability_adjustment += 0.108
    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 4:
        probability_adjustment += 0.144

    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 5:
        probability_adjustment += 0.18

    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 6:
        probability_adjustment += 0.216

    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 7:
        probability_adjustment += 0.252
    
    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 8:
        probability_adjustment += 0.288
    
    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 9:
        probability_adjustment += 0.324

    elif input_data['currentSmoker'].values[0] == 1 and input_data['cigsPerDay'].values[0] > 10:
        probability_adjustment += 0.36

    heart_rate = input_data['heartRate'].values[0]
    sysBP = input_data['sysBP'].values[0]
    diaBP = input_data['diaBP'].values[0]

    if heart_rate < 60 or heart_rate > 100 or sysBP > 140 or diaBP > 90:
        stress_level = "High"
    elif heart_rate < 70 or heart_rate > 90 or sysBP < 120 or diaBP < 80:
        stress_level = "Medium"
    else:
        stress_level = "Low"

    predicted_probabilities = model.predict_proba(input_data)
    adjusted_probability = predicted_probabilities[:, 1] + probability_adjustment

    adjusted_probability = min(adjusted_probability, 1.0)

    risk_level_percentage = adjusted_probability * 100

    if risk_level_percentage >= 75:
        result = "High"
    elif risk_level_percentage >= 50:
        result = "Medium"
    else:
        result = "Low"

    # Convert numpy array to list before returning JSON
    return jsonify({
        "risk_level_percentage": risk_level_percentage.tolist(),
        "result": result,
        "stress_level": stress_level
    })

if __name__ == '__main__':
    app.run(debug=True)
