import React, { useEffect, useState, useRef } from 'react';
import { SaveIcon } from 'lucide-react';
const Settings = () => {
  // Inicializar con datos del localStorage o valores por defecto
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('restaurantSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      restaurantName: 'Mi Restaurante',
      address: 'Av. Principal 123, Ciudad',
      phone: '555-123-4567',
      email: 'contacto@mirestaurante.com',
      openingHours: {
        monday: {
          open: '09:00',
          close: '22:00',
          closed: false
        },
        tuesday: {
          open: '09:00',
          close: '22:00',
          closed: false
        },
        wednesday: {
          open: '09:00',
          close: '22:00',
          closed: false
        },
        thursday: {
          open: '09:00',
          close: '22:00',
          closed: false
        },
        friday: {
          open: '09:00',
          close: '23:00',
          closed: false
        },
        saturday: {
          open: '10:00',
          close: '23:00',
          closed: false
        },
        sunday: {
          open: '10:00',
          close: '20:00',
          closed: false
        }
      },
      logo: "/Logo.png",
      orderNotifications: true,
      emailNotifications: true,
      smsNotifications: false,
      language: 'es',
      currency: 'MXN'
    };
  });
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(settings.logo);
  // Actualizar logoPreview cuando cambia settings.logo
  useEffect(() => {
    setLogoPreview(settings.logo);
  }, [settings.logo]);
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleHoursChange = (day, field, value) => {
    setSettings({
      ...settings,
      openingHours: {
        ...settings.openingHours,
        [day]: {
          ...settings.openingHours[day],
          [field]: field === 'closed' ? !settings.openingHours[day].closed : value
        }
      }
    });
  };
  const handleLogoChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setLogoPreview(result);
        setSettings({
          ...settings,
          logo: result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    // Guardar configuración en localStorage
    localStorage.setItem('restaurantSettings', JSON.stringify(settings));
    alert('Configuración guardada exitosamente');
  };
  const days = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };
  return <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-900">Configuración</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        {/* Restaurant Information */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Información del restaurante
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Información básica sobre tu restaurante que se mostrará a los
                clientes.
              </p>
              <div className="flex justify-center mt-6">
                {logoPreview && <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-white p-2">
                    <img src={logoPreview} alt="Logo del restaurante" className="max-h-full max-w-full object-contain" />
                  </div>}
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-4">
                  <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700">
                    Nombre del restaurante
                  </label>
                  <input type="text" name="restaurantName" id="restaurantName" value={settings.restaurantName} onChange={handleChange} className="mt-1 focus:ring-custom-green-500 focus:border-custom-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <input type="text" name="address" id="address" value={settings.address} onChange={handleChange} className="mt-1 focus:ring-custom-green-500 focus:border-custom-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input type="text" name="phone" id="phone" value={settings.phone} onChange={handleChange} className="mt-1 focus:ring-custom-green-500 focus:border-custom-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <input type="email" name="email" id="email" value={settings.email} onChange={handleChange} className="mt-1 focus:ring-custom-green-500 focus:border-custom-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="col-span-6">
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                    Logo del restaurante
                  </label>
                  <div className="mt-2">
                    <input type="file" id="logo" name="logo" ref={fileInputRef} onChange={handleLogoChange} className="sr-only" accept="image/jpeg,image/png,image/gif" />
                    <button type="button" onClick={() => fileInputRef.current.click()} className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500">
                      Cambiar logo
                    </button>
                    <p className="mt-1 text-xs text-gray-500">
                      JPG, PNG o GIF. Máximo 5MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Opening Hours */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Horario de atención
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Establece los horarios en que tu restaurante está abierto.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-4">
                {Object.entries(days).map(([day, label]) => <div key={day} className="flex items-center space-x-4">
                    <div className="w-24">
                      <span className="text-sm font-medium text-gray-700">
                        {label}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <input id={`closed-${day}`} name={`closed-${day}`} type="checkbox" checked={settings.openingHours[day].closed} onChange={() => handleHoursChange(day, 'closed', null)} className="h-4 w-4 text-custom-green-600 focus:ring-custom-green-500 border-gray-300 rounded" />
                      <label htmlFor={`closed-${day}`} className="ml-2 text-sm text-gray-700">
                        Cerrado
                      </label>
                    </div>
                    {!settings.openingHours[day].closed && <>
                        <div className="flex items-center">
                          <label htmlFor={`open-${day}`} className="sr-only">
                            Abre
                          </label>
                          <input type="time" id={`open-${day}`} value={settings.openingHours[day].open} onChange={e => handleHoursChange(day, 'open', e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-custom-green-500 focus:border-custom-green-500" />
                        </div>
                        <span className="text-gray-500">a</span>
                        <div className="flex items-center">
                          <label htmlFor={`close-${day}`} className="sr-only">
                            Cierra
                          </label>
                          <input type="time" id={`close-${day}`} value={settings.openingHours[day].close} onChange={e => handleHoursChange(day, 'close', e.target.value)} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-custom-green-500 focus:border-custom-green-500" />
                        </div>
                      </>}
                  </div>)}
              </div>
            </div>
          </div>
        </div>
        {/* Notifications */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Notificaciones
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Decide cómo quieres recibir notificaciones sobre pedidos y
                clientes.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="orderNotifications" name="orderNotifications" type="checkbox" checked={settings.orderNotifications} onChange={handleChange} className="focus:ring-custom-green-500 h-4 w-4 text-custom-green-600 border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="orderNotifications" className="font-medium text-gray-700">
                      Notificaciones de pedidos
                    </label>
                    <p className="text-gray-500">
                      Recibe notificaciones cuando lleguen nuevos pedidos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="emailNotifications" name="emailNotifications" type="checkbox" checked={settings.emailNotifications} onChange={handleChange} className="focus:ring-custom-green-500 h-4 w-4 text-custom-green-600 border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                      Notificaciones por correo
                    </label>
                    <p className="text-gray-500">
                      Recibe notificaciones por correo electrónico.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="smsNotifications" name="smsNotifications" type="checkbox" checked={settings.smsNotifications} onChange={handleChange} className="focus:ring-custom-green-500 h-4 w-4 text-custom-green-600 border-gray-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="smsNotifications" className="font-medium text-gray-700">
                      Notificaciones por SMS
                    </label>
                    <p className="text-gray-500">
                      Recibe notificaciones por mensaje de texto (pueden aplicar
                      cargos).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Regional Settings */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Configuración regional
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Configura el idioma y moneda.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Idioma
                  </label>
                  <select id="language" name="language" value={settings.language} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-custom-green-500 focus:border-custom-green-500 sm:text-sm">
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Moneda
                  </label>
                  <select id="currency" name="currency" value={settings.currency} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-custom-green-500 focus:border-custom-green-500 sm:text-sm">
                    <option value="MXN">Peso Mexicano (MXN)</option>
                    <option value="USD">Dólar Estadounidense (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500">
            Cancelar
          </button>
          <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-custom-green-600 hover:bg-custom-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-green-500 transition-colors duration-200">
            <SaveIcon className="-ml-1 mr-2 h-5 w-5" />
            Guardar
          </button>
        </div>
      </form>
    </div>;
};
export default Settings;