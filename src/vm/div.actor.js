const ElementActor = require('./element.actor')

/**
  Div actor is simple ElementActor child class
*/
class DivActor extends ElementActor {
  /*
    Div actor how nothing specal, so we can describe it only by metadata
  */
  static metadata () {
    return {
      code: 'html/div',
      name: 'Div Element',
      // all schema and methods are extended fom parent class
      extends: {
        'module/page/html/element': {
          module: 'page',
          code: 'html/element'
        }
      }
    }
  }
}

module.exports = DivActor
