angular.module('futurism')
    .controller('DeckBuilderCtrl', function($scope, CardResource, DeckResource, deckInProgress, shared, me, _) {
        'use strict';

        var deck = deckInProgress.deck;
        $scope.deck = deck;
        $scope.deckFns = shared.deckFns;

        $scope.CardResource = CardResource;
        $scope.query = {userId: me.user._id, cannon: true};
        $scope.cards = [];


        $scope.saveDeck = function() {
            var cardIds = [];
            var deck = $scope.deck;
            _.each(deck.cards, function(card) {
                cardIds.push(card._id);
            });

            var params = {
                name: deck.name,
                cards: cardIds,
                pride: shared.deckFns.calcPride(deck)
            };
            
            var promise = DeckResource.save(params, function(storedDeck) {
                deck._id = storedDeck._id;
            }).$promise;

            return promise;
        };


        $scope.applyDefaults = function() {
            shared.deckFns.applyDefaults($scope.deck);
        };


        $scope.deleteDeck = function() {
            DeckResource.delete({deckId: $scope.deck._id});
            shared.deckFns.applyDefaults($scope.deck);
        };


        $scope.addCard = function(card) {
            deck.cards.push(angular.copy(card));
            $scope.sortDeck();
        };


        $scope.removeCard = function(card) {
            var index = deck.cards.indexOf(card);
            if(index !== -1) {
                deck.cards.splice(index, 1);
            }
            $scope.sortDeck();
        };


        $scope.sortDeck = function() {
            deck.cards.sort(function(a, b) {

                //sort pride descending
                if(a.pride !== b.pride) {
                    return b.pride - a.pride;
                }
                else {

                    //sort name descending
                    var nameA = a.name.toLowerCase();
                    var nameB = b.name.toLowerCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    //default return value (no sorting)
                    return 0;
                }
            });
        };
    });