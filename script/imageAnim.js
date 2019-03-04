(() => {
	console.log('fired');

	// set up the puzzle pieces and boards
	// 
	// need a reference to each piec that we want to create
	const thePieces = ["topLeft", "topRight", "bottomLeft", "bottomRight"]
	
	// get a refrence to drag side
	let piecesBoard = document.querySelector(".puzzle-pieces");
	let puzzleBoard = document.querySelector(".puzzle-board");

	// get a reference to the buttons at the buttom so we can change the puzzle
	let puzzleSelectors = document.querySelectorAll("#buttonHolder img");

	// get a reference to the drop area
	let dropZones = document.querySelectorAll('.drop-zone');

	// function go in the middle
	function createPuzzlePieces(pictureIndex) {
		// generate images here -> need to make 4 (top left, right, bottom left, bottom right)
		// debugger;
		//
		// loop through the images refs and generate one for each
		thePieces.forEach((piece, index)=> {
			let newPuzzlePiece = `<img id="piece${index}" class="puzzle-image" src="images/${piece + pictureIndex}.jpg" alt="puzzle piece" draggable>`;

			piecesBoard.innerHTML += newPuzzlePiece;
		});

		initDrag();
	}
	// drag and drop functionlity
	// this is a 3-step process
	// 1. handle the drag event
	// 2. handle the dragover event
	// 3.handle the drop event
	//
	// dragging sets some data reference (an audio track name, image source, etc)
	// dragover -> just prevent the deflaut behaviour
	// on a drop is where the magic happens -> script that behaviour, get the data reference and
	// do what you need to do with it
	
	function initDrag() {
		piecesBoard.querySelectorAll('img').forEach(img => {
			img.addEventListener("dragstart", function(e) {
				console.log('draggin...');
				e.dataTransfer.setData("text/plain", this.id);
			});
		});
	}

	// handle the drop
	// 
	dropZones.forEach(zone => {
		zone.addEventListener("dragover", function(e) {
			e.preventDefault();
			console.log('dragged over me!');
		});

	

		zone.addEventListener("drop", function(e) {
			e.preventDefault();
			console.log('you dragged something on me');

			//this is Bug1&solution
			if (zone.children.length != 0){
				console.log('a piece already presents in this zone');
				return false;
			}

			let piece = e.dataTransfer.getData("text/plain");
			e.target.appendChild(document.querySelector(`#${piece}`));
		});
	});
	
	function resetPuzzlePieces() {
		// change the current puzzle, regenerate the pieces
		// debugger;
		// clean out the puzzle pieces div
		piecesBoard.innerHTML = "";
		//this is bug2&solution
		dropZones.forEach(zone => {
			zone.innerHTML	= "";});


		// generate new pieces
		createPuzzlePieces(this.dataset.puzzleref);
	}

	// event handling goes here
	puzzleSelectors.forEach(button => button.addEventListener("click", resetPuzzlePieces));

	// call this function to set up / generate the pieces on load
	createPuzzlePieces(0);

})();
