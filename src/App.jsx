import './css/App.css'
import ControlsArea from './components/ControlsArea'
import ViewerArea from './components/ViewerArea'

function App() {
  return (
    <div className="app-shell">
      <div className="viewer-section">
        <ViewerArea />
      </div>
      <div className="controls-section">
        <ControlsArea />
      </div>
    </div>
  )
}

export default App
