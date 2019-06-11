const dogURL = "http://localhost:3000/pups/"
const doggoDiv = document.getElementById('dog-info')


// --- get the dogs ---
document.addEventListener("DOMContentLoaded", () => {
	const dogBar = document.getElementById('dog-bar')
	fetch(dogURL)
	.then(function(response) {
		return response.json();
	})
	.then(function(myJson) {
		myJson.forEach(function(dog) {
	dogBar.innerHTML += `
	<span id=${dog.id}>${dog.name}</span>
	`	
		})
	});	

// --- fetch the specific dog hehe ---
dogBar.addEventListener('click', function(e) {
	console.log(e.target.id)
	if(e.target.id != 'dog-bar') {
	fetch(dogURL)
	.then(function(response) {
		return response.json();
	})
	.then(function(myJson) {
	let clickedDog = myJson.filter(dog => dog.id == e.target.id)
	// console.log(clickedDog)
	// debugger
	document.getElementById('dog-info').innerHTML =
	`  <img src=${clickedDog[0].image}>
  <h2>${clickedDog[0].name}</h2>
  <button id="button" data-id="${clickedDog[0].id}">Good Dog!</button> `	
	})
	}
})

// --- make em good dogz ---
document.getElementById("dog-summary-container").addEventListener('click', function (e) {
		console.log(e.target.dataset.id)
		if(e.target.dataset != undefined) {
		fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          isGoodDog: true
        	})
		})
	}
})
// --- toggle good dogs ---
document.getElementById("good-dog-filter").addEventListener('click', function (e) {
	document.querySelector("good-dog-filter").innerText = 'Filter good dogs: ON'
	const dogBar = document.getElementById('dog-bar')
	dogBar.innerHTML = ''
	fetch(dogURL)
	.then(function(response) {
		return response.json();
	})
	.then(function(myJson) {
	let goodDogs = myJson.filter(dog => 
    dog.isGoodDog === true)
	goodDogs.forEach(function(goodDog) {
	dogBar.innerHTML += `
	<span id=${goodDog.id}>${goodDog.name}</span>
	`
			})
		})
	});	
})