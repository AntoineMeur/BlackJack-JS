var playerMoney = 100;

function sumArray(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    if (!isNaN(array[i])) {
      sum += array[i];
    } else if ((array[i] === "Jack") || (array[i] === "Queen") || array[i] === "King") {
      sum += 10;
    } else if (array[i] === "Ace") {
        sum += 11;
      }
    }
  for (var i = 0; i < array.length; i++) {
    if (array[i] === "Ace") {
      if (sum > 21 ){
        sum -=10;
      } 
    }
  }
  return sum;
}


function startGame() {
  var card = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King","Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King","Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

  var playerCard = [];
  var dealerCard = [];
  var playerScore = 0;
  var dealerScore = 0;
  

  var bet = parseInt(prompt("You have $" + playerMoney + ". Enter your bet (minimum $10, in increments of $10): "));
  if (bet < 10 || bet % 10 !== 0 || bet > playerMoney) {
    alert("Invalid bet. Please enter a valid bet.");
    startGame();
    return;
  }
  playerMoney -= bet;

  var randomCard = Math.floor(Math.random() * card.length);
  playerCard.push(card[randomCard]);
  card.splice(randomCard, 1);

  var randomCard = Math.floor(Math.random() * card.length);
  dealerCard.push(card[randomCard]);
  card.splice(randomCard, 1);

  var randomCard = Math.floor(Math.random() * card.length);
  playerCard.push(card[randomCard]);
  card.splice(randomCard, 1);

  var randomCard = Math.floor(Math.random() * card.length);
  dealerCard.push(card[randomCard]);
  card.splice(randomCard, 1);
  

  function standOrHit() {
    alert("Your cards are: " + playerCard.join(", "));
    alert("Dealer's faced up card: " + dealerCard[0]);
    playerScore = sumArray(playerCard);
    alert("Your score is: " + playerScore);
    
    if (playerScore >= 21){
      result();
    } else { var playerChoice = prompt("Press 1 for Stand, Press 2 for Hit");
    if (playerChoice === "1") {
      dealerPlay();
    } else if (playerChoice === "2") {
      dealPlayerCard();
    }
  }}

  function dealPlayerCard() {
    var randomCard = Math.floor(Math.random() * card.length);
    playerCard.push(card[randomCard]);
    card.splice(randomCard, 1);

    alert("Your cards are: " + playerCard.join(", "));
    playerScore = sumArray(playerCard);
    alert("Your score is: " + playerScore);

    if (playerScore >= 21){
      result();
    } else { var playerChoice = prompt("Press 1 for Stand, Press 2 for Hit");
    if (playerChoice === "1") {
      dealerPlay();
    } else if (playerChoice === "2") {
      dealPlayerCard();
    }
    }}

  function dealerPlay() {
    alert("Dealer's faced up card: " + dealerCard[0]);
    dealerScore = sumArray(dealerCard);

    while (dealerScore < 17) {
      var randomCard = Math.floor(Math.random() * card.length);
      dealerCard.push(card[randomCard]);
      card.splice(randomCard, 1);
      dealerScore = sumArray(dealerCard);
    }

    alert("Dealer's cards: " + dealerCard.join(", "));
    alert("Dealer's score: " + dealerScore);
    result();
  }

  function result() {
    
    if ((playerScore === 21 && playerCard.length === 2) && (dealerScore !== 21 || dealerCard.length !== 2)) {
      alert("Blackjack! You win!");
      playerMoney += bet * 2.5;
    } else if (playerScore <= 21 && (dealerScore > 21 || playerScore > dealerScore)) {
      alert("You win!");
      playerMoney += bet * 2;
    } else if (dealerScore <= 21 && (playerScore > 21 || dealerScore > playerScore)) {
      alert("Dealer wins!");
    } else {
      alert("It's a tie!");
      playerMoney += bet;
    }

    promptNextRound();
  }

  function promptNextRound() {
    alert("Your money is $" + playerMoney);
    var continuePlaying = prompt("Do you want to play another round ? Press 1 for yes and 2 for no");
    if (continuePlaying === "1") {
      playerCard = [];
      dealerCard = [];
      startGame();
    } else {
      alert("Thank you for playing!");
    }
  }

  standOrHit();
}

startGame();