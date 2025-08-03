import { useState } from "react";

export type ModalType = "view" | "delete" | "create" | "edit" | null;

export interface ModalState<T> {
  type: ModalType;
  data: T | null;
}

export function useModal<T>() {
  const [modal, setModal] = useState<ModalState<T>>({
    type: null,
    data: null,
  });

  const openModal = (type: ModalType, data: T | null) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null, data: null });
  };

  return {
    modal,
    openModal,
    closeModal,
  };
}
