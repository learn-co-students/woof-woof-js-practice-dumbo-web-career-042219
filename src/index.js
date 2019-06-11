const url = "http://localhost:3000/pups"
const dogBar = document.getElementById('dog-bar')
const dogSummaryContainer = document.querySelector('#dog-summary-container')
// const dogSummaryContainer = document.querySelector("#dog-summary-container");
// console.log(dogBar)


const createDoggoHTML = (dog) => {
return `
    <div>
    <h2> ${dog.name} </h2>
    <img style= "width:50px" src= ${dog.image} />
    <button data-behavior = ${dog.isGoodDog}> </button>
    </div>
`
}

const createDogSpan = (dog) => {
  return
  `<div>
    <h2>${dog.name} </h2>
    </div>
  `
}


fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(data => {
  data.forEach(dog => {
    dogBar.innerHTML += `
      <span>${dog.name} </span>
    `
    dogSummaryContainer.innerHTML += createDoggoHTML(dog)
    // debugger
  })
  // console.log(data)
})
