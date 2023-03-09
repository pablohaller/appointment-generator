import { useState } from "react";
import uuid from "react-uuid";
import * as htmlToImage from "html-to-image";
import { Button, Modal, Title } from "@mantine/core";
import { GeneralData } from "../../interfaces/generalData";
import { DefaultFormField } from "../../interfaces/misc";
import { VehicleRow } from "../../interfaces/vehicle";
import { copyToClip } from "../../utils/misc";
import { toast } from "react-toastify";
import { blackBorder, topTableCell } from "../../utils/inlineStyles";
import { vehicleHeaders } from "../../constants/vehicle";
import {
  IconCheck,
  IconCopy,
  IconPhoto,
  IconPhotoDown,
} from "@tabler/icons-react";

const previewHiddenValues = [
  "title",
  "contract",
  "cak",
  "notes",
  "fee",
  "features",
];
const lastTableValues = previewHiddenValues.slice(
  1,
  previewHiddenValues.length
);

interface Props {
  form: GeneralData<DefaultFormField>;
  vehicles: VehicleRow<DefaultFormField>[];
  additionalCells: string;
  showDetails: boolean;
  formData: any;
  tableWidth: string;
}

const AppointmentPreview = ({
  form,
  vehicles,
  additionalCells,
  showDetails,
  formData,
  tableWidth,
}: Props) => {
  const [showAppointmentPreview, setShowAppointmentPreview] =
    useState<boolean>(false);
  const handleShowAppointmentPreview = (
    e?: React.MouseEvent<HTMLButtonElement> | undefined
  ) => {
    e?.preventDefault();
    setShowAppointmentPreview(!showAppointmentPreview);
  };

  const copy = (e: any) => {
    e?.preventDefault();
    copyToClip(document?.getElementById("agendamiento")?.innerHTML);
    toast.success("¡Agendamiento copiado!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const copyAsImage = async (e: any) => {
    e?.preventDefault();
    const doc = document?.getElementById("agendamiento") || new HTMLElement();
    const dataURL = (await htmlToImage.toBlob(doc)) || new Blob();
    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": dataURL,
      }),
    ]);
    // const link = document.createElement("a");
    // link.download = `${uuid()}.png`;
    // link.href = dataURL;
    // link.click();

    toast.success("¡Agendamiento copiado como imagen!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const downloadAsImage = async (e: any) => {
    e?.preventDefault();
    const doc = document?.getElementById("agendamiento") || new HTMLElement();
    const dataURL = await htmlToImage.toPng(doc);

    const link = document.createElement("a");
    link.download = `${uuid()}.png`;
    link.href = dataURL;
    link.click();

    toast.success("¡Agendamiento descargado!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <Button
        className="generate-button"
        onClick={handleShowAppointmentPreview}
        size="lg"
        leftIcon={<IconCheck />}
        fullWidth
      >
        Generar
      </Button>
      {showAppointmentPreview && (
        <Modal
          overlayColor="#000000"
          overlayOpacity={0.55}
          overlayBlur={3}
          onClose={() => {
            handleShowAppointmentPreview();
          }}
          size="auto"
          title={<Title order={3}>Previsualizar agendamiento</Title>}
          opened
        >
          <div id="agendamiento" style={{ backgroundColor: "white" }}>
            <div className="title-section">{form?.title?.value}</div>
            <br />
            <div className="top-table">
              <table
                style={{
                  width: tableWidth,
                  ...blackBorder,
                  borderCollapse: "collapse",
                }}
                cellSpacing="0"
                cellPadding="0"
                width={tableWidth}
              >
                <tbody>
                  {formData
                    ?.filter(
                      ([key]: [string]) => !previewHiddenValues?.includes(key)
                    )
                    ?.map(
                      ([key, { label, value }]: [string, DefaultFormField]) => (
                        <tr key={`top-table-${key}`}>
                          <td
                            style={{
                              ...topTableCell,
                              width: "30%",
                              borderCollapse: "collapse",
                            }}
                          >
                            {label}
                          </td>
                          <td
                            style={{
                              ...topTableCell,
                              width: "70%",
                              borderCollapse: "collapse",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {value}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
            <br />
            <div className="bottom-table">
              <table
                style={{
                  width: tableWidth,
                  ...blackBorder,
                  border: "none",
                  tableLayout: "auto",
                  borderCollapse: "collapse",
                }}
                cellSpacing="0"
                cellPadding="0"
                width={tableWidth}
              >
                <thead>
                  <tr>
                    {vehicleHeaders
                      ?.filter(
                        header =>
                          !(
                            (additionalCells === "plate" &&
                              header === "Chasis") ||
                            (additionalCells === "chassis" &&
                              header === "Patente") ||
                            (!showDetails && header === "Detalle")
                          )
                      )
                      ?.map((header, index) => (
                        <td
                          key={`vehicleHeaders-${header}-${index}`}
                          style={{
                            ...topTableCell,
                            border: "none",
                            fontWeight: 700,
                            backgroundColor: "#fc0606",
                            color: "white",
                            borderCollapse: "collapse",
                          }}
                        >
                          {header}
                        </td>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {vehicles?.map(
                    (
                      { rowId, plate, chassis, brand, model, year, detail },
                      index
                    ) => (
                      <tr
                        key={`generated-vehicle-table-row-${rowId}`}
                        style={{
                          backgroundColor: index % 2 === 0 ? "#E7E9EB" : "",
                          borderCollapse: "collapse",
                        }}
                      >
                        {(additionalCells === "plate" ||
                          additionalCells === "plate-chassis") && (
                          <td
                            style={{
                              ...topTableCell,
                              borderCollapse: "collapse",
                            }}
                          >
                            {plate?.value}
                          </td>
                        )}
                        {(additionalCells === "chassis" ||
                          additionalCells === "plate-chassis") && (
                          <td
                            style={{
                              ...topTableCell,
                              borderCollapse: "collapse",
                            }}
                          >
                            {chassis?.value}
                          </td>
                        )}
                        <td
                          style={{
                            ...topTableCell,
                            borderCollapse: "collapse",
                          }}
                        >
                          {brand?.value}
                        </td>
                        <td
                          style={{
                            ...topTableCell,
                            borderCollapse: "collapse",
                          }}
                        >
                          {model?.value}
                        </td>
                        <td
                          style={{
                            ...topTableCell,
                            borderCollapse: "collapse",
                          }}
                        >
                          {year?.value}
                        </td>
                        {showDetails && (
                          <td
                            style={{
                              ...topTableCell,
                              borderCollapse: "collapse",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {detail?.value}
                          </td>
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <br />
            <div className="last-table">
              <table
                style={{
                  width: tableWidth,
                  ...blackBorder,
                  borderCollapse: "collapse",
                }}
                cellSpacing="0"
                cellPadding="0"
                width={tableWidth}
              >
                <tbody>
                  {formData
                    ?.filter(([key]: [string]) =>
                      lastTableValues?.includes(key)
                    )
                    ?.map(
                      ([key, { label, value }]: [string, DefaultFormField]) => (
                        <tr key={`top-table-${key}`}>
                          <td
                            style={{
                              ...topTableCell,
                              width: "30%",
                              borderCollapse: "collapse",
                            }}
                          >
                            {label}
                          </td>
                          <td
                            style={{
                              ...topTableCell,
                              width: "70%",
                              borderCollapse: "collapse",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {value}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>

          <Button
            leftIcon={<IconCopy />}
            className="copy-button"
            onClick={copy}
            size="lg"
            fullWidth
          >
            Copiar
          </Button>
          <div className="generate-options">
            <Button
              leftIcon={<IconPhoto />}
              className="copy-as-image"
              onClick={copyAsImage}
              size="sm"
              variant="subtle"
              fullWidth
            >
              Copiar como imagen
            </Button>
            <Button
              leftIcon={<IconPhotoDown />}
              className="download-image"
              onClick={downloadAsImage}
              size="sm"
              variant="subtle"
              fullWidth
            >
              Descargar como imagen
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AppointmentPreview;
