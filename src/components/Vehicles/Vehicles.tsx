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
      <Divider my="sm" variant="dashed" />
      <VehiclesTable vehicles={vehicles} setVehicles={setVehicles} />
    </div>
  );
};

export default Vehicles;
