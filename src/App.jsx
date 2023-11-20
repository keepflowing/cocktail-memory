async function getCocktail() {
  const fullUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  const result = await fetch(fullUrl, {mode: 'cors'});
  const data = await result.json();
  return data;
}

const drinkList = []

for (let i = 0; i < 5; i++) {
  const result = await getCocktail()
  drinkList.push(result.drinks[0])
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

  return (
    <>
      {drinkList.map(d => <Card 
      key={d.idDrink} name={d.strDrink} url={d.strDrinkThumb}/>)}
    </>
  )
}

export default App
