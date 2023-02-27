import React from "react";
import { GeneralData } from "../../interfaces/generalData";
import { DefaultFormField } from "../../interfaces/misc";
import { VehicleRow } from "../../interfaces/vehicle";

interface Props {
  form: GeneralData<DefaultFormField>;
  vehicles: VehicleRow<DefaultFormField>[];
}

const AppointmentPreview = ({ form, vehicles }: Props) => {
  return <div>AppointmentPreview</div>;
};

export default AppointmentPreview;
