import { Input, Text, Textarea } from "@mantine/core";
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
        className="form-field title-input"
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
          ?.filter(
            ([key, { type }]: [string, DefaultFormField]) =>
              !hiddenFormProps?.includes(key) && type === "text"
          )
          ?.map(
            ([key, { label, errorMessage, mandatory, value }]: [
              string,
              DefaultFormField
            ]) => (
              <Input.Wrapper
                className="form-field"
                key={`inputWrapper-${key}`}
                id={key}
                label={
                  <Text
                    truncate
                    style={{
                      display: "inline",
                    }}
                  >
                    {label}
                  </Text>
                }
                size="xl"
                error={errorMessage}
                withAsterisk={mandatory}
              >
                <Input
                  id={key}
                  placeholder={label}
                  onChange={handleForm}
                  invalid={errorMessage !== ""}
                  value={value}
                />
              </Input.Wrapper>
            )
          )}
      </div>
      <div id="form" className="textarea-form-grid">
        {formData
          ?.filter(
            ([key, { type }]: [string, DefaultFormField]) =>
              !hiddenFormProps?.includes(key) && type === "textArea"
          )
          ?.map(
            ([key, { label, errorMessage, mandatory, value }]: [
              string,
              DefaultFormField
            ]) => (
              <Input.Wrapper
                className="form-field"
                key={`inputWrapper-${key}`}
                id={key}
                label={
                  <Text
                    truncate
                    style={{
                      display: "inline",
                    }}
                  >
                    {label}
                  </Text>
                }
                size="xl"
                error={errorMessage}
                withAsterisk={mandatory}
              >
                <Textarea
                  id={key}
                  placeholder={label}
                  onChange={handleForm}
                  error={errorMessage}
                  value={value}
                />
              </Input.Wrapper>
            )
          )}
      </div>
    </>
  );
};

export default GeneralData;
