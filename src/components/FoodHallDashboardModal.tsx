import React, { useState } from 'react';
import { XIcon, DownloadIcon, RefreshCwIcon, ArrowUpIcon, ArrowDownIcon, StoreIcon, ShoppingCartIcon, DollarSignIcon, UsersIcon, ClockIcon, BellIcon, BarChart2Icon, AlertTriangleIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
// Mock data for the Food Hall dashboard
const dailyOrdersData = [{
  name: 'Lun',
  orders: 38,
  amount: 7600
}, {
  name: 'Mar',
  orders: 32,
  amount: 6400
}, {
  name: 'Mié',
  orders: 40,
  amount: 8000
}, {
  name: 'Jue',
  orders: 45,
  amount: 9000
}, {
  name: 'Vie',
  orders: 62,
  amount: 12400
}, {
  name: 'Sáb',
  orders: 78,
  amount: 15600
}, {
  name: 'Dom',
  orders: 55,
  amount: 11000
}];
const weeklyOrdersData = [{
  name: 'Sem 1',
  orders: 250,
  amount: 50000
}, {
  name: 'Sem 2',
  orders: 285,
  amount: 57000
}, {
  name: 'Sem 3',
  orders: 320,
  amount: 64000
}, {
  name: 'Sem 4',
  orders: 350,
  amount: 70000
}];
const monthlyOrdersData = [{
  name: 'Ene',
  orders: 1050,
  amount: 210000
}, {
  name: 'Feb',
  orders: 1150,
  amount: 230000
}, {
  name: 'Mar',
  orders: 1250,
  amount: 250000
}, {
  name: 'Abr',
  orders: 1350,
  amount: 270000
}, {
  name: 'May',
  orders: 1450,
  amount: 290000
}, {
  name: 'Jun',
  orders: 1550,
  amount: 310000
}];
const vendorsPerOrderData = [{
  name: '1 local',
  value: 20
}, {
  name: '2 locales',
  value: 45
}, {
  name: '3 locales',
  value: 25
}, {
  name: '4+ locales',
  value: 10
}];
const customerFrequencyData = [{
  name: 'Primera vez',
  value: 35
}, {
  name: '2-5 veces',
  value: 40
}, {
  name: '6-10 veces',
  value: 15
}, {
  name: '11+ veces',
  value: 10
}];
const waitTimeData = [{
  name: '0-5 min',
  value: 15
}, {
  name: '5-10 min',
  value: 35
}, {
  name: '10-15 min',
  value: 30
}, {
  name: '15-20 min',
  value: 15
}, {
  name: '20+ min',
  value: 5
}];
const notificationsData = [{
  name: 'Enviadas',
  value: 1250
}, {
  name: 'Abiertas',
  value: 1050
}];
const topVendorsData = [{
  name: 'Taquería El Rincón',
  value: 185
}, {
  name: 'Sushi Express',
  value: 165
}, {
  name: 'Burger House',
  value: 140
}, {
  name: 'Pizza Napoli',
  value: 125
}, {
  name: 'Thai Spice',
  value: 110
}, {
  name: 'Pasta Bella',
  value: 95
}];
const errorRateData = [{
  name: 'Órdenes exitosas',
  value: 96
}, {
  name: 'Órdenes rechazadas',
  value: 3
}, {
  name: 'Errores técnicos',
  value: 1
}];
const COLORS = ['#0EA5E9', '#00C896', '#FACC15', '#F97316', '#EF4444', '#8B5CF6'];
const FoodHallDashboardModal = ({
  isOpen,
  onClose
}) => {
  const [timeRange, setTimeRange] = useState('daily');
  const [isLoading, setIsLoading] = useState(false);
  const handleRefreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const handleExportData = () => {
    alert('Datos exportados a CSV');
  };
  // Select data based on time range
  const getChartData = () => {
    switch (timeRange) {
      case 'weekly':
        return weeklyOrdersData;
      case 'monthly':
        return monthlyOrdersData;
      default:
        return dailyOrdersData;
    }
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-[6px]" onClick={onClose} aria-hidden="true" />
      {/* Modal container */}
      <div className="relative w-full max-w-6xl h-[90vh] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 rounded-full mr-3">
              <StoreIcon className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Dashboard: Food Hall
              </h2>
              <p className="text-sm text-gray-500">
                Métricas y análisis del servicio de órdenes unificadas entre
                múltiples locales
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleRefreshData} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500" disabled={isLoading}>
              <RefreshCwIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleExportData} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
              <DownloadIcon className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500" aria-label="Cerrar dashboard">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Dashboard content - scrollable area */}
        <div className="h-[calc(90vh-76px)] overflow-y-auto p-5">
          {/* Time range selector */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-sm">
              <button onClick={() => setTimeRange('daily')} className={`px-4 py-2 text-sm font-medium rounded-l-md ${timeRange === 'daily' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-amber-500`}>
                Diario
              </button>
              <button onClick={() => setTimeRange('weekly')} className={`px-4 py-2 text-sm font-medium ${timeRange === 'weekly' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-amber-500`}>
                Semanal
              </button>
              <button onClick={() => setTimeRange('monthly')} className={`px-4 py-2 text-sm font-medium rounded-r-md ${timeRange === 'monthly' ? 'bg-amber-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-amber-500`}>
                Mensual
              </button>
            </div>
          </div>
          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {/* Card 1 - Total Combined Orders */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <ShoppingCartIcon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Órdenes combinadas
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          1,205
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          16.8%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-amber-600">
                    vs. mes anterior
                  </span>
                </div>
              </div>
            </div>
            {/* Card 2 - Average Vendors Per Transaction */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                    <StoreIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Locales por transacción
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          2.3
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          8.5%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-amber-600">promedio</span>
                </div>
              </div>
            </div>
            {/* Card 3 - Average Order Amount */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <DollarSignIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Monto por orden
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          $215
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          12.3%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-amber-600">promedio</span>
                </div>
              </div>
            </div>
            {/* Card 4 - Average Wait Time */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tiempo de espera
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          12.5 min
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Reducción</span>
                          10.2%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-amber-600">promedio</span>
                </div>
              </div>
            </div>
          </div>
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Orders Chart */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Órdenes por{' '}
                  {timeRange === 'daily' ? 'día' : timeRange === 'weekly' ? 'semana' : 'mes'}
                </h3>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    16.8%
                  </span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getChartData()} margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} formatter={value => [`${value} órdenes`, 'Órdenes']} />
                    <Legend />
                    <Bar dataKey="orders" name="Órdenes combinadas" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Revenue Chart */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Ingresos por{' '}
                  {timeRange === 'daily' ? 'día' : timeRange === 'weekly' ? 'semana' : 'mes'}
                </h3>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    20.5%
                  </span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getChartData()} margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} formatter={value => [`$${value}`, 'Ingresos']} />
                    <Legend />
                    <Line type="monotone" dataKey="amount" name="Ingresos" stroke="#10B981" strokeWidth={2} dot={{
                    r: 4
                  }} activeDot={{
                    r: 6
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Vendors Per Transaction and Customer Frequency */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Vendors Per Transaction */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Locales por transacción
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={vendorsPerOrderData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                      name,
                      percent
                    }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                        {vendorsPerOrderData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} formatter={value => [`${value}%`, 'Porcentaje']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        1 local
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        20%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: '20%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        2 locales
                      </span>
                      <span className="text-sm font-medium text-amber-600">
                        45%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                      width: '45%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        3 locales
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        25%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                      width: '25%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        4+ locales
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        10%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{
                      width: '10%'
                    }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Customer Frequency */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Frecuencia de órdenes por cliente
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerFrequencyData} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} formatter={value => [`${value}%`, 'Porcentaje']} />
                    <Legend />
                    <Bar dataKey="value" name="Porcentaje de clientes" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Wait Time and Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Wait Time */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Tiempos de espera hasta recolecta
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={waitTimeData} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} formatter={value => [`${value}%`, 'Porcentaje']} />
                    <Legend />
                    <Bar dataKey="value" name="Porcentaje de órdenes" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Tiempo promedio de espera:{' '}
                  <span className="font-medium text-blue-600">
                    12.5 minutos
                  </span>
                </p>
              </div>
            </div>
            {/* Notifications */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Notificaciones enviadas y abiertas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={notificationsData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                        <Cell fill="#F59E0B" />
                        <Cell fill="#10B981" />
                      </Pie>
                      <Tooltip contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} formatter={value => [`${value} notificaciones`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">
                          Enviadas
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        1,250
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{
                      width: '100%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">
                          Abiertas
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        1,050
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                      width: '84%'
                    }}></div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Tasa de apertura:{' '}
                      <span className="font-medium text-green-600">84%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Top Vendors and Error Rate */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top Vendors */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Locales más solicitados
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={topVendorsData} margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} formatter={value => [`${value} órdenes`, 'Cantidad']} />
                    <Bar dataKey="value" name="Órdenes" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Error Rate */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Tasa de errores o rechazos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={errorRateData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                      name,
                      percent
                    }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                        <Cell fill="#10B981" />
                        <Cell fill="#F97316" />
                        <Cell fill="#EF4444" />
                      </Pie>
                      <Tooltip contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} formatter={value => [`${value}%`, 'Porcentaje']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">
                          Órdenes exitosas
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        96%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                      width: '96%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">
                          Órdenes rechazadas
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        3%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-orange-500 h-2.5 rounded-full" style={{
                      width: '3%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-gray-700">
                          Errores técnicos
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        1%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{
                      width: '1%'
                    }}></div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Tasa de éxito total:{' '}
                      <span className="font-medium text-green-600">96%</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button onClick={handleExportData} className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            <DownloadIcon className="h-5 w-5 mr-2 text-gray-400" />
            Exportar datos
          </button>
          <button onClick={onClose} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
            Cerrar
          </button>
        </div>
      </div>
    </div>;
};
export default FoodHallDashboardModal;