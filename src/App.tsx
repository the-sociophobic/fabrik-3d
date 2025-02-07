import Scene from './Scene'
import { HiddenNodesContextProvider } from './app/html-material/HiddenNodesContext'


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
