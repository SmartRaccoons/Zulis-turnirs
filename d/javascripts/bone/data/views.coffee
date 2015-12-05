window.Zole = class Zole extends Backbone.View
  tagName: 'div'
  template: _.template("""
    <%=_l('Tournament data instruction')%>

    <table class='zebra-striped'>
      <thead>
        <tr>
          <th>#</th>
          <th>Nr</th>
          <th><%=_l('Name/surname')%></th>
          <% for(var i=0; i<rounds; i++){ %>
            <th class='points'><%=i+1 %></th>
          <%} %>
          <th class='points points-total'><%=_l('Total')%></th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3"></td>
          <% for(var i=0; i<rounds; i++){ %>
            <td class='points points-<%=i%>'>
                <strong></strong>
                ( <span></span> )
            </td>
          <%} %>
          <td class='points points-total'>
            <strong></strong>
            <span></span>
          </td>
        </tr>
      </tfoot>
    </table>
    <p>
      <input id='new-player' placeholder='<%=_l("New player")%>' />
    </p>
    <div class='well'>
      <!--<span id='delete-all' class='btn danger'>Dzēst vysu</span>-->
      <span id='randomize' class='btn danger'>Random</span>
      <span id='new-round' class='btn'><%=_l('New round')%></span>
      <span id='order' class='btn large primary'><%=_l('Reorder')%></span>
      <span id='discart' class='btn'><%=_l('Remove one')%></span>
      <span id='discart-2' class='btn'><%=_l('Remove two')%></span>
    </div>
  """)

  events:
    'click #randomize': 'randomize'
    'click #new-round': 'newRound'
    'keyup #new-player': 'updateOnEneter'
    'click #order': 'reOrder'
    'click #discart': -> @discard(1)
    'click #discart-2': -> @discard(2)
    'keyup input': 'keyUp'

  initialize: ->
    @collection.bind 'reset', =>
      @rounds = @collection.rounds()
      @.render()
      @collection.each @addUser
    @collection.bind('add', @addUser, @)
    updateFoot = =>
        points = []
        @collection.each (m)->
            _.each m.get('points'), (p, i)->
                if not points[i]
                    points[i] = [0, 0]
                points[i][0] += parseInt(p[0]) || 0
                points[i][1] += parseInt(p[1]) || 0
        _.each points, (p, i)=>
            container = $(@el).find('tfoot .points-'+i)
            container.children('strong').text(p[0])
            container.children('span').text(p[1])
    @collection.bind 'change:points', updateFoot
    @collection.bind 'reset', updateFoot
    @collection.fetch()


  addUser: (m) =>
    v = new UserView({
      model: m
    })
    m.view = v
    @.$('tbody').append(v.el)

  keyUp: (e)->
    if e.keyCode is 13
      td = $(e.currentTarget).closest('td')
      td.closest('tr').next('tr').find('td[data-round='+td.attr('data-round')+']').click()

  randomize: ->
    if confirm(_l('Give new number'))
      @collection.randomize()

  newRound: ->
    if confirm(_l('New round confirm?'))
      @lastTh.before(@make('th', {'class': 'points'}, ++@rounds))
      @collection.each (m)->
        m.addRound()

  updateOnEneter: (e)->
    @close() if e.keyCode is 13

  close: ->
    @collection.create({
      'name': @input.val(),
      'points': @collection.emptyPoints()
    })

  reOrder: ->
    order = @collection.reOrder()
    tbody = @.$('tbody')
#    tbody.html('')
    place = 1
    _.each order, (m) ->
      tbody.append(m.view.el)
      m.save({
        'place': place++
      })

  discard: (how=1)->
    if @_discard_previous is how
      how = null
    @_discard_previous = how
    @collection.discard(how)
    @collection.each (m)-> m.view.render()

  render: ->
    $(@el).html(@.template({
      'rounds': @rounds
    }));
    @rounds = @collection.rounds()
    @input = this.$('#new-player')
    @lastTh = this.$('thead th:last')


class UserView extends Backbone.View
  tagName: 'tr'
  template: _.template("""
    <td><strong><%=place%></strong></td>
    <td><%=order%></td>
    <td class='view-name-tab view-open'>
      <div class='view-name'>
        <span class='edit-name'><%=name%></span>
        <input type='text' value='<%=name%>' />
        <span class='remove'>x</span>
      </div>
    </td>
    <% if (points) { %>
      <% _.each(points, function(p, i) { %>
        <td data-round='<%=i+1%>' class='points points-round view-open<%= discarded && discarded.indexOf(i) > -1 ? ' discarded' : ''%>'>
          <strong>
            <span><%= p[0] %></span>
            <input type='text' value='<%= p[0] %>' />
          </strong>
          <span>(
            <span><%= p[1] %></span>
            <input type='text' value='<%= p[1] %>' />
          )</span>
         </td>
      <% }); %>
      <% } %>
    <td class='points points-total'>
      <strong><%= total[0]%></strong> (<%= total[1]%>)
    </td>
  """)

  events:
    'click .remove': 'remove'
    'dblclick .view-name-tab': 'editView'
    'click .points-round': 'editView'
    'keyup input': 'keyUp'

  initialize: ->
    #redraw element on every change
    @model.bind 'change', @render, @
    @render()

  editView: (e) ->
    td = $(e.currentTarget)
    if td.hasClass('view-edit')
      return false
    td.removeClass('view-open').addClass('view-edit');
    td.find('input')[0].focus()

  keyUp: (e) ->
    @cancel(e) if e.keyCode is 27
    @save(e) if e.keyCode is 13

  cancel: (e) ->
    td = $(e.currentTarget).closest('td')
    $(td).removeClass('view-edit').addClass('view-open');

  save: (e) ->
    td = $(e.currentTarget).closest('td')
    round = td.attr('data-round')
    #copy array to change pointer
    points = _.clone(@model.get('points'))
    points[round-1] = [td.find('strong input').val(), td.find('span input').val()]
    @model.save({
      'points': points,
      'name': @.$('.view-name input').val()
    })
    @cancel(e)

  remove: ->
    if confirm(_l('Sure?'))
      $(@el).remove()
      @model.destroy()

  render: ->
    $(@el).html(@.template({
      'place': @model.get('place'),
      'order': @model.get('order'),
      'name': @model.get('name'),
      'points': @model.get('points'),
      'discarded': @model.get('discarded'),
      'total': @model.total(),
    }));

