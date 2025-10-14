import './css/App.css'
import ControlsArea from './components/ControlsArea'
import ViewerArea from './components/ViewerArea'
import { ConfigProvider } from './state/ConfigContext'

function App() {
  return (
    <ConfigProvider>
    <div className="app-shell">
      <div className="viewer-section">
        <ViewerArea />
      </div>
      <div className="controls-section">
        <ControlsArea />
      </div>
    </div>
    </ConfigProvider>
  )
}

export default App
