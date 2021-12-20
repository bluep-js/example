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
          enum: 'bi-file-text',
          struct: 'bi-file-medical',
          function: 'bi-file-code',
          class: '',
          library: 'bi-book',
          event: 'bi-bell',
          view: 'bi-eye',
          add: 'bi-plus',
          remove: 'bi-trash',
          save: 'bi-save',
          run: 'bi-play',
          close: 'bi-x',
          fw: ''
        },
        select
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
