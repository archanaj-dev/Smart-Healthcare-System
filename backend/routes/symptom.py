from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/symptom",
    tags=["AI Symptom Checker"]
)

class Symptom(BaseModel):
    symptom: str

@router.post("/predict")
def predict(data: Symptom):

    if data.symptom == "Fever":
        return {
            "disease": "Viral Fever",
            "doctor": "General Physician",
            "severity": "Medium",
            "advice": "Drink plenty of water and take rest."
        }

    elif data.symptom == "Headache":
        return {
            "disease": "Migraine",
            "doctor": "Neurologist",
            "severity": "Low",
            "advice": "Avoid stress and get enough sleep."
        }

    elif data.symptom == "Cough":
        return {
            "disease": "Common Cold",
            "doctor": "ENT Specialist",
            "severity": "Low",
            "advice": "Drink warm water."
        }

    elif data.symptom == "Chest Pain":
        return {
            "disease": "Possible Heart Disease",
            "doctor": "Cardiologist",
            "severity": "High",
            "advice": "Visit the nearest hospital immediately."
        }

    elif data.symptom == "Skin Rash":
        return {
            "disease": "Skin Allergy",
            "doctor": "Dermatologist",
            "severity": "Medium",
            "advice": "Consult a dermatologist."
        }

    return {
        "disease": "Unknown",
        "doctor": "General Physician",
        "severity": "Low",
        "advice": "Consult a doctor."
    }