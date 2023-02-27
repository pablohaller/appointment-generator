// @ts-nocheck
import React from "react";
import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Input,
  Radio,
  Text,
} from "@mantine/core";
import { DefaultFormField } from "../../interfaces/misc";
import { VehicleRow } from "../../interfaces/vehicle";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { defaultVehicleRow } from "../../App";

interface Props {
  vehicles: VehicleRow<DefaultFormField>[];
  setVehicles: (vehicles: VehicleRow<DefaultFormField>[]) => void;
  rowsCounter: number;
  setRowsCounter: (rowCounter: number) => void;
  additionalCells: string;
  setAdditionalCells: (value: string) => void;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
}

const VehiclesTable = ({
  vehicles,
  setVehicles,
  rowsCounter,
  setRowsCounter,
  showDetails,
  setShowDetails,
  additionalCells,
  setAdditionalCells,
}: Props) => {
  const handleVehicleForm = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetRowId: number
  ) => {
    e?.preventDefault();
    setVehicles(
      vehicles?.map(vehicle => {
        if (vehicle?.rowId !== targetRowId) return vehicle;
        return {
          ...vehicle,
          [e?.target?.id as keyof VehicleRow<DefaultFormField>]: {
            ...vehicle[e?.target?.id as keyof VehicleRow<DefaultFormField>],
            value: e?.target?.value,
          },
        };
      })
    );
  };

  const removeVehicle = (
    e: React.MouseEvent<HTMLButtonElement>,
    targetRowId: number
  ) => {
    e?.preventDefault();
    setVehicles(vehicles?.filter(({ rowId }) => rowId !== targetRowId));
  };

  const addNewVehicle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    const rowId = rowsCounter + 1;
    setVehicles([...vehicles, { ...defaultVehicleRow, rowId }]);
    setRowsCounter(rowId);
  };

  return (
    <>
      <Radio.Group
        value={additionalCells}
        onChange={setAdditionalCells}
        name="additonalCells"
        label="Celdas adicionales"
        spacing="xl"
        size="xl"
        withAsterisk
      >
        <div className="additional-cells">
          <Radio className="additional-cell" value="plate" label="Patente" />
          <Radio className="additional-cell" value="chassis" label="Chasis" />
          <Radio
            className="additional-cell"
            value="plate-chassis"
            label="Patente y chasis"
          />
          <Divider my="sm" variant="dashed" orientation="vertical" />
          <Checkbox
            className="additional-cell"
            size="xl"
            label="Mostrar detalle"
            checked={showDetails}
            onChange={event => setShowDetails(event.currentTarget.checked)}
          />
        </div>
      </Radio.Group>
      <div id="vehicles" className="vehicle-container">
        <div className="vehicle-fields">
          {(additionalCells === "plate-chassis" ||
            additionalCells === "plate") && (
            <Text className="vehicle-fields__cell" size="md">
              Patente
            </Text>
          )}
          {(additionalCells === "plate-chassis" ||
            additionalCells === "chassis") && (
            <Text className="vehicle-fields__cell" size="md">
              Chasis
            </Text>
          )}
          <Text className="vehicle-fields__cell" size="md">
            Marca
          </Text>
          <Text className="vehicle-fields__cell" size="md">
            Modelo
          </Text>
          <Text className="vehicle-fields__cell" size="md">
            Año
          </Text>
          {showDetails && (
            <Text className="vehicle-fields__cell" size="md">
              Detalle
            </Text>
          )}
          <Text
            className="vehicle-fields__cell--option"
            align="right"
            size="md"
          >
            <ActionIcon color="red" disabled>
              <IconTrash />
            </ActionIcon>
          </Text>
        </div>
        <Divider my="sm" variant="dashed" />
        {vehicles?.map(
          ({ rowId, label, plate, chassis, brand, model, year, detail }) => (
            <div
              key={`vehicle-form-row-${rowId}`}
              className="vehicle-fields--form"
            >
              {(additionalCells === "plate-chassis" ||
                additionalCells === "plate") && (
                <Input
                  className="vehicle-fields__cell--form"
                  size="md"
                  id="plate"
                  placeholder={label}
                  value={plate?.value}
                  onChange={(e: any) => handleVehicleForm(e, rowId)}
                />
              )}
              {(additionalCells === "plate-chassis" ||
                additionalCells === "chassis") && (
                <Input
                  className="vehicle-fields__cell--form"
                  size="md"
                  id="chassis"
                  value={chassis?.value}
                  placeholder={label}
                  onChange={(e: any) => handleVehicleForm(e, rowId)}
                />
              )}
              <Input
                className="vehicle-fields__cell--form"
                size="md"
                id="brand"
                placeholder={label}
                value={brand?.value}
                onChange={(e: any) => handleVehicleForm(e, rowId)}
              />
              <Input
                className="vehicle-fields__cell--form"
                size="md"
                id="model"
                placeholder={label}
                value={model?.value}
                onChange={(e: any) => handleVehicleForm(e, rowId)}
              />
              <Input
                className="vehicle-fields__cell--form"
                size="md"
                id="year"
                placeholder={label}
                value={year?.value}
                onChange={(e: any) => handleVehicleForm(e, rowId)}
              />
              {showDetails && (
                <Input
                  className="vehicle-fields__cell--form"
                  size="md"
                  id="detail"
                  placeholder={label}
                  value={detail?.value}
                  onChange={(e: any) => handleVehicleForm(e, rowId)}
                />
              )}
              <Text
                className="vehicle-fields__cell--option"
                align="right"
                size="md"
              >
                <ActionIcon
                  variant="filled"
                  color="red"
                  onClick={(e: any) => removeVehicle(e, rowId)}
                >
                  <IconTrash />
                </ActionIcon>
              </Text>
            </div>
          )
        )}
        <div className="add-vehicle-section">
          <Button leftIcon={<IconPlus />} size="md" onClick={addNewVehicle}>
            Agregar vehículo
          </Button>
        </div>
      </div>
    </>
  );
};

export default VehiclesTable;
