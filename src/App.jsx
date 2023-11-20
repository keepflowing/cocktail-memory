async function getCocktail() {
  const fullUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  const result = await fetch(fullUrl, {mode: 'cors'});
  const data = await result.json();
  return data;
}

const drinkList = []

for (let i = 0; i < 5; i++) {
  const result = await getCocktail()
  drinkList.push(result.drinks[0].strDrink)
}

function App() {

  // console.log(drinkList)

  return (
    <>
      {drinkList.map(drink => <h1 key={drink}>{drink}</h1>)}
    </>
  )
}

export default App
