import { useState, useEffect } from "react";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function Ingredients({drink}) {
  const [isHovered, setIsHovered] = useState(false)
  const ingredients = []
  for (let i = 0; i < 15; i++) {
    let str = ''
    if (drink[`strIngredient${i+1}`]) {
      str = drink[`strIngredient${i+1}`]
      if ((drink[`strMeasure${i+1}`])) {
        str = `${drink[`strMeasure${i+1}`]} ${str}`
      }
      ingredients.push(str)
    } else {
      break
    }
  }
  return (
  <div 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <ul>
    {isHovered ? <p>{drink.strInstructions}</p> 
    : ingredients.map((e, i) => <li key={i}>{e}</li>)}
    </ul>
  </div>
  )
}

function GenerateCards({drinks, num, handleClick, open={open}}) {
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
          open={open}
          ingredients={drinks[n] && <Ingredients drink={drinks[n]}/>}
          name={drinks[n] ? drinks[n].strDrink : 'Loading...'}
          url={drinks[n] ? drinks[n].strDrinkThumb : 'archerload.gif'}/>)}
    </>
  )
}

function Card({name, url, drinkId, handleClick, open, ingredients}) {
  return (
    <div 
      className='card'
      onClick={() => {
        if(!open) handleClick(drinkId)
      }}
    >
      <h2 className='neonWhite'>{name}</h2>
      {
        !open ? <img src={url}/> : <>{ingredients}</>
      }
    </div>
  )
}

function App() {
  const [clicked, setClicked] = useState([])
  const [drinks, setDrinks] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [num, setNum] = useState(3)
  const [open, setOpen] = useState(false)

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
      setDrinks(shuffle([...drinks]))
      if(score + 1 > highScore) {
        setHighScore(score + 1)
      }
      if (clicked.length === drinks.length - 1) {
        setNum(num + 1);
        setClicked([])
      }
    } else {
      setClicked([])
      setNum(3)
      setScore(0)
    }
    setDrinks(shuffle([...drinks]))
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
      <div id='top-bar'>
        <h1 className='neonBlue'>Welcome to the bar!</h1>
        <br></br>
        <nav>
          <p className='neonYellow'>Current level: {clicked.length}/{drinks.length}</p>
          <p className='neonRed'>Score: {score} | High Score: {highScore}</p>
          <p className='neonYellow link' 
            onClick={() => setOpen(!open)}>Show recipes</p>
        </nav>
      </div>
      <div id='content'>
       <GenerateCards 
        drinks={drinks} 
        num={num} 
        handleClick={handleClick} 
        open={open}/>
      </div>
    </>
  )
}

export default App