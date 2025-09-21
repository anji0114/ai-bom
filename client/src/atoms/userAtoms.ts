import { atom } from "jotai";

export type User = {
  id: string;
  email: string;
};

export const currentUserAtom = atom<User | null>(null);
