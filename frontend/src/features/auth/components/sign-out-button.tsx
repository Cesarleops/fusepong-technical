import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { signOut } from "../api/sign-out";
import { LogOutIcon } from "lucide-react";

export const SignOutButton = () => {
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
    <Button variant={"ghost"} onClick={() => handleSignOut()}>
      Cerrar sesión
      <span>
        <LogOutIcon className="stroke-primary" />
      </span>
    </Button>
  );
};
