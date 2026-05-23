'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useParams } from 'next/navigation'

// База гео-локаций Грузии с координатами для интерактивного плоттера
const LOCATIONS = [
  { id: 'tbilisi', name: 'Тбилиси', region: 'Столица' },
  { id: 'batumi', name: 'Батуми', region: 'Аджария' },
  { id: 'kazbegi', name: 'Казбеги (Степанцминда)', region: 'Мцхета-Мтианети' },
  { id: 'gudauri', name: 'Гудаури', region: 'Горнолыжный курорт' },
  { id: 'kutaisi', name: 'Кутаиси', region: 'Имерети' },
]

// Матрица расстояний (в км) между точками для точного расчета
const DISTANCE_MATRIX: Record<string, Record<string, number>> = {
  tbilisi: { batumi: 360, kazbegi: 155, gudauri: 120, kutaisi: 230 },
  batumi: { tbilisi: 360, kazbegi: 515, gudauri: 480, kutaisi: 150 },
  kazbegi: { tbilisi: 155, batumi: 515, gudauri: 35, kutaisi: 385 },
  gudauri: { tbilisi: 120, batumi: 480, kazbegi: 35, kutaisi: 350 },
  kutaisi: { tbilisi: 230, batumi: 150, kazbegi: 385, gudauri: 350 },
}

// Тарифная сетка за километр в зависимости от класса автомобиля
const CAR_CLASSES = [
  { id: 'standard', name: 'Комфорт', icon: '🚗', rate: 0.7, description: 'Toyota Camry / Prius', capacity: '4 чел' },
  { id: 'business', name: 'Бизнес', icon: '💼', rate: 1.4, description: 'Mercedes-Benz E-Class', capacity: '3 чел' },
  { id: 'minivan', name: 'Минивэн VIP', icon: '🚐', rate: 1.8, description: 'Mercedes-Benz Vitor / V-Class', capacity: '7 чел' },
]

export default function TransfersPage() {
  const params = useParams()
  const lang = params?.lang || 'ru'

  // Состояния для калькулятора
  const [fromLoc, setFromLoc] = useState('tbilisi')
  const [toLoc, setToLoc] = useState('kazbegi')
  const [selectedClass, setSelectedClass] = useState('standard')
  const [distance, setDistance] = useState(155)
  const [price, setPrice] = useState(0)
  
  // Состояния для отправки заявки
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Пересчет расстояния и цены при изменении параметров
  useEffect(() => {
    if (fromLoc === toLoc) {
      setDistance(0)
      setPrice(0)
      return
    }

    // Ищем расстояние в матрице (в обе стороны)
    const dist = DISTANCE_MATRIX[fromLoc]?.[toLoc] || DISTANCE_MATRIX[toLoc]?.[fromLoc] || 100
    setDistance(dist)

    const currentClass = CAR_CLASSES.find(c => c.id === selectedClass)
    const rate = currentClass ? currentClass.rate : 1
    
    // Базовая стоимость подачи + цена за км
    const totalPrice = Math.round(20 + dist * rate)
    setPrice(totalPrice)
  }, [fromLoc, toLoc, selectedClass])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (price === 0) return

    setIsLoading(true)
    const fromName = LOCATIONS.find(l => l.id === fromLoc)?.name
    const toName = LOCATIONS.find(l => l.id === toLoc)?.name
    const className = CAR_CLASSES.find(c => c.id === selectedClass)?.name

    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_name: name,
          customer_phone: phone,
          service_type: 'transfer',
          service_title: `Трансфер: ${fromName} → ${toName} (${className})`,
          details: `Расстояние: ${distance} км, Расчетная стоимость: $${price}`,
          status: 'new'
        }
      ])

    setIsLoading(false)

    if (!error) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setName('')
        setPhone('')
      }, 4000)
    } else {
      alert('Ошибка: ' + error.message)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Заголовок */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase mb-4">
            Умный расчет <span className="text-blue-600">Трансферов</span>
          </h1>
          <p className="text-gray-500 text-lg">Выбирайте маршрут, управляйте ценой и заказывайте авто мгновенно.</p>
        </div>

        {/* Основной двухколоночный интерактивный бокс */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ЛЕВАЯ КОЛОНКА: Конструктор поездки (7 слотов) */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col gap-8">
            
            {/* Слот 1: Выбор направления (Откуда / Куда) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Откуда</label>
                <select 
                  value={fromLoc}
                  onChange={(e) => setFromLoc(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none appearance-none cursor-pointer"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} ({loc.region})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Куда</label>
                <select 
                  value={toLoc}
                  onChange={(e) => setToLoc(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 font-bold text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none appearance-none cursor-pointer"
                >
                  {LOCATIONS.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name} ({loc.region})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Слот 2: Выбор класса автомобиля */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Класс автомобиля</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CAR_CLASSES.map((car) => {
                  const isSelected = selectedClass === car.id
                  return (
                    <div
                      key={car.id}
                      onClick={() => setSelectedClass(car.id)}
                      className={`cursor-pointer border p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 ${isSelected ? 'border-blue-600 bg-blue-50/50 shadow-md transform -translate-y-1' : 'border-gray-100 bg-white hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-3xl">{car.icon}</span>
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{car.capacity}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{car.name}</h4>
                        <p className="text-xs text-gray-500 mb-3">{car.description}</p>
                        <p className="text-sm font-black text-blue-600">${car.rate}/км</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Слот 3: Форма контактов */}
            <div className="border-t border-gray-100 pt-8">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Данные для заказа</label>
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-6 text-center font-semibold">
                  🎉 Заявка на трансфер успешно отправлена! Наш водитель свяжется с вами.
                </div>
              ) : (
                <form onSubmit={handleBooking} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-base font-medium outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Номер телефона"
                    className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-base font-medium outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || fromLoc === toLoc}
                    className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-black uppercase tracking-wider py-5 rounded-2xl transition-all shadow-[0_10px_20px_rgba(37,99,235,0.15)] mt-2"
                  >
                    {isLoading ? 'Обработка...' : fromLoc === toLoc ? 'Выберите разные точки' : 'Забронировать трансфер'}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* ПРАВАЯ КОЛОНКА: Визуализация маршрута и калькулятор */}
          <div className="lg:col-span-5 bg-gray-900 text-white rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-between min-h-[550px] relative overflow-hidden">
            {/* Текстурный фон радара */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-400">Маршрутный компьютер</span>
              
              {/* Блок цены */}
              <div className="mt-6 mb-8">
                <div className="text-sm font-medium text-gray-400">Финальная стоимость</div>
                <div className="text-6xl md:text-7xl font-black text-white tracking-tighter mt-2 flex items-baseline gap-2">
                  ${price}
                  <span className="text-sm font-bold text-green-400 uppercase tracking-widest">Всё включено</span>
                </div>
              </div>

              {/* Визуальный плоттер пути (SVG/Линии) */}
              <div className="border-t border-gray-800 pt-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="font-bold text-lg text-gray-200">
                      {LOCATIONS.find(l => l.id === fromLoc)?.name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-full">Старт</div>
                </div>

                {/* Интерактивная динамическая дорожная линия */}
                <div className="relative pl-1.5 my-4">
                  <div className="absolute top-0 bottom-0 left-1.5 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
                  <div className="pl-8 py-2">
                    <div className="text-sm font-bold text-gray-400">Дистанция движения</div>
                    <div className="text-2xl font-black text-white mt-1">{distance} км</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-bold text-lg text-gray-200">
                      {LOCATIONS.find(l => l.id === toLoc)?.name}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-widest bg-gray-800 px-3 py-1 rounded-full">Финиш</div>
                </div>
              </div>
            </div>

            {/* Спецификация поездки */}
            <div className="bg-gray-800/50 border border-gray-800 p-5 rounded-2xl flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Включенный багаж:</span>
                <span className="text-white font-semibold">До 4-х больших чемоданов</span>
              </div>
              <div className="flex justify-between">
                <span>Ожидание в аэропорту:</span>
                <span className="text-green-400 font-semibold">Бесплатно (до 2 часов)</span>
              </div>
              <div className="flex justify-between">
                <span>Условия отмены:</span>
                <span className="text-white font-semibold">Бесплатно за 24 часа</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  )
}