import himalayaLogo from '../assets/himalaya-logo.png'

function HeaderBar() {
  return (
    <div className="header-bar">
      <h2>Configurator</h2>
      <img src={himalayaLogo} alt="Himalaya Logo" />
    </div>
  );
}
export default HeaderBar