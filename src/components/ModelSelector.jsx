import { useConfigurator } from '../state/ConfigContext'
import { MODEL_OPTIONS, getDefaultRoof } from '../state/RoofOptions'
import "../css/ModelSelector.css"

function ModelSelector() {
  const { config, setConfig } = useConfigurator()
  

  const handleSelect = (model) => {
    const newRoof = getDefaultRoof(model, config.roof)
    setConfig(prev => ({ 
      ...prev, 
      model,
      roof: newRoof
    }))
  }

  return (
  <div className="model-selector">
    <h3>Model</h3>
      {MODEL_OPTIONS.map((title) => (
        <button
        key={title}
        onClick={() => handleSelect(title)}
        className={config.model === title ? 'selected' : ''}        >
        {title}
        </button>
      ))}
      </div>
    )
}

export default ModelSelector