import ModelSelector from "./ModelSelector"
import HeaderBar from "./HeaderBar"
import "../css/HeaderBar.css"
import RoofSelector from "./RoofSelector"

function ControlsArea(){
    return( 
        <div className="controls-area">
            <HeaderBar/>
            <ModelSelector/>
            <RoofSelector/>
        </div>
    )
}

export default ControlsArea