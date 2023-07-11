
//Genrate a random number of boxses according to the player chose difclty
window.onload = function() {
    const gameContainer = document.getElementById('gc');
    const easyButton = document.getElementById('super-happy');
    const mediumButton = document.getElementById('neutral');
    const hardButton = document.getElementById('super-sad');
  
    function createGrid(gridSize) {
      gameContainer.innerHTML = '';
      gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  
      for (let i = 0; i < gridSize * gridSize; i++) {
        let div = document.createElement('div');
        div.classList.add('box');
        div.setAttribute('id', `g${i}`);
        gameContainer.appendChild(div);
      }
    }
  
    easyButton.addEventListener('click', () => createGrid(3));
    mediumButton.addEventListener('click', () => createGrid(4));
    hardButton.addEventListener('click', () => createGrid(5));
  };



  



































// const match = document.querySelector('.your-container');
// for (let i = 0; i < 25; i++) {
//     let div = document.createElement('div');
//     div.classList.add(`box`);
//     div.setAttribute('id',`g${i}`)
//     match.appendChild(div);
// }

