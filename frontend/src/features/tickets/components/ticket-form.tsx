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
import type { ChangeEvent, FormEvent } from "react";

interface Props {
  ticket: {
    name: string;
    description: string;
  };
  handleSubmit: (e: FormEvent) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  triggerText: string;
}
export const TicketForm = ({
  triggerText,
  ticket,
  handleInputChange,
  handleSubmit,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear ticket</DialogTitle>
          <DialogDescription>
            Una ticket describe una parte de una historia de usuario
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <fieldset>
              <label htmlFor="name">Nombre</label>
              <Input
                id="name"
                name="name"
                value={ticket.name}
                onChange={handleInputChange}
                required
                placeholder="Añadir icono del carrito"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="description">
                Describe el ticket
                <span className="text-muted-foreground">Opcional</span>
              </label>
              <Textarea
                name="description"
                value={ticket.description}
                onChange={handleInputChange}
                placeholder="Busca un svg de un carrito de compras y utilizalo como icono"
              />
            </fieldset>
          </div>
          <DialogFooter className="mt-4">
            <div className="w-full flex items-center justify-between">
              <DialogClose asChild>
                <Button>Cancelar</Button>
              </DialogClose>
              <Button>Crear</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
