import React from 'react';
import { XIcon, ShieldOffIcon } from 'lucide-react';
interface InactiveServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}
const InactiveServiceModal = ({
  isOpen,
  onClose,
  serviceName
}: InactiveServiceModalProps) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-[6px]" onClick={onClose} aria-hidden="true" />
      {/* Modal container */}
      <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200 ease-out">
        <div className="absolute top-3 right-3">
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500" aria-label="Cerrar">
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-amber-100 rounded-full mb-4">
            <ShieldOffIcon className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Servicio Inactivo
          </h2>
          <p className="text-gray-500 mb-6">
            {serviceName} no está activo. Contrátalo para empezar a disfrutar
            sus beneficios y métricas personalizadas.
          </p>
          <button onClick={() => {
          alert(`Redirigiendo a contratación de ${serviceName}`);
          onClose();
        }} className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-custom-green-600 hover:bg-custom-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500">
            Contratar Servicio
          </button>
        </div>
      </div>
    </div>;
};
export default InactiveServiceModal;