// initialize pokemonRepository as IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  // add a pokemon to pokemonList
  function add(item) {
      pokemonList.push(item)
  };


  // return pokemonList function
  function getAll() {
    return pokemonList;
  };


  function addListItem(pokemon) {
    let name = pokemon.name;
    let list = document.querySelector('.pokemon-list')
    let pokemonListItem = document.createElement('li');
    let pokemonButton = document.createElement('button');

    pokemonButton.innerText = name;
    pokemonButton.setAttribute('class', 'pokemon-button');

    pokemonButton.addEventListener('click', (e) => {
      showDetails(pokemon)
    });
    
    pokemonListItem.appendChild(pokemonButton);
    list.appendChild(pokemonListItem);
  };

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// writing pokemon names and heights to the DOM
// function writeArrayDetails(arr) {
//   arr.forEach(function(pokemon) {
//     pokemonRepository.addListItem(pokemon)
//   });
// };

// writeArrayDetails(pokemonRepository.getAll());