import { useState } from "react";
import { Button, Modal, Title } from "@mantine/core";
import { GeneralData } from "../../interfaces/generalData";
import { DefaultFormField } from "../../interfaces/misc";
import { VehicleRow } from "../../interfaces/vehicle";
import { copyToClip } from "../../utils/misc";
import { toast } from "react-toastify";
import { blackBorder, topTableCell } from "../../utils/inlineStyles";
import { vehicleHeaders } from "../../constants/vehicle";

interface Props {
  form: GeneralData<DefaultFormField>;
  vehicles: VehicleRow<DefaultFormField>[];
  additionalCells: string;
  showDetails: boolean;
  formData: any;
}

const AppointmentPreview = ({
  form,
  vehicles,
  additionalCells,
  showDetails,
  formData,
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

  return (
    <>
      <Button
        className="generate-button"
        onClick={handleShowAppointmentPreview}
        size="lg"
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
          size="lg"
          title={<Title order={3}>Previsualizar agendamiento</Title>}
          opened
        >
          <div id="agendamiento">
            <div className="top-table">
              <table
                style={{
                  width: "100%",
                  ...blackBorder,
                  borderCollapse: "collapse",
                }}
                cellSpacing="0"
                cellPadding="0"
              >
                <tbody>
                  {formData?.map(([key, { label, value }]: any) => (
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
                        }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bottom-table" style={{ marginTop: "1rem" }}>
              <table
                style={{
                  width: "100%",
                  ...blackBorder,
                  border: "none",
                  tableLayout: "auto",
                  borderCollapse: "collapse",
                }}
                cellSpacing="0"
                cellPadding="0"
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
          </div>
          <Button className="copy-button" onClick={copy} size="lg" fullWidth>
            Copiar
          </Button>
        </Modal>
      )}
    </>
  );
};

export default AppointmentPreview;
