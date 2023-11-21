import { useState, useEffect } from "react";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function GenerateCards({drinks, num, handleClick}) {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(i)
  }
  
  return (
    <>
      {arr.map(n => 
        <Card 
          key={n} 
          drinkId={drinks[n] && drinks[n].idDrink}
          handleClick={handleClick}
          name={drinks[n] ? drinks[n].strDrink : 'Loading...'}
          url={drinks[n] ? drinks[n].strDrinkThumb : 'archerload.gif'}/>)}
    </>
  )
}

function Card({name, url, drinkId, handleClick}) {
  return (
    <div 
      className='card'
      onClick={() => handleClick(drinkId)}
    >
      <h2>{name}</h2>
      <img src={url}/>
    </div>
  )
}

function App() {
  const [clicked, setClicked] = useState([])
  const [drinks, setDrinks] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [num, setNum] = useState(3)

  const handleClick = (id) => {
    let count = 0;
    for (let i = 0; i < clicked.length; i++) {
      if (clicked[i] === id) {
        count++
      }
    }
    if (count === 0) {
      setClicked([...clicked, id])
      setScore(score + 1)
      if(score + 1 > highScore) {
        setHighScore(score + 1)
      }
    } else {
      setClicked([])
      setNum(3)
      setScore(0)
    }
    setDrinks(shuffle([...drinks]))
    if (clicked.length === drinks.length - 1) {
      setNum(num + 1);
      setClicked([])
    }
  }

  const handleNumChange = async (num) => {
    const arr = []
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    for (let i = 0; i < num+1; i++) {
      const result = await fetch(url)
      result.json().then(r => {
        arr.push(r.drinks[0])
      })
    }
    setDrinks([...arr])
  }  

  useEffect(() => {
    setDrinks([])
    handleNumChange(num)
  }, [num])

  return (
    <>
      <div id='content'>
       <GenerateCards drinks={drinks} num={num} handleClick={handleClick}/>
      </div>
      <p>Current level: {clicked.length}/{drinks.length}</p>
      <p>Score: {score} | High Score: {highScore}</p>
      <button onClick={() => setNum(3)}>Restart</button>
    </>
  )
}

export default App