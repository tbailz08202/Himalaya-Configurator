import '../css/ControlsArea.css'
import ModelSelector from "./ModelSelector"
import HeaderBar from "./HeaderBar"
import RoofSelector from "./RoofSelector"
import PaintSelector from "./PaintSelector"
import RoofColor from "./RoofColor.jsx"
import RoofColorSoft from "./RoofColorSoft.jsx"
import FenderColor from "./FenderColor.jsx"
import MirrorColor from "./MirrorColor.jsx"
import HeadlightTrimColor from "./HeadlightTrimColor.jsx"
import { useConfigurator } from "../state/ConfigContext"
import WheelColor from './WheelColor.jsx'
import FooterBar from './FooterBar.jsx'

function ControlsArea(){
    const {config, setConfig} = useConfigurator()
    
    return( 
        <div className="controls-area">
            <HeaderBar/>
            <ModelSelector/>
            <RoofSelector/>
            <PaintSelector/>
            <div className="container">
                {config.roof === "Soft Top" ? <RoofColorSoft/> : <RoofColor/>}
                <FenderColor/>
                <MirrorColor/>
                <HeadlightTrimColor/>
            </div>
            {((config.model == "Defender 110" && (config.roof == "Soft Top" || config.roof == "None"))
            || (config.model == "Defender 90" && config.roof == "None")
            || (config.model == "Defender 130" && config.roof == "None")) && <WheelColor/>}
            <FooterBar/>
        </div>
    )
}

export default ControlsArea