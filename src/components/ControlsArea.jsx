import ModelSelector from "./ModelSelector"
import HeaderBar from "./HeaderBar"
import "../css/HeaderBar.css"
import RoofSelector from "./RoofSelector"
import PaintSelector from "./PaintSelector"
import RoofPaint from "./RoofPaint.jsx"

function ControlsArea(){
    return( 
        <div className="controls-area">
            <HeaderBar/>
            <ModelSelector/>
            <RoofSelector/>
            <PaintSelector/>
            <RoofPaint/>
        </div>
    )
}

export default ControlsArea