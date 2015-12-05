// Generated by CoffeeScript 1.8.0
(function() {
  var User, UserList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  User = (function(_super) {
    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.defaults = function() {
      return {
        order: Users.nextOrder(),
        name: '',
        points: [],
        discarded: null
      };
    };

    User.prototype.rounds = function() {
      return this.get('points').length;
    };

    User.prototype.total = function() {
      var big, dis, points, small;
      points = _.clone(this.get('points'));
      big = 0;
      small = 0;
      dis = this.get('discarded');
      _.each(points, function(p, i) {
        if (dis && dis.indexOf(i) > -1) {
          return;
        }
        big += parseInt(p[0]) || 0;
        return small += parseInt(p[1]) || 0;
      });
      return [big, small];
    };

    User.prototype.discard = function(how) {
      var dis, i, p, _i;
      if (how === null) {
        return this.set('discarded', null);
      }
      dis = [];
      p = _.clone(this.get('points'));
      for (i = _i = 0; 0 <= how ? _i < how : _i > how; i = 0 <= how ? ++_i : --_i) {
        dis.push(p.reduce(function(l, n, i) {
          if (dis.indexOf(i) > -1) {
            return l;
          }
          if (l === null || n[0] < p[l][0] || (n[0] === p[l][0] && n[1] < p[l][1])) {
            return i;
          }
          return l;
        }, null));
      }
      return this.set('discarded', dis);
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
      return UserList.__super__.constructor.apply(this, arguments);
    }

    UserList.prototype.model = User;

    UserList.prototype.localStorage = new Store("users");

    UserList.prototype.nextOrder = function() {
      var max;
      if (!this.length) {
        return 1;
      }
      max = 2;
      this.each(function(m) {
        if (max <= m.get('order')) {
          return max = m.get('order') + 1;
        }
      });
      return max;
    };

    UserList.prototype.rounds = function() {
      var rounds;
      rounds = 0;
      this.each(function(m) {
        if (rounds < m.rounds()) {
          return rounds = m.rounds();
        }
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

    UserList.prototype.discard = function(how) {
      return this.each(function(m) {
        return m.discard(how);
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
