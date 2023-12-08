import { FC, createContext, useState, ReactNode } from 'react'


export type HiddenNodesContextType = {
  sites: ReactNode[]
  addHiddenNode: (addedHiddenNode: ReactNode) => void
}


const HiddenNodesContextInitialState = {
  sites: [],
  addHiddenNode: (addedHiddenNode: ReactNode) => { }
}

export const HiddenNodesContext = createContext<HiddenNodesContextType>(HiddenNodesContextInitialState)


export type HiddenNodesContextProviderProps = {
  children: ReactNode
}

export const HiddenNodesContextProvider: FC<HiddenNodesContextProviderProps> = ({
  children
}) => {
  const [sites, setHiddenNodes] = useState<ReactNode[]>([])
  const addHiddenNode = (addedHiddenNode: ReactNode) =>
    setHiddenNodes([
      ...sites,
      addedHiddenNode
    ])

  return (
    <HiddenNodesContext.Provider value={{
      sites,
      addHiddenNode
    }}>
      {sites}
      {children}
    </HiddenNodesContext.Provider>
  )
}
