import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { signOut } from "../api/sign-out";
import { LogOutIcon } from "lucide-react";

interface Props {
  className?: string;
}
export const SignOutButton = ({ className }: Props) => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate({
        to: "/",
      });
    } catch (e) {
      console.log("err", e);
    }
  };
  return (
    <Button
      className={className}
      variant={"ghost"}
      onClick={() => handleSignOut()}
    >
      Cerrar sesión
      <span>
        <LogOutIcon className="stroke-primary" />
      </span>
    </Button>
  );
};
