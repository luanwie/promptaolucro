import { useState } from 'react'
import { useToast } from './Toast'

function PromptCard({ prompt }) {
  const [copied, setCopied] = useState(false)
  const showToast = useToast()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = prompt.prompt
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    showToast('Prompt copiado!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="prompt-card">
      <div className="prompt-card-header">
        <span className="prompt-badge prompt-badge--purple">
          Prompt {prompt.number}
        </span>
        <span className="prompt-badge prompt-badge--green">
          {prompt.category}
        </span>
      </div>

      <h3 className="prompt-card-title">{prompt.title}</h3>
      <p className="prompt-card-description">{prompt.description}</p>

      <div className="prompt-card-divider" />

      <div className="prompt-card-code">
        <pre>{prompt.prompt}</pre>
      </div>

      <div className="prompt-card-footer">
        <button
          className={`prompt-copy-btn${copied ? ' prompt-copy-btn--copied' : ''}`}
          onClick={handleCopy}
        >
          <span>{copied ? '✓' : '📋'}</span>
          <span>{copied ? 'Copiado!' : 'Copiar prompt'}</span>
        </button>
        <span className="prompt-model-tag">{prompt.model}</span>
      </div>
    </div>
  )
}

export default PromptCard
