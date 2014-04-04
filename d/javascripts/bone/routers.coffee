
window.autoUpate = yes


window.Router = class Router extends Backbone.Router
  routes: {
    '': 'index',
#    'lv/': 'index',
#    'lg/': 'index',
#    'lv/points': 'points',
#    'lg/points': 'points',
#    'lv/timer': 'timer',
#    'lg/timer': 'timer',
#    'lv/about': 'about'
#    'lg/about': 'about'
  }

  initialize: ->
    reload = ->
      $('.brand').html(_l('head'))
      $('#navigation').empty()
      $.each [['', _l('Help')],['points', _l('Tournament data')], ['timer', _l('Timer')], ['about',_l('About application')]], (i, pr)->
        $('#navigation').append(
          $('<li>').append(
            $('<a>', {
              'text': pr[1],
              'title': pr[1],
              'href': '#'+App.lang.active+'/'+pr[0]
            })
          )
        )
    reload()
    @route /^(.*?)\/(.*?)$/, 'none', (lang, fn)->
      if lang isnt App.lang.active
        App.lang.active = lang
        reload()
      if fn is ''
        fn = 'index'
      @[fn]()

  e: ->
    ap = $('#app')
#    fcking jquery works not well at this point :)
    ap[0].innerHTML = ''
    ap

  none: ->


  index: ->
    @e().html _l('Index tutorial')

  points: ->
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
    @e().html _l('About')