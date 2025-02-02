import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from "react"
import './App.css'
import Home from './pages/Home'
import Game from './pages/game'

function App() {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio("public/Cancion.mp3") // Usa la ruta relativa correctamente
    audio.loop = true // Hace que la música se repita
    setAudioElement(audio)

    const handleUserInteraction = () => {
      audio.play().catch((error) => {
        console.log("Reproducción automática bloqueada:", error)
      })
      // Remover el listener después de la primera interacción
      document.removeEventListener('click', handleUserInteraction)
    }

    // Esperar a que el usuario haga click en cualquier parte para reproducir el audio
    document.addEventListener('click', handleUserInteraction)

    // Limpiar el audio cuando el componente se desmonte
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return (
    <Router>
      <div className="background-image" style={{ backgroundImage: `url('src/assets/Fondo.jpeg')`, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
      
      {/* El audio se mantiene en todo momento */}
      {audioElement && <audio src={audioElement.src} autoPlay loop />}
    </Router>
  )
}

export default App
