<script>

export default {
  name: 'Home',
  data () {
    return {
      libraries: {}
    }
  },
  methods: {
    // @save event from IDE
    onSave (libs) {
      this.$store.dispatch('saveAll', libs)
        .then(() => {
          this.libraries = this.$store.state.vm.libraries
        })
    },
    // @run event from IDE
    onRun (info) {
      this.$store.dispatch('runFunction', info)
        .then(result => {
          console.log('run result', result)
        })
    },
    // @select event from IDE - saving in localStorage
    onSelect (info) {
      localStorage.setItem('bluep/select', JSON.stringify(info))
    }
  },
  created () {
    // loading storage and libraries
    this.$store.dispatch('init')
      .then(() => {
        this.libraries = this.$store.state.vm.libraries
      })
  },
  computed: {
    // IDE icons and "selected element" options
    editorOptions () {
      const last = localStorage.getItem('bluep/select')
      let select = null
      if (last) {
        try {
          select = JSON.parse(last)
        } catch (err) {
          localStorage.removeItem('bluep/select')
          select = null
        }
      }
      return {
        icons: {
          // bluep entities
          enum: 'bi-file-text',
          struct: 'bi-file-medical',
          function: 'bi-file-code',
          class: 'bi-journal-medical',
          library: 'bi-book',
          event: 'bi-bell',
          // various ui icons
          view: 'bi-eye',
          chevronRight: 'bi-chevron-right',
          chevronDown: 'bi-chevron-down',
          add: 'bi-plus',
          remove: 'bi-trash',
          edit: 'bi-pencil-fill',
          save: 'bi-save',
          run: 'bi-play',
          close: 'bi-x',
          fw: '',
          // tools
          toolArrow: 'bi-cursor',
          toolEraser: 'bi-eraser',
          toolSelectBox: 'bi-plus-square-dotted',
          toolDeselectBox: 'bi-dash-square-dotted',
          // zoom icons
          zoom: 'bi-search',
          zoomIn: 'bi-zoom-in',
          zoomOut: 'bi-zoom-out',
          // snap to grid
          snapToGrid: 'bi-border',
          // clipboard
          clipboardCopy: 'bi-files',
          clipboardCut: 'bi-scissors',
          clipboardPaste: 'bi-clipboard'
        },
        select
        /*
        canRun: false,  // run button can be disabled
        dialogs: {  // dialogs methods to use instead of browser defaults
          alert: (...args) => new Promise(),
          confirm: (...args) => new Promise(),
          prompt: (...args) => new Promise(),
        }
        */
      }
    }
  }
}
</script>

<template>
  <div class="home">
    <BluepJsEditor
      :height="'100%'"
      :types="$store.state.vm.types"
      :nodes="$store.state.vm.nodes"
      :modules="$store.state.vm.modules"
      :actors="$store.state.vm.actors"
      :libraries="libraries"
      :options="editorOptions"
      @save="onSave"
      @run="onRun"
      @select="onSelect"
    />
  </div>
</template>

<style>
.home {
  height: 100%;
}
</style>
