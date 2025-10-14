import { useConfigurator } from '../state/ConfigContext'

function ViewerArea() {
  const { config } = useConfigurator()

  return (
    <div >
      <p>Currently viewing: {config.model} {config.roof} {config.paint}</p>
    </div>
  )
}

export default ViewerArea