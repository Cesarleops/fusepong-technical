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
import { LoaderIcon } from "lucide-react";
import type { CreateTicket } from "@/features/tickets/types";

interface Props {
  projectId: string;
}

export const CreateUserStoryForm = ({ projectId }: Props) => {
  const { data } = useSession();

  const createUserStory = useCreateStory();
  const createTicket = useCreateTicket();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userStory, setUserStory] = useState({
    name: "",
    description: "",
  });

  const [ticket, setTicket] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const userStoryData = {
      ...userStory,
      projectId,
    };

    const ticketData: Omit<CreateTicket, "userStoryId"> = {
      ...ticket,
      authorId: data?.user.id as string,
    };

    const validateTicketFields = CreateTicketSchema.omit({
      userStoryId: true,
    }).safeParse(ticketData);

    if (!validateTicketFields.success) {
      setIsSubmitting(false);
      toast.error("Por favor verifica los datos del ticket");
      return;
    }

    try {
      const userStoryId = await createUserStory.mutateAsync(userStoryData);
      await createTicket.mutateAsync({ ...ticketData, userStoryId });
      setOpen(false);
      reset();
    } catch (e) {
      let message = "No se pudo crear la historia";
      if (e instanceof Error) {
        message = e.message;
      }
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
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

  const reset = () => {
    setUserStory({
      name: "",
      description: "",
    });
    setTicket({
      name: "",
      description: "",
    });
    setStep(1);
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
        <DialogHeader className="text-left">
          <DialogTitle>Crear historia de usuario</DialogTitle>
          <DialogDescription>
            Una historia describe una tarea de un proyecto
          </DialogDescription>
        </DialogHeader>
        <form>
          {step === 1 && (
            <div className="space-y-4">
              <fieldset>
                <label htmlFor="name" className="font-medium">
                  Historia
                </label>
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
                <label htmlFor="description" className="font-medium">
                  Descripción
                  <span className="text-muted-foreground text-xs ml-2">
                    Opcional
                  </span>
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
            <div className="space-y-4">
              <fieldset>
                <label htmlFor="ticketName " className="font-medium">
                  Primer ticket
                </label>
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
                <label htmlFor="ticketDescription" className="font-medium">
                  Describe el ticket
                  <span className="text-muted-foreground ml-2 text-xs">
                    Opcional
                  </span>
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
                  <Button
                    type="button"
                    onClick={() => reset()}
                    disabled={isSubmitting}
                    variant={"secondary"}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                {step === 2 && (
                  <Button
                    type="button"
                    variant={"outline"}
                    disabled={isSubmitting}
                    onClick={() => handlePrevStep()}
                  >
                    Volver
                  </Button>
                )}
              </div>

              {step === 1 ? (
                <Button type="button" onClick={() => handleNextStep()}>
                  Continuar
                </Button>
              ) : (
                <Button
                  disabled={isSubmitting}
                  className="w-22"
                  onClick={handleSubmit}
                  type="button"
                >
                  {isSubmitting ? (
                    <span>
                      <LoaderIcon className="animate-spin" />
                    </span>
                  ) : (
                    "Crear"
                  )}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
