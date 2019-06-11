const url = "http://localhost:3000/pups/"
const dogBar = document.getElementById('dog-bar')
const dogSummaryContainer = document.querySelector('#dog-summary-container')
const dogCard = document.querySelector('.dog-card')

// const dogSummaryContainer = document.querySelector("#dog-summary-container");
// console.log(dogBar)


const createDoggoHTML = (dog) => {

return `
    <div data-id= ${dog.id} data-behavior = ${dog.isGoodDog} class = "dog-card">
    <h2 data-name= ${dog.name}> ${dog.name} </h2>
    <img style= "width:350px" src= ${dog.image} /> <br>
    <button class ="behavior" data-id =  ${dog.id} data-is-good-dog = ${dog.isGoodDog}>${dog.isGoodDog}</button>
    </div>
`
}

const createDogSpan = (dog) => {

  return `<span class="dog-span" data-id="${dog.id}" data-is-good-dog="${dog.isGoodDog}">${dog.name}</span>`
}

///FETCH ALL DOGS AND ADD THEM TO A SPAN
fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(data => {
    data.forEach(dog => {
        dogBar.innerHTML += createDogSpan(dog)
    })
})

//ON CLICK, FETCH A DOG AND ADD IT TO THE DOGSUMMARYCONTAINER INNERHTML
dogBar.addEventListener('click', (e) => {
  e.preventDefault()
  const dogButton = event.target
  let dogId = event.target.dataset.id
  let behavior =  event.target.dataset


  if(dogButton.classList.contains('dog-span')) {
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(res => res.json())
    .then(dog => {
      // console.log(dog)
      // debugger
      dogSummaryContainer.innerHTML = createDoggoHTML(dog)
    })
  }


})

//CLICK ON DOG BEHAVIOR BUTTON AND FLIP THE BEHAVIOR WITH A PATCH

dogSummaryContainer.addEventListener('click', (e) => {
  e.preventDefault()
  const dogBehaviorDiv = event.target


  let isGood = {
    "true": "false",
    "false": "true"
  }
  if(dogBehaviorDiv.classList.contains('behavior')) {
    let behavior =  dogBehaviorDiv.dataset.isGoodDog
    let dogId = dogBehaviorDiv.dataset.id
    behavior = isGood[behavior]

    fetch(`http://localhost:3000/pups/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: behavior
      })
    })
    .then(res => res.json())
    .then(dog => {
      dogBehaviorDiv.dataset.isGoodDog= dog.isGoodDog
      dogBehaviorDiv.innerText = `${dog.isGoodDog}`
    })
  }
})
