import React from "react";
import {Text, Divider} from "@mantine/core";

interface Props {
  label: string;
}

const SectionTitle = ({label}: Props) => {
  return (
    <>
      <Text c="dimmed" className="form-section">
        {label}
      </Text>
      <Divider my="sm" variant="dashed" />
    </>
  );
};

export default SectionTitle;
