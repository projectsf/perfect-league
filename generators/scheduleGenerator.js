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

var Match = function Match(matchNumber, players) {
	this.matchNumber = matchNumber;
	this.players = players;
};

var Round = function Round(roundNumber) {
	this.roundNumber = roundNumber;
	this.matches = [];
};

var Season = function Season(leagueName, seasonNumber) {
	this.leagueName = leagueName;
	this.seasonNumber= seasonNumber;
	this.rounds = [];
};

Season.prototype.matchAlreadyScheduled = function(players) {
	var sameMatchFound = false;
	//walk rounds
	for (ii = 0; ii < season.rounds; ++ii) {
	
		//walk matches
		for (jj = 0; jj < season.rounds[0].matches.length; ++jj) {
			if (match[jj].players == players) {
				break;
			}
		}
	}
	return sameMatchFound;
};

Season.prototype.generateSchedule = function(players, numberRounds) {
	
	//generate schedule for each round
	for (var ii = 0; ii < numberRounds; ++ii) {
		var round = new Round(ii);

		//capture matches scheduled for this round 
		var playersScheduledForThisRound = [];
		var numberMatches = Math.floor(players.length/2);
		
		//generate matches for this round
		for (var jj = 0; jj < numberMatches; jj++) {

			//randomly select new 1st player 
			var firstIndex = 0;
			do {
				firstIndex = Math.floor(random() * players.length);
				//console.log("jj: " + jj + " firstIndex: " + firstIndex);
			} while (playersScheduledForThisRound.indexOf(firstIndex) != -1);

			//add to already scheduled for this interval list
			playersScheduledForThisRound.push(firstIndex);

			//randomly select new 2nd player that hasn't been scheduled for this round and hasn't played the 1st player yet
			var secondIndex = 0;
			do {
				secondIndex = Math.floor(random() * players.length);
				//console.log("First Index: " + firstIndex + " SecondIndex: " + secondIndex);
			} while ((playersScheduledForThisRound.indexOf(secondIndex) != -1) || ( this.matchAlreadyScheduled() ) || (firstIndex == secondIndex));


			//add to already scheduled list
			playersScheduledForThisRound.push(secondIndex);

			//update schedule schedules
			round.matches.push(new Match((ii+1), [players[firstIndex], players[secondIndex]]));
			

			//log results to console
		}
		
		//update rounds
		this.rounds.push(round);
	}
};

Season.prototype.printSchedule = function(players) {
	console.log(this.leagueName + " Season " + this.seasonNumber + " Schedule");
	
	//walk rounds
	for (var ii = 0; ii < this.rounds.length; ++ii) {
	
		//walk matches
		for (var jj = 0; jj < this.rounds[0].matches.length; ++jj) {
		
			var matchAlreadyPrintedForThisRound = [];
		
			//walk players passed in
			for (var kk = 0; kk < players.length; ++kk) {

				if ( (this.rounds[ii].matches[jj].players.indexOf(players[kk]) != -1) & (matchAlreadyPrintedForThisRound.indexOf(jj) == -1) ) {

					console.log("Round: " + (ii+1) + ", Match " + (jj+1) + " : " + this.rounds[ii].matches[jj].players[0].firstName + " vs " + this.rounds[ii].matches[jj].players[1].firstName);
					matchAlreadyPrintedForThisRound.push(jj);
				}
			}
		}
	}
};

function writePlayersToDb(players) {
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/mean-dev1');

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
