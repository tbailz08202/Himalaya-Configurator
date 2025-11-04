import { useConfigurator } from "../state/ConfigContext"
import "../css/RoofColorSoft.css"

function RoofColorSoft(){
    const {config, setConfig} = useConfigurator();

    const handleSelect = (color) => {
        setConfig(prev => ({...prev, roofColorSoft: color}))
    }
    
    return (
    <div className="soft-roof-color">
      <h3>Roof Color</h3>
      <div className="soft-paint-selected-name">{config.roofColorSoft}</div>
      
      <div className="soft-buttons">
        <button
            className={config.roofColorSoft === "Black" ? "selected" : ""}
            onClick={() => handleSelect("Black")}
        />
         <button
            className={config.roofColorSoft === "Sand" ? "selected" : ""}
            onClick={() => handleSelect('Sand')}
        />
        <button
            className={config.roofColorSoft === "Deep Green" ? "selected" : ""}
            onClick={() => handleSelect('Deep Green')}
        />
      </div> 
    </div>
  )
}

export default RoofColorSoft
