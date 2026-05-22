'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

type BookingButtonProps = {
  serviceType: 'tour' | 'car' | 'transfer'
  serviceTitle: string
  buttonText?: string
}

export default function BookingButton({ serviceType, serviceTitle, buttonText = "Забронировать" }: BookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

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
      // Через 3 секунды закрываем модалку и сбрасываем форму
      setTimeout(() => {
        setIsOpen(false)
        setIsSuccess(false)
        setName('')
        setPhone('')
      }, 3000)
    } else {
      alert('Ошибка при отправке: ' + error.message)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors mt-4"
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 text-xl font-bold"
            >
              ✕
            </button>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка принята!</h3>
                <p className="text-gray-600">Мы свяжемся с вами в ближайшее время для подтверждения деталей.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Оформление заявки</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Выбранная услуга: <br/>
                  <span className="font-semibold text-gray-900 text-base">{serviceTitle}</span>
                </p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="Например, Александр"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="+995 555 123 456"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-4 rounded-xl transition-colors mt-2"
                  >
                    {isLoading ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}