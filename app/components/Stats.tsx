export default function Stats() {
  const stats = [
    { label: 'Довольных клиентов', value: '500+' },
    { label: 'Авто в парке', value: '50+' },
    { label: 'Маршрутов', value: '25+' },
    { label: 'Поддержка', value: '24/7' },
  ]

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-blue-100 font-bold uppercase tracking-widest text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}