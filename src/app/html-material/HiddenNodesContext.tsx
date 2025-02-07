import { FC, createContext, useState, ReactNode } from 'react'


export type HiddenNodesContextType = {
  sites: ReactNode[]
  addHiddenNode: (addedHiddenNode: ReactNode) => void

  textureOpened: boolean
  setTextureOpened: (_textureOpened: boolean) => void
}


const HiddenNodesContextInitialState = {
  sites: [],
  addHiddenNode: (addedHiddenNode: ReactNode) => { },

  textureOpened: false,
  setTextureOpened: (_textureOpened: boolean) => { },
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

  const [textureOpened, setTextureOpened] = useState(false)

  return (
    <HiddenNodesContext.Provider value={{
      sites,
      addHiddenNode,
      textureOpened,
      setTextureOpened
    }}>
      {sites}
      {children}
    </HiddenNodesContext.Provider>
  )
}
