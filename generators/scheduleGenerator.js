// to do
  // generateSchedule() writes to db
  // printSchedule() reads from db
  // extend data model to include : 
  //   matchType support (singles or doubles)
  //   matchResults 
  // printStandings()
  // printResults(allPlayers)
  // printResults(players)
  // printResults(allRounds)
  // printResults(roundNumber))
  // season constructor takes a seed
  
//a random number generator than i can seed
var seed = 5;
function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

var Player = function Player(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
}

var Match = function Match(roundNumber, matchNumber, players) {
	this.roundNumber = roundNumber;
	this.matchNumber = matchNumber;
	this.players = players;
};


var Season = function Season(leagueName, seasonNumber) {
	this.leagueName = leagueName;
	this.seasonNumber= seasonNumber;
	this.matches = [];
};

Season.prototype.matchAlreadyScheduled = function(players) {
	var sameMatchFound = false;
	//walk rounds
	for (ii = 0; ii < season.matches; ++ii) {
		if (match[ii].players == players) {
			break;
		}
	}
	return sameMatchFound;
};

Season.prototype.generateSchedule = function(players, numberRounds) {
	
	//generate schedule for each round
	for (var ii = 0; ii < numberRounds; ++ii) {

		//capture matches scheduled for this round 
		var playersScheduledForThisRound = [];
		var numberMatches = Math.floor(players.length/2);
		
		//generate matches for this round
		for (var jj = 0; jj < numberMatches; jj++) {

			//randomly select new 1st player 
			var firstIndex = 0;
			do {
				firstIndex = Math.floor(random() * players.length);
				console.log("jj: " + jj + " firstIndex: " + firstIndex);
			} while (playersScheduledForThisRound.indexOf(firstIndex) != -1);

			//add to already scheduled for this interval list
			playersScheduledForThisRound.push(firstIndex);

			//randomly select new 2nd player that hasn't been scheduled for this round and hasn't played the 1st player yet
			var secondIndex = 0;
			do {
				secondIndex = Math.floor(random() * players.length);
				console.log("First Index: " + firstIndex + " SecondIndex: " + secondIndex);
			} while ((playersScheduledForThisRound.indexOf(secondIndex) != -1) || ( this.matchAlreadyScheduled() ) || (firstIndex == secondIndex));


			//add to already scheduled list
			playersScheduledForThisRound.push(secondIndex);

			//update schedule schedules
			this.matches.push(new Match((ii+1),(jj+1),[players[firstIndex], players[secondIndex]]));

		}
	}
};

Season.prototype.printSchedule = function(players) {
	console.log(this.leagueName + " Season " + this.seasonNumber + " Schedule");
	
	//walk matches 
	for (var ii = 0; ii < this.matches.length; ++ii) {
	
			var matchAlreadyPrinted = [];
		
			//walk players passed in
			for (var jj = 0; jj < players.length; ++jj) {

				//if player in this match is in input player list print unless already printed this player for this round
				if ( (this.matches[ii].players.indexOf(players[jj]) != -1) & (matchAlreadyPrinted.indexOf(ii) == -1) ) {

					console.log("Round: " + this.matches[ii].roundNumber + ", Match " + this.matches[ii].matchNumber + " : " + this.matches[ii].players[0].firstName + " vs " + this.matches[ii].players[1].firstName);
					matchAlreadyPrinted.push(ii);
				}
			}
	}
};

function writePlayersToDb(players) {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/cvtl-s2-dev');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log("connected to db");
		var PlayerSchema = mongoose.Schema(
		{
			created: { type: Date },
			firstName: { type: String },
			lastName: { type: String }
  		});

  		//model class
  		var Player = mongoose.model('Player', PlayerSchema);

		for (var ii = 0; ii < players.length; ++ii)
		{
			var player = new Player();
			player.created = new Date();
			player.firstName = players[ii].firstName;
			player.lastName = players[ii].lastName;
			player.save(function (err) {
				if (err)
					return console.error(err, player);
			})
		}
	})

	console.log("finished writing to db");
}

function writeMatchesToDb() {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/cvtl-s2-dev');

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
		console.log("connected to db");

		var MatchSchema = mongoose.Schema(
		{
			roundNumber : { type : String },
			matchNumber : { type : String },
			matchType : { type : String },
			players : { 
				playerOne : { 
					firstName : { type : String },
					lastName : { type : String }
				},
				playerTwo : { 
					firstName : { type : String },
					lastName : { type : String }
				}
			}
  		});

  		//model class
  		var Match = mongoose.model('Match', MatchSchema);

		for (var ii = 0; ii < season.matches.length; ++ii)
		{
			var match = new Match();
			match.roundNumber = season.matches[ii].roundNumber;
			match.matchNumber = season.matches[ii].matchNumber;
			match.players.playerOne.firstName  = season.matches[ii].players[0].firstName;
			match.players.playerOne.lastName  = season.matches[ii].players[0].lastName;
			match.players.playerTwo.firstName  = season.matches[ii].players[1].firstName;
			match.players.playerTwo.lastName  = season.matches[ii].players[1].lastName;
			match.save(function (err) {
				if (err)
					return console.error(err, match);
			})
		}
	})

	console.log("finished writing to db");
}

//create season object
var season = new Season("CVTL", 2)

//populate players container
var players = [
	new Player("Scott", "Maroney"),
	new Player("Pete", "Dale"),
	new Player("Julio", "Martinez"),
	new Player("James", "Cutts"),
	new Player("Gregg", "Novicoff"),
	new Player("Jonah", "Michaelian"),
	new Player("Joe", "Theisen"),
	new Player("Justin", "Merickel"),
	new Player("Keith", "Zwolfer"),
	new Player("Andrew", "Young"),
	new Player("Katherine", "Rutledge"),
	new Player("Josh", "McHugh"),
	new Player("Jaren", "Vermeli"),
	new Player("Doug", "Anderson")
];

//generate schedule for number of rounds
var numberRounds = 2;
season.generateSchedule(players, numberRounds);

var firstRound = 1;
var playersToPrint = [
	new Player("Scott", "Maroney"),
	new Player("Pete", "Dale"),
];

//print out season schedule for players starting at firstRound for players
season.printSchedule(players);

writePlayersToDb(players);
//writeMatchesToDb();
