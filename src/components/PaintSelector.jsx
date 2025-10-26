import { useConfigurator } from "../state/ConfigContext"
import "../css/PaintSelector.css"
import { useEffect } from "react"

function PaintSelector(){
    const {config, setConfig} = useConfigurator()

    const paints = [
        { paint: "Alpine White", hex: "#fff8e6ff" },
        { paint: "Fuji White", hex: "#ffffffff" },
        { paint: "Welsh Grey", hex: "#c5c5c5ff" },
        { paint: "Westmister Grey", hex: "#606060f6" },
        { paint: "Beluga Black", hex: "#000000ff" },
        { paint: "Saharah Dust", hex: "#ffe2baff" },
        { paint: "Sandglow Yellow", hex: "#e7ac2fff" },
        { paint: "Keswick Green", hex: "#23433dff" },
        { paint: "Grassmere Green", hex: "#68c36bff" },
        { paint: "Estanor Green", hex: "#365a36ff" },
        { paint: "Marine Blue", hex: "#3586bcff" },
        { paint: "Arles Blue", hex: "#2c6596ff" },
        { paint: "Persian Blue", hex: "#214c71ff" },
        { paint: "Nolita Grey", hex: "#4f505aff" },
        { paint: "RAF Blue", hex: "#49485fff" }
    ]

    const selected =
    paints.find(p => (config.paint || "").toLowerCase() === p.hex.toLowerCase()) ??
    paints[0];

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
