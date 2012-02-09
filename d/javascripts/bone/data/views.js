(function() {
  var UserView, Zole,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Zole = Zole = (function(_super) {

    __extends(Zole, _super);

    function Zole() {
      this.addUser = __bind(this.addUser, this);
      Zole.__super__.constructor.apply(this, arguments);
    }

    Zole.prototype.tagName = 'div';

    Zole.prototype.template = _.template("<table class='zebra-striped'>\n  <thead>\n    <tr>\n      <th>#</th>\n      <th>Nr</th>\n      <th>Vuords/pavuords</th>\n      <% for(var i=0; i<rounds; i++){ %>\n        <th class='points'><%=i+1 %></th>\n      <%} %>\n      <th class='points points-total'>Kūpā</th>\n    </tr>\n  </thead>\n  <tbody>\n  </tbody>\n</table>\n<p>\n  <input id='new-player' placeholder='Jauns spieļietojs' />\n</p>\n<div class='well'>\n  <!--<span id='delete-all' class='btn danger'>Dzēst vysu</span>-->\n  <span id='randomize' class='btn danger'>Random</span>\n  <span id='new-round' class='btn'>Vēļ kuorta</span>\n  <span id='order' class='btn large primary'>Sakuortot piec punktim</span>\n</div>");

    Zole.prototype.events = {
      'click #randomize': 'randomize',
      'click #new-round': 'newRound',
      'keyup #new-player': 'updateOnEneter',
      'click #order': 'reOrder'
    };

    Zole.prototype.initialize = function() {
      var _this = this;
      this.collection.bind('reset', function() {
        _this.rounds = _this.collection.rounds();
        _this.render();
        return _this.collection.each(_this.addUser);
      });
      this.collection.bind('add', this.addUser, this);
      return this.collection.fetch();
    };

    Zole.prototype.addUser = function(m) {
      var v;
      v = new UserView({
        model: m
      });
      m.view = v;
      return this.$('tbody').append(v.el);
    };

    Zole.prototype.randomize = function() {
      if (confirm('Īdūt kotram jaunu numuru?')) return this.collection.randomize();
    };

    Zole.prototype.newRound = function() {
      if (confirm('Vēl vīna kuorta?')) {
        this.lastTh.before(this.make('th', {
          'class': 'points'
        }, ++this.rounds));
        return this.collection.each(function(m) {
          return m.addRound();
        });
      }
    };

    Zole.prototype.updateOnEneter = function(e) {
      if (e.keyCode === 13) return this.close();
    };

    Zole.prototype.close = function() {
      return this.collection.create({
        'name': this.input.val(),
        'points': this.collection.emptyPoints()
      });
    };

    Zole.prototype.reOrder = function() {
      var order, place, tbody;
      order = this.collection.reOrder();
      tbody = this.$('tbody');
      place = 1;
      return _.each(order, function(m) {
        tbody.append(m.view.el);
        return m.save({
          'place': place++
        });
      });
    };

    Zole.prototype.render = function() {
      $(this.el).html(this.template({
        'rounds': this.rounds
      }));
      this.rounds = this.collection.rounds();
      this.input = this.$('#new-player');
      return this.lastTh = this.$('thead th:last');
    };

    return Zole;

  })(Backbone.View);

  UserView = (function(_super) {

    __extends(UserView, _super);

    function UserView() {
      UserView.__super__.constructor.apply(this, arguments);
    }

    UserView.prototype.tagName = 'tr';

    UserView.prototype.template = _.template("<td><strong><%=place%></strong></td>\n<td><%=order%></td>\n<td>\n  <div class='name'>\n    <%=name%>\n    <span class='remove'>x</span>\n  </div>\n</td>\n<% if (points) { %>\n  <% _.each(points, function(p, i) { %>\n    <td data-round='<%=i+1%>' class='points points-round points-view-open'>\n      <strong>\n        <span><%= p[0] %></span>\n        <input type='text' value='<%= p[0] %>' />\n      </strong>\n      <span>(\n        <span><%= p[1] %></span>\n        <input type='text' value='<%= p[1] %>' />\n      )</span>\n     </td>\n  <% }); %>\n  <% } %>\n<td class='points points-total'>\n  <strong><%= total[0]%></strong> (<%= total[1]%>)\n</td>");

    UserView.prototype.events = {
      'click .remove': 'remove',
      'click .points-round': 'editView',
      'keyup input': 'keyUp'
    };

    UserView.prototype.initialize = function() {
      this.model.bind('change', this.render, this);
      return this.render();
    };

    UserView.prototype.editView = function(e) {
      var td;
      td = $(e.currentTarget);
      if (td.hasClass('points-view-edit')) return false;
      td.removeClass('points-view-open').addClass('points-view-edit');
      return td.find('input')[0].focus();
    };

    UserView.prototype.keyUp = function(e) {
      if (e.keyCode === 27) this.cancel(e);
      if (e.keyCode === 13) return this.save(e);
    };

    UserView.prototype.cancel = function(e) {
      var td;
      td = $(e.currentTarget).closest('td');
      return $(td).removeClass('points-view-edit').addClass('points-view-open');
    };

    UserView.prototype.save = function(e) {
      var points, round, td;
      td = $(e.currentTarget).closest('td');
      round = td.attr('data-round');
      points = _.clone(this.model.get('points'));
      points[round - 1] = [td.find('strong input').val(), td.find('span input').val()];
      this.model.save({
        'points': points
      });
      return this.cancel(e);
    };

    UserView.prototype.remove = function() {
      if (confirm('Puorlīcynuots?')) {
        $(this.el).remove();
        return this.model.destroy();
      }
    };

    UserView.prototype.render = function() {
      return $(this.el).html(this.template({
        'place': this.model.get('place'),
        'order': this.model.get('order'),
        'name': this.model.get('name'),
        'points': this.model.get('points'),
        'total': this.model.total()
      }));
    };

    return UserView;

  })(Backbone.View);

}).call(this);
