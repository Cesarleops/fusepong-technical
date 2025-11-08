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

interface Props {
  triggerText: string;
}
export const TicketForm = ({ triggerText }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>{triggerText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear historia de usuario</DialogTitle>
          <DialogDescription>
            Una historia describe una tarea de un proyecto
          </DialogDescription>
        </DialogHeader>
        <form>
          <div>
            <fieldset>
              <label htmlFor="ticket-name">Primer ticket</label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Añadir icono del carrito"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="ticket-description">
                Describe el ticket
                <span className="text-muted-foreground">Opcional</span>
              </label>
              <Textarea
                name="ticket-description"
                placeholder="Busca un svg de un carrito de compras y utilizalo como icono"
              />
            </fieldset>
          </div>
        </form>
        <DialogFooter>
          <div className="w-full flex items-center justify-between">
            <DialogClose asChild>
              <Button>Cancelar</Button>
            </DialogClose>
            <Button>Crear</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
