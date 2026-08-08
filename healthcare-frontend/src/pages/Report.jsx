import { useEffect, useState } from "react";
import "./Report.css";

function Report() {

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8001/report/list"
      );

      const data = await response.json();

      if (response.ok) {
        setReports(data);
      } else {
        setMessage("❌ Failed to load reports");
      }

    } catch (error) {

      console.log(error);
      setMessage("❌ Backend Server Error");

    }

  };

  const deleteReport = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `http://127.0.0.1:8001/report/delete/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("✅ Report Deleted Successfully");

        loadReports();

      } else {

        alert("❌ " + data.detail);

      }

    } catch (error) {

      console.log(error);

      alert("❌ Backend Server Error");

    }

  };

  const filteredReports = reports.filter((report) =>

    String(report.patient_name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    String(report.doctor_name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    String(report.diagnosis || "")
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div className="report-page">

      <div className="report-card">

        <h1>📄 Medical Reports</h1>

        <p>
          View and manage patient medical reports
        </p>

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search Patient / Doctor / Diagnosis"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {message && (
          <p className="message">
            {message}
          </p>
        )}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Patient</th>
                <th>Doctor</th>
                <th>Diagnosis</th>
                <th>Findings</th>
                <th>Treatment</th>
                <th>Medicines</th>
                <th>Notes</th>
                <th>Date</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredReports.length > 0 ? (

                filteredReports.map((report) => (

                  <tr key={report.id}>

                    <td>
                      {report.patient_name}
                    </td>

                    <td>
                      {report.doctor_name}
                    </td>

                    <td>
                      {report.diagnosis}
                    </td>

                    <td>
                      {report.findings}
                    </td>

                    <td>
                      {report.treatment}
                    </td>

                    <td>
                      {report.medicines}
                    </td>

                    <td>
                      {report.notes}
                    </td>

                    <td>
                      {report.report_date}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteReport(report.id)
                        }
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "25px"
                    }}
                  >
                    No Medical Reports Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Report;