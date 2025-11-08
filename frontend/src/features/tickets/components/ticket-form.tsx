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
import { LoaderIcon, PencilIcon } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import type { Ticket } from "../types";

interface Props {
  ticket: {
    name: string;
    description?: string;
    status?: Ticket["status"];
  };
  isLoadingAction: boolean;
  openForm: boolean;
  setOpen: (v: boolean) => void;
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
  { value: "cancelled", label: "Cancelado" },
];

export const TicketForm = ({
  ticket,
  isUpdating,
  isLoadingAction,
  openForm,
  setOpen,
  handleInputChange,
  handleStatusChange,
  handleSubmit,
}: Props) => {
  return (
    <Dialog open={openForm} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isUpdating ? (
          <Button>
            <PencilIcon />
          </Button>
        ) : (
          <Button>Nuevo ticket</Button>
        )}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {isUpdating && (
            <div>
              <label htmlFor="status" className="sr-only text-right">
                Status
              </label>
              <Select
                name="status"
                value={ticket.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="ml-auto">
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
          <div className="space-y-2">
            <label htmlFor="name" className="font-medium text-right">
              Ticket
            </label>
            <Input
              id="name"
              name="name"
              value={ticket.name}
              onChange={handleInputChange}
              placeholder="Nombre del ticket"
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium text-right">
              Descripción
            </label>
            <Textarea
              id="description"
              name="description"
              value={ticket.description}
              onChange={handleInputChange}
              placeholder="Describe tu ticket"
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="w-20" disabled={isLoadingAction}>
              {isLoadingAction ? (
                <span>
                  <LoaderIcon className="animate-spin" />
                </span>
              ) : isUpdating ? (
                "Confirmar"
              ) : (
                "Crear"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
