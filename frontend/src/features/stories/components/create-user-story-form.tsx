import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, type FormEvent } from "react";
import { useCreateStory } from "../api/create-user-story";
import { useCreateTicket } from "@/features/tickets/api/create-ticket";
import { CreateUserStorySchema } from "../schemas";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { CreateTicketSchema } from "@/features/tickets/schemas";
import type { CreateTicket } from "@/features/tickets/types";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLTextAreaElement;
  ticketName: HTMLInputElement;
  ticketDescription: HTMLTextAreaElement;
}

interface UserStoryFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface Props {
  projectId: string;
}

export const CreateUserStoryForm = ({ projectId }: Props) => {
  const { data } = useSession();

  const createUserStory = useCreateStory();
  const createTicket = useCreateTicket();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [userStory, setUserStory] = useState({
    name: "",
    description: "",
  });

  const [ticket, setTicket] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = (e: FormEvent<UserStoryFormElement>) => {
    e.preventDefault();
    const userStoryData = {
      ...userStory,
      projectId,
    };

    const ticketData: Omit<CreateTicket, "userStoryId"> = {
      ...ticket,
      authorId: data?.user.id as string,
    };

    console.log("ticket data", ticketData);

    const validateTicketFields = CreateTicketSchema.omit({
      userStoryId: true,
    }).safeParse(ticketData);

    if (!validateTicketFields.success) {
      console.log("errors", validateTicketFields.error.flatten().fieldErrors);
      toast.error("Por favor verifica los datos del ticket");
      return;
    }

    createUserStory.mutate(userStoryData, {
      onSuccess: (data) => {
        createTicket.mutate({ ...ticketData, userStoryId: data });
      },
    });
  };

  const handleNextStep = () => {
    const validateUserStory = CreateUserStorySchema.safeParse({
      ...userStory,
      projectId,
    });

    if (!validateUserStory.success) {
      toast.error("Por favor verifica los datos de la historia");
      return;
    }

    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Crear historia</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear historia de usuario</DialogTitle>
          <DialogDescription>
            Una historia describe una tarea de un proyecto
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <fieldset>
                <label htmlFor="name">Historia</label>
                <Input
                  id="name"
                  name="name"
                  value={userStory.name}
                  onChange={(e) =>
                    setUserStory({ ...userStory, name: e.target.value })
                  }
                  required
                  placeholder="Carrito de compras"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="description">
                  Descripción{" "}
                  <span className="text-muted-foreground">Opcional</span>
                </label>
                <Textarea
                  value={userStory.description}
                  id="description"
                  onChange={(e) =>
                    setUserStory({ ...userStory, description: e.target.value })
                  }
                  placeholder="Los usuarios deben poder agregar productos al carrito"
                />
              </fieldset>
            </div>
          )}
          {step === 2 && (
            <div>
              <fieldset>
                <label htmlFor="ticketName">Primer ticket</label>
                <Input
                  id="ticketName"
                  name="ticketName"
                  value={ticket.name}
                  onChange={(e) =>
                    setTicket({ ...ticket, name: e.target.value })
                  }
                  required
                  placeholder="Añadir icono del carrito"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="ticketDescription">
                  Describe el ticket
                  <span className="text-muted-foreground">Opcional</span>
                </label>
                <Textarea
                  id="ticketDescription"
                  value={ticket.description}
                  onChange={(e) =>
                    setTicket({ ...ticket, description: e.target.value })
                  }
                  placeholder="Busca un svg de un carrito de compras y utilizalo como icono"
                />
              </fieldset>
            </div>
          )}
          <DialogFooter className="mt-4">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DialogClose asChild>
                  <Button type="button">Cancelar</Button>
                </DialogClose>
                {step === 2 && (
                  <Button type="button" onClick={() => handlePrevStep()}>
                    Volver
                  </Button>
                )}
              </div>

              {step === 1 ? (
                <Button type="button" onClick={() => handleNextStep()}>
                  Continuar
                </Button>
              ) : (
                <Button type="submit">Crear</Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
