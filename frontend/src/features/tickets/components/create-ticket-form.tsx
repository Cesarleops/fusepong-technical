import { TicketForm } from "./ticket-form";
import { useCreateTicketForm } from "../hooks/use-create-ticket-form";

interface Props {
  userStoryId: string;
}
export const CreateTicketForm = ({ userStoryId }: Props) => {
  const {
    ticketForm,
    open,
    isLoadingAction,
    reset,
    handleInputChange,
    handleSubmit,
    setOpen,
  } = useCreateTicketForm(userStoryId);

  return (
    <TicketForm
      ticket={ticketForm}
      reset={reset}
      isUpdating={false}
      openForm={open}
      isLoadingAction={isLoadingAction}
      setOpen={setOpen}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
