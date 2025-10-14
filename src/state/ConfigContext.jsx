import { createContext, useContext, useState } from 'react'

const ConfigContext = createContext()

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState({
    model: 'Defender 110',  
    paint: '#6b7a62',
    roof: 'Hard Top'      
  })

  const value = { config, setConfig }

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfigurator() {
  return useContext(ConfigContext)
}
