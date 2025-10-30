import { useConfigurator } from "../state/ConfigContext"
import "../css/PaintSelector.css"
import { useEffect } from "react"

function PaintSelector(){
  const {config, setConfig} = useConfigurator()
  const paints = [
    { paint: "Alpine White", hex: "#dcd8cf" },
    { paint: "Fuji White", hex: "#f5f4e8" },
    { paint: "Welsh Grey", hex: "#7f8283" },
    { paint: "Westmister Grey", hex: "#555657" },
    { paint: "Beluga Black", hex: "#0b0b0b" },
    { paint: "Saharah Dust", hex: "#ded2bb" },
    { paint: "Sandglow Yellow", hex: "#b48746" },
    { paint: "Keswick Green", hex: "#46594c" },
    { paint: "Grassmere Green", hex: "#728973" },
    { paint: "Estanor Green", hex: "#636d5c" },
    { paint: "Marine Blue", hex: "#4b738f" },
    { paint: "Arles Blue", hex: "#3e5e81" },
    { paint: "Persian Blue", hex: "#465d76" },
    { paint: "Nolita Grey", hex: "#4a5058" },
    { paint: "RAF Blue", hex: "#3f4853" },
  ]
  
  const selected =
  paints.find(p => config.paint === p.hex) ?? paints[0];

  useEffect(() => {
    if (!config.paint) {
            setConfig(prev => ({ ...prev, paint: selected.hex, paintName: selected.paint }));
          }
        }, [config.paint, selected.hex, selected.paint, setConfig]);
    
  const selectPaint = (p) => {
    setConfig(prev => ({ ...prev, paint: p.hex, paintName: p.paint }));
  };

  const isSelected = (hex) =>
    (config.paint || "").toLowerCase() === (hex || "").toLowerCase();

  return (
    <div className="paint-selector">
      <h3>Paint</h3>
      <div className="paint-selected-name">{config.paintName}</div>

      <div className="paint-grid">
        {paints.map(p => (
          <button
            key={p.paint}
            className={`paint ${isSelected(p.hex) ? "selected" : ""}`}
            onClick={() => selectPaint(p)}
            title={p.paint}
            aria-label={p.paint}
            style={{ backgroundColor: p.hex }}
          />
        ))}
      </div>
    </div>
  );
}

export default PaintSelector
