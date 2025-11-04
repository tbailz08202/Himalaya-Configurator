import { useConfigurator } from "../state/ConfigContext"
import "../css/RoofColor.css"

function RoofColor(){
    const {config, setConfig} = useConfigurator();

    const handleSelect = (color) => {
        setConfig(prev => ({...prev, roofColor: color}))
    }
    
    return (
    <div className="roof-color">
      <h3>Roof Color</h3>
      <div className="paint-selected-name">{config.roofColor}</div>
      
      <div className="buttons">
        <button
            className={config.roofColor === "Match Body" ? "selected" : ""}
            onClick={() => handleSelect("Match Body")}
        />
         <button
            className={config.roofColor === "Alpine White" ? "selected" : ""}
            onClick={() => handleSelect('Alpine White')}
        />
      </div> 
    </div>
  )
}

export default RoofColor
