import { Input, Textarea } from "@mantine/core";
import { GeneralData as IGeneralData } from "../../interfaces/generalData";
import { DefaultFormField } from "../../interfaces/misc";
import SectionTitle from "../SectionTitle/SectionTitle";

const hiddenFormProps = ["title"];

interface Props {
  form: IGeneralData<DefaultFormField>;
  setForm: (value: IGeneralData<DefaultFormField>) => void;
  formData: any;
}

const GeneralData = ({ form, setForm, formData }: Props) => {
  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      <Input.Wrapper
        className="form-field"
        key="inputWrapper-title"
        id="title"
        label={form?.title?.label}
        size="xl"
        error={form?.title?.errorMessage !== ""}
        withAsterisk
      >
        <Input
          id="title"
          placeholder="Título"
          onChange={handleForm}
          invalid={form?.title?.errorMessage !== ""}
          value={form?.title?.value}
        />
      </Input.Wrapper>
      <div id="form" className="form-grid">
        {formData
          ?.filter(([key]: [string]) => !hiddenFormProps?.includes(key))
          ?.map(
            ([key, { label, type, errorMessage, mandatory, value }]: [
              string,
              DefaultFormField
            ]) => (
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
                    value={value}
                  />
                ) : (
                  <Textarea
                    id={key}
                    placeholder={label}
                    onChange={handleForm}
                    error={errorMessage}
                    value={value}
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
