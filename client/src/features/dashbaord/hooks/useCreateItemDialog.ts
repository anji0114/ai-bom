import { useState } from "react";
import { useCreateItem } from "./useCreateItem";

export const useCreateItemDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createItem, loading, error } = useCreateItem();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (data: {
    name: string;
    description: string;
    kind: string;
  }) => {
    try {
      await createItem({
        name: data.name,
        description: data.description,
        kind: data.kind,
      });
      handleClose();
    } catch (err) {
      console.error("Failed to create item:", err);
    }
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleSubmit,
    loading,
    error,
  };
};
