import { useConfigurator } from "../state/ConfigContext"
import "../css/RoofPaint.css"

function RoofPaint(){
    const {config, setConfig} = useConfigurator();

    const handleSelect = (color) => {
        setConfig(prev => ({...prev, roofPaint: color}))
    }
    
    return (
    <div className="roof-paint">
      <h3>Roof Color</h3>
      <div className="paint-selected-name">{config.roofPaint}</div>
      
      <div className="buttons">
        <button
            className={config.roofPaint === "Match Body" ? "selected" : ""}
            onClick={() => handleSelect("Match Body")}
        />
         <button
            className={config.roofPaint === "Alpine White" ? "selected" : ""}
            onClick={() => handleSelect('Alpine White')}
        />
      </div> 
    </div>
  )
}

export default RoofPaint
