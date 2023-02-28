import { useState } from "react";
import {
  Button,
  Divider,
  Modal,
  Select,
  Switch,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconCloudUpload } from "@tabler/icons-react";
import styles from "./ImportVehiclesFromClipboard.module.css";
import { VehicleRow } from "../../interfaces/vehicle";
import { DefaultFormField } from "../../interfaces/misc";
import { defaultVehicleRow } from "../../App";

interface Props {
  populateTable: (
    newVehicles: VehicleRow<DefaultFormField>[],
    newRowsCounter: number
  ) => void;
  rowsCounter: number;
}

const ImportVehiclesFromClipboard = ({ populateTable, rowsCounter }: Props) => {
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const [isFirstRowHeader, setIsFirstRowHeader] = useState<boolean>(false);
  const [importData, setImportData] = useState<string[]>([]);
  const [importDataHeaders, setImportDataHeaders] = useState<(string | null)[]>(
    []
  );
  const disableImport = navigator.userAgent.indexOf("Firefox") !== -1;

  if (disableImport) {
    return (
      <Tooltip label="Opción no disponible con Firefox">
        <Button
          data-disabled
          className="import-from-clipboard"
          leftIcon={<IconCloudUpload />}
          sx={{ "&[data-disabled]": { pointerEvents: "all" } }}
        >
          Importar
        </Button>
      </Tooltip>
    );
  }

  const handleShowImportModal = (
    e?: React.MouseEvent<HTMLButtonElement> | undefined
  ) => {
    e?.preventDefault();
    if (!showImportModal) {
      navigator.clipboard.readText().then(clipText => {
        const data = clipText
          ?.split("\n")
          ?.filter((row: string) => row.trim() !== "");
        setImportData(data);
        setImportDataHeaders(Array(data[0].split("\t")?.length).fill(null));
      });
    } else {
      setImportData([]);
      setImportDataHeaders([]);
      setIsFirstRowHeader(false);
    }
    setShowImportModal(!showImportModal);
  };

  const handleImportDataHeaders = (e: string, targetIndex: number) => {
    setImportDataHeaders(
      importDataHeaders?.map((identifier, index) =>
        index !== targetIndex ? identifier : e
      )
    );
  };

  const onClick = () => {
    let currentVehicleRowIndex = rowsCounter;
    let newVehicles: VehicleRow<DefaultFormField>[] = [];

    importData.forEach((data, index) => {
      if ((isFirstRowHeader && index !== 0) || !isFirstRowHeader) {
        currentVehicleRowIndex += 1;
        const cells = data?.split("\t");
        newVehicles.push({
          ...defaultVehicleRow,
          rowId: currentVehicleRowIndex,
          plate: {
            ...defaultVehicleRow.plate,
            value: cells[importDataHeaders?.indexOf("plate")] || "",
          },
          chassis: {
            ...defaultVehicleRow.chassis,
            value: cells[importDataHeaders?.indexOf("chassis")] || "",
          },
          model: {
            ...defaultVehicleRow.model,
            value: cells[importDataHeaders?.indexOf("model")] || "",
          },
          brand: {
            ...defaultVehicleRow.brand,
            value: cells[importDataHeaders?.indexOf("brand")] || "",
          },
          year: {
            ...defaultVehicleRow.year,
            value: cells[importDataHeaders?.indexOf("year")] || "",
          },
        });
      }
    });

    populateTable(newVehicles, currentVehicleRowIndex);
    handleShowImportModal();
  };

  return (
    <>
      <Button
        className="import-from-clipboard"
        leftIcon={<IconCloudUpload />}
        onClick={handleShowImportModal}
      >
        Importar
      </Button>
      {showImportModal && (
        <Modal
          overlayColor="#000000"
          overlayOpacity={0.55}
          overlayBlur={3}
          onClose={() => {
            handleShowImportModal();
          }}
          size="lg"
          title={<Title order={3}>Importar</Title>}
          opened
        >
          <Text c="dimmed">Opciones de formato</Text>
          <Divider my="sm" variant="dashed" />
          <Switch
            label="Primera fila es cabezal"
            className="additional-cell"
            offLabel="NO"
            onLabel="SI"
            checked={isFirstRowHeader}
            size="lg"
            description="Si el botón se encuentra en sí, no tomará la primera fila como parte de los datos"
            onChange={event => setIsFirstRowHeader(event.currentTarget.checked)}
          />
          <Text c="dimmed" className="form-section">
            Seleccione las columnas correspondientes a cada categoría (patente,
            chasis, marca, modelo, año):
          </Text>
          <Divider my="sm" variant="dashed" />
          <div className="import-container">
            <table
              className={styles.populateTableCell}
              cellSpacing="0"
              cellPadding="0"
            >
              <tbody>
                <tr className={styles.firstPopulateTableCell}>
                  {importData[0]?.split("\t")?.map((cell, index) => (
                    <td
                      key={`category-select-${index}`}
                      className={styles.firstPopulateTableCell}
                    >
                      <Select
                        value={importDataHeaders[index]}
                        onChange={(e: string) =>
                          handleImportDataHeaders(e, index)
                        }
                        data={[
                          { value: "plate", label: "Patente" },
                          { value: "chassis", label: "Chasis" },
                          { value: "brand", label: "Marca" },
                          { value: "model", label: "Modelo" },
                          { value: "year", label: "Año" },
                        ]}
                      />
                    </td>
                  ))}
                </tr>
                {importData?.map((data, index) => (
                  <tr key={`import-table-row-${index}`}>
                    {data?.split("\t")?.map((cell, cellIndex) => (
                      <td
                        key={`import-table-row-ci-${index}-${cellIndex}`}
                        className={styles.populateTableCell}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button className="copy-button" onClick={onClick} size="lg" fullWidth>
            Popular tabla
          </Button>
        </Modal>
      )}
    </>
  );
};

export default ImportVehiclesFromClipboard;
