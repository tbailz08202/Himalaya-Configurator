import { useConfigurator } from "../state/ConfigContext"
import "../css/HeadlightTrimColor.css"

function HeadlightTrimColor(){
    const {config, setConfig} = useConfigurator();

    const handleSelect = (color) => {
        setConfig(prev => ({...prev, headlightColor: color}))
    }
    
    return (
    <div className="headlight-color">
      <h3>Headlight Trim</h3>
      <div className="headlight-selected-name">{config.headlightColor}</div>
      
      <div className="headlight-buttons">
        <button
            className={config.headlightColor === "Match Body" ? "selected" : ""}
            onClick={() => handleSelect("Match Body")}
        />
         <button
            className={config.headlightColor === "Beluga Black" ? "selected" : ""}
            onClick={() => handleSelect('Beluga Black')}
        />
      </div> 
    </div>
  )
}

export default HeadlightTrimColor