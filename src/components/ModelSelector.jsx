import { useConfigurator } from '../state/ConfigContext'
import "../css/ModelSelector.css"

function ModelSelector() {
  const { config, setConfig } = useConfigurator()
  
  const options = [
    'Defender 130', 
    'Defender 110',
    'Defender 90', 
    'Series 88', 
    'Series 109'
]

  const handleSelect = (model) => {
    setConfig(prev => ({ ...prev, model }))  // update just the model
  }

  return (
    <div className="model-selector">
      <h3>Model</h3>
      {options.map((title) => (
        <button
          key={title}
          onClick={() => handleSelect(title)}
          className={config.model === title ? 'selected' : ''}
        >
          {title}
        </button>
      ))}
    </div>
  )
}

export default ModelSelector