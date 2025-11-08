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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ChangeEvent, FormEvent } from "react";
import type { Ticket } from "../types";

interface Props {
  ticket: {
    name: string;
    description: string;
    status?: Ticket["status"];
  };
  triggerText: string;
  isUpdating: boolean;
  handleSubmit: (e: FormEvent) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleStatusChange?: (value: string) => void;
}

const STATUS_OPTIONS = [
  { value: "active", label: "Activo" },
  { value: "in_progress", label: "En proceso" },
  { value: "completed", label: "Completado" },
  { value: "canceled", label: "Cancelado" },
];
export const TicketForm = ({
  triggerText,
  ticket,
  isUpdating,
  handleInputChange,
  handleStatusChange,
  handleSubmit,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={isUpdating ? "outline" : "default"}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isUpdating ? "Editar ticket" : "Crear ticket"}
          </DialogTitle>
          <DialogDescription>
            {isUpdating ? "Edita tu ticket" : "Crea un ticket nuevo"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Ticket
            </label>
            <Input
              id="name"
              name="name"
              value={ticket.name}
              onChange={handleInputChange}
              className="col-span-3"
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Descripción
            </label>
            <Textarea
              id="description"
              name="description"
              value={ticket.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          {isUpdating && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select
                name="status"
                value={ticket.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona el estado del ticket" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">{isUpdating ? "Confirmar" : "Crear"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
