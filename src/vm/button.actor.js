const ElementActor = require('./element.actor')

/**
  Div actor is simple ElementActor child class
*/
class ButtonActor extends ElementActor {
  /*
    Div actor how nothing specal, so we can describe it only by metadata
  */
  static metadata () {
    return {
      code: 'html/button',
      name: 'Button Element',
      // all schema and methods are extended fom parent class
      extends: {
        'module/page/html/element': {
          module: 'page',
          code: 'html/element'
        }
      },
      events: {
        click: {
          code: 'click',
          name: 'Click'
        }
      }
    }
  }

  constructor (id, htmlElement) {
    super(id, htmlElement)

    if (htmlElement) {
      htmlElement.addEventListener('click', () => {
        this.emit('click')
      })
    }
  }
}

module.exports = ButtonActor
