const { AbstractActor } = require('@bluepjs/vm')

/**
  ElementActor will be base for other actors - DivActor and ButtonActor
  and implement parent methods

  ElementActor by itself will not be used - it's "abstract" class,
  so class will be defined in module classes metadata and here metadata will be skiped
*/
class ElementActor extends AbstractActor {
  /*
    override actor constructor to provide html element and set inital states
  */
  constructor (actorId, htmlElement) {
    super(actorId)

    this._element = htmlElement || null

    this._state = {
      // according to 'html/element' class schema, struct and enums description
      colors: {
        background: '#fff',
        text: '#000'
      }
    }
  }

  /*
    override non-static metadata method to set nicer names
  */
  metadata () {
    const base = this.constructor.metadata()
    const id = this.id()
    // required. exists in parent metadata() method
    base.id = id
    // new update
    base.name += ` (${id})`
    return base
  }

  // override async AbstractActor::method(code, inputs)
  method (code, inputs) {
    // all methods will be defined as functions named 'code'
    // so all child classes will not override this method
    if (!this._element || typeof this[code] !== 'function') return
    return this[code](inputs)
  }

  // method described for ElementActor
  async colorize ({ colors }) {
    // don't forget to update state
    this._state.colors = colors
    this._element.style.color = colors.text
    this._element.style['background-color'] = colors.background
  }
}

module.exports = ElementActor
