'use client'

import { useState } from 'react'

export default function BookingWidget() {
  const [city, setCity] = useState('Tbilisi')
  
  // Получаем сегодняшнюю дату в формате YYYY-MM-DD для блокировки прошлых дат
  const today = new Date().toISOString().split('T')[0]
  
  const [checkin, setCheckin] = useState(today)
  
  // По умолчанию ставим выезд на следующий день
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const [checkout, setCheckout] = useState(tomorrow.toISOString().split('T')[0])
  
  const [guests, setGuests] = useState('2')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Формируем правильные параметры для Booking.com
    const params = new URLSearchParams({
      ss: city,
      checkin: checkin,
      checkout: checkout,
      group_adults: guests,
      no_rooms: '1' // По умолчанию ищем 1 номер
    })
    
    // Склеиваем базовый URL Букинга с нашими параметрами
    const bookingUrl = `https://www.booking.com/searchresults.ru.html?${params.toString()}`
    
    window.open(bookingUrl, '_blank')
  }

  return (
    <section className="py-20 relative z-10 px-6">
      <div className="max-w-[1200px] mx-auto bg-white/40 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">
              Где остановиться?
            </h2>
            <p className="text-gray-600 mt-3 text-lg font-medium">Лучшие отели и апартаменты Грузии по ценам от партнеров.</p>
          </div>
          <div className="bg-[#003580] text-white px-6 py-3 rounded-2xl font-bold text-xl tracking-wider shadow-md">
            Booking.com
          </div>
        </div>

        <form onSubmit={handleSearch} className="bg-white p-4 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col md:flex-row gap-4">
          
          <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Направление</label>
            <select 
              value={city} 
              onChange={e => setCity(e.target.value)} 
              className="w-full bg-transparent text-gray-900 font-bold text-lg outline-none cursor-pointer"
            >
              <option value="Tbilisi">Тбилиси</option>
              <option value="Batumi">Батуми</option>
              <option value="Gudauri">Гудаури</option>
              <option value="Kazbegi">Казбеги</option>
              <option value="Kutaisi">Кутаиси</option>
            </select>
          </div>

          <div className="flex-[1.5] px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 flex gap-4">
            <div className="w-1/2">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Заезд</label>
              <input 
                type="date" 
                required
                min={today}
                value={checkin} 
                onChange={e => setCheckin(e.target.value)} 
                className="w-full bg-transparent text-gray-900 font-bold text-base md:text-lg outline-none cursor-pointer" 
              />
            </div>
            <div className="w-1/2 border-l border-gray-100 pl-4">
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Выезд</label>
              <input 
                type="date"
                required
                min={checkin || today}
                value={checkout} 
                onChange={e => setCheckout(e.target.value)} 
                className="w-full bg-transparent text-gray-900 font-bold text-base md:text-lg outline-none cursor-pointer" 
              />
            </div>
          </div>

          <div className="flex-1 px-4 py-2">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Гости</label>
            <select 
              value={guests} 
              onChange={e => setGuests(e.target.value)} 
              className="w-full bg-transparent text-gray-900 font-bold text-lg outline-none cursor-pointer"
            >
              <option value="1">1 Взрослый</option>
              <option value="2">2 Взрослых</option>
              <option value="3">3 Взрослых</option>
              <option value="4">4 Взрослых</option>
              <option value="5">5+ Взрослых</option>
            </select>
          </div>

          <button type="submit" className="bg-[#003580] hover:bg-blue-800 transition-colors text-white font-black uppercase px-10 py-5 rounded-2xl md:ml-2 shrink-0 mt-2 md:mt-0 shadow-md hover:shadow-lg">
            Найти
          </button>
        </form>

      </div>
    </section>
  )
}