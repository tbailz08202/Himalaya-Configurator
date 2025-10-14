import { createContext, useContext, useState } from 'react'

const ConfigContext = createContext()

// 2️⃣ Wrap the app in this provider to make the state global
export function ConfigProvider({ children }) {
  const [config, setConfig] = useState({
    model: 'Defender 110',  
    paint: '#6b7a62'       
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
