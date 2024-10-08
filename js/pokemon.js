class Pokemon {

    // (1)
    static keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    };

    // (2)
    static activePokemon = null;

    constructor(name, sprite) {
        this.name = name;
        this.sprite = sprite;
        this.element = this.createElement();
        this.addEventListeners();
    }
    
    createElement() {
      // (3)
      const img = document.createElement('img');

      img.src = this.sprite;

      img.style.position = 'absolute';

      img.style.top = Math.ceil(Math.random()*100) + 'px';
      img.style.left = Math.ceil(Math.random()*100) + 'px';

      document.body.appendChild(img);

      return img;
    }
    
    addEventListeners() {   
     	// (4)
      this.element.addEventListener('click', () => {

        Pokemon.activePokemon = this;

      });
    }
    
    move(step) { 
    	// (5)
      let top = parseInt(this.element.style.top);
      let left = parseInt(this.element.style.left);
      if (Pokemon.keys.ArrowUp) 
        this.element.style.top = (top - step) + 'px';
      if (Pokemon.keys.ArrowDown)    
        this.element.style.top = (top + step) + 'px';
      if (Pokemon.keys.ArrowLeft)
        this.element.style.left = (left - step) + 'px';
      if (Pokemon.keys.ArrowRight) 
        this.element.style.left =  (left + step) + 'px';

    }
} // end of Pokemon class


document.addEventListener('keydown', function (event) {
  
   // (6)
   Pokemon.keys[event.key] = true;

});

document.addEventListener('keyup', function (event) {
   
  // (7)
  Pokemon.keys[event.key] = false;

});

function moveActivePokemon() {
   
  // (8)
  const step = 5;

  if (Pokemon.activePokemon) {

    Pokemon.activePokemon.move(step);

  }
}

setInterval(moveActivePokemon, 10);

// Instantiate Pokémon
const pokemonNames = ['pikachu', 'bulbasaur', 'charmander', 'squirtle', 'jigglypuff', 'volcarona', 'emboar', 'yveltal', 'luxray', 'rayquaza', 'gyarados', 'naganadel', 'charizard', 'psyduck', 'ponyta', 'lugia', 'altaria', 'milotic', 'metagross'];

function loadImage(url){

  return new Promise((resolve, reject) => {

    const img = new Image();

    img.onload = () => resolve(img);

    img.onerror = () => reject(new Error('Error al cargar la imagen'));

    img.src = url;

  });
}

pokemonNames.forEach(name => {
    //Solicita al servidor externo la imagen del pokemon correspondiente y genera el pokemon

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(data => {
      return loadImage(data.sprites.front_default);
    })
    .then(img => {
      new Pokemon(name, img.src);
    })
    .catch(error => console.error(error));

});