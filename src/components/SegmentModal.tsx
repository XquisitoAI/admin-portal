import React, { useEffect, useState, useRef } from 'react';
import { XIcon, FilterIcon, UsersIcon, TagIcon, CalendarIcon, DollarSignIcon, ShoppingCartIcon, HeartIcon, MapPinIcon, ClockIcon, TrendingUpIcon, CheckCircleIcon, RefreshCwIcon } from 'lucide-react';
const SegmentModal = ({
  isOpen,
  onClose,
  onApplySegment
}) => {
  const [segmentName, setSegmentName] = useState('');
  const [filters, setFilters] = useState({
    tags: 'all',
    gender: 'all',
    age_range: 'all',
    location: 'all',
    number_of_visits: 'all',
    last_visit: 'all',
    single_purchase_total: 'all',
    total_spent: 'all',
    favorite_category: 'all',
    registration_date: 'all'
  });
  const [nameError, setNameError] = useState('');
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);
  // Contar filtros activos
  const activeFiltersCount = Object.values(filters).filter(value => value !== 'all').length;
  // Manejar cierre con tecla ESC
  useEffect(() => {
    const handleEscKey = event => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);
  // Enfocar el campo de nombre al abrir el modal
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current.focus();
        nameInputRef.current.select();
      }, 100);
    }
  }, [isOpen]);
  // Validar nombre del segmento
  const validateName = value => {
    if (!value.trim()) {
      setNameError('Ingresa un nombre para el segmento');
      return false;
    }
    setNameError('');
    return true;
  };
  const handleNameChange = e => {
    const value = e.target.value;
    setSegmentName(value);
    validateName(value);
  };
  // Manejar cambios en filtros
  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };
  // Aplicar segmento
  const handleApplySegment = () => {
    if (!validateName(segmentName)) {
      nameInputRef.current?.focus();
      return;
    }
    onApplySegment({
      segment_name: segmentName,
      filters: filters,
      activeFiltersCount: activeFiltersCount
    });
  };
  // Limpiar filtros
  const handleClearFilters = () => {
    setFilters({
      tags: 'all',
      gender: 'all',
      age_range: 'all',
      location: 'all',
      number_of_visits: 'all',
      last_visit: 'all',
      single_purchase_total: 'all',
      total_spent: 'all',
      favorite_category: 'all',
      registration_date: 'all'
    });
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-35 backdrop-blur-[6px]" onClick={onClose} aria-hidden="true" />
      {/* Modal */}
      <div ref={modalRef} className="relative w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] animate-in slide-in-from-bottom-4 duration-200 ease-out" role="dialog" aria-modal="true" aria-labelledby="segment-modal-title">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-custom-green-100 rounded-full mr-3">
              <FilterIcon className="h-6 w-6 text-custom-green-600" />
            </div>
            <div>
              <h2 id="segment-modal-title" className="text-2xl font-semibold text-gray-900">
                Crear segmento
              </h2>
              <p className="text-sm text-gray-500">
                Define los criterios para segmentar a tus clientes
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9]" aria-label="Cerrar modal">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        {/* Segment Name */}
        <div className="mb-6">
          <label htmlFor="segment-name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del segmento
          </label>
          <input ref={nameInputRef} type="text" id="segment-name" value={segmentName} onChange={handleNameChange} placeholder="Ej. Clientes frecuentes" className={`w-full px-3 py-2 border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]`} />
          {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
        </div>
        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TagIcon className="h-4 w-4 inline mr-1" />
              Etiquetas
            </label>
            <select value={filters.tags} onChange={e => handleFilterChange('tags', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Todas las etiquetas</option>
              <option value="vip">VIP</option>
              <option value="frequent">Frecuente</option>
              <option value="new">Nuevo cliente</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UsersIcon className="h-4 w-4 inline mr-1" />
              Género
            </label>
            <select value={filters.gender} onChange={e => handleFilterChange('gender', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Todos los géneros</option>
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
            </select>
          </div>
          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="h-4 w-4 inline mr-1" />
              Rango de edad
            </label>
            <select value={filters.age_range} onChange={e => handleFilterChange('age_range', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Todas las edades</option>
              <option value="18-25">18-25 años</option>
              <option value="26-35">26-35 años</option>
              <option value="36-45">36-45 años</option>
              <option value="46-55">46-55 años</option>
              <option value="56+">56+ años</option>
            </select>
          </div>
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="h-4 w-4 inline mr-1" />
              Ubicación
            </label>
            <select value={filters.location} onChange={e => handleFilterChange('location', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Todas las ubicaciones</option>
              <option value="cdmx">Ciudad de México</option>
              <option value="guadalajara">Guadalajara</option>
              <option value="monterrey">Monterrey</option>
              <option value="puebla">Puebla</option>
              <option value="other">Otras ciudades</option>
            </select>
          </div>
          {/* Number of visits */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <TrendingUpIcon className="h-4 w-4 inline mr-1" />
              Número de visitas
            </label>
            <select value={filters.number_of_visits} onChange={e => handleFilterChange('number_of_visits', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Cualquier cantidad</option>
              <option value="1">1 visita</option>
              <option value="2-5">2-5 visitas</option>
              <option value="more_than_5">Más de 5 visitas</option>
              <option value="more_than_10">Más de 10 visitas</option>
            </select>
          </div>
          {/* Last visit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ClockIcon className="h-4 w-4 inline mr-1" />
              Última visita
            </label>
            <select value={filters.last_visit} onChange={e => handleFilterChange('last_visit', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Cualquier fecha</option>
              <option value="last_7_days">Últimos 7 días</option>
              <option value="last_30_days">Últimos 30 días</option>
              <option value="last_90_days">Últimos 90 días</option>
              <option value="more_than_90_days">Más de 90 días</option>
            </select>
          </div>
          {/* Single purchase total */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ShoppingCartIcon className="h-4 w-4 inline mr-1" />
              Ticket promedio
            </label>
            <select value={filters.single_purchase_total} onChange={e => handleFilterChange('single_purchase_total', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Cualquier monto</option>
              <option value="less_than_200">Menos de $200</option>
              <option value="200-500">$200 - $500</option>
              <option value="greater_than_500">Más de $500</option>
              <option value="greater_than_1000">Más de $1,000</option>
            </select>
          </div>
          {/* Total spent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSignIcon className="h-4 w-4 inline mr-1" />
              Total gastado
            </label>
            <select value={filters.total_spent} onChange={e => handleFilterChange('total_spent', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Cualquier monto</option>
              <option value="less_than_1000">Menos de $1,000</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="greater_than_5000">Más de $5,000</option>
              <option value="greater_than_10000">Más de $10,000</option>
            </select>
          </div>
          {/* Favorite category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <HeartIcon className="h-4 w-4 inline mr-1" />
              Categoría favorita
            </label>
            <select value={filters.favorite_category} onChange={e => handleFilterChange('favorite_category', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Todas las categorías</option>
              <option value="beverages">Bebidas</option>
              <option value="food">Comida</option>
              <option value="desserts">Postres</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>
          {/* Registration date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="h-4 w-4 inline mr-1" />
              Fecha de registro
            </label>
            <select value={filters.registration_date} onChange={e => handleFilterChange('registration_date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C896]">
              <option value="all">Cualquier fecha</option>
              <option value="last_30_days">Últimos 30 días</option>
              <option value="last_90_days">Últimos 90 días</option>
              <option value="last_year">Último año</option>
              <option value="more_than_year">Más de un año</option>
            </select>
          </div>
        </div>
        {/* Active filters summary */}
        {activeFiltersCount > 0 && <div className="mb-6 p-4 bg-custom-green-50 rounded-lg border border-custom-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-custom-green-600 mr-2" />
                <span className="text-sm font-medium text-custom-green-800">
                  {activeFiltersCount} filtro
                  {activeFiltersCount !== 1 ? 's' : ''} activo
                  {activeFiltersCount !== 1 ? 's' : ''}
                </span>
              </div>
              <button onClick={handleClearFilters} className="text-sm text-custom-green-600 hover:text-custom-green-700 font-medium flex items-center">
                <RefreshCwIcon className="h-4 w-4 mr-1" />
                Limpiar filtros
              </button>
            </div>
          </div>}
        {/* Footer */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9]">
            Cancelar
          </button>
          <button type="button" onClick={handleApplySegment} disabled={!segmentName.trim()} className={`px-4 py-2 rounded-lg text-white ${!segmentName.trim() ? 'bg-gray-300 cursor-not-allowed' : 'bg-custom-green-600 hover:bg-custom-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500`}>
            Aplicar segmento
          </button>
        </div>
      </div>
    </div>;
};
export default SegmentModal;