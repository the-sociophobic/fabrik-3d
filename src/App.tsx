import Scene from './Scene'
import { HiddenNodesContextProvider } from './app/html-render/HiddenNodesContext'


function App() {
  return (
    <HiddenNodesContextProvider>
      <div className='App'>
        <Scene />
      </div>
    </HiddenNodesContextProvider>
  )
}


export default App
