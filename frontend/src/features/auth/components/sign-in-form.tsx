import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { SignInSchema } from "../schemas";
import { signIn } from "../api/sign-in";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const SignInForm = () => {
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent<SignInFormElement>) {
    e.preventDefault();

    const data = {
      email: e.currentTarget.elements.email.value,
      password: e.currentTarget.elements.password.value,
    };
    const validateData = SignInSchema.safeParse(data);

    if (!validateData.success) {
      return;
    }
    const { email, password } = validateData.data;
    try {
      await signIn({
        email,
        password,
      });
      navigate({
        to: "/dashboard",
      });
    } catch (e) {
      console.log("err", e);
    }
  }
  return (
    <form className="space-y-5 w-full h-full " onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-primary">
          Correo electrónico
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          required
        />
      </fieldset>
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm text-primary font-medium">
          Contraseña
        </label>
        <PasswordInput type="signIn" />
      </fieldset>
      <Button type="submit" className="w-full">
        Continuar
      </Button>
      <p className="text-center">
        No tienes una cuenta ?
        <span className="text-primary">
          <Link to="/signup">Crear cuenta</Link>
        </span>
      </p>
    </form>
  );
};
