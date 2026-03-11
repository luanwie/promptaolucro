import { useState } from 'react'
import { promptsData } from '../data/prompts'
import PromptCard from './PromptCard'

const blocks = [
  { id: 1, number: '01', name: 'Validação da Ideia', prompts: 3 },
  { id: 2, number: '02', name: 'Identidade do Produto', prompts: 3 },
  { id: 3, number: '03', name: 'Landing Page', prompts: 3 },
  { id: 4, number: '04', name: 'Precificação e Modelo', prompts: 3 },
  { id: 5, number: '05', name: 'Primeiros Clientes', prompts: 3 },
]

function Workspace() {
  const [activeBlock, setActiveBlock] = useState(1)

  const currentPrompts = promptsData[activeBlock] || []
  const activeBlockData = blocks.find((b) => b.id === activeBlock)
  const progressPercent = (activeBlock / blocks.length) * 100

  const goPrev = () => {
    if (activeBlock > 1) setActiveBlock(activeBlock - 1)
  }

  const goNext = () => {
    if (activeBlock < blocks.length) setActiveBlock(activeBlock + 1)
  }

  return (
    <div className="workspace">
      {/* Mobile horizontal menu */}
      <div className="sidebar-mobile">
        {blocks.map((block) => (
          <button
            key={block.id}
            className={`sidebar-mobile-item${activeBlock === block.id ? ' sidebar-mobile-item--active' : ''}`}
            onClick={() => setActiveBlock(block.id)}
          >
            <span className="sidebar-mobile-number">{block.number}</span>
            <span className="sidebar-mobile-name">{block.name}</span>
          </button>
        ))}
      </div>

      {/* Desktop sidebar */}
      <aside className="sidebar">
        <nav className="sidebar-nav">
          {blocks.map((block) => (
            <button
              key={block.id}
              className={`sidebar-item${activeBlock === block.id ? ' sidebar-item--active' : ''}`}
              onClick={() => setActiveBlock(block.id)}
            >
              <span className="sidebar-item-number">{block.number}</span>
              <div className="sidebar-item-info">
                <span className="sidebar-item-name">{block.name}</span>
                <span className="sidebar-item-count">{block.prompts} prompts</span>
              </div>
            </button>
          ))}
        </nav>
      </aside>

      <section className="content-panel">
        {/* Progress bar */}
        <div className="content-progress">
          <div className="content-progress-text">
            <span>Bloco {activeBlock} de {blocks.length}</span>
            <span className="content-progress-separator">—</span>
            <span className="content-progress-name">{activeBlockData.name}</span>
          </div>
          <div className="content-progress-bar">
            <div
              className="content-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Prompt cards */}
        <div className="content-grid">
          {currentPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {/* Block navigation */}
        <div className="content-nav">
          <button
            className={`content-nav-btn${activeBlock === 1 ? ' content-nav-btn--disabled' : ''}`}
            onClick={goPrev}
            disabled={activeBlock === 1}
          >
            ← Bloco anterior
          </button>
          <button
            className={`content-nav-btn${activeBlock === blocks.length ? ' content-nav-btn--disabled' : ''}`}
            onClick={goNext}
            disabled={activeBlock === blocks.length}
          >
            Próximo bloco →
          </button>
        </div>
      </section>
    </div>
  )
}

export default Workspace
