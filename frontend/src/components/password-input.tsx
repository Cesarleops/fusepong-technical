import { useState } from "react";
import { Input } from "./ui/input";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  type: "signIn" | "signUp";
}
export const PasswordInput = ({ type }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="relative">
      <Input
        type={isVisible ? "text" : "password"}
        className="pr-10"
        name="password"
        autoComplete={type === "signIn" ? "current-password" : "new-password"}
        placeholder="contraseña"
        required
      />
      <Button
        type="button"
        variant={"ghost"}
        onClick={handleToggle}
        className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors hover:bg-transparent"
        aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
      >
        {isVisible ? (
          <EyeClosedIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
