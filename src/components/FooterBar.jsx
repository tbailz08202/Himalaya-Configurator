import { useState } from "react";
import InquiryPanel from "./InquiryPanel";
import "../css/FooterBar.css";

function FooterBar() {
  const [showInquiry, setShowInquiry] = useState(false);
  
  return (
    <>
      <footer className="footer-bar">
        <button
          className="inquire-button"
          onClick={() => setShowInquiry(true)}
        >
          Inquire
        </button>
      </footer>

      {showInquiry && (
        <InquiryPanel
          onClose={() => setShowInquiry(false)}
        />
      )}
    </>
  );
}

export default FooterBar;
