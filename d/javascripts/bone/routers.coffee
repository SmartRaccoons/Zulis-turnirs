
window.autoUpate = yes


window.Router = class Router extends Backbone.Router
  routes: {
    '': 'index',
    'about': 'about'
  }
  index: ->
    if !@.z
      @.z = new Zole({
        collection: Users
      })
    $('#app').empty().append(@.z.el);
  about: ->
    $('#app').empty().html("""
      <h1>Zūlis turniru <small>Aplikaceja</small></h1>
      <p>
        Atvīgloi turnira organiziešonu:
      </p>
      <ul>
        <li>Punktu skaitiešonu</li>
        <li>Spieļotoju davīnošonu</li>
        <li>Laika skaitiešonu</li>
        <li>Laika paziņošonu</li>
        <li>Spieļotoju šķirošonu piec punktim</li>
      </ul>
      <p>Drūši varat lītot piec sovim īskotim, nūrodūt apakšā atpakaļsaiti uz autorim!</p>
     """);

#$(document).ready ->
#  r = new Router();
#  nav = [['', 'Turnira dati'], ['about','Par aplikaceji']]
#  _nav.each (pr) ->
#    $('#navigation').append(
#      $('<li>').append(
#        $('<a>', {
#          'text': pr[1],
#          'title': pr[1],
#          'href': '#'+pr[0],
#          'click': (e) ->
#            e.preventDefault();
#            r.navigate(pr[0], true);
#          }
#        )
#      )
#    )