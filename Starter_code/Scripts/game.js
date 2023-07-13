
let correctMatches = 0; // Add a variable to track correct matches
let incorrectMatches = 0; // Add a variable to track incorrect matches
const imagesArray = [
    '001.svg', '002.svg', '003.svg', '004.svg',
    '005.svg', '006.svg', '007.svg', '008.svg',
    '009.svg', '010.svg', '011.svg', '012.svg',
    '013.svg', '014.svg',
  ];
//defining the sound effects
  const winSound = new Audio('SFX/Correct.mp3');
  const loseSound = new Audio('SFX/Incorrect.mp3');
  const flipSound = new Audio('SFX/Flip.mp3');
  
  // Define a function called createGameBoard that takes a single parameter, gridSize
function createGameBoard(gridSize) {
  correctMatches = 0
  incorrectMatches = 0
  const correctMatchesElement = document.getElementById('correct-matches'); // Add this line
  const incorrectMatchesElement = document.getElementById('incorrect-matches'); // Add this line
  correctMatchesElement.textContent = `Correct matches: ${correctMatches}`;
  incorrectMatchesElement.textContent = `Incorrect matches: ${incorrectMatches}`;

  // Set a constant variable, gameContainer, to reference the HTML element with the ID of 'gc'
  const gameContainer = document.getElementById('gc');

  // Clear the inner HTML of gameContainer so that it is empty
  gameContainer.innerHTML = '';
  
  // Set the CSS property gridTemplateColumns of the gameContainer element to create a grid with the specified number of columns based on the gridSize
  gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

  // Create a loop that iterates through the total number of cells in the grid (i.e., gridSize * gridSize)
  for (let i = 0; i < gridSize * gridSize; i++) {
    
    // For each iteration, create a new div element
    let div = document.createElement('div');
    
    // Add a class 'box' to the created div
    div.classList.add('box');
    
    // Set an attribute 'id' with a unique value for the created div
    div.setAttribute('id', `g${i}`);
    
    // Append the created div to the gameContainer element
    gameContainer.appendChild(div);
  }
  
  // Call the placeImages function with the gridSize as its argument to place images on the game board
  placeImages(gridSize);
}
  
  // Set up the game by attaching event listeners to the difficulty buttons
function setupGame() {
  const easyButton = document.getElementById('super-happy');
  const mediumButton = document.getElementById('neutral');
  const hardButton = document.getElementById('super-sad');

  // Attach event listeners to the buttons and call createGameBoard function with corresponding gridSize
  easyButton.addEventListener('click', () => createGameBoard(3));
  mediumButton.addEventListener('click', () => createGameBoard(4));
  hardButton.addEventListener('click', () => createGameBoard(5));
}

// Place pairs of images randomly on the game board
function placeImages(gridSize) {
  let remainingImages = [...imagesArray];
  let filledSquares = gridSize * gridSize;
  //creates a new array called squareArray
  let squareArray = Array.from({ length: filledSquares }, (_, i) => i);

  // Loop until there are no more squares to fill
  while (filledSquares > 1) {
    // Choose a random image from the remainingImages array
    let randomImageIndex = Math.floor(Math.random() * remainingImages.length);
    let imagePath = 'images/' + remainingImages[randomImageIndex];

    // Place the same image in two squares on the game board
    for (let i = 0; i < 2; i++) {
      // Choose a random square from the squareArray
      let randomSquareIndex = Math.floor(Math.random() * squareArray.length);
      let squareID = 'g' + squareArray[randomSquareIndex];

      // Get the square element and create an image element
      const slot = document.getElementById(squareID);
      const image = document.createElement('img');
      
      // Set image attributes and append the image to the square
      image.setAttribute('src', imagePath);
      image.setAttribute('alt', 'no_image');
      slot.appendChild(image);

      // Remove the filled square from the squareArray
      squareArray.splice(randomSquareIndex, 1);
    }

    // Remove the used image from the remainingImages array
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
    // Loop through the images array and set visibility hidden on each
    for(let i=0; i < images.length ;i++){
        images[i].style.visibility = "hidden";
    }
    // images.forEach((img) => {
    //   img.style.visibility = 'hidden';
    // });
  }
  
  // Handle user clicks on the game board
function handleClicks() {
  const boxes = document.querySelectorAll('.box');
  let firstImage = null;
  let secondImage = null;
  let freezeClicks = false;


  const correctMatchesElement = document.getElementById('correct-matches'); // Add this line
  const incorrectMatchesElement = document.getElementById('incorrect-matches'); // Add this line

  // Add a click event listener for each box
  boxes.forEach((box) => {
    box.addEventListener('click', () => {
      flipSound.play();

      // If clicks are frozen, do not proceed
      if (freezeClicks) return;

      const image = box.querySelector('img');
      image.style.visibility = 'visible';

      // Check if firstImage and secondImage are available
      if (firstImage === null) {
        firstImage = image;
      } else if (secondImage === null) {
        secondImage = image;

        // Compare the image sources of firstImage and secondImage
        if (firstImage.getAttribute('src') === secondImage.getAttribute('src')) {
          winSound.play();
          correctMatches++;
          correctMatchesElement.textContent = `Correct matches: ${correctMatches}`;
          setTimeout(() => {
            // Hide matched images and reset firstImage and secondImage
            firstImage.parentElement.style.visibility = 'hidden';
            secondImage.parentElement.style.visibility = 'hidden';

            firstImage = null;
            secondImage = null;
          }, 1000);
        } else {
          // If images do not match, hide them and reset firstImage and secondImage
          freezeClicks = true;
          loseSound.play();
          incorrectMatches++; 
          incorrectMatchesElement.textContent = `Incorrect matches: ${incorrectMatches}`;
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