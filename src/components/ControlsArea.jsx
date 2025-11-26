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
import FinishSelector from './FinishSelector.jsx'
import RollCageOption from './RollCageOption.jsx'

function ControlsArea(){
    const {config} = useConfigurator()
    
    const isSeries = config.model !== 'Series 88' || config.model !== 'Series 109'
    return( 
        <div className="controls-area">
            <HeaderBar/>
            <ModelSelector/>
            {config.model !== "Defender 130" && <RoofSelector/>}
            {config.roof === "Crew Cab" && <RollCageOption/>}
            <PaintSelector/>
            <FinishSelector/>
            {((config.model == "Defender 110" && (config.roof == "Soft Top" || config.roof == "Crew Cab"))
            || (config.model == "Defender 130") || (config.model === "Series 88") 
            || (config.model === "Series 109")) && <WheelColor/>}
            <div className="container">
                {config.roof === "None" ? null : 
                (config.roof === "Soft Top" && config.model !== "Defender 130")
                ? <RoofColorSoft /> 
                : <RoofColor />}
                {(config.model !== 'Series 88' && config.model !== 'Series 109') && <FenderColor/>}
                <MirrorColor/>
                {config.roof !== "None" && (config.model !== 'Series 88' && config.model !== 'Series 109') && <HeadlightTrimColor/>}
            </div>
            {(config.roof === "None" && (config.model !== 'Series 88' && config.model !== 'Series 109')) && <HeadlightTrimColor/>}
            <FooterBar/>
        </div>
    )
}

export default ControlsArea