
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";


export const useCurrentUser = () => {
  const { authUser, curentUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    if (!authUser) {
      curentUser();
    }
  }, [authUser, curentUser]);

  return {
    user: authUser,
    loading: isCheckingAuth,
  };
};
