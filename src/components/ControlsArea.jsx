import ModelSelector from "./ModelSelector"
import HeaderBar from "./HeaderBar"
import "../css/HeaderBar.css"
import RoofSelector from "./RoofSelector"
import PaintSelector from "./PaintSelector"
import RoofPaint from "./RoofPaint.jsx"
import FenderColor from "./FenderColor.jsx"
import MirrorColor from "./MirrorColor.jsx"
import HeadlightTrimColor from "./HeadlightTrimColor.jsx"

function ControlsArea(){
    return( 
        <div className="controls-area">
            <HeaderBar/>
            <ModelSelector/>
            <RoofSelector/>
            <PaintSelector/>
            <RoofPaint/>
            <FenderColor/>
            <MirrorColor/>
            <HeadlightTrimColor/>
        </div>
    )
}

export default ControlsArea