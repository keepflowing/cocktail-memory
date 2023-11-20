import { useState, useEffect } from "react";

function List({drinks, num}) {
  const arr = []
  for (let i = 0; i < num; i++) {
    arr.push(i)
  }
  
  return (
    <>
      {arr.map(n => 
        <Card 
          key={n} 
          name={drinks[n] ? drinks[n].strDrink : 'Loading...'}
          url={drinks[n] ? drinks[n].strDrinkThumb : 'archerload.gif'}/>)}
    </>
  )
}

function Card({name, url}) {
  return (
    <div className='card'>
      <h2>{name}</h2>
      <img src={url}/>
    </div>
  )
}

function App() {
  const [drinks, setDrinks] = useState([])
  const [num, setNum] = useState(3)

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
       <List drinks={drinks} num={num}/>
      </div>
      <button onClick={() => setNum(num+1)}>New Drinks</button>
    </>
  )
}

export default App
