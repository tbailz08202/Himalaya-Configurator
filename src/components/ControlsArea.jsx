import ModelSelector from "./ModelSelector"
import HeaderBar from "./HeaderBar"
import "../css/HeaderBar.css"

function ControlsArea(){
    return( 
        <div className="controls-area">
            <HeaderBar/>
            <ModelSelector/>
        </div>
    )
}

export default ControlsArea