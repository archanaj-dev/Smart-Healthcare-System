import { useEffect, useState } from "react";

function PrescriptionHistory() {

  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/prescription/list"
      );

      const data = await response.json();

      setPrescriptions(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

<div className="prescription-container">

    <h1 className="prescription-title">
        💊 Prescription History
    </h1>

    <div className="prescription-grid">

        {prescriptions.length > 0 ? (

            prescriptions.map((item)=>(

                <div className="prescription-card" key={item.id}>

                    <h3>💊 Prescription</h3>

                    <p><span>Patient :</span> {item.patient_name}</p>

                    <p><span>Doctor :</span> {item.doctor}</p>

                    <p><span>Medicine :</span> {item.medicine}</p>

                    <p><span>Morning :</span> {item.morning}</p>

                    <p><span>Afternoon :</span> {item.afternoon}</p>

                    <p><span>Night :</span> {item.night}</p>

                    <p><span>Days :</span> {item.days}</p>

                    <p><span>Notes :</span> {item.notes}</p>

                </div>

            ))

        ) : (

            <h2>No Prescriptions Found</h2>

        )}

    </div>

</div>

);

}

export default PrescriptionHistory;