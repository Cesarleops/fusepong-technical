import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { signOut } from "../api/sign-out";

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
  return <Button onClick={() => handleSignOut()}>Cerrar sesión</Button>;
};
