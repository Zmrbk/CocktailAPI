const API_SEARCH_BY_NAME = 'https://thecocktaildb.com/api/json/v1/1/search.php?s='
const API_ALL_COCKTAILS = 'https://thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
const API_FILTER = 'https://thecocktaildb.com/api/json/v1/1/filter.php?a='
const API_DETAIL = 'https://thecocktaildb.com/api/json/v1/1/lookup.php?i='
const API_INGREDIENTS = 'https://thecocktaildb.com/api/json/v1/1/lookup.php?iid='
const API_SOSTAV = 'https://thecocktaildb.com/api/json/v1/1/search.php?i='
// Alcoholic && Non_Alcoholic

let body = document.body;
let div = document.createElement('div');
div.className = 'container';
let title = document.createElement('h1');
title.textContent = 'Cocktails API'
let txt = document.getElementById('text');
let select = document.getElementById('select');
let output = document.getElementById('output')
div.append(title, txt, select, output);
body.appendChild(div);

const getAllCocktails = async()=>{
    const req = await fetch(API_ALL_COCKTAILS)
    const res = await req.json()
    // console.log(res);
    renderCocktails(res.drinks)
}
getAllCocktails();

const renderCocktails = (arr)=>{
    let output = document.getElementById('output')
    output.innerHTML = ''
    arr.map(el=>{
        let div = document.createElement('div');
        div.className = 'cocktail_item'
        div.addEventListener('click', ()=>getDetailCocktail(el.idDrink))
        let img = document.createElement('img');
        img.className = 'img';
        let name = document.createElement('h4')

        img.src = el.strDrinkThumb
        name.textContent = el.strDrink

        div.append(img, name)
        output.appendChild(div)
    })
}

const search = async (e)=>{
    // e.preventDefault()
    // let text = document.getElementById('text').value

    let select = document.getElementById('select')
    select.value = 'All'

    let text = e.target.value
    if(text.length > 2){
        const req = await fetch(API_SEARCH_BY_NAME+text)
        const res = await req.json()
        console.log('search', res.drinks)
        renderCocktails(res.drinks)
    }else{
        getAllCocktails()
    }
}

const filter = async(e)=>{
    let input = document.getElementById('text')
    input.value = ''
    let fill = e.target.value
    if(fill == 'All'){
        getAllCocktails()
    }else{
        const req = await fetch(API_FILTER+fill)
        const res = await req.json()
        console.log(res.drinks)
        renderCocktails(res.drinks)
    }
}

const getDetailCocktail = async(id)=>{
    // alert(id)
    const req = await fetch(API_DETAIL+id)
    const res = await req.json()
    console.log(res.drinks[0]);
    renderDetail(res.drinks[0])
}

const renderDetail = async(cocktail)=>{
    let output = document.getElementById('output')
    output.innerHTML = ''

    let cocktailContent = document.createElement('div');
    cocktailContent.className = 'cocktail_content'

    let img = document.createElement('img')
    img.className = 'img'
    img.src = cocktail.strDrinkThumb

    let name = document.createElement('h4')
    name.innerHTML = cocktail.strDrink

    let btn = document.createElement('button')
    btn.className = 'btn'
    btn.textContent = 'Go back'

    btn.addEventListener('click', ()=>getAllCocktails())

    let description = document.createElement('b')
    description.className = 'description'
    description.innerHTML = cocktail.strInstructions

    let ingredient1 = document.createElement('p')
    ingredient1.className = 'cocktail_ingredient'
    ingredient1.innerHTML = cocktail.strIngredient1

    let ingredient2 = document.createElement('p')
    ingredient2.className = 'cocktail_ingredient'
    ingredient2.innerHTML = cocktail.strIngredient2
    
    let ingredient3 = document.createElement('p')
    ingredient3.className = 'cocktail_ingredient'
    ingredient3.innerHTML = cocktail.strIngredient3

    let ingredient4 = document.createElement('p')
    ingredient4.className = 'cocktail_ingredient'
    ingredient4.innerHTML = cocktail.strIngredient4

    ingredient1.addEventListener('click', ()=>getSostav(cocktail.strIngredient1, cocktail.idDrink))
    ingredient2.addEventListener('click', ()=>getSostav(cocktail.strIngredient2, cocktail.idDrink))
    ingredient3.addEventListener('click', ()=>getSostav(cocktail.strIngredient3, cocktail.idDrink))
    ingredient4.addEventListener('click', ()=>getSostav(cocktail.strIngredient4, cocktail.idDrink))

    let measure1 = document.createElement('p')
    measure1.innerHTML = cocktail.strMeasure1

    let measure2 = document.createElement('p')
    measure2.innerHTML = cocktail.strMeasure2

    let measure3 = document.createElement('p')
    measure3.innerHTML = cocktail.strMeasure3

    let measure4 = document.createElement('p')
    measure4.innerHTML = cocktail.strMeasure4

    cocktailContent.append(img, name, description, ingredient1, ingredient2,
        ingredient3, ingredient4, measure1, measure2, measure3, measure4, btn)

    output.appendChild(cocktailContent)
}

const getSostav = async(name, id)=>{
    const req = await fetch(API_SOSTAV+name)
    const res = await req.json()
    // console.log(res.ingredients[0], id)
    // console.log(id);
    renderIngredients(res.ingredients[0], id)
}

const renderIngredients = (ingred, id)=>{
    let output = document.getElementById('output')
    output.innerHTML = ''

    let ingredDiv = document.createElement('div')
    ingredDiv.className = 'ingredient'

    let name = document.createElement('h2')
    name.innerHTML = ingred.strIngredient

    let ingredient = document.createElement('p')
    ingredient.className = 'ingred_content'
    ingredient.innerHTML = ingred.strDescription

    let btn = document.createElement('button')
    btn.className = 'btn'
    btn.textContent = 'Go back'
    btn.addEventListener('click', ()=>getDetailCocktail(id))

    ingredDiv.append(name, ingredient, btn)
    output.append(ingredDiv)
}