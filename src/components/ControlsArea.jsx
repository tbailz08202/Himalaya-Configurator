import ModelSelector from "./ModelSelector"
import HeaderBar from "./HeaderBar"
import "../css/HeaderBar.css"
import RoofSelector from "./RoofSelector"
import PaintSelector from "./PaintSelector"

function ControlsArea(){
    return( 
        <div className="controls-area">
            <HeaderBar/>
            <ModelSelector/>
            <RoofSelector/>
            <PaintSelector/>
        </div>
    )
}

export default ControlsArea