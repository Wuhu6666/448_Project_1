// Game.js
// Controls the logic of the game.

class Game {
	constructor() {
		// Available players (can potentially be expanded)
		this.players = ["player1", "player2"];
		this.boards = {}; // needs to be an dict to have key/value pairs
		this.ships = {};
		this.activePlayer = 'player1';

		for (var player of this.players) {
			this.ships[player] = []; // Needs to hold array of Ship objects
			this.boards[player] = {}; // Needs to hold Board object
		}
	}

	// Sets up a new game
	setup() {
		// Creates two game boards on screen
		this.boards["player1"] = new Board("player1");
		this.boards["player2"] = new Board("player2");

		// The following must be done for Player 1 AND Player 2
		for (var player of this.players) {
			// Adds eventListener for each cell onClick
			// If you can manage to do this in Board class, I will love you.
			for (var row of this.boards[player].cells) {
				for (var cell of row) {
					cell.onclick = function() {cellClicked(this)};
				}
			}

			// Placing ships
			// Select how many ships they want to place
			var shipCount = 6; // replace with input

			// Placing ships

			
			
			// for (var i = 1; i <= shipCount; i++) { // index @ 1 makes sense for this.
			// 	// i is the length of the ship
			// 	// Place ship
			// 	var locations = []; // locations of ship
			// 	this.ships[player].push(new Ship(locations));
			// }
		}

		// Start game
			// Clear screen
		//this.play();
		this.turn("player1")
	}

	play() {
		var i = Math.round(Math.random()); // Generates either 0 or 1, random player starts first
		var win = true;
		while (!win) {
			i = (i+1)%2;
			win = this.turn(this.players[i]);
		}
		this.game_over(this.players[i]);
	}

	// Runs a game while playing
	// GENIUS IDEA: make hit/miss indicators static and only hide/reveal the ships
	// Shows activePlayer their ship's status and their shoot history
	turn(activePlayer) {
		// Alternates turns between players.

		// Defines inactivePlayer for use later
		var inactivePlayer = activePlayer == "player1" ? "player2" : "player1";

		// Each turn:
		// Press button to begin turn
		// Switches boards
			// Hides inactive player's ships
			// Reveals active player's ships

		// Player clicks square to shoot
		// Detects hit or miss

		cellClicked = function(cell) {
			var board = cell.parentElement.parentElement.parentElement.id;
			console.log(board);
			if (board !== activePlayer ) return;
			cell.style.backgroundColor = "red";
		}

		// Check for game over
		var win = true;
		for (var ship of this.ships[inactivePlayer]) {
			if (!ship.isSunk()) {
				win = false;
			}
		}
		if (win) {
			this.game_over(activePlayer);
			return;
		}

		// Prompt player to end turn
			// Both boards empty and/or black screen
	}

	// Triggered when one player wins
	game_over(winner) {
		// Clear screen of Boards
		// Display victory text
		// Play again or go back to title screen
	}

	endTurn() {
		var newPlayer = this.activePlayer == "player1" ? "player2" : "player1";
		this.activePlayer = newPlayer;
		console.log(newPlayer);
		this.turn(newPlayer);
	}
}

// This function gets called everytime a cell is clicked.
// Can be altered
function cellClicked(cell) {
}

function buttonClicked() {

}