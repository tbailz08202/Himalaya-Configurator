import '../css/InquiryPanel.css'
import { useState } from "react";
import { useConfigurator } from "../state/ConfigContext";

function InquiryPanel({ onClose }) {
  const { config } = useConfigurator();
  const [transmission, setTransmission] = useState("");
  const [engine, setEngine] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [comments, setComments] = useState("");

  return (
    <div className="inquiry-overlay" onClick={onClose}>
      <div className="inquiry-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="inquiry-close" onClick={onClose}>×</button>

        <h2>Inquire about your build</h2>

        <form className="inquiry-form">
          <label>
            Name
            <input type="text" name="name" required />
          </label>

          <label>
            Email
            <input type="email" name="email" required />
          </label>

          <label>
            Phone
            <input type="tel" name="phone" />
          </label>

          <label>
            Transmission
            <select 
              value={transmission} 
              onChange={(e) => setTransmission(e.target.value)}
              required
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </label>

          <label>
            Engine
            <select 
              value={engine} 
              onChange={(e) => setEngine(e.target.value)}
              required
            >
              <option value="">Select Engine</option>
              <option value="Modern Engine">Modern Engine</option>
              <option value="Classic Engine">Classic Engine</option>
              <option value="Land Rover TDi">Land Rover TDi</option>
            </select>
          </label>

          <label>
            How did you hear about us?
            <select 
              value={aboutUs} 
              onChange={(e) => setAboutUs(e.target.aboutUs)}
              required
            >
              <option value=""></option>
              <option value="Google">Google</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Sirius">Sirius</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Comments
            <textarea 
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
            />
          </label>

          <div className="build-summary">
            <h3>Your Build</h3>
            <p><strong>Model:</strong> {config.model}</p>
            
            {config.model !== "Defender 130" && (
              <p><strong>Roof:</strong> {config.roof}</p>
            )}
            
            <p><strong>Paint:</strong> {config.paintName} – {config.finish}</p>
            
            {config.roof !== "None" && (
              <p>
                <strong>Roof Color:</strong>{" "}
                {config.roof === "Soft Top" && config.model !== "Defender 130"
                  ? config.roofColorSoft
                  : config.roofColor}
              </p>
            )}
            
            {config.model !== 'Series 88' && config.model !== 'Series 109' && (
              <p><strong>Fenders:</strong> {config.fenderColor}</p>
            )}
            
            <p><strong>Mirrors:</strong> {config.mirrorColor}</p>
            
            {config.roof !== "None" && 
             config.model !== 'Series 88' && 
             config.model !== 'Series 109' && (
              <p><strong>Headlight Trim:</strong> {config.headlightColor}</p>
            )}
            
            {config.roof === "None" && 
             config.model !== 'Series 88' && 
             config.model !== 'Series 109' && (
              <p><strong>Headlight Trim:</strong> {config.headlightColor}</p>
            )}
            
            {((config.model === "Defender 110" && (config.roof === "Soft Top" || config.roof === "Crew Cab")) ||
              config.model === "Defender 130" ||
              config.model === "Series 88" ||
              config.model === "Series 109") && (
              <p><strong>Wheels:</strong> {config.wheelColor}</p>
            )}

            <p><strong>Transmission:</strong> {transmission}</p>
            <p><strong>Engine:</strong> {engine}</p>
          </div>

          <button type="submit" className="inquiry-submit">
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}

export default InquiryPanel;