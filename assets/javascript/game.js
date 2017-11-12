var wordArray = ["homework", "terrific", "discussion", "national", "basketball", "turnover", "acrobat", "joker", "playset", "vocabulary",   "language", "javascript", "disruption"];
var currentRoundWord = "";
var wins = 0;
var losses = 0;
var attempts = 15;
var playedWordsArray = [];
var attemptedLetters =[];
var userAttemptedLetter = "";
var currentWordArray = [];
var displayWordArray = [];
var roundFailed = false;

function initialize(){
	currentRoundWord = "";
	wins = 0;
	losses = 0;
	attempts = 15;
	playedWordsArray = [];
	attemptedLetters =[];
	userAttemptedLetter = "";
	currentWordArray = [];
	displayWordArray = [];
}

function initializeRound(){
	currentRoundWord = "";
	attempts = 15;
	attemptedLetters =[];
	userAttemptedLetter = "";
	currentWordArray = [];
	displayWordArray = [];
}

function checkIfPlayed(arg1) {
	if (playedWordsArray.indexOf(arg1) === -1) {
		return false;
	} else {
		return true;
	}
}

function getNextWordArray() {
	currentRoundWord = wordArray[Math.floor(Math.random()*wordArray.length)];

	if (playedWordsArray.length != 0) {
		while (checkIfPlayed(currentRoundWord)) {
			currentRoundWord = wordArray[Math.floor(Math.random()*wordArray.length)];
		}
	}
	playedWordsArray.push(currentRoundWord);
	currentWordArray = Array.from(currentRoundWord);
}

function displayWordLetters(arg1) {
	displayWordArray = [];
	$(currentWordArray).each(function(index,value){
		if (arg1.indexOf(value) === -1 ){
			displayWordArray.push("_"); 
		} else {
			displayWordArray.push(value);
		}
	});
	var newPTag = $("<p>");
	newPTag.text(displayWordArray.join(" "));
	$(".word-dash").empty();
	$(".word-dash").append(newPTag);
	if (!roundFailed && displayWordArray.indexOf("_") === -1) {
		wins++;
		displayPlayedWords();
		displayStatistics();
	}
}

function displayPlayedWords(){
	var newPTag = $("<p>");
	newPTag.text(playedWordsArray.join(", "));
	$(".played-words").empty();
	$(".played-words").append(newPTag);
}

function displayStatistics(){
	var newWinsTag = $("<p>");
	newWinsTag.text(wins);
	$(".noOfWins").empty();
	$(".noOfWins").append(newWinsTag);

	var newLossesTag = $("<p>");
	newLossesTag.text(losses);
	$(".noOfLosses").empty();
	$(".noOfLosses").append(newLossesTag);	

}

$(document).keypress(function(event) {

	if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)){
		if (attempts !== 0){
		
			userAttemptedLetter = String.fromCharCode(event.keyCode).toLowerCase();
			
			if (attemptedLetters.indexOf(userAttemptedLetter) === -1) {
				$(".messageClass").empty();
				attemptedLetters.push(userAttemptedLetter);
				if (currentWordArray.indexOf(userAttemptedLetter) == -1){
					attempts--;
				}
				displayWordLetters(attemptedLetters);
				var newPTag = $("<p>");
				newPTag.text(attemptedLetters.join(","));
				$(".letterMessage").empty();
				$(".letterMessage").append($("<p>").text("Your attempted letters:"));
				$(".attempted-letters").empty();
				$(".attempted-letters").append(newPTag);
				$(".noOfAttempts").empty();
				$(".noOfAttempts").append(attempts);
			} else {
				var newPTag = $("<p>");
				newPTag.text("You have already guessed this letter");
				$(".messageClass").empty();
				$(".messageClass").append(newPTag);
			}	
		
		} else {
			roundFailed = true;
			var newPTag = $("<p>");
			newPTag.text("Sorry!!! You dont have any more attempts. The word is: " + currentRoundWord);
			$(".messageClass").empty();
			$(".messageClass").append(newPTag);
			losses++;
			displayPlayedWords();
			displayStatistics();
		}
	} else {
			var newPTag = $("<p>");
			newPTag.text("You have pressed a invalid key");
			$(".messageClass").empty();
			$(".messageClass").append(newPTag);
	}
});
$(document).ready(function() {

      // Gets Link for Theme Song
      var successAudio = document.createElement("audio");
      //successAudio.setAttribute("src", "Assets/captainplanet24.mp3");
      // Theme Button
      // $(".theme-button").on("click", function() {
      //   audioElement.play();
      // });

      // $(".pause-button").on("click", function() {
      //   audioElement.pause();
      // });

      $(".noOfAttempts").empty();
	  $(".noOfAttempts").append(attempts);
      $(".start-button").on("click", function() {
	        $(".start-button").prop('disabled', true);
	        $(".next-button").prop('disabled', false);
	        $(".stop-button").prop('disabled', false);
	        $(".played-words").empty();
	        initialize();
	        getNextWordArray();
	        displayWordLetters(attemptedLetters);
	        displayStatistics();
	        $(".noOfAttempts").empty();
		    $(".noOfAttempts").append(attempts);
		    alert("in start-played words array" + playedWordsArray);
      });

      $(".next-button").on("click", function() {
      		displayPlayedWords();
      		displayStatistics();
      		alert("in next-played words array" + playedWordsArray);
      		alert("in next-words array" + wordArray);

      		if (!(playedWordsArray.length == wordArray.length)){
	      		if (displayWordArray.indexOf("_") === -1){
			    		$(".letterMessage").empty();
			    		$(".attempted-letters").empty();
			    		initializeRound();
			        	getNextWordArray();
			        	displayWordLetters(attemptedLetters);
			        	$(".noOfAttempts").empty();
			            $(".noOfAttempts").append(attempts);
			    } else {
			    	var userChoice = confirm("You haven't finished this round yet. Are you sure?");
			    	if (userChoice){
			    		losses++;
			    		$(".letterMessage").empty();
			    		$(".attempted-letters").empty();
			    		initializeRound();
			        	getNextWordArray();
			        	displayWordLetters(attemptedLetters);
			        	$(".noOfAttempts").empty();
			            $(".noOfAttempts").append(attempts);
			    	}
			    }
			} else {
				var userChoice = confirm("You have attempted all words. Do you want to play again?");
				if (userChoice){
					$(".start-button").prop('disabled', true);
	        		$(".next-button").prop('disabled', false);
	        		$(".stop-button").prop('disabled', false);
	        		initialize();
	        		getNextWordArray();
	        		$(".letterMessage").empty();
			    	$(".attempted-letters").empty();
			    	$(".noOfAttempts").empty();
			        $(".noOfAttempts").append(attempts);
			        displayWordLetters(attemptedLetters);
				} else {
					$(".next-button").prop('disabled', true);
				}
			}
      });
      $(".stop-button").on("click", function() {
	        $(".start-button").prop('disabled', false);
	        $(".next-button").prop('disabled', false);
	        $(".stop-button").prop('disabled', true);
	        initialize();
	        $(".noOfAttempts").empty();
      });
});

