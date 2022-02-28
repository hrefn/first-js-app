// initialize pokemonList array
let pokemonList = [];

// pokemon objects
let pokemon1 = {
  name: 'Bulbasaur',
  height: 0.7,
  weight: 6.9,
  type: ['grass', 'poison']
};

let pokemon2 = {
  name: 'Charmander',
  height: 0.6,
  weight: 8.5,
  type: ['fire']
};

let pokemon3 = {
  name: 'Squirtle',
  height: 0.5,
  weight: 9,
  type: ['water']
};

// add pokemon objects to pokemonList array
pokemonList.push(pokemon1, pokemon2, pokemon3);

// writing pokemon names and heights to the DOM
for (let i = 0; i < pokemonList.length; i++) {
  // assign name and height to variables for better readability
  let height = pokemonList[i].height
  let name = pokemonList[i].name

  document.write(name + ' ');
  document.write('(height: ' + height + ') ');
  if (height < .6) {
    document.write('- Wow this one is short.')
  }
  document.write('<br>')
}