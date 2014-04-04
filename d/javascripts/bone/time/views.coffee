window.Timer = class Timer extends Backbone.View
  tagName: 'div'
  template: _.template("""
        <div class='timer'>
          <%=_l('Timer instructions')%>
          <input class='span1' type='text' value='45' /> min.
          <span id='pause' class='btn'>Pauze</span>
          <span id='start' class='btn primary'><%=_l('Start')%></span>
        </div>
       """)

  events:
    'click #start': 'start'
    'click #pause': 'pause'

  initialize: ->
    @render()

  start: ->
    if @actualTimer
      if confirm(_l('Reset timer?'))
        @actualTimer.remove()
      else
        return false
    @actualTimer = new ActualTimer({
      'minutes': parseInt($(@el).find('input').val())
      'sounds': @sounds
    })
    $(@el).append(@actualTimer.el)

    @actualTimer.start()

  pause: ->
    if @actualTimer.paused
      @actualTimer.start()
    else
      @actualTimer.pause()

  render: ->
    $(@el).html(@.template({
    }));
    @sounds = new Sounds()
    $(@el).append(@sounds.el)


class ActualTimer extends Backbone.View
  tagName: 'div'
  className: 'view-timer'
  template: _.template("""
      <strong><%
         if (minutes<0){
          %>-<%= -1*(minutes+1)%><%
        } else if (minutes<10){
          %>0<%=minutes%><%
        } else {
          %><%=minutes%><%
        }%></strong><span><%
        if (minutes < 0){
          %><%=(60-seconds)<10 ? '0' : ''%><%=(60-seconds)%><%
        }else {
          %><%=seconds<10 ? '0' : ''%><%=seconds%><%
        }%></span>
    """)
  on:
    15:
      0: (e, s)->
        e.addClass('remains-15')
        s.play('short')
    5:
      0: (e, s)->
        e.addClass('remains-5')
        s.play('short')
    1:
      0: (e, s)->
        e.addClass('remains-1')
        s.play('short')
    0:
      0: (e, s)->
        e.addClass('remains-0')
        s.play('long')
  initialize: ->
    @reset()

  reset: ->
    @timer = [this.options.minutes, 0]
    $(@el).attr('class', 'view-timer')
    @render()

  start: ->
    @paused = false
    @t = setInterval(@run, 1000)

  run: =>
    @timer[1]--
    if @timer[1]<0
      @timer[1] = 59
      @timer[0]--
#    check fire events
    if @on[@timer[0]] && @on[@timer[0]][@timer[1]]
      @on[@timer[0]][@timer[1]]($(@el), this.options.sounds)
    @render()

  pause: ->
    clearInterval(@t)
    @paused = true

  render: ->
    $(@el).html(@.template({
      'minutes': @timer[0],
      'seconds': @timer[1]
    }));


class Sounds extends Backbone.View
  tagName: 'div'
  className: 'sounds'
  template: _.template("""
    <audio id='sound-short' src='d/audio/short.ogg' controls />
    <audio id='sound-long' src='d/audio/long.ogg' controls />
  """)

  initialize: ->
    @render()

  play: (id)->
    $(@el).find('#sound-'+id)[0].play()

  render: ->
    $(@el).html(@.template());
