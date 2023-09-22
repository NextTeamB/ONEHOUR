import React, { useState } from "react";
import styles from "./textbox.module.scss";

interface TextBoxProps {
  value: string;
  onChange: (text: string) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className={styles.textbox}
      />
    </div>
  );
};

export default TextBox;
