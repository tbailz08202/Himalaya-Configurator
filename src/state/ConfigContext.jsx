import { createContext, useContext, useState } from 'react'

const ConfigContext = createContext()

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState({
    model: 'Defender 110',  
    roof: 'Hard Top',
    paint: '#fff2d0',
    paintName: 'Alpine White',
    roofColor: 'Match Body',
    roofColorSoft: 'Black',
    fenderColor: 'Match Body',
    mirrorColor: 'Match Body',
    headlightColor: 'Match Body',
    wheelColor: 'Match Body'
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
