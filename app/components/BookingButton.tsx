'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

interface BookingButtonProps {
  serviceType: 'tour' | 'car' | 'transfer'
  serviceTitle: string
  buttonText?: string
}

export default function BookingButton({ serviceType, serviceTitle, buttonText = 'Забронировать' }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          customer_name: name,
          customer_phone: phone,
          service_type: serviceType,
          service_title: serviceTitle,
          status: 'new'
        }
      ])

    setIsLoading(false)

    if (!error) {
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
        setName('')
        setPhone('')
      }, 3000)
    } else {
      alert('Ошибка при бронировании: ' + error.message)
    }
  }

  return (
    <>
      {/* Кнопка вызова модального окна */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-colors shadow-sm"
      >
        {buttonText}
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 md:p-10 relative shadow-2xl border border-gray-100 transform transition-all">
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase mb-2">
              Бронирование
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Вы заказываете: <span className="font-bold text-blue-600">{serviceTitle}</span>
            </p>

            {isSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-6 text-center font-semibold animate-pulse">
                🎉 Заявка успешно отправлена! Менеджер свяжется с вами в течение 10 минут.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Ваше имя</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Александр"
                    className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-2xl px-5 py-4 text-base font-medium outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Номер телефона</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+995 555 123 456"
                    className="w-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 rounded-2xl px-5 py-4 text-base font-medium outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white font-black uppercase tracking-wider py-5 rounded-2xl transition-all shadow-md mt-2"
                >
                  {isLoading ? 'Отправка...' : 'Подтвердить заказ'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}