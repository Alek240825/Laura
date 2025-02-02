import "../styles/home.css"
import { Link } from "react-router-dom"


function Home() {

  return (
      <div className="app">
          <div className="overlay">
            <div className="title-container">
              <img src="src/assets/Titulo.png" alt="El Juego del Amor de Mi Vida" className="title-image" />
            </div>
            <Link to= "/Game">
            <button className="start-button">
              Vamos a Jugar
            </button>
          </Link>
          </div>
        </div>
  )
}

export default Home