import { useConfigurator } from "../state/ConfigContext"
import "../css/WheelColor.css"

function WheelColor(){
    const {config, setConfig} = useConfigurator();

    const handleSelect = (color) => {
        setConfig(prev => ({...prev, wheelColor: color}))
    }

    const wheelOptions = [
        {paint: "Match Body", hex: null}, 
        {paint: "Fuji White", hex: "#f5f4e8" },
        {paint: "Beluga Black", hex: "#0b0b0b"},
        {paint: "Alpine White", hex: "#fff2d0"}
    ]

    return (
    <div className="wheel-color">
      <h3>Wheel Color</h3>
      <div className="wheel-selected-name">{config.wheelColor}</div>
      
      <div className="wheel-color-buttons">
      {wheelOptions.map((option) => (
          <button
            key={option.paint}
            className={config.wheelColor === option.paint ? "selected" : ""}
            onClick={() => handleSelect(option.paint)}
            style={{ backgroundColor: option.hex || "transparent"}}
            title={option.paint}
          />
        ))}
      </div>
    </div>
  );
}

export default WheelColor
