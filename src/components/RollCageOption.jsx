import { useConfigurator } from '../state/ConfigContext'
import '../css/RollCageOption.css'

function RollCageOption() {
  const { config, setConfig } = useConfigurator()

  const handleToggle = () => {
    setConfig(prev => ({ ...prev, rollCage: !prev.rollCage }))
  }

  return (
    <div className="roll-cage-option">
      <h3>Roll Cage</h3>
      <div className="toggle-container">
        <span className="toggle-label">Roll Cage</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={config.rollCage}
            onChange={handleToggle}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  )
}

export default RollCageOption