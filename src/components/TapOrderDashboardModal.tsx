import React, { useState } from 'react';
import { XIcon, DownloadIcon, RefreshCwIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, DollarSignIcon, UsersIcon, ShoppingCartIcon, StarIcon, BarChart2Icon, PieChartIcon, TrendingUpIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// Mock data for the dashboard
const dailyOrdersData = [{
  name: 'Lun',
  orders: 42,
  amount: 8400
}, {
  name: 'Mar',
  orders: 38,
  amount: 7600
}, {
  name: 'Mié',
  orders: 45,
  amount: 9000
}, {
  name: 'Jue',
  orders: 52,
  amount: 10400
}, {
  name: 'Vie',
  orders: 68,
  amount: 13600
}, {
  name: 'Sáb',
  orders: 75,
  amount: 15000
}, {
  name: 'Dom',
  orders: 60,
  amount: 12000
}];
const weeklyOrdersData = [{
  name: 'Sem 1',
  orders: 280,
  amount: 56000
}, {
  name: 'Sem 2',
  orders: 310,
  amount: 62000
}, {
  name: 'Sem 3',
  orders: 340,
  amount: 68000
}, {
  name: 'Sem 4',
  orders: 380,
  amount: 76000
}];
const monthlyOrdersData = [{
  name: 'Ene',
  orders: 1200,
  amount: 240000
}, {
  name: 'Feb',
  orders: 1300,
  amount: 260000
}, {
  name: 'Mar',
  orders: 1400,
  amount: 280000
}, {
  name: 'Abr',
  orders: 1500,
  amount: 300000
}, {
  name: 'May',
  orders: 1600,
  amount: 320000
}, {
  name: 'Jun',
  orders: 1800,
  amount: 360000
}];
const serviceTimeData = [{
  name: 'Tap Order',
  value: 12
}, {
  name: 'Tradicional',
  value: 18
}];
const topProductsData = [{
  name: 'Hamburguesa Clásica',
  value: 120
}, {
  name: 'Papas Fritas',
  value: 95
}, {
  name: 'Refresco',
  value: 85
}, {
  name: 'Ensalada César',
  value: 60
}, {
  name: 'Pastel de Chocolate',
  value: 45
}];
const tableUsageData = [{
  name: 'Mesa 1',
  value: 45
}, {
  name: 'Mesa 2',
  value: 38
}, {
  name: 'Mesa 3',
  value: 52
}, {
  name: 'Mesa 4',
  value: 30
}, {
  name: 'Mesa 5',
  value: 65
}, {
  name: 'Mesa 6',
  value: 48
}];
const feedbackData = [{
  name: '5 estrellas',
  value: 65
}, {
  name: '4 estrellas',
  value: 20
}, {
  name: '3 estrellas',
  value: 10
}, {
  name: '2 estrellas',
  value: 3
}, {
  name: '1 estrella',
  value: 2
}];
const COLORS = ['#00C896', '#0EA5E9', '#FACC15', '#F97316', '#EF4444'];
const TapOrderDashboardModal = ({
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
            <div className="p-2 bg-custom-green-100 rounded-full mr-3">
              <TrendingUpIcon className="h-6 w-6 text-custom-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Dashboard: Tap Order & Pay
              </h2>
              <p className="text-sm text-gray-500">
                Métricas y análisis del servicio de pedidos desde la mesa
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleRefreshData} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9]" disabled={isLoading}>
              <RefreshCwIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleExportData} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9]">
              <DownloadIcon className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9]" aria-label="Cerrar dashboard">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Dashboard content - scrollable area */}
        <div className="h-[calc(90vh-76px)] overflow-y-auto p-5">
          {/* Time range selector */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-sm">
              <button onClick={() => setTimeRange('daily')} className={`px-4 py-2 text-sm font-medium rounded-l-md ${timeRange === 'daily' ? 'bg-custom-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-custom-green-500`}>
                Diario
              </button>
              <button onClick={() => setTimeRange('weekly')} className={`px-4 py-2 text-sm font-medium ${timeRange === 'weekly' ? 'bg-custom-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-custom-green-500`}>
                Semanal
              </button>
              <button onClick={() => setTimeRange('monthly')} className={`px-4 py-2 text-sm font-medium rounded-r-md ${timeRange === 'monthly' ? 'bg-custom-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-custom-green-500`}>
                Mensual
              </button>
            </div>
          </div>
          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {/* Card 1 - Total Orders */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-custom-green-100 p-3 rounded-full">
                    <ShoppingCartIcon className="h-6 w-6 text-custom-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total de órdenes
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          1,248
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          12.5%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-custom-green-600">
                    vs. mes anterior
                  </span>
                </div>
              </div>
            </div>
            {/* Card 2 - Total Revenue */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <DollarSignIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Ingresos totales
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          $249,600
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          18.2%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-custom-green-600">
                    vs. mes anterior
                  </span>
                </div>
              </div>
            </div>
            {/* Card 3 - Unique Customers */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <UsersIcon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Clientes únicos
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          856
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          9.3%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-custom-green-600">
                    vs. mes anterior
                  </span>
                </div>
              </div>
            </div>
            {/* Card 4 - Average Ticket */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                    <BarChart2Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Ticket promedio
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          $200
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          5.2%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-custom-green-600">
                    vs. mes anterior
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Performance Chart */}
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
                    15.3%
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
                    <Bar dataKey="orders" name="Órdenes" fill="#00C896" radius={[4, 4, 0, 0]} />
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
                    18.2%
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
                    <Line type="monotone" dataKey="amount" name="Ingresos" stroke="#0EA5E9" strokeWidth={2} dot={{
                    r: 4
                  }} activeDot={{
                    r: 6
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Service Time */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Tiempo de servicio (minutos)
              </h3>
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                  33.3% más rápido
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center mb-6">
                  <div className="text-center mr-8">
                    <div className="text-5xl font-bold text-custom-green-600 mb-2">
                      12
                    </div>
                    <div className="text-sm text-gray-500">Tap Order & Pay</div>
                  </div>
                  <div className="text-center ml-8">
                    <div className="text-5xl font-bold text-gray-400 mb-2">
                      18
                    </div>
                    <div className="text-sm text-gray-500">
                      Pedido tradicional
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-md bg-gray-200 rounded-full h-4">
                  <div className="bg-custom-green-600 h-4 rounded-full" style={{
                  width: '67%'
                }}></div>
                </div>
                <div className="mt-2 text-sm text-gray-500 text-center">
                  Tap Order & Pay reduce el tiempo de servicio en un 33.3%
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={serviceTimeData} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 20]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} formatter={value => [`${value} minutos`, 'Tiempo']} />
                    <Bar dataKey="value" name="Tiempo (min)" fill="#00C896" radius={[0, 4, 4, 0]}>
                      <Cell fill="#00C896" />
                      <Cell fill="#94A3B8" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Customer Preferences */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Top Products */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Productos más ordenados
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={topProductsData} margin={{
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
                    <Bar dataKey="value" name="Cantidad" fill="#0EA5E9" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Table Usage */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Uso por mesa
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={tableUsageData} margin={{
                  top: 5,
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
                  }} formatter={value => [`${value} usos`, 'Usos']} />
                    <Bar dataKey="value" name="Usos" fill="#FACC15" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Customer Feedback */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Satisfacción del cliente
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={feedbackData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" label={({
                    name,
                    percent
                  }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {feedbackData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} formatter={value => [`${value} clientes`, 'Cantidad']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      65%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: '65%'
                  }}></div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      20%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{
                    width: '20%'
                  }}></div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      10%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                    width: '10%'
                  }}></div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300" />
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
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                      <StarIcon className="h-5 w-5 text-gray-300" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      2%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{
                    width: '2%'
                  }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-custom-green-600">
                    4.4
                  </div>
                  <div className="text-sm text-gray-500">
                    Calificación promedio
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Common Feedback */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-100 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Comentarios frecuentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-gray-700">
                  "¡Excelente servicio! Muy fácil de usar y la comida llegó
                  rápido."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-gray-700">
                  "Me encantó no tener que esperar al mesero para ordenar más
                  bebidas."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-gray-700">
                  "Muy conveniente poder pagar sin tener que esperar la cuenta."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-gray-700">
                  "El sistema es bueno pero tuve problemas para conectarme al
                  principio."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-gray-700">
                  "Tuve que pedir ayuda porque no entendía cómo funcionaba el
                  código QR."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300 mr-1" />
                  <StarIcon className="h-5 w-5 text-gray-300" />
                </div>
                <p className="text-gray-700">
                  "La aplicación se cerró varias veces y tuve que volver a
                  escanear."
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button onClick={handleExportData} className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500">
            <DownloadIcon className="h-5 w-5 mr-2 text-gray-400" />
            Exportar datos
          </button>
          <button onClick={onClose} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-custom-green-600 hover:bg-custom-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500">
            Cerrar
          </button>
        </div>
      </div>
    </div>;
};
export default TapOrderDashboardModal;