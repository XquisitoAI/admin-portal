import React, { useState } from 'react';
import { ShoppingBagIcon, CreditCardIcon, LayoutGridIcon, SmartphoneIcon, ShoppingCartIcon, ReceiptIcon, ScanLineIcon } from 'lucide-react';
import TapOrderDashboardModal from '../components/TapOrderDashboardModal';
import FlexBillDashboardModal from '../components/FlexBillDashboardModal';
import FoodHallDashboardModal from '../components/FoodHallDashboardModal';
import PickNGoDashboardModal from '../components/PickNGoDashboardModal';
import TapPayDashboardModal from '../components/TapPayDashboardModal';
import InactiveServiceModal from '../components/InactiveServiceModal';
// Datos de los paquetes Dine
const initialPackages = [{
  id: 1,
  name: 'Tap Order & Pay',
  description: 'Órdenes y pagos sin mesero, desde la mesa. El cliente toca con su celular la tarjeta NFC de la mesa, accede al menú digital, ordena y paga desde su dispositivo. El pedido se procesa automáticamente y se entrega. Ideal para agilizar el servicio y reducir tiempos de espera.',
  icon: 'smartphone',
  active: true
}, {
  id: 2,
  name: 'Flex Bill',
  description: 'Órdenes grupales con cuenta compartida y pagos divididos. Cada comensal hace tap en la tarjeta NFC para unirse a una cuenta compartida. Cada quien puede ordenar desde su celular y, al final, pagar solo lo que consumió o dividir la cuenta fácilmente. Perfecto para grupos y mesas grandes.',
  icon: 'receipt',
  active: true
}, {
  id: 3,
  name: 'Food Hall',
  description: 'Órdenes unificadas en espacios con múltiples locales. Diseñado para food courts, parques gastronómicos o mercados: el usuario puede ordenar de varios locales en una sola transacción, pagar desde su celular y recibir notificaciones cuando su pedido esté listo para recoger.',
  icon: 'layout-grid',
  active: false
}, {
  id: 4,
  name: 'Tap & Pay',
  description: 'Pago moderno, sin cambiar la experiencia tradicional. El cliente pide con el mesero como siempre, pero al pagar solo necesita acercar su celular a la tarjeta NFC para liquidar. También puede dividir la cuenta sin usar terminal ni esperar al mesero. Rápido, elegante y sin fricción.',
  icon: 'scan-line',
  active: true
}, {
  id: 5,
  name: 'Pick N go',
  description: 'Órdenes anticipadas desde redes sociales o sitio web. El cliente ordena y paga desde su celular antes de llegar al local, a través de un link el cual puede ser publicado en redes sociales. Al llegar, simplemente recoge su pedido ya listo.',
  icon: 'shopping-cart',
  active: false
}];
const PromotionsManagement = () => {
  const [packages, setPackages] = useState(initialPackages);
  const [showTapOrderDashboard, setShowTapOrderDashboard] = useState(false);
  const [showFlexBillDashboard, setShowFlexBillDashboard] = useState(false);
  const [showFoodHallDashboard, setShowFoodHallDashboard] = useState(false);
  const [showPickNGoDashboard, setShowPickNGoDashboard] = useState(false);
  const [showTapPayDashboard, setShowTapPayDashboard] = useState(false);
  const [showInactiveServiceModal, setShowInactiveServiceModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const handleToggleActive = id => {
    setPackages(packages.map(pkg => pkg.id === id ? {
      ...pkg,
      active: !pkg.active
    } : pkg));
  };
  const handlePackageClick = pkg => {
    setSelectedPackage(pkg);
    if (!pkg.active) {
      setShowInactiveServiceModal(true);
      return;
    }
    switch (pkg.name) {
      case 'Tap Order & Pay':
        setShowTapOrderDashboard(true);
        break;
      case 'Flex Bill':
        setShowFlexBillDashboard(true);
        break;
      case 'Food Hall':
        setShowFoodHallDashboard(true);
        break;
      case 'Pick N go':
        setShowPickNGoDashboard(true);
        break;
      case 'Tap & Pay':
        setShowTapPayDashboard(true);
        break;
      default:
        break;
    }
  };
  // Función para obtener el icono correspondiente
  const getIcon = iconName => {
    switch (iconName) {
      case 'smartphone':
        return <SmartphoneIcon className="h-8 w-8 text-custom-green-600 group-hover:text-custom-green-600 transition-colors duration-200" />;
      case 'receipt':
        return <ReceiptIcon className="h-8 w-8 text-custom-green-600 group-hover:text-custom-green-600 transition-colors duration-200" />;
      case 'layout-grid':
        return <LayoutGridIcon className="h-8 w-8 text-custom-green-600 group-hover:text-custom-green-600 transition-colors duration-200" />;
      case 'scan-line':
        return <ScanLineIcon className="h-8 w-8 text-custom-green-600 group-hover:text-custom-green-600 transition-colors duration-200" />;
      case 'shopping-cart':
        return <ShoppingCartIcon className="h-8 w-8 text-custom-green-600 group-hover:text-custom-green-600 transition-colors duration-200" />;
      default:
        return <ShoppingBagIcon className="h-8 w-8 text-custom-green-600 group-hover:text-custom-green-600 transition-colors duration-200" />;
    }
  };
  return <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Gestión de Paquete Dine
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Gestiona los servicios clave de tu restaurante para ofrecer una
            operación más eficiente y moderna
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-col space-y-4">
        {packages.map(pkg => <div key={pkg.id} className={`group bg-white hover:bg-[#E9F2F2] overflow-hidden shadow rounded-lg border ${pkg.active ? 'border-custom-green-200' : 'border-gray-200'} hover:border-[#D6E6E6] transition-all duration-200 ease-out hover:shadow-md cursor-pointer`} onClick={() => handlePackageClick(pkg)}>
            <div className="p-5 flex">
              <div className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full ${pkg.active ? 'bg-custom-green-100' : 'bg-gray-100'} group-hover:bg-white transition-colors duration-200`}>
                {getIcon(pkg.icon)}
              </div>
              <div className="ml-5 flex-1">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-900 transition-colors duration-200">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-500 transition-colors duration-200">
                  {pkg.description}
                </p>
              </div>
              <div className="ml-4 flex items-center self-end">
                <button onClick={e => {
              e.stopPropagation();
              handleToggleActive(pkg.id);
            }} className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer ${pkg.active ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} transition-colors duration-200`}>
                  {pkg.active ? 'Activo' : 'Inactivo'}
                </button>
              </div>
            </div>
          </div>)}
      </div>
      {/* Dashboard Modals */}
      <TapOrderDashboardModal isOpen={showTapOrderDashboard} onClose={() => setShowTapOrderDashboard(false)} />
      <FlexBillDashboardModal isOpen={showFlexBillDashboard} onClose={() => setShowFlexBillDashboard(false)} />
      <FoodHallDashboardModal isOpen={showFoodHallDashboard} onClose={() => setShowFoodHallDashboard(false)} />
      <PickNGoDashboardModal isOpen={showPickNGoDashboard} onClose={() => setShowPickNGoDashboard(false)} />
      <TapPayDashboardModal isOpen={showTapPayDashboard} onClose={() => setShowTapPayDashboard(false)} />
      {/* Inactive Service Modal */}
      <InactiveServiceModal isOpen={showInactiveServiceModal} onClose={() => setShowInactiveServiceModal(false)} serviceName={selectedPackage?.name || ''} />
    </div>;
};
export default PromotionsManagement;