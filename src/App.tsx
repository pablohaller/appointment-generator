import React, { useState, useMemo } from "react";
import "./App.css";
import GeneralData from "./components/GeneralData/GeneralData";
import Vehicles from "./components/Vehicles/Vehicles";
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
  dateTime: { ...defaultField, label: "Fecha y hora", mandatory: true },
  location: { ...defaultField, label: "Ubicación", mandatory: true },
  phoneNumber: { ...defaultField, label: "Contacto", mandatory: true },
  client: { ...defaultField, label: "Cliente", mandatory: true },
  email: { ...defaultField, label: "Correo", mandatory: true },
  cak: { ...defaultField, label: "CAK", mandatory: true },
  contract: { ...defaultField, label: "Contrato", mandatory: true },
  detail: { ...defaultField, label: "Detalle", type: "textArea" },
  notes: { ...defaultField, label: "Notas", type: "textArea" },
};

const vehicleHeaders = [
  "Patente",
  "Chasis",
  "Marca",
  "Modelo",
  "Año",
  "Detalle",
];

export const defaultVehicleRow: VehicleRow<DefaultFormField> = {
  rowId: 1,
  plate: { ...defaultField, label: vehicleHeaders[0] },
  chassis: { ...defaultField, label: vehicleHeaders[1] },
  brand: { ...defaultField, label: vehicleHeaders[2] },
  model: { ...defaultField, label: vehicleHeaders[3] },
  year: { ...defaultField, label: vehicleHeaders[4] },
  detail: { ...defaultField, label: vehicleHeaders[5] },
};

function App() {
  const [form, setForm] = useState<IGeneralData<DefaultFormField>>(defaultForm);
  const [vehicles, setVehicles] = useState<VehicleRow<DefaultFormField>[]>([]);

  const formData = useMemo(
    () => Object?.entries(form)?.map(entry => entry),
    [form]
  );

  return (
    <div className="App">
      <div className="title">Generador Agendamientos</div>
      <GeneralData form={form} setForm={setForm} formData={formData} />
      <Vehicles vehicles={vehicles} setVehicles={setVehicles} />
    </div>
  );
}

export default App;
