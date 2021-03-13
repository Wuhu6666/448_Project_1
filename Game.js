let playerChoice = " ";
let difficulty = " ";
/**
 * Class holding the main game object
 */
class Game {
	/**
	 * Defines players and boards. Shows title screen.
	 */
	constructor() {
		// Available players (can potentially be expanded)
		this.players = ["player1", "player2", "playerAI"];
		this.boards = {}; // needs to be an dict to have key/value pairs

		for (var player of this.players) {
			this.boards[player] = {}; // Needs to hold Board object
		}

		let game = this;
		this.button = document.getElementById("button");
		button.onclick = function() {game.buttonClicked()}; // this isn't necessary

		this.showTitleScreen();
	}

	/**
	 * Shows title screen and has a start option
	 */
	 showTitleScreen() {
					 var title = document.createElement("div");
					 //title.innerHTML = "Look at me, I'm a title!";
					 document.body.appendChild(title);


					 button.innerHTML = "Start";
					 this.buttonClicked = function() {
									title.remove();
									let vsPlayer = document.createElement("button");
									vsPlayer.innerHTML = "Player vs Player";
									vsPlayer.id = "vsPlayer";
									vsPlayer.classList.add("setupButton");
									vsPlayer.name = "vsPlayer"
									let vsAI = document.createElement("button");
									vsAI.innerHTML = "Player vs AI";
									vsAI.id = "vsAI";
									vsAI.classList.add("setupButton");
									vsAI.name = "vsAI";
									 document.getElementById("aiDiff").appendChild(vsPlayer);
									 document.getElementById("aiDiff").appendChild(vsAI);
										vsPlayer.onclick = function () {
											//console.log("CLICKING\n");
											playerChoice="PvP";

											//console.log(playerChoice);
											vsPlayer.style.backgroundColor = 'Green';
											vsAI.style.backgroundColor = 'Red';
											vsPlayer.disabled = true;
											vsAI.disabled = true;

										}
										vsAI.onclick = function () {
											//console.log("CLICKING2\n");
											playerChoice="PvAI";
											//console.log(playerChoice);
											vsAI.style.backgroundColor = 'Green';
											vsPlayer.style.backgroundColor = 'Red';
											vsPlayer.disabled = true;
											vsAI.disabled = true;
											//Easy button created
											let easyMode = document.createElement("button");
											easyMode.innerHTML = "Easy";
											easyMode.id = "easyMode";
											easyMode.classList.add("setupButton");
											easyMode.name = "easyMode"
											let mediumMode = document.createElement("button");
											//Medium button created
											mediumMode.innerHTML = "Medium";
											mediumMode.id = "mediumMode";
											mediumMode.classList.add("setupButton");
											mediumMode.name = "mediumMode";
											//Hard button created
											let hardMode = document.createElement("button");
											hardMode.innerHTML = "Hard";
											hardMode.id = "hardMode";
											hardMode.classList.add("setupButton");
											hardMode.name = "hardMode";
											//pushing buttons onto the webpage
											document.getElementById("aiDiff").appendChild(easyMode);
	 									  document.getElementById("aiDiff").appendChild(mediumMode);
										  document.getElementById("aiDiff").appendChild(hardMode);
											easyMode.onclick = function () {
												difficulty = "easy";
												console.log(difficulty + "\n");
												easyMode.style.backgroundColor = 'Green';
												mediumMode.style.backgroundColor = 'Red';
												hardMode.style.backgroundColor = 'Red';
												easyMode.disabled = true;
												mediumMode.disabled = true;
												hardMode.disabled = true;

											}
											mediumMode.onclick = function () {
												difficulty = "medium";
												console.log(difficulty + "\n");
												mediumMode.style.backgroundColor = 'Green';
												easyMode.style.backgroundColor = 'Red';
												hardMode.style.backgroundColor = 'Red';
												easyMode.disabled = true;
												mediumMode.disabled = true;
												hardMode.disabled = true;

											}
											hardMode.onclick = function () {
												difficulty = "hard";
												console.log(difficulty + "\n");
												hardMode.style.backgroundColor = 'Green';
												easyMode.style.backgroundColor = 'Red';
												mediumMode.style.backgroundColor = 'Red';
												easyMode.disabled = true;
												mediumMode.disabled = true;
												hardMode.disabled = true;

											}
										}
										title.remove();
										this.setup();

									}


	 }




	/**
	 * Sets up a new game and creates two boards. One for each player.
	 * Establishes number of ships and covers placement like rotation of ships
	 */
	setup() {
		// Creates two game boards on screen
		this.boards["player1"] = new Board("player1");
		this.boards["player2"] = new Board("player2");
		this.boards["playerAI"] = new Board("playerAI");

		let game = this;


        //console.log('is shipCnt = ' + document.querySelector(''))

        if (!document.querySelector('#shipCnt')) {
    		var shipCnt = document.createElement("input");
    		shipCnt.type = "number";
    		shipCnt.id = "shipCnt";
    		shipCnt.name = "shipCnt";
    		shipCnt.min = "1";
    		shipCnt.max = "6";

    		var label = document.createElement("label");
    		label.for = "shipCnt";
    		label.innerHTML = "Select number of ships: ";

    		document.getElementById("setup").appendChild(label);
    		document.getElementById("setup").appendChild(shipCnt);

    		for (var i = shipCnt.min; i <= shipCnt.max; i++) {
    			let btn = document.createElement("button");
    			btn.classList.add("setupButton");
    			btn.id = "button_" + i;
    			btn.innerHTML = "Ship " + i;
    			btn.disabled = true;

    			document.getElementById("setup").appendChild(btn);
    		}

    		var rotate = document.createElement("button");
    		rotate.id = "rotate";
    		rotate.innerHTML = "Rotate Ship";
    		rotate.onclick = function() {
    			window.rotate();
				window.playButtonSound();
    		}
    		document.getElementById("center").appendChild(rotate);
        }

		// The following must be done for Player 1 AND Player 2
		for (var player of this.players) {

			// Adds eventListener for each cell onClick
			// If you can manage to do this in Board class, I will love you.
			for (var row of this.boards[player].cells) {
				for (var cell of row) {
					cell.onclick = function() {game.cellClicked(this)};
				}
			}
		}
		this.placeShips("player1");
	}

	/**
	 * Executes a turn for the given player
	 * @param {string} activePlayer Player's id
	 */
	play(activePlayer) {
		// Defines inactivePlayer for use later
			let inactivePlayer = activePlayer == "player1" ? "player2" : "player1";




		this.boards[inactivePlayer].hideShips();
		this.changeInstruction(activePlayer);
		this.button.disabled = true;
		this.buttonClicked = function() {};


		let game = this;
		this.cellClicked = function(cell) {
			var board = cell.parentElement.parentElement.parentElement.id;
			if (board == inactivePlayer && this.boards[inactivePlayer].isEmpty(cell.location)) {
console.log(cell.location);
				// Check for game over
				var win = false;

                // determine if the cell location has a ship underneath
                if (this.boards[inactivePlayer].ships.some(ship => {
                    return ship.hit(cell.location);
                })) {
                    // if so, draw the hit
                    game.boards[inactivePlayer].drawCell(cell.location, "hit");
                } else {
                    // otherwise don't
                    game.boards[inactivePlayer].drawCell(cell.location, "miss");
                }

                //determine whether every ship has been sunk. if so, win = true
                if (this.boards[inactivePlayer].ships.every(ship => {
                    return ship.isSunk();
                })) {
                    win = true;
                }

				// Game over stuff
				if (win) {
					game.game_over(activePlayer);
					game.instDone(activePlayer);
				} else { // End turn
					game.cellClicked = function() {};
					game.dontPress(inactivePlayer);
					game.boards[activePlayer].hideShips();
					game.button.disabled = false;
					game.button.innerHTML = "End turn";
					game.buttonClicked = function() {
						game.boards[inactivePlayer].showShips();
						game.play(inactivePlayer)
					};
				}
			}
		}
	}

	// Triggered when one player wins
	game_over(winner) {
		var title = document.createElement("div");
		//title.innerHTML = winner + " wins!";
		document.body.appendChild(title);
        this.cellClicked = function() {};
        this.button.disabled = false;

		for (var board of Object.values(this.boards)) {
			board.remove();
			this.boards = {};
		}

        // reset the game boards and eventLisneners
		button.innerHTML = "Play again?";
		this.buttonClicked = function() {
            document.getElementById("resetbutton").style.display = "inline-block";
			title.remove();
			this.setup();
		}
	}



	placeShipsAI(shipNumbers) {
		let columnVal = "ABCDEFGHIJ"
		let shipSize = 1;
		let randomX = 0;
		let randomY = 0;
		let randomID = "";
		let cellAdress = "";
		randomX = Math.floor((Math.random()*10)+1);
		randomY = columnVal[Math.floor(Math.random() * (columnVal.length-shipSize))];
		randomID = randomY.concat(randomX);

	}


	/**
	 * Places the ships given user input and hides player's ships and board when done
	 * @param {string} player current player
	 */
	placeShips(player) {
		for (var p of this.players) {
			if (p == player) {
				this.boards[p].showBoard();
			} else {
				this.boards[p].hideBoard();
			}
		}

		let game = this;
		this.button.disabled = true;

	if(player=="player1" || player=="player2") {

		let shipCnt = document.getElementById("shipCnt");
		shipCnt.placed = [];
		shipCnt.placedUpdate = function() {
			game.button.disabled = (shipCnt.placed.length != shipCnt.value);
			shipCnt.disabled = false;
		};

		shipCnt.onchange = function() {
			for (var i = shipCnt.min; i <= shipCnt.max; i++) {
				let btn = document.querySelector('#button_' + i);
				if (!shipCnt.placed.includes(i)) {
					btn.disabled = (i > shipCnt.value);
				}

				let size = i; // This is necessary for stupid reasons
				btn.onclick = function() {
					shipCnt.disabled = true;
					placeShipHorizontal(size, player);
				};

				shipCnt.placedUpdate();
			}

			let board = game.boards[player];
			for (var i in board.ships) {
				if (board.ships[i].size > shipCnt.value) {
					console.log("remove size " + board.ships[i].size);
					board.hideShips();
					shipCnt.placed.splice(shipCnt.placed.indexOf(board.ships[i].size), 1);
					shipCnt.placedUpdate();
					board.ships.splice(i, 1);
					board.showShips();
				}
			}
		};

	}

		if (player == "player1") {
			document.querySelector("#inst").innerText = "Place Player 1's Ships Now";
			this.button.innerHTML = "End Setup";
			this.buttonClicked = function() {
      		removeAll();
					if(playerChoice=="PvP") {
						shipCnt.value = null;
						//shipCnt.onchange();
						document.querySelector("#inst").innerText = "Place Player 2's Ships Now";
						this.placeShips("player2");
					}
					else {
						this.placeShips("playerAI");
					}

			}
		} else {
			// Start game
			this.button.innerHTML = "Play Game";
			this.buttonClicked = function() {
                removeAll();

                let setup = document.getElementById("setup");
				while (setup.firstChild) {
        			setup.removeChild(setup.firstChild);
    			}
				document.getElementById("rotate").remove();

				document.getElementById("resetbutton").style.display = "none";
				game.boards["player1"].showBoard();
				this.play(game.players[Math.round(Math.random())]);
			}
		}
	}

	/**
	 * Defined during setup. Manages user interaction with the boards.
	 * @param {HTMLTableCellElement} cell a cell
	 */
	cellClicked(cell) {

	}
	/**
	 * Redefined multiple times through the game. Manages button presses relating to game flow.
	 */
	buttonClicked() {

	}

	/**
	 * Used during turn transition. Determines the next player and displays a message
	 * @param {string} activePlayer Current player's id
	 */
	changeInstruction(activePlayer){
		var player;
		var notPlayer;
		if(activePlayer=="player1")
		{
			player = "Player 1";
			notPlayer = "Player 2";
		}else{
			player = "Player 2";
			notPlayer = "Player 1";
		}
		document.querySelector("#inst").innerText = player + "'s Turn! Pick a spot on " + notPlayer + "'s board to attack.";
	}

	/**
	 * Message that indicates that the next player's ships are appearing
	 * @param {string } inactivePlayer Not current player's id
	 */
	dontPress(inactivePlayer){
		var nextplayer;
		if(inactivePlayer=="player1")
		{
			nextplayer = "Player 1";
		}else{
			nextplayer = "Player 2";
		}
		document.querySelector("#inst").innerText = "Hand over the computer and when " + nextplayer + " is ready, End Turn!";
	}

	/**
	 * Message that says when the game is over
	 * @param {string} activePlayer Current player's id
	 */
	instDone(activePlayer){
		var player;
		if(activePlayer=="player1")
		{
			player = "Player 1";
		}else{
			player = "Player 2";
		}
		document.querySelector("#inst").innerText = "Game Over! " + player + " Won!";
		playAttackSound('music/win.mp3');
	}

}

/**
 * Resets the game
 */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#resetbutton").addEventListener("click", () => {
        location.reload();
  })
})

const sound = new Audio()
const fisButton = document.getElementById('button');
const secDiv = document.getElementById('setup');
const thrButton = document.getElementById('resetbutton');

fisButton.addEventListener('click', playButtonSound)
secDiv.addEventListener('click', playButtonSound)
thrButton.addEventListener('click',playButtonSound)

function playButtonSound() {
sound.src = 'music/click.mp3'
sound.play() }

function playAttackSound(m_src) {
	sound.src = m_src;
	sound.play() }
