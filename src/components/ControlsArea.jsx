import ModelSelector from "./ModelSelector"
import HeaderBar from "./HeaderBar"
import "../css/HeaderBar.css"
import RoofSelector from "./RoofSelector"
import PaintSelector from "./PaintSelector"
import RoofPaint from "./RoofPaint.jsx"
import { useConfigurator } from "../state/ConfigContext"



function ControlsArea(){
    const {config, setConfig} = useConfigurator()

    return( 
        <div className="controls-area">
            <HeaderBar/>
            <ModelSelector/>
            <RoofSelector/>
            <PaintSelector/>
            {config.roof !== 'Soft Top' && <RoofPaint />}
        </div>
    )
}

export default ControlsArea