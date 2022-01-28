const { AbstractModule } = require('@bluepjs/vm')

const DivActor = require('./div.actor')
const ButtonActor = require('./button.actor')

class PageModule extends AbstractModule {
  /**
    static method provides information about module for Vm and IDE
  */
  static metadata () {
    return {
      // module code to access module object with vm.M(code) or vm.module(code)
      code: 'page',
      name: 'Page',
      // let's define some module types
      enums: {
        // html colors
        'html/color': { // full type will be `bluep/enum/${enumCode}`
          code: 'html/color',
          name: 'Html color',
          values: {
            '#f00': 'Red',
            '#0f0': 'Green',
            '#00f': 'Blue',
            '#fff': 'White',
            '#000': 'Black',
            '#999': 'Grey'
          }
        }
      },
      structs: {
        // colors struct for background color and text color
        'element/colors': { // full type will be `bluep/struct/${structCode}`
          code: 'element/colors',
          name: 'Html elements colors',
          schema: {
            background: {
              code: 'background',
              name: 'Background color',
              type: 'bluep/enum/html/color'
            },
            text: {
              code: 'text',
              name: 'Text color',
              type: 'bluep/enum/html/color'
            }
          }
        }
      },
      // let's define IDE color for our structure
      types: {
        'bluep/struct/element/colors': {
          code: 'bluep/struct/element/colors',
          name: 'Html color',
          color: '#df883d'
        }
      },
      // ElementActor description:
      classes: {
        'html/element': { // full type will be `bluep/class/${classCode}`
          code: 'html/element',
          name: 'HTML Element',
          module: 'page',
          schema: {
            colors: {
              code: 'colors',
              name: 'Colors',
              access: 'public',
              readonly: true,
              type: 'bluep/struct/element/colors'
            }
          },
          methods: {
            colorize: {
              code: 'colorize',
              name: 'Colorize',
              access: 'public',
              type: 'method',
              class: 'html/element',
              module: 'page',
              context: {
                inputs: {
                  colors: {
                    code: 'colors',
                    name: 'Colors',
                    type: 'bluep/struct/element/colors'
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // init method will be called before Vm.start and allows module generate Actors for elements
  async init (htmlElements) {
    if (htmlElements && htmlElements.length) {
      for (let i = 0; i < htmlElements.length; i++) {
        const el = htmlElements[i]
        const tag = el.tagName
        const id = el.id
        if (tag === 'DIV') {
          const actor = new DivActor(id, el)
          this.vm().M('actor').addActor(actor)
        }
        if (tag === 'BUTTON') {
          const actor = new ButtonActor(id, el)
          this.vm().M('actor').addActor(actor)
        }
      }
    } else {
      /**
        Current example architecture is not really nice.
        Page module used only on frontend, but we take Vm.ideData() for IDE
        from "background Vm" instead of "frontend Vm" where page module
        will be really used.

        So we just know what actors will be used on frontend, and we create
        them here, to get them on IDE
      */
      if (typeof window === 'undefined') {
        const div1 = new DivActor('div-1', null)
        const div2 = new DivActor('div-2', null)
        const btn1 = new ButtonActor('btn-1', null)
        const btn2 = new ButtonActor('btn-2', null)
        this.vm().M('actor').addActor(div1)
        this.vm().M('actor').addActor(div2)
        this.vm().M('actor').addActor(btn1)
        this.vm().M('actor').addActor(btn2)
      }
    }
  }

  // executes on Vm.start
  async start () {
    // this module will be executed only in browser
    if (typeof window === 'undefined') {
      // use vm console for "outputs"
      this.vm().console().error('Page module can be started only in browser')
      return
    }
    this.vm().console().log('Page module starting')
  }
}

module.exports = PageModule
