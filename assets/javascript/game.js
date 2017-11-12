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
}

function displayPlayedWords(){
	var newPTag = $("<p>");
	newPTag.text(playedWordsArray.join(", "));
	$(".played-words").empty();
	$(".played-words").append(newPTag);
}




// $(".start-button").on("click", function() {
// 		$(".start-button").prop('disabled', true);
//         //$(".captain-planet").animate({ height: "300px" });
// });

// $(".start-button").on("click", function() {
//     $(".start-button").prop('disabled', true);
//     $("end-button").prop('disabled', false);
//     initialize();
//     getNextWordArray();
//     displayWordLetters();
// });

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
				var newPTag = $("<p>");
				newPTag.text("Sorry!!! You dont have any more attempts. The word is: " + currentRoundWord);
				$(".messageClass").empty();
				$(".messageClass").append(newPTag);
				losses++;
				displayPlayedWords(currentRoundWord);

			alert("i am in outer else");
			}
		} else {
				var newPTag = $("<p>");
				newPTag.text("You have pressed a invalid key");
				$(".messageClass").empty();
				$(".messageClass").append(newPTag);
		}
		alert("i am at the end of keypress");

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
	        initialize();
	        getNextWordArray();
	        displayWordLetters(attemptedLetters);
	        // $(".attemptsMessage").empty();
	        // $(".attemptsMessage").append("Available Attempts: ");
	        $(".noOfAttempts").empty();
		    $(".noOfAttempts").append(attempts);
      });

      $(".next-button").on("click", function() {
      		if (displayWordArray.indexOf("_") === -1){
		        initializeRound();
		        getNextWordArray();
		        displayWordLetters(attemptedLetters);
		    } else {
		    	var userChoice = confirm("You haven't finished this round yet. Are you sure?");
		    	if (userChoice){
		    		losses++;
		    		$(".attempted-letters").empty();
		    		initializeRound();
		        	getNextWordArray();
		        	displayWordLetters(attemptedLetters);
		        	$(".noOfAttempts").empty();
		            $(".noOfAttempts").append(attempts);
		    	}
		    }
      });
      // $(".grow-button").on("click", function() {
      //   $(".captain-planet").animate({ height: "500px" });
      // });

      // $(".shrink-button").on("click", function() {
      //   $(".captain-planet").animate({ height: "100px" });
      // });

      // // Visibility Buttons
      // $(".vis-button").on("click", function() {
      //   $(".captain-planet").animate({ opacity: "1" });
      // });

      // $(".invis-button").on("click", function() {
      //   $(".captain-planet").animate({ opacity: "0.05" });
      // });
      
      // $(".fire-button").on("click", function() {
      //   $(".fire").animate({ opacity: "1" });
      // });
      // // Move Buttons
      // $(".up-button").on("click", function() {
      //   $(".captain-planet").animate({ top: "-=200px" }, "normal");
      // });

      // $(".down-button").on("click", function() {
      //   $(".captain-planet").animate({ top: "+=200px" }, "normal");
      // });

      // $(".left-button").on("click", function() {
      //   $(".captain-planet").animate({ left: "-=200px" }, "normal");
      // });

      // $(".right-button").on("click", function() {
      //   $(".captain-planet").animate({ left: "+=200px" }, "normal");
      // });

      // $(".back-button").on("click", function() {
      //   $(".captain-planet").animate({ top: "50px", left: "80px" }, "fast");
      // });

      // Move Buttons (Keyboard Down)
      $(document).keyup(function(e) {
        switch (e.which) {
          case 40:
            $(".captain-planet").animate({ top: "+=200px" }, "normal");
        }
      });

      // Move Buttons (Keyboard Right)
      $(document).keyup(function(e) {
        switch (e.which) {
          case 39:
            $(".captain-planet").animate({ left: "+=200px" }, "normal");
        }
      });

      // Move Buttons (Keyboard Up)
      $(document).keyup(function(e) {
        switch (e.which) {
          case 38:
            $(".captain-planet").animate({ top: "-=200px" }, "normal");
        }
      });

      // Move Buttons (Keyboard Left)
      $(document).keyup(function(e) {
        switch (e.which) {
          case 37:
            $(".captain-planet").animate({ left: "-=200px" }, "normal");
        }
      });
});

