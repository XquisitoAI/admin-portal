import React, { useEffect, useState } from 'react';
import { XIcon, MailIcon, PhoneIcon, CalendarIcon, TagIcon, AlertCircleIcon, CheckIcon } from 'lucide-react';
interface CampaignDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCampaign: (campaignDetails: CampaignDetails) => void;
  campaignName: string;
  selectedSegment: any;
  selectedTemplate: any;
}
interface CampaignDetails {
  deliveryMethods: {
    email: boolean;
    sms: boolean;
  };
  startDate: string;
  endDate: string;
  rewardCode: string;
  discountPercentage: number;
}
const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({
  isOpen,
  onClose,
  onCreateCampaign,
  campaignName,
  selectedSegment,
  selectedTemplate
}) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  // Set default end date to 30 days from now
  const defaultEndDate = new Date();
  defaultEndDate.setDate(defaultEndDate.getDate() + 30);
  const defaultEndDateStr = defaultEndDate.toISOString().split('T')[0];
  // State for form fields
  const [deliveryMethods, setDeliveryMethods] = useState({
    email: true,
    sms: false
  });
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(defaultEndDateStr);
  const [rewardCode, setRewardCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  // Validation states
  const [dateError, setDateError] = useState('');
  const [formValid, setFormValid] = useState(false);
  // Check if form is valid
  useEffect(() => {
    // Check if at least one delivery method is selected
    const hasDeliveryMethod = deliveryMethods.email || deliveryMethods.sms;
    // Check if dates are valid
    const datesValid = !dateError && startDate && endDate;
    // Update form validity
    setFormValid(hasDeliveryMethod && datesValid);
  }, [deliveryMethods, startDate, endDate, dateError]);
  // Validate dates when they change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) {
        setDateError('La fecha de fin debe ser posterior a la fecha de inicio');
      } else {
        setDateError('');
      }
    }
  }, [startDate, endDate]);
  // Toggle delivery method
  const toggleDeliveryMethod = (method: 'email' | 'sms') => {
    setDeliveryMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };
  // Handle discount percentage change
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 100
    if (value === '' || /^\d+$/.test(value) && parseInt(value) <= 100) {
      setDiscountPercentage(value);
    }
  };
  // Handle form submission
  const handleSubmit = () => {
    if (formValid) {
      onCreateCampaign({
        deliveryMethods,
        startDate,
        endDate,
        rewardCode,
        discountPercentage: discountPercentage ? parseInt(discountPercentage) : 0
      });
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-3xl w-full mx-auto p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Configurar detalles de la campaña
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        {/* Campaign summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <CheckIcon className="h-5 w-5 text-custom-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Campaña:{' '}
              <span className="text-custom-green-600">{campaignName}</span>
            </span>
          </div>
          {selectedSegment && <div className="flex items-center mb-2">
              <CheckIcon className="h-5 w-5 text-custom-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Segmento:{' '}
                <span className="text-custom-green-600">
                  {selectedSegment.segment_name}
                </span>
              </span>
            </div>}
          {selectedTemplate && <div className="flex items-center">
              <CheckIcon className="h-5 w-5 text-custom-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Template:{' '}
                <span className="text-custom-green-600">
                  {selectedTemplate.name}
                </span>
              </span>
            </div>}
        </div>
        {/* Delivery Methods */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Método de envío <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`border rounded-lg p-4 cursor-pointer transition-all ${deliveryMethods.email ? 'border-custom-green-600 bg-custom-green-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => toggleDeliveryMethod('email')}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${deliveryMethods.email ? 'bg-custom-green-100' : 'bg-gray-100'}`}>
                  <MailIcon className={`h-5 w-5 ${deliveryMethods.email ? 'text-custom-green-600' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Email</h4>
                  <p className="text-xs text-gray-500">
                    Enviar campaña por correo electrónico
                  </p>
                </div>
                <div className="ml-auto">
                  <div className={`w-5 h-5 rounded-full border ${deliveryMethods.email ? 'border-custom-green-600 bg-custom-green-600' : 'border-gray-300'} flex items-center justify-center`}>
                    {deliveryMethods.email && <CheckIcon className="h-3 w-3 text-white" />}
                  </div>
                </div>
              </div>
            </div>
            <div className={`border rounded-lg p-4 cursor-pointer transition-all ${deliveryMethods.sms ? 'border-custom-green-600 bg-custom-green-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`} onClick={() => toggleDeliveryMethod('sms')}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${deliveryMethods.sms ? 'bg-custom-green-100' : 'bg-gray-100'}`}>
                  <PhoneIcon className={`h-5 w-5 ${deliveryMethods.sms ? 'text-custom-green-600' : 'text-gray-500'}`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">SMS</h4>
                  <p className="text-xs text-gray-500">
                    Enviar campaña por mensaje de texto
                  </p>
                </div>
                <div className="ml-auto">
                  <div className={`w-5 h-5 rounded-full border ${deliveryMethods.sms ? 'border-custom-green-600 bg-custom-green-600' : 'border-gray-300'} flex items-center justify-center`}>
                    {deliveryMethods.sms && <CheckIcon className="h-3 w-3 text-white" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!deliveryMethods.email && !deliveryMethods.sms && <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              Selecciona al menos un método de envío
            </p>}
        </div>
        {/* Campaign Dates */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Fechas de la campaña <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
                <CalendarIcon className="h-4 w-4 inline mr-1" />
                Fecha de inicio
              </label>
              <input type="date" id="start-date" min={today} value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green-500" />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
                <CalendarIcon className="h-4 w-4 inline mr-1" />
                Fecha de fin
              </label>
              <input type="date" id="end-date" min={startDate} value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green-500" />
            </div>
          </div>
          {dateError && <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircleIcon className="h-4 w-4 mr-1" />
              {dateError}
            </p>}
        </div>
        {/* Reward Code */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Código de recompensa{' '}
            <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reward-code" className="block text-sm text-gray-600 mb-1">
                <TagIcon className="h-4 w-4 inline mr-1" />
                Código promocional
              </label>
              <input type="text" id="reward-code" placeholder="Ej. CUMPLE20" value={rewardCode} onChange={e => setRewardCode(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green-500" />
              <p className="mt-1 text-xs text-gray-500">
                El código que los clientes usarán para canjear la promoción
              </p>
            </div>
            <div>
              <label htmlFor="discount-percentage" className="block text-sm text-gray-600 mb-1">
                <TagIcon className="h-4 w-4 inline mr-1" />
                Porcentaje de descuento
              </label>
              <div className="relative">
                <input type="text" id="discount-percentage" placeholder="Ej. 20" value={discountPercentage} onChange={handleDiscountChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-green-500 pr-8" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Porcentaje de descuento asociado al código (0-100)
              </p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={!formValid} className={`px-4 py-2 rounded-lg text-white ${!formValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-custom-green-600 hover:bg-custom-green-700'}`}>
            Crear campaña
          </button>
        </div>
      </div>
    </div>;
};
export default CampaignDetailsModal;