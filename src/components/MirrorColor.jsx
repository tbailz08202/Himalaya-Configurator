import { useConfigurator } from "../state/ConfigContext"
import "../css/MirrorColor.css"

function MirrorColor(){
    const {config, setConfig} = useConfigurator();

    const handleSelect = (color) => {
        setConfig(prev => ({...prev, mirrorColor: color}))
    }
    
    return (
    <div className="mirror-color">
      <h3>Mirror Color</h3>
      <div className="mirror-selected-name">{config.mirrorColor}</div>
      
      <div className="mirror-buttons">
        <button
            className={config.mirrorColor === "Match Body" ? "selected" : ""}
            onClick={() => handleSelect("Match Body")}
        />
         <button
            className={config.mirrorColor === "Beluga Black" ? "selected" : ""}
            onClick={() => handleSelect('Beluga Black')}
        />
      </div> 
    </div>
  )
}

export default MirrorColor