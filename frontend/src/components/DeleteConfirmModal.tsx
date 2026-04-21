interface DeleteConfirmModalProps {
  isOpen: boolean;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmModal = ({ isOpen, isDeleting = false, onClose, onConfirm }: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="neo-card w-full max-w-md p-6">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black bg-[#FF6B6B] text-xl text-black">
          !
        </div>
        <h2 className="text-center font-space text-3xl font-extrabold text-[#1A1A1A]">Are you sure?</h2>
        <p className="mt-2 text-center text-sm text-gray-600">This action cannot be undone</p>

        <div className="mt-6 flex justify-center gap-3">
          <button onClick={onClose} className="neo-btn bg-white px-4 py-2 text-gray-700">Cancel</button>
          <button
            onClick={() => void onConfirm()}
            disabled={isDeleting}
            className="neo-btn bg-[#FF6B6B] px-4 py-2 font-semibold text-black disabled:opacity-70"
          >
            {isDeleting ? 'Deleting...' : 'YES DELETE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
