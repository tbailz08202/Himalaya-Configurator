import { useConfigurator } from '../state/ConfigContext'
import "../css/FinishSelector.css"

function FinishSelector(){
    const {config, setConfig} = useConfigurator()

    const options = [
        "Gloss",
        "Matte"
    ]

    const handleSelect = (finish) => {
      setConfig(prev => ({ ...prev, finish }))  // update just the roof
    }

  const getSelectedIndex = () => {
    const index = options.indexOf(config.finish)
    return index !== -1 ? index + 1 : 1
  }

  return (
    <div className="finish-selector">
      <h3>Finish</h3>
      <div className={`finish-segmented-control selected-${getSelectedIndex()}`}>
        {options.map((title) => (
          <button
            key={title}
            onClick={() => handleSelect(title)}
            className={config.finish === title ? 'selected' : ''}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FinishSelector