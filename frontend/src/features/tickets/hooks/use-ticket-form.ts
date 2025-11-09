import { useState, type ChangeEvent } from "react";

//This hook works for both update and create forms
export const useTicketForm = <T extends Record<string, string | undefined>>(
  initialState: T,
) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //For special fields like the status select
  const updateField = (name: keyof T, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => setFormData(initialState);

  return {
    formData,
    setFormData,
    handleInputChange,
    reset,
    updateField,
  };
};
