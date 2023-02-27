import { useState } from "react";
import ImportVehiclesFromClipboard from "../ImportVehiclesFromClipboard/ImportVehiclesFromClipboard";
import SectionTitle from "../SectionTitle/SectionTitle";
import VehiclesTable from "../VehiclesTable/VehiclesTable";
import { VehicleRow } from "../../interfaces/vehicle";
import { DefaultFormField } from "../../interfaces/misc";
import { Divider } from "@mantine/core";

interface Props {
  vehicles: VehicleRow<DefaultFormField>[];
  setVehicles: (vehicles: VehicleRow<DefaultFormField>[]) => void;
}

const Vehicles = ({ vehicles, setVehicles }: Props) => {
  const [rowsCounter, setRowsCounter] = useState(1);
  const populateTable = (
    newVehicles: VehicleRow<DefaultFormField>[],
    newRowsCounter: number
  ) => {
    setVehicles([...vehicles, ...newVehicles]);
    setRowsCounter(newRowsCounter);
  };

  return (
    <div>
      <div className="vehicle-headers">
        <SectionTitle label="Vehículos" hideDivider />
        <ImportVehiclesFromClipboard
          populateTable={populateTable}
          rowsCounter={rowsCounter}
        />
      </div>
      <Divider my="sm" variant="dashed" />
      <VehiclesTable
        vehicles={vehicles}
        setVehicles={setVehicles}
        rowsCounter={rowsCounter}
        setRowsCounter={setRowsCounter}
      />
    </div>
  );
};

export default Vehicles;
