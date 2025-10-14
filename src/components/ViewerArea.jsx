import { useConfigurator } from '../state/ConfigContext'

function ViewerArea() {
  // Access the global state
  const { config } = useConfigurator()

  return (
    <div >
      {/*Show which model is selected */}
      <p>Currently viewing: {config.model}</p>
    </div>
  )
}

export default ViewerArea