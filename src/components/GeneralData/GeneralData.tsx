import { Input, Textarea } from "@mantine/core";
import { GeneralData as IGeneralData } from "../../interfaces/generalData";
import { DefaultFormField } from "../../interfaces/misc";
import SectionTitle from "../SectionTitle/SectionTitle";

interface Props {
  form: IGeneralData<DefaultFormField>;
  setForm: (value: IGeneralData<DefaultFormField>) => void;
  formData: any;
}

const GeneralData = ({ form, setForm, formData }: Props) => {
  const handleForm = (e: any) => {
    e?.preventDefault();
    setForm({
      ...form,
      [e.target.id]: {
        ...form[e.target.id as keyof IGeneralData<string>],
        value: e.target.value,
        errorMessage: "",
      },
    });
  };

  return (
    <>
      <SectionTitle label="Agendamiento" />
      <div id="form" className="form-grid">
        {formData?.map(
          ([key, { label, type, errorMessage, mandatory }]: any) => (
            <Input.Wrapper
              className="form-field"
              key={`inputWrapper-${key}`}
              id={key}
              label={label}
              size="xl"
              error={errorMessage}
              withAsterisk={mandatory}
            >
              {type === "text" ? (
                <Input
                  id={key}
                  placeholder={label}
                  onChange={handleForm}
                  invalid={errorMessage !== ""}
                />
              ) : (
                <Textarea
                  id={key}
                  placeholder={label}
                  onChange={handleForm}
                  error={errorMessage}
                />
              )}
            </Input.Wrapper>
          )
        )}
      </div>
    </>
  );
};

export default GeneralData;
