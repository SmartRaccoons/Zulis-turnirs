// Generated by CoffeeScript 1.6.3
(function() {
  var Router, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.autoUpate = true;

  window.Router = Router = (function(_super) {
    __extends(Router, _super);

    function Router() {
      _ref = Router.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Router.prototype.routes = {
      '': 'index'
    };

    Router.prototype.initialize = function() {
      var reload;
      reload = function() {
        $('.brand').html(_l('head'));
        $('#navigation').empty();
        return $.each([['', _l('Help')], ['points', _l('Tournament data')], ['timer', _l('Timer')], ['about', _l('About application')]], function(i, pr) {
          return $('#navigation').append($('<li>').append($('<a>', {
            'text': pr[1],
            'title': pr[1],
            'href': '#' + App.lang.active + '/' + pr[0]
          })));
        });
      };
      reload();
      return this.route(/^(.*?)\/(.*?)$/, 'none', function(lang, fn) {
        if (lang !== App.lang.active) {
          App.lang.active = lang;
          reload();
        }
        if (fn === '') {
          fn = 'index';
        }
        return this[fn]();
      });
    };

    Router.prototype.e = function() {
      var ap;
      ap = $('#app');
      ap[0].innerHTML = '';
      return ap;
    };

    Router.prototype.none = function() {};

    Router.prototype.index = function() {
      return this.e().html(_l('Index tutorial'));
    };

    Router.prototype.points = function() {
      if (!this.z) {
        this.z = new Zole({
          collection: Users
        });
      }
      return this.e().append(this.z.el);
    };

    Router.prototype.timer = function() {
      if (!this.t) {
        this.t = new Timer({});
      }
      return this.e().append(this.t.el);
    };

    Router.prototype.about = function() {
      return this.e().html(_l('About'));
    };

    return Router;

  })(Backbone.Router);

}).call(this);
