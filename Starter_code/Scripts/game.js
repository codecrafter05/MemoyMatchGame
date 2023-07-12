

const imagesArray = [
    '001.svg', '002.svg', '003.svg', '004.svg',
    '005.svg', '006.svg', '007.svg', '008.svg',
    '009.svg', '010.svg', '011.svg', '012.svg',
    '013.svg', '014.svg',
  ];
  
  // Display the game board based on the difficulty level selected
  function createGameBoard(gridSize) {
    const gameContainer = document.getElementById('gc');
  
    gameContainer.innerHTML = '';
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  
    for (let i = 0; i < gridSize * gridSize; i++) {
      let div = document.createElement('div');
      div.classList.add('box');
      div.setAttribute('id', `g${i}`);
      gameContainer.appendChild(div);
    }
    placeImages(gridSize);
  }
  
  // Set up the game by attaching event listeners to the difficulty buttons
  function setupGame() {
    const easyButton = document.getElementById('super-happy');
    const mediumButton = document.getElementById('neutral');
    const hardButton = document.getElementById('super-sad');
  
    easyButton.addEventListener('click', () => createGameBoard(3,));
    mediumButton.addEventListener('click', () => createGameBoard(4));
    hardButton.addEventListener('click', () => createGameBoard(5));
  }
  
  // Place pairs of images randomly on the game board
  function placeImages(gridSize) {
    let remainingImages = [...imagesArray];
    let filledSquares = gridSize * gridSize;
    let squareArray = Array.from({ length: filledSquares }, (_, i) => i);
  
    while (filledSquares > 1) {
      let randomImageIndex = Math.floor(Math.random() * remainingImages.length);
      let imagePath = 'images/' + remainingImages[randomImageIndex];
  
      for (let i = 0; i < 2; i++) {
        let randomSquareIndex = Math.floor(Math.random() * squareArray.length);
        let squareID = 'g' + squareArray[randomSquareIndex];
  
        const slot = document.getElementById(squareID);
        const image = document.createElement('img');
        image.setAttribute('src', imagePath);
        image.setAttribute('alt', 'no_image');
        slot.appendChild(image);
  
        squareArray.splice(randomSquareIndex, 1);
      }
  
      remainingImages.splice(randomImageIndex, 1);
      filledSquares -= 2;
    }
  
    setTimeout(() => {
      coverImages();
      handleClicks();
    }, 2000);
  }
  
  // Cover all the images on the game board
  function coverImages() {
    const images = document.querySelectorAll('#gc img');
    images.forEach((img) => {
      img.style.visibility = 'hidden';
    });
  }
  
  // Handle user clicks on the game board
  function handleClicks() {
    const boxes = document.querySelectorAll('.box');
    let firstImage = null;
    let secondImage = null;
    let freezeClicks = false;
  
    boxes.forEach((box) => {
      box.addEventListener('click', () => {
        if (freezeClicks) return;
  
        const image = box.querySelector('img');
        image.style.visibility = 'visible';
  
        if (firstImage === null) {
          firstImage = image;
        } else if (secondImage === null) {
          secondImage = image;
   
          if (firstImage.getAttribute('src') === secondImage.getAttribute('src')) {
            setTimeout(() => {
              firstImage.parentElement.style.visibility = 'hidden';
              secondImage.parentElement.style.visibility = 'hidden';
  
              firstImage = null;
              secondImage = null;
            }, 1000);
          } else {
            freezeClicks = true;
            setTimeout(() => {
              firstImage.style.visibility = 'hidden';
              secondImage.style.visibility = 'hidden';
  
              firstImage = null;
              secondImage = null;
              freezeClicks = false;
            }, 1000);
          }
        } else {
          return;
        }
      });
    });
  }
  
  // Initialize the game by calling the setupGame function when the page loads
  window.onload = function () {
    setupGame();
  };