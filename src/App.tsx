import React, { useState, useMemo } from "react";
import "./App.css";
import GeneralData from "./components/GeneralData/GeneralData";
import Vehicles from "./components/Vehicles/Vehicles";
import { GeneralData as IGeneralData } from "./interfaces/generalData";
import { DefaultFormField } from "./interfaces/misc";

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

function App() {
  const [form, setForm] = useState<IGeneralData<DefaultFormField>>(defaultForm);
  const formData = useMemo(
    () => Object?.entries(form)?.map(entry => entry),
    [form]
  );
  return (
    <div className="App">
      <div className="title">Generador Agendamientos</div>
      <GeneralData form={form} setForm={setForm} formData={formData} />
      <Vehicles />
    </div>
  );
}

export default App;
