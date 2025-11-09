import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { SignUpSchema } from "../schemas";
import { signUp } from "../api/sign-up";
import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircleIcon } from "lucide-react";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignUpFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const SignUpForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<SignUpFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    const data = {
      name: e.currentTarget.elements.name.value,
      email: e.currentTarget.elements.email.value,
      password: e.currentTarget.elements.password.value,
    };

    const validateFields = SignUpSchema.safeParse(data);

    if (!validateFields.success) {
      setIsLoading(false);
      toast.error("Por favor verifica tus datos");
      return;
    }

    const { email, password, name } = validateFields.data;

    try {
      await signUp({
        email,
        password,
        name,
      });
      await navigate({ to: `/dashboard/home` });
    } catch (e) {
      let message = "Algo salió mal";
      if (e instanceof Error) {
        message = e.message;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="space-y-5 w-full h-full" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-primary">
          Nombre
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Tony stark"
          autoComplete="name"
          required
        />
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-primary">
          Correo electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          required
        />
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm text-primary font-medium">
          Contraseña
        </label>
        <PasswordInput type="signUp" />
      </fieldset>
      <Button type="submit" className="w-full">
        {isLoading ? (
          <span>
            <LoaderCircleIcon className="animate-spin" />
          </span>
        ) : (
          "Iniciar sesión"
        )}
      </Button>
      <p className="text-center">
        Ya tienes una cuenta ?{" "}
        <span className="text-primary">
          <Link to="/">Inicia sesión</Link>
        </span>
      </p>
    </form>
  );
};
