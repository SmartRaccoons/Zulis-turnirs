(function() {
  var Router,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.autoUpate = true;

  window.Router = Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      '': 'index',
      'timer': 'timer',
      'about': 'about'
    };

    Router.prototype.e = function() {
      var ap;
      ap = $('#app');
      ap[0].innerHTML = '';
      return ap;
    };

    Router.prototype.index = function() {
      if (!this.z) {
        this.z = new Zole({
          collection: Users
        });
      }
      return this.e().append(this.z.el);
    };

    Router.prototype.timer = function() {
      if (!this.t) this.t = new Timer({});
      return this.e().append(this.t.el);
    };

    Router.prototype.about = function() {
      return this.e().html("<h1>Zūlis turniru <small>Aplikaceja</small></h1>\n<p>\n  Atvīgloi turnira organiziešonu:\n</p>\n<ul>\n  <li>Punktu skaitiešonu</li>\n  <li>Spieļotoju davīnošonu</li>\n  <li>Laika skaitiešonu</li>\n  <li>Laika paziņošonu</li>\n  <li>Spieļotoju šķirošonu piec punktim</li>\n</ul>\n<p>Drūši varat lītot piec sovim īskotim, nūrodūt apakšā atpakaļsaiti uz autorim!</p>");
    };

    return Router;

  })(Backbone.Router);

}).call(this);
