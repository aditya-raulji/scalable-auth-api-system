import { ReactNode } from 'react';

const Modal = ({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white p-4 rounded w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">{title}</h2>
        <button onClick={onClose}>x</button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
