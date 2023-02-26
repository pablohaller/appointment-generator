import { useState } from "react";
import ImportVehiclesFromClipboard from "../ImportVehiclesFromClipboard/ImportVehiclesFromClipboard";
import SectionTitle from "../SectionTitle/SectionTitle";

const Vehicles = () => {
  const populateTable = () => {
    // TODO: Implement populateTable
    console.log("Populate");
  };

  return (
    <div>
      <div className="vehicle-headers">
        <SectionTitle label="Vehículos" hideDivider />
        <ImportVehiclesFromClipboard populateTable={populateTable} />
      </div>
    </div>
  );
};

export default Vehicles;
