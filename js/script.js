// initialize pokemonRepository as IIFE
let pokemonRepository = (function () {

  // pokemonList array
  let pokemonList = [
    pokemon1 = {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      type: ['grass', 'poison']
    },
    pokemon2 = {
      name: 'Charmander',
      height: 0.6,
      weight: 8.5,
      type: ['fire']
    },
    pokemon3 = {
      name: 'Squirtle',
      height: 0.5,
      weight: 9,
      type: ['water']
    }
  ];

  // return pokemonList function
  function getAll() {
    return pokemonList;
  };

  // add a pokemon to pokemonList
  function add(item) {
    pokemonList.push(item);
  };

  function addListItem(pokemon) {
    let name = pokemon.name;
    let list = document.querySelector('.pokemon-list')
    let pokemonListItem = document.createElement('li');
    let pokemonButton = document.createElement('button');

    pokemonButton.innerText = name;
    pokemonButton.setAttribute('class', 'pokemon-button');

    pokemonButton.addEventListener('click', (e) => {
      showDetails(pokemonButton.innerText)
    });
    
    pokemonListItem.appendChild(pokemonButton);
    list.appendChild(pokemonListItem);
  };

  function showDetails(pokemon) {
    console.log(pokemon);
  };

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();


// writing pokemon names and heights to the DOM
function writeArrayDetails(arr) {
  arr.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)
  });
};

writeArrayDetails(pokemonRepository.getAll());