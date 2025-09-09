import React, { useEffect, useState, useRef, Component } from 'react';
import SegmentModal from '../components/SegmentModal';
import NewCampaignModal from '../components/NewCampaignModal';
import TemplateDesignerModal from '../components/TemplateDesignerModal';
import CampaignDetailsModal from '../components/CampaignDetailsModal';
import CampaignDashboardModal from '../components/CampaignDashboardModal';
import { PlusIcon, AwardIcon, CoffeeIcon, ShoppingBagIcon, XIcon, ClockIcon, CheckCircleIcon, AlertCircleIcon, EyeIcon, TrashIcon, TargetIcon, LayoutIcon, ChevronDownIcon, FilterIcon, ImageIcon, TypeIcon, SeparatorHorizontalIcon, MousePointerIcon, GripIcon, UploadIcon, MaximizeIcon, MinimizeIcon, BookmarkIcon, ZoomInIcon, BellIcon, CalendarIcon, MailIcon } from 'lucide-react';
// Initial campaigns data
const initialCampaigns = [{
  id: 1,
  name: 'Café gratis',
  description: 'Un café americano o espresso gratis',
  pointsRequired: 100,
  expirationDays: 30,
  active: true,
  status: 'active',
  icon: 'coffee',
  image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  emailSubject: '¡Tu café gratis te espera!',
  emailBody: 'Disfruta de un café americano o espresso completamente gratis en tu próxima visita.',
  startDate: '2023-10-01',
  endDate: '2023-12-31',
  conditions: 'Válido de lunes a viernes. No acumulable con otras promociones.',
  cta: 'Canjear ahora',
  templateName: 'Café Gratis - Template',
  sent: true
}, {
  id: 2,
  name: 'Postre gratis',
  description: 'Un postre a elección (valor máximo $8)',
  pointsRequired: 250,
  expirationDays: 30,
  active: true,
  status: 'active',
  icon: 'award',
  image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  emailSubject: '¡Te has ganado un postre!',
  emailBody: 'Celebra con un delicioso postre gratis a tu elección en tu próxima visita.',
  startDate: '2023-10-15',
  endDate: '2023-12-15',
  conditions: 'Valor máximo $8. No acumulable con otras promociones.',
  cta: 'Ver postres',
  templateName: 'Postre Gratis - Template',
  sent: true
}, {
  id: 3,
  name: 'Descuento de $15',
  description: 'Descuento de $15 en tu próxima compra (mínimo $30)',
  pointsRequired: 400,
  expirationDays: 60,
  active: true,
  status: 'paused',
  icon: 'shopping-bag',
  image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  emailSubject: '¡$15 de descuento en tu próxima compra!',
  emailBody: 'Te regalamos $15 de descuento en tu próxima compra de $30 o más.',
  startDate: '2023-11-01',
  endDate: '2024-01-31',
  conditions: 'Compra mínima de $30. No acumulable con otras promociones.',
  cta: 'Usar descuento',
  templateName: 'Descuento $15 - Template',
  sent: false
}, {
  id: 4,
  name: 'Papas gratis',
  description: 'Una orden de papas fritas gratis con tu hamburguesa',
  pointsRequired: 150,
  expirationDays: 30,
  active: false,
  status: 'expired',
  icon: 'shopping-bag',
  image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  emailSubject: '¡PAPAS GRATIS con tu hamburguesa!',
  emailBody: 'Celebramos contigo con una orden de papas gratis al comprar cualquier hamburguesa.',
  startDate: '2023-08-01',
  endDate: '2023-09-30',
  conditions: 'Válido solo al comprar una hamburguesa. No acumulable con otras promociones.',
  cta: 'Ordenar ahora',
  templateName: 'Papas Gratis - Template',
  sent: true
}];
// Saved segments and templates
const savedSegments = [{
  id: 1,
  segment_name: 'Clientes frecuentes',
  filters: {
    tags: 'frequent',
    number_of_visits: 'more_than_5',
    gender: 'all'
  },
  activeFiltersCount: 2
}, {
  id: 2,
  segment_name: 'Clientes VIP',
  filters: {
    tags: 'vip',
    single_purchase_total: 'greater_than_500',
    gender: 'all'
  },
  activeFiltersCount: 2
}];
const savedTemplates = [{
  id: 1,
  name: 'Promoción Estándar',
  blocks: [{
    id: '1',
    type: 'title',
    content: 'Promoción exclusiva para ti'
  }, {
    id: '2',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  }, {
    id: '3',
    type: 'text',
    content: 'Aprovecha esta oferta por tiempo limitado'
  }, {
    id: '4',
    type: 'button',
    content: 'Canjear ahora'
  }]
}, {
  id: 2,
  name: 'Recompensa de Cumpleaños',
  blocks: [{
    id: '1',
    type: 'title',
    content: '¡Feliz Cumpleaños!'
  }, {
    id: '2',
    type: 'image',
    content: 'https://images.unsplash.com/photo-1578922864601-79dca7a9ea35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  }, {
    id: '3',
    type: 'text',
    content: 'Te regalamos algo especial en tu día'
  }, {
    id: '4',
    type: 'button',
    content: 'Reclamar regalo'
  }]
}];
// KPI Button Component
const KpiButton = ({
  label,
  count,
  active,
  onClick,
  icon
}) => {
  return <button onClick={onClick} className={`p-4 rounded-lg border transition-all duration-200 ${active ? 'bg-custom-green-50 border-custom-green-200 text-custom-green-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{label}</p>
          <p className={`text-2xl font-bold ${active ? 'text-custom-green-600' : 'text-gray-900'}`}>
            {count}
          </p>
        </div>
        <div className="ml-4">{icon}</div>
      </div>
    </button>;
};
// Campaign Card Component
const CampaignCard = ({
  campaign,
  onPreview,
  onToggleActive,
  onDelete
}) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const statusMenuRef = useRef(null);
  const powerButtonRef = useRef(null);
  // Format date to dd/mm/yy
  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (statusMenuRef.current && !statusMenuRef.current.contains(event.target) && powerButtonRef.current && !powerButtonRef.current.contains(event.target)) {
        setShowStatusMenu(false);
      }
    };
    const handleEscKey = event => {
      if (event.key === 'Escape') {
        setShowStatusMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);
  const handleStatusChange = status => {
    onToggleActive(campaign.id, status);
    setShowStatusMenu(false);
  };
  let IconComponent = AwardIcon;
  if (campaign.icon === 'coffee') {
    IconComponent = CoffeeIcon;
  } else if (campaign.icon === 'shopping-bag') {
    IconComponent = ShoppingBagIcon;
  }
  // Determinar el color del botón de power según el estado
  const getPowerButtonStyles = status => {
    switch (status) {
      case 'active':
        return 'bg-[#DCFCE7] border border-[#22C55E] text-[#15803D] hover:bg-[#BBF7D0]';
      case 'paused':
        return 'bg-[#FFF7CC] border border-[#FACC15] text-[#A16207] hover:bg-[#FDE68A]';
      case 'expired':
        return 'bg-gray-100 border border-gray-300 text-gray-500 hover:bg-gray-200';
      default:
        return 'bg-[#FFF7CC] border border-[#FACC15] text-[#A16207] hover:bg-[#FDE68A]';
    }
  };
  // Status indicator
  const getStatusBadge = status => {
    switch (status) {
      case 'active':
        return <span className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Activa
          </span>;
      case 'paused':
        return <span className="flex items-center text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium">
            <ClockIcon className="h-3 w-3 mr-1" />
            Pausa
          </span>;
      case 'expired':
        return <span className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Expirada
          </span>;
      default:
        return null;
    }
  };
  return <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 transition-all duration-200 ease-out hover:bg-[#E9F2F2] hover:border-[#D6E6E6] hover:shadow-md hover:scale-105 focus-within:outline-offset-2 focus-within:outline-[#0EA5E9] focus-within:outline-2 active:scale-[0.995]">
      <div className="relative h-36 overflow-hidden">
        <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          {getStatusBadge(campaign.status)}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start">
          <div className={`flex-shrink-0 p-2 rounded-full ${campaign.active ? 'bg-custom-green-100' : 'bg-gray-100'}`}>
            <IconComponent className={`h-5 w-5 ${campaign.active ? 'text-custom-green-600' : 'text-gray-400'}`} />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-lg font-medium text-gray-900">
              {campaign.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {campaign.description}
            </p>
            {campaign.templateName && <p className="mt-1 text-xs text-gray-400">
                Template: {campaign.templateName}
              </p>}
            <div className="mt-2 flex items-center text-xs text-gray-500">
              <span className="bg-custom-green-100 text-custom-green-800 px-2 py-0.5 rounded-full font-medium">
                {campaign.pointsRequired} puntos
              </span>
              <span className="ml-2">{campaign.expirationDays} días</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
        </div>
        <div className="flex items-center space-x-2">
          {/* Botón Ver */}
          <button onClick={e => onPreview(e)} className="p-1.5 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9]" aria-label="Ver vista previa">
            <EyeIcon className="h-4 w-4" />
          </button>
          {/* Botón Power/Estado */}
          <div className="relative">
            <button ref={powerButtonRef} onClick={e => {
            e.stopPropagation();
            setShowStatusMenu(!showStatusMenu);
          }} aria-haspopup="true" aria-expanded={showStatusMenu} aria-controls="status-menu" className={`p-1.5 flex items-center justify-center rounded-full hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9] ${getPowerButtonStyles(campaign.status)}`} aria-label="Cambiar estado">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                <line x1="12" y1="2" x2="12" y2="12"></line>
              </svg>
            </button>
            {showStatusMenu && <div ref={statusMenuRef} id="status-menu" className="absolute right-0 bottom-full mb-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-10" role="menu">
                <button className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center rounded-t-lg focus:outline-none focus:bg-green-50" onClick={e => {
              e.stopPropagation();
              handleStatusChange('active');
            }} role="menuitem" disabled={campaign.status === 'expired'}>
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Activa
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 flex items-center focus:outline-none focus:bg-yellow-50" onClick={e => {
              e.stopPropagation();
              handleStatusChange('paused');
            }} role="menuitem" disabled={campaign.status === 'expired'}>
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Pausa
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center rounded-b-lg focus:outline-none focus:bg-gray-50" onClick={e => {
              e.stopPropagation();
              handleStatusChange('expired');
            }} role="menuitem">
                  <AlertCircleIcon className="h-4 w-4 mr-2" />
                  Expirada
                </button>
              </div>}
          </div>
          {/* Botón Eliminar */}
          <button onClick={e => {
          e.stopPropagation();
          onDelete(campaign.id);
        }} className="p-1.5 bg-red-100 rounded-full text-red-600 hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9]" aria-label="Eliminar campaña">
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>;
};
// Email Preview Component
const EmailPreview = ({
  campaign,
  onClose
}) => {
  if (!campaign) return null;
  // Current time for the email preview
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;
  return <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-md w-full mx-auto p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <XIcon className="h-6 w-6" />
        </button>

        {/* Template name display */}
        {campaign.templateName && <div className="mb-4 text-center">
            <span className="inline-block bg-custom-green-100 text-custom-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {campaign.templateName}
            </span>
          </div>}

        {/* iPhone mockup */}
        <div className="relative mx-auto w-full max-w-[375px]">
          <div className="bg-black rounded-[55px] p-2 shadow-xl overflow-hidden border-8 border-black">
            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 bg-black w-[30%] h-[30px] rounded-b-[18px] flex items-center justify-center">
              <div className="absolute w-[10px] h-[10px] rounded-full bg-gray-700 left-[15%]"></div>
              <div className="absolute w-[50px] h-[6px] rounded-full bg-gray-800"></div>
              <div className="absolute w-[10px] h-[10px] rounded-full bg-gray-700 right-[15%]"></div>
            </div>

            {/* Screen */}
            <div className="relative bg-white rounded-[48px] overflow-hidden h-[650px]">
              {/* Status Bar */}
              <div className="sticky top-0 z-30 bg-white px-5 pt-8 pb-1 flex justify-between items-center">
                <div className="text-black font-semibold">{timeString}</div>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center space-x-1">
                    <div className="h-3 w-3">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="black" strokeWidth="1.5" />
                        <path d="M15 9C15 7.343 13.657 6 12 6C10.343 6 9 7.343 9 9C9 10.657 10.343 12 12 12C13.657 12 15 10.657 15 9Z" fill="black" />
                        <path d="M5.5 19.5C7.5 17 9.5 15 12 15C14.5 15 16.5 17 18.5 19.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" stroke="black" strokeWidth="2" />
                    <rect x="6" y="8" width="12" height="8" rx="1" fill="black" />
                  </svg>
                  <div className="font-semibold text-sm">100%</div>
                </div>
              </div>

              {/* App Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  <img src="/holycow-logo.png" alt="Holy Cow Logo" className="h-8 w-auto mr-2" />
                  <span className="text-lg font-medium text-gray-800">
                    Holy Cow
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-gray-100 rounded-full">
                    <MailIcon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="p-1.5 bg-gray-100 rounded-full">
                    <BellIcon className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Email content - Professional newsletter style */}
              <div className="overflow-y-auto h-[calc(100%-110px)]">
                {/* Email Header with Logo */}
                <div className="bg-[#2D2D2D] text-white px-6 py-4 text-center">
                  <img src="/holycow-logo.png" alt="Holy Cow Logo" className="h-16 mx-auto mb-2" />
                  <p className="text-xs uppercase tracking-widest mt-2">
                    BURGER & BEER JOINT
                  </p>
                </div>

                {/* Email Subject Line Banner */}
                <div className="bg-[#E53935] text-white px-6 py-3 text-center">
                  <p className="text-sm font-bold uppercase tracking-wide">
                    ¡OFERTA ESPECIAL PARA TI!
                  </p>
                </div>

                {/* Campaign Image */}
                <div className="w-full">
                  <img src={campaign.image} alt={campaign.name} className="w-full h-48 object-cover" />
                </div>

                {/* Main Content */}
                <div className="px-6 py-6 bg-white">
                  {/* Headline */}
                  <h1 className="text-2xl font-bold text-[#2D2D2D] text-center mb-4">
                    {campaign.emailSubject}
                  </h1>

                  {/* Body Copy */}
                  <p className="text-gray-700 mb-6 text-center">
                    {campaign.emailBody}
                  </p>

                  {/* CTA Button */}
                  <div className="flex justify-center mb-6">
                    <button className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all">
                      {campaign.cta}
                    </button>
                  </div>

                  {/* Points Badge */}
                  {campaign.pointsRequired && <div className="text-center mb-6">
                      <span className="inline-block bg-[#FFECB3] text-[#E65100] px-4 py-2 rounded-full font-medium text-sm">
                        {campaign.pointsRequired} puntos
                      </span>
                    </div>}

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-6"></div>

                  {/* Details Section */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-[#2D2D2D] text-sm mb-2">
                      DETALLES DE LA PROMOCIÓN:
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2 text-[#E53935]" />
                      <span>
                        Válido hasta:{' '}
                        {new Date(campaign.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <span className="font-medium">
                        Términos y condiciones:
                      </span>
                      <br />
                      {campaign.conditions}
                    </p>
                  </div>

                  {/* Restaurant Info */}
                  <div className="text-center text-xs text-gray-500">
                    <p className="font-medium text-[#2D2D2D] mb-1">
                      HOLY COW BURGER & BEER JOINT
                    </p>
                    <p>Av. Principal 123, Ciudad de México</p>
                    <p>Tel: 555-123-4567</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-[#2D2D2D] text-white px-6 py-4 text-center text-xs">
                  <p className="mb-2">
                    © 2023 Holy Cow. Todos los derechos reservados.
                  </p>
                  <p>
                    Si no deseas recibir más correos, haz clic{' '}
                    <a href="#" className="underline">
                      aquí
                    </a>{' '}
                    para darte de baja.
                  </p>
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[30%] h-[5px] bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>;
};
// Componente para mostrar planes de precios
const RewardsPricingModal = ({
  isOpen,
  onClose,
  currentPlan = 'Básico'
}) => {
  if (!isOpen) return null;
  const plans = [{
    name: 'Básico',
    price: 'Gratis',
    features: ['1 campaña activa por mes', 'Estadísticas básicas', 'Soporte por email']
  }, {
    name: 'Premium',
    price: '$15 USD',
    features: ['Hasta 5 campañas por mes', 'Estadísticas avanzadas', 'Segmentación de clientes', 'Soporte prioritario']
  }, {
    name: 'Ultra',
    price: '$30 USD',
    features: ['Hasta 10 campañas por mes', 'Estadísticas en tiempo real', 'Segmentación avanzada', 'Soporte 24/7', 'API de integración']
  }];
  return <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[2px]" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl max-w-3xl w-full mx-auto p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <XIcon className="h-6 w-6" />
        </button>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Planes de Gestión
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Selecciona el plan que mejor se adapte a tus necesidades
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-6">
          {plans.map(plan => <div key={plan.name} className={`bg-white rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${plan.name === currentPlan ? 'border-2 border-custom-green-600 bg-custom-green-100/30' : 'border border-gray-200 hover:border-custom-green-200'}`}>
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-custom-green-600 mb-4">
                  {plan.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-custom-green-600">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="ml-2 text-sm text-gray-600">
                        {feature}
                      </span>
                    </li>)}
                </ul>
                <button className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${plan.name === currentPlan ? 'bg-custom-green-600 text-white cursor-default' : 'bg-white border border-custom-green-600 text-custom-green-600 hover:bg-custom-green-50'}`} disabled={plan.name === currentPlan}>
                  {plan.name === currentPlan ? 'Plan Actual' : 'Seleccionar Plan'}
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
// Main Component
const RewardsManagement = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [activeFilter, setActiveFilter] = useState('all');
  const [previewCampaign, setPreviewCampaign] = useState(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showCampaignDashboard, setShowCampaignDashboard] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  // New campaign flow states
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showCampaignDetailsModal, setShowCampaignDetailsModal] = useState(false);
  const [currentSegments, setCurrentSegments] = useState(savedSegments);
  const [currentTemplates, setCurrentTemplates] = useState(savedTemplates);
  const [newCampaignData, setNewCampaignData] = useState({
    name: '',
    selectedSegment: null,
    selectedTemplate: null
  });
  // Filter campaigns based on active filter
  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeFilter === 'all') return true;
    return campaign.status === activeFilter;
  });
  // Get counts for KPI buttons
  const allCount = campaigns.length;
  const activeCount = campaigns.filter(c => c.status === 'active').length;
  const pausedCount = campaigns.filter(c => c.status === 'paused').length;
  const expiredCount = campaigns.filter(c => c.status === 'expired').length;
  const handleToggleActive = (id, status) => {
    setCampaigns(prev => prev.map(campaign => campaign.id === id ? {
      ...campaign,
      status
    } : campaign));
  };
  const handleDeleteCampaign = id => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta campaña?')) {
      setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
    }
  };
  const handlePreview = campaign => {
    setPreviewCampaign(campaign);
  };
  const handleOpenDashboard = campaign => {
    setSelectedCampaign(campaign);
    setShowCampaignDashboard(true);
  };
  // New campaign flow handlers
  const handleOpenNewCampaign = () => {
    setShowNewCampaignModal(true);
  };
  const handleCloseNewCampaign = () => {
    setShowNewCampaignModal(false);
  };
  const handleCreateSegment = () => {
    setShowNewCampaignModal(false);
    setShowSegmentModal(true);
  };
  const handleDesignTemplate = () => {
    setShowNewCampaignModal(false);
    setShowTemplateModal(true);
  };
  const handleCloseSegmentModal = () => {
    setShowSegmentModal(false);
    setShowNewCampaignModal(true);
  };
  const handleCloseTemplateModal = () => {
    setShowTemplateModal(false);
    setShowNewCampaignModal(true);
  };
  const handleApplySegment = segment => {
    // Add the new segment to the list if it doesn't exist
    if (!currentSegments.find(s => s.segment_name === segment.segment_name)) {
      setCurrentSegments([...currentSegments, {
        ...segment,
        id: Date.now()
      }]);
    }
    setShowSegmentModal(false);
    setShowNewCampaignModal(true);
  };
  const handleSaveTemplate = template => {
    // Add the new template to the list
    setCurrentTemplates([...currentTemplates, template]);
    setShowTemplateModal(false);
    setShowNewCampaignModal(true);
  };
  const handleCreateCampaign = (campaignName, selectedSegment, selectedTemplate) => {
    // Store campaign data and proceed to details screen
    setNewCampaignData({
      name: campaignName,
      selectedSegment,
      selectedTemplate
    });
    setShowNewCampaignModal(false);
    setShowCampaignDetailsModal(true);
  };
  const handleCloseCampaignDetails = () => {
    setShowCampaignDetailsModal(false);
  };
  const handleFinalizeCampaign = campaignDetails => {
    // Create a new campaign with all the provided data
    const newCampaign = {
      id: Date.now(),
      name: newCampaignData.name,
      description: 'Nueva campaña creada',
      pointsRequired: 100,
      expirationDays: 30,
      active: true,
      status: 'active',
      icon: 'award',
      image: newCampaignData.selectedTemplate?.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      emailSubject: newCampaignData.name,
      emailBody: 'Descripción de la campaña',
      startDate: campaignDetails.startDate,
      endDate: campaignDetails.endDate,
      conditions: campaignDetails.rewardCode ? `Usa el código ${campaignDetails.rewardCode} para obtener ${campaignDetails.discountPercentage}% de descuento` : 'Términos y condiciones aplican',
      cta: 'Ver más',
      templateName: newCampaignData.selectedTemplate ? newCampaignData.selectedTemplate.name : 'Template predeterminado',
      sent: false,
      deliveryMethods: campaignDetails.deliveryMethods,
      segment: newCampaignData.selectedSegment?.segment_name || 'Todos los clientes'
    };
    setCampaigns([...campaigns, newCampaign]);
    setShowCampaignDetailsModal(false);
  };
  return <div className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Scala - Gestión de Recompensas
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Gestiona tus campañas de recompensas y fidelización
              </p>
            </div>
            <div className="flex space-x-3">
              <button onClick={() => setShowPricingModal(true)} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
                Ver Planes
              </button>
              <button onClick={handleOpenNewCampaign} className="bg-custom-green-600 text-white px-4 py-2 rounded-md hover:bg-custom-green-700 transition-colors flex items-center">
                <PlusIcon className="h-5 w-5 mr-2" />
                Nueva Campaña
              </button>
            </div>
          </div>
        </div>

        {/* KPI Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <KpiButton label="Todas" count={allCount} active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} icon={<TargetIcon className="h-6 w-6" />} />
          <KpiButton label="Activas" count={activeCount} active={activeFilter === 'active'} onClick={() => setActiveFilter('active')} icon={<CheckCircleIcon className="h-6 w-6 text-green-500" />} />
          <KpiButton label="Pausadas" count={pausedCount} active={activeFilter === 'paused'} onClick={() => setActiveFilter('paused')} icon={<ClockIcon className="h-6 w-6 text-yellow-500" />} />
          <KpiButton label="Expiradas" count={expiredCount} active={activeFilter === 'expired'} onClick={() => setActiveFilter('expired')} icon={<AlertCircleIcon className="h-6 w-6 text-gray-500" />} />
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map(campaign => <div key={campaign.id} onClick={() => handleOpenDashboard(campaign)} className="cursor-pointer">
              <CampaignCard campaign={campaign} onPreview={e => {
            e.stopPropagation();
            handlePreview(campaign);
          }} onToggleActive={(id, status) => {
            handleToggleActive(id, status);
          }} onDelete={id => {
            handleDeleteCampaign(id);
          }} />
            </div>)}
        </div>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && <div className="text-center py-12">
            <AwardIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No hay campañas
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              No se encontraron campañas para el filtro seleccionado.
            </p>
          </div>}
      </div>

      {/* Email Preview Modal */}
      {previewCampaign && <EmailPreview campaign={previewCampaign} onClose={() => setPreviewCampaign(null)} />}

      {/* Campaign Dashboard Modal */}
      <CampaignDashboardModal isOpen={showCampaignDashboard} onClose={() => setShowCampaignDashboard(false)} campaign={selectedCampaign} />

      {/* Pricing Modal */}
      <RewardsPricingModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} currentPlan="Básico" />

      {/* New Campaign Modal */}
      <NewCampaignModal isOpen={showNewCampaignModal} onClose={handleCloseNewCampaign} onCreateSegment={handleCreateSegment} onDesignTemplate={handleDesignTemplate} onNext={handleCreateCampaign} savedSegments={currentSegments} savedTemplates={currentTemplates} />

      {/* Segment Modal */}
      <SegmentModal isOpen={showSegmentModal} onClose={handleCloseSegmentModal} onApplySegment={handleApplySegment} />

      {/* Template Designer Modal */}
      <TemplateDesignerModal isOpen={showTemplateModal} onClose={handleCloseTemplateModal} onSave={handleSaveTemplate} />

      {/* Campaign Details Modal */}
      <CampaignDetailsModal isOpen={showCampaignDetailsModal} onClose={handleCloseCampaignDetails} onCreateCampaign={handleFinalizeCampaign} campaignName={newCampaignData.name} selectedSegment={newCampaignData.selectedSegment} selectedTemplate={newCampaignData.selectedTemplate} />
    </div>;
};
export default RewardsManagement;