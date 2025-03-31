"use client"; 
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface DeleteSupplierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteSupplierModal: React.FC<DeleteSupplierModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  isLoading = false
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Conteúdo igual ao DeleteConfirmationModal, mas com texto para fornecedor */}
      </Dialog>
    </Transition>
  );
};

export default DeleteSupplierModal;