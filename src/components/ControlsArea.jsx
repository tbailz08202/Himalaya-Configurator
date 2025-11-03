import '../css/ControlsArea.css'
import ModelSelector from "./ModelSelector"
import HeaderBar from "./HeaderBar"
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
            <div className="container">
                <RoofPaint/>
                <FenderColor/>
                <MirrorColor/>
                <HeadlightTrimColor/>
            </div>        
        </div>
    )
}

export default ControlsArea