(function() {
  var User, UserList,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  User = (function(_super) {

    __extends(User, _super);

    function User() {
      User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.defaults = function() {
      return {
        order: Users.nextOrder(),
        name: '',
        points: []
      };
    };

    User.prototype.rounds = function() {
      return this.get('points').length;
    };

    User.prototype.total = function() {
      var big, points, small;
      points = _.clone(this.get('points'));
      big = 0;
      small = 0;
      _.each(points, function(p) {
        big += parseInt(p[0]) || 0;
        return small += parseInt(p[1]) || 0;
      });
      return [big, small];
    };

    User.prototype.addRound = function() {
      var p;
      p = _.clone(this.get('points'));
      p.push(['-', '-']);
      return this.save({
        'points': p
      });
    };

    return User;

  })(Backbone.Model);

  UserList = (function(_super) {

    __extends(UserList, _super);

    function UserList() {
      UserList.__super__.constructor.apply(this, arguments);
    }

    UserList.prototype.model = User;

    UserList.prototype.localStorage = new Store("users");

    UserList.prototype.nextOrder = function() {
      var max;
      if (!this.length) return 1;
      max = 2;
      this.each(function(m) {
        if (max <= m.get('order')) return max = m.get('order') + 1;
      });
      return max;
    };

    UserList.prototype.rounds = function() {
      var rounds;
      rounds = 0;
      this.each(function(m) {
        if (rounds < m.rounds()) return rounds = m.rounds();
      });
      return rounds;
    };

    UserList.prototype.randomize = function() {
      var i;
      i = 1;
      return _.each(_.shuffle(this.models), function(m) {
        return m.save({
          'order': i++
        });
      });
    };

    UserList.prototype.reOrder = function() {
      var models;
      models = _.clone(this.models);
      return models.sort(function(m1, m2) {
        var order1, order2, total1, total2;
        total1 = m1.total();
        total2 = m2.total();
        order1 = m1.get('order');
        order2 = m2.get('order');
        return -1 * ((total1[0] - total2[0]) * 1000000 + (total1[1] - total2[1]) * 1000 + order2 - order1);
      });
    };

    UserList.prototype.emptyPoints = function() {
      var p, r;
      p = [];
      r = this.rounds();
      while (0 < r--) {
        p.push(['-', '-']);
      }
      return p;
    };

    return UserList;

  })(Backbone.Collection);

  window.Users = new UserList;

}).call(this);
