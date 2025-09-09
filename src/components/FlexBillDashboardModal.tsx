import React, { useState } from 'react';
import { XIcon, DownloadIcon, RefreshCwIcon, ArrowUpIcon, ArrowDownIcon, UsersIcon, DollarSignIcon, ClockIcon, BarChart2Icon, SplitIcon, TableIcon, StarIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// Mock data for the Flex Bill dashboard
const dailySharedOrdersData = [{
  name: 'Lun',
  orders: 32,
  diners: 128
}, {
  name: 'Mar',
  orders: 28,
  diners: 98
}, {
  name: 'Mié',
  orders: 34,
  diners: 119
}, {
  name: 'Jue',
  orders: 40,
  diners: 160
}, {
  name: 'Vie',
  orders: 58,
  diners: 232
}, {
  name: 'Sáb',
  orders: 65,
  diners: 325
}, {
  name: 'Dom',
  orders: 52,
  diners: 208
}];
const weeklySharedOrdersData = [{
  name: 'Sem 1',
  orders: 210,
  diners: 840
}, {
  name: 'Sem 2',
  orders: 245,
  diners: 980
}, {
  name: 'Sem 3',
  orders: 275,
  diners: 1100
}, {
  name: 'Sem 4',
  orders: 310,
  diners: 1240
}];
const monthlySharedOrdersData = [{
  name: 'Ene',
  orders: 950,
  diners: 3800
}, {
  name: 'Feb',
  orders: 1050,
  diners: 4200
}, {
  name: 'Mar',
  orders: 1150,
  diners: 4600
}, {
  name: 'Abr',
  orders: 1250,
  diners: 5000
}, {
  name: 'May',
  orders: 1350,
  diners: 5400
}, {
  name: 'Jun',
  orders: 1450,
  diners: 5800
}];
const paymentTypeData = [{
  name: 'Pago dividido',
  value: 65
}, {
  name: 'Pago único',
  value: 35
}];
const paymentTimeData = [{
  name: '0-5 min',
  value: 25
}, {
  name: '5-10 min',
  value: 40
}, {
  name: '10-15 min',
  value: 20
}, {
  name: '15-20 min',
  value: 10
}, {
  name: '20+ min',
  value: 5
}];
const tableUsageData = [{
  name: 'Mesa 1',
  value: 28
}, {
  name: 'Mesa 2',
  value: 32
}, {
  name: 'Mesa 3',
  value: 45
}, {
  name: 'Mesa 4',
  value: 22
}, {
  name: 'Mesa 5',
  value: 56
}, {
  name: 'Mesa 6',
  value: 38
}, {
  name: 'Mesa 7',
  value: 41
}, {
  name: 'Mesa 8',
  value: 30
}];
const feedbackData = [{
  name: '5 estrellas',
  value: 60
}, {
  name: '4 estrellas',
  value: 25
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
const FlexBillDashboardModal = ({
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
        return weeklySharedOrdersData;
      case 'monthly':
        return monthlySharedOrdersData;
      default:
        return dailySharedOrdersData;
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
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <SplitIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Dashboard: Flex Bill
              </h2>
              <p className="text-sm text-gray-500">
                Métricas y análisis del servicio de cuentas compartidas y pagos
                divididos
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleRefreshData} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" disabled={isLoading}>
              <RefreshCwIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleExportData} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <DownloadIcon className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-label="Cerrar dashboard">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Dashboard content - scrollable area */}
        <div className="h-[calc(90vh-76px)] overflow-y-auto p-5">
          {/* Time range selector */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-sm">
              <button onClick={() => setTimeRange('daily')} className={`px-4 py-2 text-sm font-medium rounded-l-md ${timeRange === 'daily' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}>
                Diario
              </button>
              <button onClick={() => setTimeRange('weekly')} className={`px-4 py-2 text-sm font-medium ${timeRange === 'weekly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}>
                Semanal
              </button>
              <button onClick={() => setTimeRange('monthly')} className={`px-4 py-2 text-sm font-medium rounded-r-md ${timeRange === 'monthly' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500`}>
                Mensual
              </button>
            </div>
          </div>
          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {/* Card 1 - Total Shared Orders */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <SplitIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Órdenes compartidas
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          965
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          14.2%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-blue-600">
                    vs. mes anterior
                  </span>
                </div>
              </div>
            </div>
            {/* Card 2 - Average Diners Per Account */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                    <UsersIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Comensales por cuenta
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          4.2
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          5.8%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-blue-600">promedio</span>
                </div>
              </div>
            </div>
            {/* Card 3 - Average Ticket Per Diner */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <DollarSignIcon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Ticket por comensal
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          $185
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          7.3%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-blue-600">promedio</span>
                </div>
              </div>
            </div>
            {/* Card 4 - Average Payment Time */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <ClockIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tiempo de pago
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          8.5 min
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Reducción</span>
                          12.4%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-blue-600">promedio</span>
                </div>
              </div>
            </div>
          </div>
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Shared Orders Chart */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Órdenes compartidas por{' '}
                  {timeRange === 'daily' ? 'día' : timeRange === 'weekly' ? 'semana' : 'mes'}
                </h3>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    14.2%
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
                    <Bar dataKey="orders" name="Órdenes compartidas" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Diners Chart */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Comensales por{' '}
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
                  }} formatter={value => [`${value} comensales`, 'Comensales']} />
                    <Legend />
                    <Line type="monotone" dataKey="diners" name="Comensales" stroke="#8B5CF6" strokeWidth={2} dot={{
                    r: 4
                  }} activeDot={{
                    r: 6
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Payment Type and Time Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Payment Type Chart */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Tipo de pago
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={paymentTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                      name,
                      percent
                    }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                        <Cell fill="#0EA5E9" />
                        <Cell fill="#94A3B8" />
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
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Pago dividido
                      </span>
                      <span className="text-sm font-medium text-blue-600">
                        65%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{
                      width: '65%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Pago único
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        35%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gray-400 h-2.5 rounded-full" style={{
                      width: '35%'
                    }}></div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      El 65% de los clientes prefiere dividir la cuenta entre
                      los comensales
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Payment Time Chart */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Tiempo de pago desde primer escaneo
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paymentTimeData} margin={{
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
                    <Bar dataKey="value" name="Porcentaje de órdenes" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Tiempo promedio de pago:{' '}
                  <span className="font-medium text-green-600">
                    8.5 minutos
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* Table Usage Chart */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-100 mb-6">
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
                  <Legend />
                  <Bar dataKey="value" name="Usos de Flex Bill" fill="#FACC15" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Total de mesas que utilizan Flex Bill:{' '}
                <span className="font-medium text-blue-600">8 mesas</span>
              </p>
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
                      60%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: '60%'
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
                      25%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{
                    width: '25%'
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
                  <div className="text-3xl font-bold text-blue-600">4.3</div>
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
                  "¡Genial! Poder dividir la cuenta sin problemas nos facilitó
                  mucho la salida."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-gray-700">
                  "Muy conveniente para grupos grandes. Cada uno pagó lo suyo
                  sin complicaciones."
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
                  "Me encantó no tener que hacer cuentas complicadas para
                  dividir el pago."
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
                  "El sistema es bueno pero algunos amigos tuvieron problemas
                  para unirse a la cuenta."
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
                  "A veces se desconectaba y teníamos que volver a escanear la
                  mesa."
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
                  "No todos en mi grupo pudieron conectarse, tuvimos que pedir
                  ayuda al mesero."
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button onClick={handleExportData} className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <DownloadIcon className="h-5 w-5 mr-2 text-gray-400" />
            Exportar datos
          </button>
          <button onClick={onClose} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cerrar
          </button>
        </div>
      </div>
    </div>;
};
export default FlexBillDashboardModal;