var wordArray = ["homework", "terrific", "discussion", "national", "basketball", "turnover", "acrobat", "joker", "playset", "vocabulary", "language", "javascript", "disruption"];
//var wordArray = ["homework", "terrific", "discussion", "national"];
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
var startFlag = false;

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
	setMessageToDisplay(".word-dash",displayWordArray.join(" "));
	if (!roundFailed && displayWordArray.indexOf("_") === -1) {
		wins++;
		setMessageToDisplay(".messageClass","Great Job!!! You have completed this round successfully. Press Next to continue.");
		displayPlayedWords();
		displayStatistics();
		$(".hangman").attr("src","assets/images/hangman.jpg");
	}
}

function displayPlayedWords(){
	setMessageToDisplay(".played-words",playedWordsArray.join(", "));
}

function displayStatistics(){
	setMessageToDisplay(".noOfWins", wins);
	setMessageToDisplay(".noOfLosses", losses);	

}

function setMessageToDisplay(className, message){
	var newPTag = $("<p>");
	newPTag.text(message);
	$(className).empty();
	$(className).append(newPTag);
}

function doFailureAnimation(){
	var audioClip = new Audio("assets/music/failure.mp3" + '#t=' + 0.00 + ',' + 1.00);
	$(".hangman").attr("src","assets/images/hangman_incorrect.png");
	audioClip.play();
}

function doSuccessAnimation(){
	var audioClip = new Audio("assets/music/success.mp3" + '#t=' + 0.00 + ',' + 1.00);
	$(".hangman").attr("src","assets/images/hangman_success.png");
	audioClip.play();
}

$(document).keypress(function(event) {

	startFlag = false;
	if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)){
		
		if (attempts != 0){
		
			roundFailed = false;
			userAttemptedLetter = String.fromCharCode(event.keyCode).toLowerCase();
			
			if (attemptedLetters.indexOf(userAttemptedLetter) === -1) {
				$(".messageClass").empty();
				attemptedLetters.push(userAttemptedLetter);
				if (currentWordArray.indexOf(userAttemptedLetter) == -1){
					attempts--;
					if (!startFlag){
						doFailureAnimation();
					} 
				} else {
					doSuccessAnimation();
				}
				displayWordLetters(attemptedLetters);
				setMessageToDisplay(".letterMessage","Your attempted letters:");
				setMessageToDisplay(".attempted-letters",attemptedLetters.join(","));
				setMessageToDisplay(".noOfAttempts",attempts);
			} else {
				setMessageToDisplay(".messageClass","You have already guessed this letter");
			}	
		
		} else {
			roundFailed = true;
			setMessageToDisplay(".messageClass","Sorry!!! You dont have any more attempts. The word is: ");
			losses++;
			displayWordLetters(currentRoundWord);
			displayPlayedWords();
			displayStatistics();
		}
	} else {
			setMessageToDisplay(".messageClass","You have pressed a invalid key");
	}
});
$(document).ready(function() {

      $(".noOfAttempts").empty();
	  $(".noOfAttempts").append(attempts);
      $(".start-button").on("click", function() {
	        $(".start-button").prop('disabled', true);
	        $(".next-button").prop('disabled', false);
	        $(".stop-button").prop('disabled', false);
	        $(".played-words").empty();
	        startFlag = true;
	        initialize();
	        getNextWordArray();
	        displayWordLetters(attemptedLetters);
	        displayStatistics();
	        $(".noOfAttempts").empty();
		    $(".noOfAttempts").append(attempts);
      });

      $(".next-button").on("click", function() {
      		displayPlayedWords();
      		displayStatistics();
      		$(".letterMessage, .noOfAttempts, .attempted-letters, .messageClass").empty();
      		if (!(playedWordsArray.length == wordArray.length)){
	      		if (displayWordArray.indexOf("_") === -1){
			    		initializeRound();
			        	getNextWordArray();
			        	displayWordLetters(attemptedLetters);
			            $(".noOfAttempts").append(attempts);
			    } else {
			    	var userChoice = confirm("You haven't finished this round yet. Are you sure?");
			    	if (userChoice){
			    		losses++;
			    		initializeRound();
			        	getNextWordArray();
			        	displayWordLetters(attemptedLetters);
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
			        $(".noOfAttempts").append(attempts);
			        displayWordLetters(attemptedLetters);
			        displayStatistics();
				} else {
					$(".next-button").prop('disabled', true);
				}
			}
      });
      $(".stop-button").on("click", function() {
	        $(".start-button").prop('disabled', false);
	        $(".next-button").prop('disabled', true);
	        $(".stop-button").prop('disabled', true);
	        initialize();
	        $(".noOfAttempts").empty();
      });
});

