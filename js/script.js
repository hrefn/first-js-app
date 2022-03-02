// initialize pokemonRepository as IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container')
  let dialogPromiseReject;


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

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible')
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let contentContainer = document.createElement('div');
      contentContainer.classList.add('content-container')

      let contentElement = document.createElement('div');
      contentElement.classList.add('content-element')

      let pictureDiv = document.createElement('div');
      pictureDiv.classList.add('picture-div')
      
      let url = document.createElement('a');
      url.setAttribute('href', pokemon.detailsUrl);
      url.setAttribute('target', '_blank');
      url.innerText = 'Full Details';

      let br = document.createElement('br');

      let picture = document.createElement('img');
      picture.setAttribute('src', pokemon.imageUrl);
      picture.innerText = 'Picture';

      let height = document.createElement('p');
      height.innerText = 'Height: ' + pokemon.height + 'm'

      let types;

      if (pokemon.types.length == 1) {
        types = document.createElement('p');
        types.innerText = pokemon.types[0].type.name
      }

      if (pokemon.types.length == 2) {
        types = document.createElement('p');
        types.innerText = pokemon.types[0].type.name + (' and ') + pokemon.types[1].type.name
      }

      pictureDiv.appendChild(picture)
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(contentContainer);
      contentElement.appendChild(url);
      contentElement.appendChild(br)
      contentElement.appendChild(height);
      contentElement.appendChild(types);
      contentContainer.appendChild(contentElement);
      contentContainer.appendChild(pictureDiv);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    });
  }

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === document.querySelector('#modal-container')) {
      hideModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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