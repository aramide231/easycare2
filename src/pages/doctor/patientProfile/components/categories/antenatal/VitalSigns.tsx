import CategoryForm from "./CategoryForm";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function VitalSigns() {
  // const [vitalHistory, setVitalHistory] = useState<any[]>([]);
  const vitalFields = [
    { name: "temperature", label: "Temperature (°C)" },
    { name: "bloodPressure", label: "Blood Pressure (mmHg)" },
    { name: "weight", label: "Weight (kg)" },
    { name: "height", label: "Height (cm)" },
    { name: "bloodSugar", label: "Blood Sugar" },
    { name: "pulseRate", label: "Pulse Rate" },
    { name: "respiration", label: "Respiration (Bpm)" },
    { name: "bmi", label: "Body Mass Index (BMI)" },
    { name: "urinalysis", label: "Urinalysis" },
    { name: "spo2", label: "SpO₂" },
    { name: "fhr", label: "Fetal Heart Rate (FHR)" },
    { name: "comment", label: "Comments", type: "textarea" },
  ];

   const {
    history: vitalHistory,
    save: saveVital,
    remove: deleteVital
  } = useMedicalTable("VITAL SIGNS");

  return (
    <div>
      <CategoryForm fields={vitalFields} onSave={saveVital} />
      {vitalHistory.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date & Time</th>
                <th>Temp</th>
                <th>B.P</th>
                <th>Weight</th>
                <th>Height</th>
                <th>Pulse</th>
                <th>Resp</th>
                <th>BMI</th>
                <th>URINALYSIS</th>
                <th>
                  SPO<sub>2</sub>
                </th>
                <th>FHR</th>
                <th>COMMMENT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {vitalHistory.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.temperature}</td>
                  <td>{row.bloodPressure}</td>
                  <td>{row.weight}</td>
                  <td>{row.height}</td>
                  <td>{row.pulseRate}</td>
                  <td>{row.respiration}</td>
                  <td>{row.bmi}</td>
                  <td>{row.spo2}</td>
                  <td>{row.fhr}</td>
                  <td>{row.comment}</td>
                  <td>
                    <button
                      onClick={() => deleteVital(index)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
