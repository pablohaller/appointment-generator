import React from "react";
import { Text, Divider } from "@mantine/core";

interface Props {
  label: string;
  hideDivider?: boolean;
}

const SectionTitle = ({ label, hideDivider = false }: Props) => {
  return (
    <>
      <Text c="dimmed" className="form-section">
        {label}
      </Text>
      {!hideDivider && <Divider my="sm" variant="dashed" />}
    </>
  );
};

export default SectionTitle;
