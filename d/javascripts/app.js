$(function(){

    window.Round = Backbone.Model.extend({
        defaults: function(){
            return {
                order: Rouunds.nextOrder(),
                name: ''
            }
        }
    });

    window.RoundList = Backbone.Collection.extend({
        model: Round,
        localStorage: new Store("rounds"),
        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        }
    });
    window.Rouunds = new RoundList;


    window.User = Backbone.Model.extend({
        defaults: function() {
            return {
                order: Users.nextOrder(),
                number: 0,
                name: ''
            };
        }
    });

    window.UserList = Backbone.Collection.extend({
        model: User,
        localStorage: new Store("users"),
        nextOrder: function() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        }

    });
    window.Users = new UserList;


    window.AppView = Backbone.View.extend({
        el: $('#app'),
        events: {
//            "click #delete-all":  "createOnEnter",
            "click #new-round":  "newRound",
            "click #new-player":  "newPlayer",
            "click #order":  "reOrder",
        },
        initialize: function(){
            Rouunds.addEvent('reset', function(){
                Rounds.each(this.addRound);
            }, this);
        },
        newRound: function(){

        },
        newPlayer: function(){

        },
        reOrder: function(){

        },

        addRound: function(){

        }
    });
    window.App = new AppView;

});