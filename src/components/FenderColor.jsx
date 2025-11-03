import { useConfigurator } from "../state/ConfigContext"
import "../css/FenderColor.css"

function FenderColor(){
    const {config, setConfig} = useConfigurator();

    const handleSelect = (color) => {
        setConfig(prev => ({...prev, fenderColor: color}))
    }
    
    return (
    <div className="fender-color">
      <h3>Fender Color</h3>
      <div className="fender-selected-name">{config.fenderColor}</div>
      
      <div className="fender-buttons">
        <button
            className={config.fenderColor === "Match Body" ? "selected" : ""}
            onClick={() => handleSelect("Match Body")}
        />
         <button
            className={config.fenderColor === "Beluga Black" ? "selected" : ""}
            onClick={() => handleSelect('Beluga Black')}
        />
      </div> 
    </div>
  )
}

export default FenderColor