class User extends Backbone.Model
  defaults: ->
    return {
      order: Users.nextOrder(),
      name: '',
      points: []
    }

  rounds: ->
    return @get('points').length

  total: ->
    points = _.clone(@get('points'))
    big = 0
    small = 0
    _.each points, (p)->
      big += parseInt(p[0]) || 0
      small += parseInt(p[1]) || 0
    return [big, small]

  addRound: ->
    p = _.clone(@get('points'))
    p.push(['-', '-'])
    @save({
      'points': p
    })


class UserList extends Backbone.Collection
  model: User
  localStorage: new Store("users")

  nextOrder: ->
    if !@.length
      return 1
    max = 2
    @.each (m)->
      if max <= m.get('order')
        max = m.get('order')+1
    return max

  rounds: ->
    rounds = 0
    @.each (m) ->
      if rounds<m.rounds()
        rounds = m.rounds()
    return rounds

  randomize: ->
    i = 1
    _.each _.shuffle(@models), (m) ->
      m.save({
        'order': i++
      })
  reOrder: ->
    models = _.clone(@models)
    models.sort (m1, m2)->
      total1 = m1.total()
      total2 = m2.total()
      order1 = m1.get('order')
      order2 = m2.get('order')
      return -1*((total1[0]-total2[0])*1000000 + (total1[1]-total2[1])*1000 + order2 - order1);
#    _.sortBy @models, (m) ->
#      total = m.total()
#      order = m.get('order')
#      return (1000000+total[0])*1000000 + total[1]*1000 + order

  emptyPoints: ->
    p = []
    r = @rounds()
    p.push(['-', '-']) while 0<r--
    return p


window.Users = new UserList
