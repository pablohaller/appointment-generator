import React, { useState, useMemo } from "react";
import "./App.css";
import AppointmentPreview from "./components/AppointmentPreview/AppointmentPreview";
import GeneralData from "./components/GeneralData/GeneralData";
import Vehicles from "./components/Vehicles/Vehicles";
import { vehicleHeaders } from "./constants/vehicle";
import { GeneralData as IGeneralData } from "./interfaces/generalData";
import { DefaultFormField } from "./interfaces/misc";
import { VehicleRow } from "./interfaces/vehicle";

const defaultField = {
  value: "",
  errorMessage: "",
  label: "",
  type: "text",
};

const defaultForm = {
  title: { ...defaultField, label: "Título", mandatory: true },
  dateTime: { ...defaultField, label: "Fecha y hora", mandatory: true },
  location: { ...defaultField, label: "Ubicación", mandatory: true },
  phoneNumber: { ...defaultField, label: "Contacto", mandatory: true },
  client: { ...defaultField, label: "Cliente", mandatory: true },
  email: { ...defaultField, label: "Correo", mandatory: true },
  cak: { ...defaultField, label: "CAK", mandatory: true },
  contract: { ...defaultField, label: "Contrato", mandatory: true },
  fee: { ...defaultField, label: "Tarifa", mandatory: true },
  features: { ...defaultField, label: "Features", type: "textArea" },
  detail: { ...defaultField, label: "Detalle del servicio", type: "textArea" },
  notes: {
    ...defaultField,
    label: "Número de seguimiento (Chilexpress)",
    type: "textArea",
  },
};

export const defaultVehicleRow: VehicleRow<DefaultFormField> = {
  rowId: 1,
  plate: { ...defaultField, label: vehicleHeaders[0] },
  chassis: { ...defaultField, label: vehicleHeaders[1] },
  brand: { ...defaultField, label: vehicleHeaders[2] },
  model: { ...defaultField, label: vehicleHeaders[3] },
  year: { ...defaultField, label: vehicleHeaders[4] },
  detail: { ...defaultField, label: vehicleHeaders[5] },
};

const defaultTableWidth = "577px";

function App() {
  const [form, setForm] = useState<IGeneralData<DefaultFormField>>(defaultForm);
  const [vehicles, setVehicles] = useState<VehicleRow<DefaultFormField>[]>([]);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [additionalCells, setAdditionalCells] = useState<string>("plate");

  // TODO: Add dynamic table width
  const [tableWidth] = useState<string>(defaultTableWidth);

  const formData = useMemo(
    () => Object?.entries(form)?.map(entry => entry),
    [form]
  );

  return (
    <div className="App">
      <div className="title">Generador Agendamientos</div>
      <GeneralData form={form} setForm={setForm} formData={formData} />
      <Vehicles
        vehicles={vehicles}
        setVehicles={setVehicles}
        showDetails={showDetails}
        additionalCells={additionalCells}
        setShowDetails={setShowDetails}
        setAdditionalCells={setAdditionalCells}
      />
      <AppointmentPreview
        form={form}
        vehicles={vehicles}
        showDetails={showDetails}
        additionalCells={additionalCells}
        formData={formData}
        tableWidth={tableWidth}
      />
    </div>
  );
}

export default App;
