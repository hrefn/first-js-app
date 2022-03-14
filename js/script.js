/* eslint-disable no-undef */
// initialize pokemonRepository as IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let currentHeightMeasurement = 'cm';
  let heightArray = [];
  let currentWeightMeasurement = 'kg';
  let weightArray = [];


  // add a pokemon to pokemonList
  function add(item) {
      pokemonList.push(item);
  }

  function search(search) {
    // eslint-disable-next-line no-undef
    $('.pokemon-list').empty();
    pokemonList.forEach(function(pokemon) {
      if (pokemon.name.indexOf(capitalize(search)) > -1) {
        addListItem(pokemon);
      }
    });
  }

  function capitalize(word) {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
  }

  function heightConverter() {
    if (currentHeightMeasurement === 'cm') {
      $('.height-container').text('Height: ' + heightArray[1] + ' inches');
      $('.height-container').find('span').remove();
      $('.height-container').append('<span onClick="pokemonRepository.heightConverter($(`.modal-title`).val())" class="conversion" id="height-converter">cm</span>');
      currentHeightMeasurement = 'inches'
    } else if (currentHeightMeasurement === 'inches') {
      $('.height-container').text('Height: ' + heightArray[0] + ' cm');
      $('.height-container').find('span').remove();
      $('.height-container').append('<span onClick="pokemonRepository.heightConverter($(`.modal-title`).val())" class="conversion" id="height-converter">inches</span>');
      currentHeightMeasurement = 'cm'
    }
  }

  function weightConverter() {
    if (currentWeightMeasurement === 'kg') {
      $('.weight-container').text('Weight: ' + weightArray[1] + ' lbs');
      $('.weight-container').find('span').remove();
      $('.weight-container').append('<span onClick="pokemonRepository.weightConverter($(`.modal-title`).val())" class="conversion" id="weight-converter">kg</span>')
      currentWeightMeasurement = 'pounds'
    } else if (currentWeightMeasurement === 'pounds') {
      $('.weight-container').text('Weight: ' + weightArray[0] + ' kg');
      $('.weight-container').find('span').remove();
      $('.weight-container').append('<span onClick="pokemonRepository.weightConverter($(`.modal-title`).val())" class="conversion" id="weight-converter">lbs</span>')
      currentWeightMeasurement = 'kg'
    }
  }


  // return pokemonList function
  function getAll() {
    return pokemonList;
  }


  function addListItem(pokemon) {
    let name = pokemon.name;
    let list = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('div');
    let pokemonButton = document.createElement('div');

    pokemonButton.innerText = name;
    pokemonButton.classList.add('pokemon-button');
    pokemonButton.classList.add('btn');
    pokemonButton.classList.add('btn-primary');
    pokemonButton.setAttribute('data-target', '#pokemonModal');
    pokemonButton.setAttribute('data-toggle', 'modal');
    pokemonListItem.classList.add('group-list-item');

    // eslint-disable-next-line no-unused-vars
    pokemonButton.addEventListener('click', (e) => {
      showDetails(pokemon);
    });
    
    pokemonListItem.appendChild(pokemonButton);
    list.appendChild(pokemonListItem);
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {

      $('.modal-title').text(pokemon.name);
      $('.modal-title').append('<div class="sr-only">' + pokemon.name + '</div>')

      $('.height-container').text('Height: ' + pokemon.height + ' cm')
      $('.weight-container').text('Weight: ' + pokemon.weight + ' kg')

      $('.height-container').append('<span onClick="pokemonRepository.heightConverter($(`.modal-title`).val())" class="conversion" id="height-converter">inches</span>');
      $('.height-container').append('<div class="sr-only">height ' + pokemon.height + ' centimeters, or ' + pokemon.heightInches + ' inches</div>')

      $('.weight-container').append('<span onClick="pokemonRepository.weightConverter($(`.modal-title`).val())" class="conversion" id="weight-converter">lbs</span>');
      $('.weight-container').append('<div class="sr-only">weight ' + pokemon.weight + ' kilograms, or ' + pokemon.weightPounds + ' pounds</div>')

      if (pokemon.types.length === 1) {
        $('.types-container').text('Type: ' + capitalize(pokemon.types[0].type.name))
        $('.types-container').append('<div class="sr-only">' + pokemon.types[0].type.name + '</div>')
      }

      if (pokemon.types.length === 2) {
        $('.types-container').text('Types: ' + capitalize(pokemon.types[0].type.name) + ', ' + capitalize(pokemon.types[1].type.name))
        $('.types-container').append('<div class="sr-only">' + pokemon.types[0].type.name + ' and ' + pokemon.types[1].type.name + '</div>')
      }

      $('.img-container').attr('src', pokemon.imageUrl)
      $('.img-container').append('<div class="sr-only">a picture of ' + pokemon.name + '</div>')
    });
  }


  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: capitalize(item.name),
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height * 10;
      item.heightInches = Math.round((details.height * 10) / 2.5);
      item.weight = details.weight / 10;
      item.weightPounds = Math.round((details.weight / 10) * 2.2);
      item.types = details.types;
      weightArray = []
      heightArray = []
      heightArray.push(item.height)
      heightArray.push(item.heightInches)
      weightArray.push(item.weight)
      weightArray.push(item.weightPounds)
    }).catch(function (e) {
      console.error(e);
    });
  }


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    search: search,
    heightConverter: heightConverter,
    weightConverter: weightConverter
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

$('#search').on('keyup', function() {
  pokemonRepository.search($(this).val())
})

