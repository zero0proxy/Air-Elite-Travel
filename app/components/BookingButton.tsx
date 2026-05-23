'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

interface BookingButtonProps {
  serviceType: 'tour' | 'car' | 'transfer' | 'promo'
  serviceTitle: string
  basePrice?: number
  buttonText?: string
}

export default function BookingButton({ serviceType, serviceTitle, basePrice = 0, buttonText = 'Забронировать' }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const [days, setDays] = useState(1)
  const [pickupCity, setPickupCity] = useState('Тбилиси')
  const [pickupTime, setPickupTime] = useState('10:00')

  const [people, setPeople] = useState(1)
  const [hasChildren, setHasChildren] = useState(false)
  const [tourDate, setTourDate] = useState('')

  const totalPrice = serviceType === 'car' ? basePrice * days : serviceType === 'tour' ? basePrice * people : basePrice

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    let detailsStr = `Оплата: ${paymentMethod === 'card' ? 'Картой' : 'Наличными'}\n`
    if (serviceType === 'car') {
      detailsStr += `Аренда: ${days} дн., Город: ${pickupCity}, Время: ${pickupTime}\nИтого: $${totalPrice}`
    } else if (serviceType === 'tour') {
      detailsStr += `Дата: ${tourDate}, Людей: ${people}, Дети: ${hasChildren ? 'Да' : 'Нет'}\nИтого: $${totalPrice}`
    } else if (serviceType === 'promo') {
      detailsStr += `Активация промо-предложения.`
    }

    const { error } = await supabase.from('bookings').insert([
      { customer_name: name, customer_phone: phone, service_type: serviceType, service_title: serviceTitle, details: detailsStr, status: 'new' }
    ])

    setIsLoading(false)

    if (!error) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
        setName(''); setPhone(''); setDays(1); setPeople(1); setHasChildren(false); setTourDate('');
      }, 3000)
    } else {
      alert('Ошибка при бронировании: ' + error.message)
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-sm">
        {buttonText}
      </button>

      {isOpen && (
        // ИЗМЕНЕНИЕ 1: Добавлен p-4 для отступов от краев экрана
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          
          {/* ИЗМЕНЕНИЕ 2: max-h-full гарантирует, что окно не вылезет за экран */}
          <div className="bg-white rounded-[2rem] max-w-md w-full flex flex-col max-h-full shadow-2xl relative overflow-hidden">
            
            {/* ИЗМЕНЕНИЕ 3: Закрепленная шапка с крестиком */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0 bg-white">
              <div>
                <h3 className="text-xl font-black text-gray-900 uppercase">Оформление</h3>
                <p className="text-xs text-blue-600 font-bold truncate w-[200px]">{serviceTitle}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold transition-colors">
                ✕
              </button>
            </div>

            {/* ИЗМЕНЕНИЕ 4: Скроллируемая форма */}
            <div className="p-6 overflow-y-auto">
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-6 text-center font-semibold">
                  🎉 Заявка отправлена! Мы свяжемся с вами для подтверждения.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                  <div className="border-t border-gray-100 pt-4">
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Способ оплаты</label>
                    <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="cash">Наличными при встрече</option>
                      <option value="card">Банковской картой</option>
                    </select>
                  </div>

                  {(serviceType === 'tour' || serviceType === 'car') && (
                    <div className="mt-4 flex items-center justify-between bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                      <span className="text-sm font-bold text-blue-900">Итого к оплате:</span>
                      <span className="text-2xl font-black text-blue-600">${totalPrice}</span>
                    </div>
                  )}

                  <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-black uppercase tracking-wider py-4 rounded-2xl transition-all shadow-md mt-2 shrink-0">
                    {isLoading ? 'Обработка...' : 'Подтвердить заказ'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}