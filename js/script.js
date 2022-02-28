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

  return {
    add: add,
    getAll: getAll
  };
})();


// writing pokemon names and heights to the DOM
function writeArrayDetails(arr) {
  arr.forEach(function(pokemon) {
    let height = pokemon.height
    let name = pokemon.name

    document.write(name + ' ');
    document.write('(height: ' + height + ') ');
    if (height < .6) {
      document.write('- Wow this one is short.')
    }
    document.write('<br>')
  });
};

writeArrayDetails(pokemonRepository.getAll());