import { atom } from "jotai";
import { Product } from "@/gql/graphql";

export const currentProductAtom = atom<Product | null>(null);

const STORAGE_KEY = "current-product-id";

export const getStoredProductId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
};

export const setStoredProductId = (productId: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, productId);
};