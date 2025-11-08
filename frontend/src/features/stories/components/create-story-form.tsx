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
import { useState } from "react";

export const CreateUserStoryForm = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
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
        <form>
          {step === 1 && (
            <div>
              <fieldset>
                <label htmlFor="name">Historia</label>
                <Input
                  id="name"
                  name="name"
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
                  name="description"
                  placeholder="Los usuarios deben poder agregar productos al carrito"
                />
              </fieldset>
            </div>
          )}
          {step === 2 && (
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
          )}
        </form>
        <DialogFooter>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DialogClose asChild>
                <Button>Cancelar</Button>
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
              <Button>Crear</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
