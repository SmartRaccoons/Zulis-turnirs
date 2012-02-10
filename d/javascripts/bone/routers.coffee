
window.autoUpate = yes


window.Router = class Router extends Backbone.Router
  routes: {
    '': 'index',
    'timer': 'timer',
    'about': 'about'
  }

  e: ->
#    empty #app and return jquery array set
    ap = $('#app')
#    fcking jquery works not well at this point :)
    ap[0].innerHTML = ''
    ap

  index: ->
    if !@.z
      @.z = new Zole({
        collection: Users
      })

    @e().append(@.z.el);

  timer: ->
    if !@.t
      @.t = new Timer({

      })
    @e().append(@.t.el)

  about: ->
    @e().html("""
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
     """)

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