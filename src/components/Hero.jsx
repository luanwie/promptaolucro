function Hero() {
  const metrics = [
    { value: '15', label: 'prompts' },
    { value: '5', label: 'blocos' },
    { value: '1', label: 'tarde' },
  ]

  return (
    <section className="hero">
      <div className="hero-pill stagger animate-fade-in-up">
        <span className="hero-pill-icon">✦</span>
        <span>Do zero ao SaaS estruturado</span>
      </div>

      <h1 className="hero-title stagger animate-fade-in-up delay-100">
        Prompt ao Lucro
      </h1>

      <p className="hero-subtitle stagger animate-fade-in-up delay-200">
        Escolha sua ideia. Rode os prompts. Lance seu SaaS.
      </p>

      <div className="hero-metrics stagger animate-fade-in-up delay-300">
        {metrics.map((metric, index) => (
          <div className="hero-metric" key={index}>
            <span className="hero-metric-value">{metric.value}</span>
            <span className="hero-metric-label">{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Hero
