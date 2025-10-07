import { useState } from 'react'
import "../css/ModelSelector.css"

function ModelSelector({ onSelect }) {
  const [selected, setSelected] = useState('Defender 110')
  
  const options = [
    'Defender 110', 
    'Defender 90', 
    'Series 88', 
    'Series 109'
]

  const handleSelect = (model) => {
    setSelected(model)
    onSelect?.(model)
  }

  return (
    <div className="model-selector">
      <h3>Model</h3>
      {options.map((title) => (
        <button
          key={title}
          onClick={() => handleSelect(title)}
          className={selected === title ? 'selected' : ''}
        >
          {title}
        </button>
      ))}
    </div>
  )
}

export default ModelSelector