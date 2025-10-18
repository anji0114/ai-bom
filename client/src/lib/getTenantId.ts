import { currentUserAtom } from "@/atoms/userAtoms";
import { useAtomValue } from "jotai";

export const getTenantId = () => {
  const currentUser = useAtomValue(currentUserAtom);

  if (!currentUser) throw new Error("User not found");

  return currentUser.tenant.id;
};
