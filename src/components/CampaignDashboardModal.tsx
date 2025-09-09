import React, { useState } from 'react';
import { XIcon, DownloadIcon, RefreshCwIcon, ArrowUpIcon, ArrowDownIcon, TagIcon, DollarSignIcon, UsersIcon, PercentIcon, BarChart2Icon, PieChartIcon, TrendingUpIcon, CalendarIcon, UserPlusIcon, MailIcon, MessageSquareIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';
// Mock data for the dashboard
const generateDailyData = campaign => [{
  name: 'Lun',
  sent: 42,
  redeemed: 18,
  revenue: 1800
}, {
  name: 'Mar',
  sent: 38,
  redeemed: 15,
  revenue: 1500
}, {
  name: 'Mié',
  sent: 45,
  redeemed: 22,
  revenue: 2200
}, {
  name: 'Jue',
  sent: 52,
  redeemed: 28,
  revenue: 2800
}, {
  name: 'Vie',
  sent: 68,
  redeemed: 40,
  revenue: 4000
}, {
  name: 'Sáb',
  sent: 75,
  redeemed: 45,
  revenue: 4500
}, {
  name: 'Dom',
  sent: 60,
  redeemed: 32,
  revenue: 3200
}];
const generateWeeklyData = campaign => [{
  name: 'Sem 1',
  sent: 280,
  redeemed: 120,
  revenue: 12000
}, {
  name: 'Sem 2',
  sent: 310,
  redeemed: 145,
  revenue: 14500
}, {
  name: 'Sem 3',
  sent: 340,
  redeemed: 165,
  revenue: 16500
}, {
  name: 'Sem 4',
  sent: 380,
  redeemed: 190,
  revenue: 19000
}];
const generateMonthlyData = campaign => [{
  name: 'Ene',
  sent: 1200,
  redeemed: 580,
  revenue: 58000
}, {
  name: 'Feb',
  sent: 1300,
  redeemed: 620,
  revenue: 62000
}, {
  name: 'Mar',
  sent: 1400,
  redeemed: 680,
  revenue: 68000
}, {
  name: 'Abr',
  sent: 1500,
  redeemed: 720,
  revenue: 72000
}, {
  name: 'May',
  sent: 1600,
  redeemed: 760,
  revenue: 76000
}, {
  name: 'Jun',
  sent: 1800,
  redeemed: 840,
  revenue: 84000
}];
const generateChannelData = campaign => [{
  name: 'Email',
  value: 75
}, {
  name: 'SMS',
  value: 25
}];
const generateUserData = campaign => [{
  id: 1,
  name: 'Ana García',
  email: 'ana.garcia@email.com',
  date: '2023-10-15',
  channel: 'Email'
}, {
  id: 2,
  name: 'Carlos Rodríguez',
  email: 'carlos.rodriguez@email.com',
  date: '2023-10-16',
  channel: 'Email'
}, {
  id: 3,
  name: 'Sofía Martínez',
  email: 'sofia.martinez@email.com',
  date: '2023-10-17',
  channel: 'SMS'
}, {
  id: 4,
  name: 'Miguel López',
  email: 'miguel.lopez@email.com',
  date: '2023-10-18',
  channel: 'Email'
}, {
  id: 5,
  name: 'Laura Hernández',
  email: 'laura.hernandez@email.com',
  date: '2023-10-19',
  channel: 'SMS'
}, {
  id: 6,
  name: 'Javier González',
  email: 'javier.gonzalez@email.com',
  date: '2023-10-20',
  channel: 'Email'
}, {
  id: 7,
  name: 'Patricia Díaz',
  email: 'patricia.diaz@email.com',
  date: '2023-10-21',
  channel: 'Email'
}, {
  id: 8,
  name: 'Fernando Pérez',
  email: 'fernando.perez@email.com',
  date: '2023-10-22',
  channel: 'SMS'
}];
const COLORS = ['#00C896', '#0EA5E9', '#FACC15', '#F97316', '#EF4444'];
const CampaignDashboardModal = ({
  isOpen,
  onClose,
  campaign
}) => {
  const [timeRange, setTimeRange] = useState('daily');
  const [isLoading, setIsLoading] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState('all');
  // Generate data based on the campaign
  const dailyData = generateDailyData(campaign);
  const weeklyData = generateWeeklyData(campaign);
  const monthlyData = generateMonthlyData(campaign);
  const channelData = generateChannelData(campaign);
  const userData = generateUserData(campaign);
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
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };
  // Filter users by channel if needed
  const getFilteredUsers = () => {
    if (selectedChannel === 'all') return userData;
    return userData.filter(user => user.channel.toLowerCase() === selectedChannel.toLowerCase());
  };
  // Calculate KPIs
  const totalSent = getChartData().reduce((sum, item) => sum + item.sent, 0);
  const totalRedeemed = getChartData().reduce((sum, item) => sum + item.redeemed, 0);
  const conversionRate = totalSent > 0 ? Math.round(totalRedeemed / totalSent * 100) : 0;
  const totalRevenue = getChartData().reduce((sum, item) => sum + item.revenue, 0);
  const newCustomers = Math.round(totalRedeemed * 0.35); // Assuming 35% are new customers
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
              <TagIcon className="h-6 w-6 text-custom-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Dashboard: {campaign.name}
              </h2>
              <p className="text-sm text-gray-500">
                Métricas y análisis de la campaña de recompensas
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
          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-sm font-medium text-gray-500">
                  Filtrar por canal:
                </span>
              </div>
              <div className="inline-flex rounded-md shadow-sm">
                <button onClick={() => setSelectedChannel('all')} className={`px-4 py-2 text-sm font-medium rounded-l-md ${selectedChannel === 'all' ? 'bg-custom-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-custom-green-500`}>
                  Todos
                </button>
                <button onClick={() => setSelectedChannel('email')} className={`px-4 py-2 text-sm font-medium ${selectedChannel === 'email' ? 'bg-custom-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-l border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-custom-green-500`}>
                  Email
                </button>
                <button onClick={() => setSelectedChannel('sms')} className={`px-4 py-2 text-sm font-medium rounded-r-md ${selectedChannel === 'sms' ? 'bg-custom-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 focus:z-10 focus:outline-none focus:ring-1 focus:ring-custom-green-500`}>
                  SMS
                </button>
              </div>
            </div>
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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-6">
            {/* Card 1 - Cupones enviados */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-custom-green-100 p-3 rounded-full">
                    <MailIcon className="h-6 w-6 text-custom-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Cupones enviados
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {totalSent}
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
            </div>
            {/* Card 2 - Cupones canjeados */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                    <TagIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Cupones canjeados
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {totalRedeemed}
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
            </div>
            {/* Card 3 - Tasa de conversión */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <PercentIcon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Tasa de conversión
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {conversionRate}%
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          5.3%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 4 - Nuevos clientes */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                    <UserPlusIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Nuevos clientes
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {newCustomers}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          8.4%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {/* Card 5 - Monto redimido */}
            <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                    <DollarSignIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Monto redimido
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          ${totalRevenue}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                          <span className="sr-only">Incremento</span>
                          15.6%
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Canjes por periodo */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Canjes por{' '}
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
                  }} formatter={value => [`${value} cupones`, 'Canjes']} />
                    <Legend />
                    <Bar dataKey="redeemed" name="Cupones canjeados" fill="#00C896" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Ingresos atribuidos */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Ingresos atribuidos por{' '}
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
                    <Line type="monotone" dataKey="revenue" name="Ingresos" stroke="#0EA5E9" strokeWidth={2} dot={{
                    r: 4
                  }} activeDot={{
                    r: 6
                  }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          {/* Enviados vs. Canjeados */}
          <div className="bg-white p-5 rounded-lg shadow border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Comparativa: Enviados vs. Canjeados
              </h3>
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Tasa de conversión: {conversionRate}%
                </span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={getChartData()} margin={{
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
                }} />
                  <Legend />
                  <Bar dataKey="sent" name="Cupones enviados" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="redeemed" name="Cupones canjeados" fill="#00C896" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="redeemed" name="Tendencia de canjes" stroke="#0EA5E9" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Campaign Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Campaign Details */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Detalles de la campaña
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Nombre de la campaña
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {campaign.name}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Template aplicado
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {campaign.templateName || 'Template predeterminado'}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Segmento utilizado
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {campaign.segment || 'Todos los clientes'}
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Fecha inicio
                    </h4>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Fecha fin
                    </h4>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Puntos requeridos
                  </h4>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {campaign.pointsRequired} puntos
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estado</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-xs font-medium ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {campaign.status === 'active' ? 'Activa' : campaign.status === 'paused' ? 'Pausada' : 'Expirada'}
                  </span>
                </div>
              </div>
            </div>
            {/* Channel Distribution */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Distribución por canal
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={channelData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                    name,
                    percent
                  }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      <Cell fill="#0EA5E9" />
                      <Cell fill="#FACC15" />
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
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-[#0EA5E9] rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Email</span>
                  </div>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-[#FACC15] rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">SMS</span>
                  </div>
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
            </div>
            {/* Campaign Image */}
            <div className="bg-white p-5 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Vista previa
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900">
                  {campaign.emailSubject}
                </p>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {campaign.emailBody}
                </p>
                <div className="flex justify-center mt-3">
                  <button className="bg-custom-green-600 text-white text-sm px-4 py-2 rounded-md">
                    {campaign.cta || 'Ver oferta'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* User Table Toggle */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Usuarios que canjearon
            </h3>
            <button onClick={() => setShowUserTable(!showUserTable)} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-custom-green-700 bg-custom-green-100 hover:bg-custom-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500">
              {showUserTable ? 'Ocultar tabla' : 'Mostrar tabla'}
            </button>
          </div>
          {/* User Table */}
          {showUserTable && <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de canje
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Canal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getFilteredUsers().map(user => <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-500">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {user.date}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.channel === 'Email' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {user.channel === 'Email' ? <MailIcon className="mr-1 h-3 w-3" /> : <MessageSquareIcon className="mr-1 h-3 w-3" />}
                            {user.channel}
                          </span>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>}
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
export default CampaignDashboardModal;