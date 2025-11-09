import { useState } from "react";

export const useTicketFormDialog = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  return {
    open,
    setOpen,
  };
};
