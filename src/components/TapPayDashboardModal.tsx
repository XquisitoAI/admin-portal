import React, { useState } from 'react';
import { XIcon, DownloadIcon, RefreshCwIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, DollarSignIcon, UsersIcon, CreditCardIcon, StarIcon, SplitIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// Mock data for the Tap & Pay dashboard
const dailyPaymentsData = [{
  name: 'Lun',
  payments: 48,
  amount: 9600
}, {
  name: 'Mar',
  orders: 42,
  amount: 8400
}, {
  name: 'Mié',
  payments: 52,
  amount: 10400
}, {
  name: 'Jue',
  payments: 58,
  amount: 11600
}, {
  name: 'Vie',
  payments: 75,
  amount: 15000
}, {
  name: 'Sáb',
  payments: 82,
  amount: 16400
}, {
  name: 'Dom',
  payments: 65,
  amount: 13000
}];
const weeklyPaymentsData = [{
  name: 'Sem 1',
  payments: 320,
  amount: 64000
}, {
  name: 'Sem 2',
  payments: 350,
  amount: 70000
}, {
  name: 'Sem 3',
  payments: 380,
  amount: 76000
}, {
  name: 'Sem 4',
  payments: 420,
  amount: 84000
}];
const monthlyPaymentsData = [{
  name: 'Ene',
  payments: 1300,
  amount: 260000
}, {
  name: 'Feb',
  payments: 1400,
  amount: 280000
}, {
  name: 'Mar',
  payments: 1500,
  amount: 300000
}, {
  name: 'Abr',
  payments: 1600,
  amount: 320000
}, {
  name: 'May',
  payments: 1700,
  amount: 340000
}, {
  name: 'Jun',
  payments: 1800,
  amount: 360000
}];
const paymentTypeData = [{
  name: 'Pago dividido',
  value: 40
}, {
  name: 'Pago único',
  value: 60
}];
const closeTimeData = [{
  name: '0-2 min',
  value: 35
}, {
  name: '2-4 min',
  value: 40
}, {
  name: '4-6 min',
  value: 15
}, {
  name: '6-8 min',
  value: 7
}, {
  name: '8+ min',
  value: 3
}];
const adoptionRateData = [{
  name: 'Tap & Pay',
  value: 68
}, {
  name: 'Tradicional',
  value: 32
}];
const feedbackData = [{
  name: '5 estrellas',
  value: 70
}, {
  name: '4 estrellas',
  value: 20
}, {
  name: '3 estrellas',
  value: 7
}, {
  name: '2 estrellas',
  value: 2
}, {
  name: '1 estrella',
  value: 1
}];
const COLORS = ['#00C896', '#0EA5E9', '#FACC15', '#F97316', '#EF4444'];
const TapPayDashboardModal = ({
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
        return weeklyPaymentsData;
      case 'monthly':
        return monthlyPaymentsData;
      default:
        return dailyPaymentsData;
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
            <div className="p-2 bg-purple-100 rounded-full mr-3">
              <CreditCardIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Dashboard: Tap & Pay
              </h2>
              <p className="text-sm text-gray-500">
                Métricas y análisis del servicio de pagos vía NFC
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleRefreshData} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" disabled={isLoading}>
              <RefreshCwIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleExportData} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <DownloadIcon className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" aria-label="Cerrar dashboard">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* Dashboard content - scrollable area */}
        <div className="h-[calc(90vh-76px)] overflow-y-auto p-5">
          {/* Time range selector */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-sm">
              <button onClick={() => setTimeRange('daily')} className={`px-4 py-2 text-sm font-medium rounded-l-md ${timeRange === 'daily' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500`}>
                Diario
              </button>
              <button onClick={() => setTimeRange('weekly')} className={`px-4 py-2 text-sm font-medium ${timeRange === 'weekly' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500`}>
                Semanal
              </button>
              <button onClick={() => setTimeRange('monthly')} className={`px-4 py-2 text-sm font-medium rounded-r-md ${timeRange === 'monthly' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-purple-500`}>
                Mensual
              </button>
            </div>
          </div>
          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {/* Card 1 - Total Payments */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                    <CreditCardIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pagos completados
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          1,475
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
                  <span className="font-medium text-purple-600">
                    vs. mes anterior
                  </span>
                </div>
              </div>
            </div>
            {/* Card 2 - Average Close Time */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tiempo de cierre
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          3.2 min
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Reducción</span>
                          25.6%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-purple-600">promedio</span>
                </div>
              </div>
            </div>
            {/* Card 3 - Split Payments */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <SplitIcon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Cuentas divididas
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          40%
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          12.4%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-purple-600">del total</span>
                </div>
              </div>
            </div>
            {/* Card 4 - Average Ticket */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <DollarSignIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Ticket promedio
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          $210
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          6.8%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium text-purple-600">
                    vs. mes anterior
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Payments Chart */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Pagos por{' '}
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
                  }} formatter={value => [`${value} pagos`, 'Pagos']} />
                    <Legend />
                    <Bar dataKey="payments" name="Pagos completados" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
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
                    22.4%
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
          {/* Payment Type and Close Time */}
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
                        <Cell fill="#8B5CF6" />
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
                      <span className="text-sm font-medium text-purple-600">
                        40%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{
                      width: '40%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Pago único
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        60%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gray-400 h-2.5 rounded-full" style={{
                      width: '60%'
                    }}></div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      El 40% de los clientes divide la cuenta entre varios
                      comensales
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Close Time Chart */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Tiempo de cierre de cuenta
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={closeTimeData} margin={{
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
                    <Bar dataKey="value" name="Porcentaje de pagos" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Tiempo promedio de cierre:{' '}
                  <span className="font-medium text-blue-600">3.2 minutos</span>
                </p>
              </div>
            </div>
          </div>
          {/* Adoption Rate and Customer Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Adoption Rate */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Tasa de adopción vs. pago tradicional
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={adoptionRateData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                      name,
                      percent
                    }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                        <Cell fill="#8B5CF6" />
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
                        Tap & Pay
                      </span>
                      <span className="text-sm font-medium text-purple-600">
                        68%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{
                      width: '68%'
                    }}></div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Tradicional
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        32%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-gray-400 h-2.5 rounded-full" style={{
                      width: '32%'
                    }}></div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      El 68% de los clientes prefiere pagar con Tap & Pay
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Customer Feedback */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Satisfacción del cliente (NPS)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={feedbackData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
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
                    }} formatter={value => [`${value}%`, 'Porcentaje']} />
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
                        70%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                      width: '70%'
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
                        7%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                      width: '7%'
                    }}></div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-3xl font-bold text-purple-600">
                      4.6
                    </div>
                    <div className="text-sm text-gray-500">
                      Calificación promedio
                    </div>
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
                  "¡Increíble! No tuve que esperar para pagar, simplemente
                  acerqué mi teléfono y listo."
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
                  "Muy fácil dividir la cuenta con mis amigos. Cada uno pagó lo
                  suyo sin complicaciones."
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
                  "Me encanta no tener que esperar al mesero para pagar.
                  Simplemente nos levantamos cuando terminamos."
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
                  "El sistema es muy rápido y conveniente. Definitivamente lo
                  prefiero al método tradicional."
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
                  "A veces tuve problemas para que mi teléfono reconociera la
                  tarjeta NFC, pero el personal me ayudó."
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
                  "La aplicación se cerró durante el pago y tuve que comenzar de
                  nuevo. Un poco frustrante."
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-gray-200 p-4 flex justify-end">
          <button onClick={handleExportData} className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <DownloadIcon className="h-5 w-5 mr-2 text-gray-400" />
            Exportar datos
          </button>
          <button onClick={onClose} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Cerrar
          </button>
        </div>
      </div>
    </div>;
};
export default TapPayDashboardModal;