import React, { useState } from 'react';
import { BarChart2Icon, UsersIcon, ShoppingBagIcon, TrendingUpIcon, ChevronDownIcon, MapPinIcon, CheckIcon } from 'lucide-react';
// Lista de sucursales de ejemplo
const sucursales = [{
  id: 1,
  nombre: 'Sucursal Centro',
  direccion: 'Av. Reforma 123'
}, {
  id: 2,
  nombre: 'Sucursal Norte',
  direccion: 'Blvd. Manuel Ávila Camacho 456'
}, {
  id: 3,
  nombre: 'Sucursal Sur',
  direccion: 'Calz. de Tlalpan 789'
}, {
  id: 4,
  nombre: 'Sucursal Poniente',
  direccion: 'Santa Fe 101'
}];
const Dashboard = () => {
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState(sucursales[0]);
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const cambiarSucursal = sucursal => {
    setSucursalSeleccionada(sucursal);
    setDropdownAbierto(false);
  };
  return <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Xquisito Administrador
          </h1>
          <p className="text-sm text-gray-500">
            Bienvenido al panel de administración
          </p>
        </div>
        {/* Selector de sucursales */}
        <div className="relative">
          <button onClick={() => setDropdownAbierto(!dropdownAbierto)} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-custom-green-500 focus:ring-offset-2">
            <MapPinIcon className="h-5 w-5 text-custom-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Sucursal actual: {sucursalSeleccionada.nombre}
            </span>
            <ChevronDownIcon className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${dropdownAbierto ? 'transform rotate-180' : ''}`} />
          </button>
          {dropdownAbierto && <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1 animate-in fade-in duration-100 ease-out">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Seleccionar sucursal
                </p>
              </div>
              <ul className="max-h-64 overflow-y-auto py-1">
                {sucursales.map(sucursal => <li key={sucursal.id}>
                    <button onClick={() => cambiarSucursal(sucursal)} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {sucursal.nombre}
                        </p>
                        <p className="text-xs text-gray-500">
                          {sucursal.direccion}
                        </p>
                      </div>
                      {sucursalSeleccionada.id === sucursal.id && <CheckIcon className="h-4 w-4 text-custom-green-600" />}
                    </button>
                  </li>)}
              </ul>
            </div>}
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-custom-green-100 p-3 rounded-full">
                  <BarChart2Icon className="h-6 w-6 text-custom-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Ventas totales
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        $24,500
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <div className="text-sm">
                <a href="#" className="font-medium text-custom-green-600 hover:text-custom-green-800 flex items-center">
                  Ver todo
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  <UsersIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Clientes nuevos
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        38
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <div className="text-sm">
                <a href="#" className="font-medium text-custom-green-600 hover:text-custom-green-800 flex items-center">
                  Ver todo
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                  <ShoppingBagIcon className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pedidos
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        156
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <div className="text-sm">
                <a href="#" className="font-medium text-custom-green-600 hover:text-custom-green-800 flex items-center">
                  Ver todo
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                  <TrendingUpIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Tasa de conversión
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        24.5%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
              <div className="text-sm">
                <a href="#" className="font-medium text-custom-green-600 hover:text-custom-green-800 flex items-center">
                  Ver todo
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          Actividad reciente
          <span className="ml-2 bg-custom-green-100 text-custom-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Hoy
          </span>
        </h2>
        <div className="mt-4 bg-white shadow-md overflow-hidden sm:rounded-lg border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map(item => <li key={item} className="hover:bg-gray-50 transition-colors duration-150">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-custom-green-600 truncate">
                      Pedido #{Math.floor(Math.random() * 10000)}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Completado
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        Cliente: Juan Pérez
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>Hace {Math.floor(Math.random() * 60)} minutos</p>
                    </div>
                  </div>
                </div>
              </li>)}
          </ul>
        </div>
      </div>
    </div>;
};
export default Dashboard;