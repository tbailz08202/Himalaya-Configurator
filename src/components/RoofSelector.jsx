import { useConfigurator } from '../state/ConfigContext'
import "../css/RoofSelector.css"
import { getValidRoofOptions } from '../state/RoofOptions'

function RoofSelector(){
  const {config, setConfig} = useConfigurator()

  const options = getValidRoofOptions(config.model)

  const handleSelect = (roof) => {
    setConfig(prev => ({ ...prev, roof }))  // update just the roof
  }

  const getSelectedIndex = () => {
    const index = options.indexOf(config.roof)
    return index !== -1 ? index + 1 : 1
  }

  return (
    <div className="roof-selector">
      <h3>Roof Type</h3>
      <div className={`segmented-control selected-${getSelectedIndex()}`}>
        {options.map((title) => (
          <button
            key={title}
            onClick={() => handleSelect(title)}
            className={config.roof === title ? 'selected' : ''}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default RoofSelector