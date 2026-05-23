'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

interface BookingButtonProps {
  serviceType: 'tour' | 'car' | 'transfer'
  serviceTitle: string
  basePrice?: number // Добавили базовую цену для калькуляции
  buttonText?: string
}

export default function BookingButton({ serviceType, serviceTitle, basePrice = 0, buttonText = 'Забронировать' }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Общие поля
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')

  // Поля для АВТО
  const [days, setDays] = useState(1)
  const [pickupCity, setPickupCity] = useState('Тбилиси')
  const [pickupTime, setPickupTime] = useState('10:00')

  // Поля для ТУРОВ
  const [people, setPeople] = useState(1)
  const [hasChildren, setHasChildren] = useState(false)
  const [tourDate, setTourDate] = useState('')

  // Калькуляция итоговой цены на лету
  const totalPrice = serviceType === 'car' 
    ? basePrice * days 
    : serviceType === 'tour' 
      ? basePrice * people 
      : basePrice

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Формируем детальное описание заказа в зависимости от типа
    let detailsStr = `Оплата: ${paymentMethod === 'card' ? 'Картой' : 'Наличными'}\n`
    if (serviceType === 'car') {
      detailsStr += `Аренда: ${days} дн., Город: ${pickupCity}, Время: ${pickupTime}\nИтого: $${totalPrice}`
    } else if (serviceType === 'tour') {
      detailsStr += `Дата: ${tourDate}, Людей: ${people}, Дети: ${hasChildren ? 'Да' : 'Нет'}\nИтого: $${totalPrice}`
    }

    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_name: name,
          customer_phone: phone,
          service_type: serviceType,
          service_title: serviceTitle,
          details: detailsStr,
          status: 'new'
        }
      ])

    setIsLoading(false)

    if (!error) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
        // Сброс полей
        setName(''); setPhone(''); setDays(1); setPeople(1); setHasChildren(false); setTourDate('');
      }, 3000)
    } else {
      alert('Ошибка при бронировании: ' + error.message)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-sm"
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Добавили max-h-[90vh] и overflow-y-auto чтобы форма скроллилась на мобилках */}
          <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>

            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase mb-2">Оформление</h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              <span className="font-bold text-blue-600">{serviceTitle}</span>
            </p>

            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-6 text-center font-semibold">
                🎉 Заявка отправлена! Мы свяжемся с вами для подтверждения.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                {/* КОНТАКТНЫЕ ДАННЫЕ */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Имя</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Телефон</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                </div>

                {/* ПОЛЯ ДЛЯ АВТОМОБИЛЯ */}
                {serviceType === 'car' && (
                  <>
                    <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Срок (дней)</label>
                        <input type="number" min="1" required value={days} onChange={e => setDays(parseInt(e.target.value) || 1)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Время подачи</label>
                        <input type="time" required value={pickupTime} onChange={e => setPickupTime(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Город подачи</label>
                      <select value={pickupCity} onChange={e => setPickupCity(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                        <option value="Тбилиси">Тбилиси</option>
                        <option value="Батуми">Батуми</option>
                        <option value="Кутаиси">Кутаиси</option>
                      </select>
                    </div>
                  </>
                )}

                {/* ПОЛЯ ДЛЯ ТУРА */}
                {serviceType === 'tour' && (
                  <>
                    <div className="border-t border-gray-100 pt-4">
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Дата старта</label>
                      <input type="date" required value={tourDate} onChange={e => setTourDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Кол-во человек</label>
                        <input type="number" min="1" required value={people} onChange={e => setPeople(parseInt(e.target.value) || 1)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600" />
                      </div>
                      <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl mt-5 px-4">
                        <label className="flex items-center gap-2 cursor-pointer w-full">
                          <input type="checkbox" checked={hasChildren} onChange={e => setHasChildren(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                          <span className="text-xs font-bold text-gray-700">Есть дети</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* ОПЛАТА */}
                <div className="border-t border-gray-100 pt-4">
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Способ оплаты</label>
                  <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="cash">Наличными при встрече</option>
                    <option value="card">Банковской картой</option>
                  </select>
                </div>

                {/* ИТОГ И КНОПКА */}
                <div className="mt-4 flex items-center justify-between bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                  <span className="text-sm font-bold text-blue-900">Итого к оплате:</span>
                  <span className="text-2xl font-black text-blue-600">${totalPrice}</span>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-black uppercase tracking-wider py-4 rounded-2xl transition-all shadow-md mt-2">
                  {isLoading ? 'Обработка...' : 'Подтвердить заказ'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}