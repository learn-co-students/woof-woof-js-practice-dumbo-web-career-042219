document.addEventListener("DOMContentLoaded", () => {
  const url = "http://localhost:3000/pups/"
  const dogBar = document.querySelector("#dog-bar")
  const dogInfo = document.querySelector("#dog-info")
  const filterButton = document.querySelector("#good-dog-filter")
  const behavior = {
    true:"Good Dog!",
    false:"Bad Dog!"
  }
  const behaviorSwitch = {
    true:false,
    false:true
  }
  const filterButtonToggle = {
    "Filter good dogs: ON":"Filter good dogs: OFF",
    "Filter good dogs: OFF":"Filter good dogs: ON"
  }
  let targetId = 0

  const addDog = (dog) => {
    let spanTag = document.createElement("span")
    spanTag.innerText = dog.name
    spanTag.setAttribute("id", dog.id)
    spanTag.setAttribute("data-behavior", dog.isGoodDog)
    spanTag.setAttribute("data-img", dog.image)
    dogBar.append(spanTag)
  }

  const fetchDogs = () => {
    fetch(url)
    .then(resp => resp.json())
    .then(dogs => {
      dogs.forEach(dog => {
        addDog(dog)
      })
    })
  }

  fetchDogs()

  dogBar.addEventListener("click", (e) => {
    if(e.target.tagName === "SPAN"){
      dogInfo.innerHTML = ""
      dogInfo.innerHTML += `
        <img src=${e.target.dataset.img} >
        <h2 data-id=${e.target.id}> ${e.target.innerText} </h2>
        <button data-behavior=${e.target.dataset.behavior}> ${behavior[e.target.dataset.behavior]} </button>
      `
    }
  })

  dogInfo.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON"){
      targetId = e.target.parentElement.querySelector("h2").dataset.id
      fetch(`${url}${targetId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({isGoodDog: behaviorSwitch[e.target.dataset.behavior]})
      })
      .then(resp => resp.json())
      .then(dog => {
        dogInfo.querySelector("button").innerText = behavior[dog.isGoodDog]
        dogInfo.querySelector("button").dataset.behavior = dog.isGoodDog
        let dogSpan = dogBar.querySelector(`span[id="${targetId}"]`)
        dogSpan.dataset.behavior = dog.isGoodDog
      })
    }
  })

  filterButton.addEventListener("click", (e) => {
    dogBar.innerHTML = ""
    filterButton.innerText = filterButtonToggle[filterButton.innerText]
    if(filterButton.innerText === "Filter good dogs: ON"){
      fetch(url)
      .then(resp => resp.json())
      .then(dogs => {
        dogs.forEach(dog => {
          if(dog.isGoodDog === true){
            addDog(dog)
          }
        })
      })
    } else {
      fetchDogs()
    }
  })
})
