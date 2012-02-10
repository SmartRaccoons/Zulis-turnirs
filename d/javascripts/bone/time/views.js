(function() {
  var ActualTimer, Sounds, Timer,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Timer = Timer = (function(_super) {

    __extends(Timer, _super);

    function Timer() {
      Timer.__super__.constructor.apply(this, arguments);
    }

    Timer.prototype.tagName = 'div';

    Timer.prototype.template = _.template("<div class='timer'>\n  <input class='span1' type='text' value='45' /> min.\n  <span id='pause' class='btn'>Pauze</span>\n  <span id='start' class='btn primary'>Suokt</span>\n</div>");

    Timer.prototype.events = {
      'click #start': 'start',
      'click #pause': 'pause'
    };

    Timer.prototype.initialize = function() {
      return this.render();
    };

    Timer.prototype.start = function() {
      if (this.actualTimer) {
        if (confirm('Nūmest taimeri?')) {
          this.actualTimer.remove();
        } else {
          return false;
        }
      }
      this.actualTimer = new ActualTimer({
        'minutes': parseInt($(this.el).find('input').val()),
        'sounds': this.sounds
      });
      $(this.el).append(this.actualTimer.el);
      return this.actualTimer.start();
    };

    Timer.prototype.pause = function() {
      if (this.actualTimer.paused) {
        return this.actualTimer.start();
      } else {
        return this.actualTimer.pause();
      }
    };

    Timer.prototype.render = function() {
      $(this.el).html(this.template({}));
      this.sounds = new Sounds();
      return $(this.el).append(this.sounds.el);
    };

    return Timer;

  })(Backbone.View);

  ActualTimer = (function(_super) {

    __extends(ActualTimer, _super);

    function ActualTimer() {
      this.run = __bind(this.run, this);
      ActualTimer.__super__.constructor.apply(this, arguments);
    }

    ActualTimer.prototype.tagName = 'div';

    ActualTimer.prototype.className = 'view-timer';

    ActualTimer.prototype.template = _.template("<strong><%=minutes<10&&minutes>=0 ? '0' : ''%><%=minutes %></strong><span><%=seconds<10 ? '0' : ''%><%=seconds%></span>");

    ActualTimer.prototype.on = {
      15: {
        0: function(e, s) {
          e.addClass('remains-15');
          return s.play('beu');
        }
      },
      5: {
        0: function(e, s) {
          e.addClass('remains-5');
          return s.play('beu');
        }
      },
      1: {
        0: function(e, s) {
          e.addClass('remains-1');
          return s.play('beu');
        }
      },
      0: {
        0: function(e, s) {
          e.addClass('remains-0');
          return s.play('beu3');
        }
      }
    };

    ActualTimer.prototype.initialize = function() {
      return this.reset();
    };

    ActualTimer.prototype.reset = function() {
      this.timer = [this.options.minutes, 0];
      $(this.el).attr('class', 'view-timer');
      return this.render();
    };

    ActualTimer.prototype.start = function() {
      this.paused = false;
      return this.t = setInterval(this.run, 1000);
    };

    ActualTimer.prototype.run = function() {
      this.timer[1]--;
      if (this.timer[1] < 0) {
        this.timer[1] = 59;
        this.timer[0]--;
      }
      if (this.on[this.timer[0]] && this.on[this.timer[0]][this.timer[1]]) {
        this.on[this.timer[0]][this.timer[1]]($(this.el), this.options.sounds);
      }
      return this.render();
    };

    ActualTimer.prototype.pause = function() {
      clearInterval(this.t);
      return this.paused = true;
    };

    ActualTimer.prototype.render = function() {
      return $(this.el).html(this.template({
        'minutes': this.timer[0],
        'seconds': this.timer[1]
      }));
    };

    return ActualTimer;

  })(Backbone.View);

  Sounds = (function(_super) {

    __extends(Sounds, _super);

    function Sounds() {
      Sounds.__super__.constructor.apply(this, arguments);
    }

    Sounds.prototype.tagName = 'div';

    Sounds.prototype.className = 'sounds';

    Sounds.prototype.template = _.template("<audio id='sound-beu' src='d/audio/beu.ogg' controls />\n<audio id='sound-beu3' src='d/audio/beu3.ogg' controls />");

    Sounds.prototype.initialize = function() {
      return this.render();
    };

    Sounds.prototype.play = function(id) {
      return $(this.el).find('#sound-' + id)[0].play();
    };

    Sounds.prototype.render = function() {
      return $(this.el).html(this.template());
    };

    return Sounds;

  })(Backbone.View);

}).call(this);
