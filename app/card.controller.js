(function() {
  'use strict';

  angular
      .module('app')
      .controller('CardController', CardController);

      //Injects a timeout to the function
      CardController.$inject = ['$timeout']

  //main controller
  function CardController($timeout) {

      var vm = this;

      //Set variable to empty to hold number of matches
      var matches = 0;

      //Set number of cards to empty to shuffle cards
      vm.cards = [];
      
      //Set array of images called from the image folder
      var images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];


      //Function that creates the card and starts the game
      vm.startGame = function() {

          for (var i = 0; i < 18; i++) {
              //Holds the single card to be selected
              var card = {};
              //Randomize(shuffle images)
              var value = Math.floor((Math.random() * images.length));
              //Select random image (card) from the array
              card.value = images[value] + '.png';
              //Assing that card to 
              card.index = images[value];
              //Set card flipped value to false by default
              card.cardIsFlipped = false;
              //Add card to the array
              vm.cards.push(card);
              //Remove card from the array
              images.splice(value, 1);
          }

          images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
          for (var i = 0; i < 18; i++) {
              var card = {};
              var value = Math.floor((Math.random() * images.length));
              card.value = images[value] + '.png';
              card.index = images[value] + 18;
              card.cardIsFlipped = false;
              vm.cards.push(card);
              images.splice(value, 1);
          }
      };
      vm.startGame();

      //Holds the cards to be selected
      vm.currentCards = [];

      //Select card
      vm.firstSelection = function(card) {
          //Verifies if cards have been selected
          if (vm.currentCards.length === 0) {
              vm.currentCards.push(card);
              card.cardIsFlipped = true;
          } 
          else if (vm.currentCards.length === 1) {
              vm.currentCards.push(card); 
              card.cardIsFlipped = true;
              $timeout(compareCards, 1000); //Set timeout for 1000ms while player tries to look for a match
          }
          else {
              card.cardIsFlipped = false;
          }
      };// end of firstSelection function

      //Function to compare the two cards that has been selected.
      //If they cards have the same value, check the matches. Otherwise, flip the cards back over.
      var compareCards = function() {
          if (vm.currentCards[0].value === vm.currentCards[1].value) {
              matches++;
              checkMatches();
              vm.currentCards = [];
          } 
          else {

              vm.currentCards[0].cardIsFlipped = false;
              vm.currentCards[1].cardIsFlipped = false;
              vm.currentCards = [];
          }
      };

      //Function to verify if they have a found a match or all 18 cards have found a match.
      var checkMatches = function() {
          if (matches === 18) {
              alert('You win!');
              vm.cards = [];
              vm.firstSelection();
          } 
          //Alert the user that they have found a match
          else {
              alert('You have found a match!');
          }
      };

  }// end of CardController function
})();