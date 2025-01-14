import { Toaster } from 'react-hot-toast'
import './App.css'
import Weather from './Components/Weather/Weather'

function App() {

  return (
    <>
      <div className='app'>
        <Weather />
        <Toaster />
      </div>
    </>
  )
}

export default App
