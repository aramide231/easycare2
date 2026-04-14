import { useState } from "react";
import { useMedicalTable } from "../../../hooks/useMedicalTable";

export default function NewAntenatalBooking() {
  const [antenatalForm, setAntenatalForm] = useState<Record<string, string>>(
    {},
  );

  const antenatalFields = [
    { name: "bloodGroup", label: "Blood Group" },
    { name: "genotype", label: "Genotype" },
    { name: "anyDischarge", label: "Any Discharge?" },
    { name: "highRiskPregnancy", label: "High Risk Pregnancy?" },
    {
      name: "lastMenstrualPeriod",
      label: "Last Menstrual Period",
      type: "date",
    },
    { name: "estimatedGestationalAge", label: "Estimated Gestational Age" },
    {
      name: "expectedDeliveryDate",
      label: "Expected Date of Delivery",
      type: "date",
    },
    {
      name: "nextAppointmentDate",
      label: "Next Appointment Date",
      type: "date",
    },
  ];

  const {
    history: antenatalBookings,
    save: saveAntenatal,
    remove: deleteAntenatal
  } = useMedicalTable("NEW ANTENATAL BOOKING");

  return (
    <div className="p-4 bg-gray-50 rounded-b text-sm">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {antenatalFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>

            {field.type === "date" ? (
              <input
                type="date"
                value={antenatalForm[field.name] || ""}
                onChange={(e) =>
                  setAntenatalForm({
                    ...antenatalForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            ) : (
              <input
                type="text"
                value={antenatalForm[field.name] || ""}
                onChange={(e) =>
                  setAntenatalForm({
                    ...antenatalForm,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full border rounded p-2 text-sm"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={saveAntenatal}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {/* TABLE */}
      {antenatalBookings.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <h4 className="font-semibold mb-2">NEW ANTENATAL BOOKING</h4>

          <table className="min-w-max text-sm text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th>S/N</th>
                <th>Date | Time</th>
                <th>Patient Type</th>
                <th>Blood Group</th>
                <th>Genotype</th>
                <th>Any Discharge</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {antenatalBookings.map((row, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td>{row.sn}</td>
                  <td>{row.dateTime}</td>
                  <td>{row.patientType}</td>
                  <td>{row.bloodGroup}</td>
                  <td>{row.genotype}</td>
                  <td>{row.anyDischarge}</td>
                  <td>
                    <button
                      onClick={() => deleteAntenatal(index)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded"
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
