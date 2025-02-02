import { useState } from "react"
import "../styles/game.css"

const PHRASE: string =
  "Silonuestronosedaenestavida,tebuscareenlaproximaysinoenlasmilesdevidasquevenganYaunquefuncioneenestaseguirebuscandotesiempre"

const LETTER_MAP: { [key: string]: number } = {
  A: 94,
  B: 50,
  C: 73,
  D: 12,
  E: 70,
  F: 73,
  G: 74,
  H: 26,
  I: 33,
  J: 25,
  K: 26,
  L: 7,
  M: 15,
  N: 22,
  O: 100,
  P: 40,
  Q: 30,
  R: 35,
  S: 71,
  T: 90,
  U: 91,
  V: 44,
  W: 66,
  X: 75,
  Y: 50,
  Z: 18,
}

const SENTENCES: { [key: string]: string } = {
  "El nombre del amor de mi vida": "LAURA",
  "Mes de conocernos": "ENERO",
  "Que quiere estudiar el amor de mi vida": "OPTOMETRIA",
  "Banda favorita del amor de mi vida": "VILMAPALMA",
  "": "EVAMPIROS",
  "Sentimiento en comun": "AMOR",
}

const Game: React.FC = () => {
  const [guessedLetters, setGuessedLetters] = useState<{
    [key: number]: string
  }>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleGuess = (letter: string, number: number) => {
    setGuessedLetters((prev) => ({ ...prev, [number]: letter }))
  }

  const renderPhrase = (phrase: string) => {
    return phrase.split("").map((letter, index) => (
      <div key={index} className="letter-box">
        <div className="letter">{guessedLetters[LETTER_MAP[letter.toUpperCase()] || 0] || " "}</div>
        <div className="number">{LETTER_MAP[letter.toUpperCase()] || " "}</div>
      </div>
    ))
  }

  const renderSentences = () => {
    return Object.entries(SENTENCES).map(([sentence, answer], index) => (
      <div key={index} className="sentence-row">
        <div className="sentence">{sentence}</div>
        <div
          className={`answer ${selectedAnswer === sentence ? "selected" : ""}`}
          onClick={() => setSelectedAnswer(sentence)}
        >
          {answer.split("").map((letter, i) => (
            <span key={i} className="answer-letter">
              {guessedLetters[LETTER_MAP[letter]] || "_"}
            </span>
          ))}
        </div>
      </div>
    ))
  }

  return (
    <div className="game-container">
      <h1>Descifra la frase oculta</h1>
      <div className="columns-container">
        <div className="column">
          <h2>Frase 1</h2>
          <div className="phrase-container">{renderPhrase(PHRASE)}</div>
        </div>
      </div>
      <div className="columns-container">
        <div className="column">
          {renderSentences()}
        </div>
      </div>
      <div className="input-container">
        <input
          type="text"
          maxLength={1}
          placeholder="Letra"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const letter = e.target.value.toUpperCase()
            if (LETTER_MAP[letter]) {
              handleGuess(letter, LETTER_MAP[letter])
            }
          }}
        />
      </div>
    </div>
  )
}

export default Game

