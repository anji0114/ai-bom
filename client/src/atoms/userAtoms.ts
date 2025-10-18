import { atom } from "jotai";

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  tenant: {
    id: string;
    name: string;
  };
};

export const currentUserAtom = atom<User | null>(null);

