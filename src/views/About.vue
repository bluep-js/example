<script>
import { Vm } from '@bluepjs/vm'
import DemoActor from '@/actor'

export default {
  data () {
    return {
      vm: null,
      demoActor: null,
      debug: false,
      logs: []
    }
  },
  async created () {
    await this.$store.dispatch('init')
    this.vm = new Vm()

    // to catch machine logs object with methods `log` and `error` should be provided as argument
    this.vm.console({
      log: (...args) => {
        const line = args.map(a => a.toString()).join(' ')
        this.logs.push(`LOG: ${line}`)
        if (this.$refs.logs) {
          this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight
        }
      },
      error: (...args) => {
        const line = args.map(a => a.toString()).join(' ')
        this.logs.push(`ERR: ${line}`)
        if (this.$refs.logs) {
          this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight
        }
      },
      debug: (...args) => {
        if (!this.debug) return
        const line = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a.toString()).join(' ')
        this.logs.push(`DBG: ${line}`)
        if (this.$refs.logs) {
          this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight
        }
      }
    })
    this.vm.updateLibraries(this.$store.state.vm.libraries)

    // create demo actor with id required for sample library
    this.demoActor = new DemoActor('90df7b49-7f94-4ac7-9bec-3193f20908b9')
    // and add actor to virtual machine
    this.vm.M('actor').addActor(this.demoActor)
    this.vm.start()
  }
}
</script>

<template>
  <div class="about">
    <h1>Browser VM example</h1>
    <p>This page is example of @bluepjs virtual machine running in browser.</p>
    <p><input type="checkbox" v-model="debug"/> Debug logs</p>
    <p>Machine created on page visit and destroyed on page leave.</p>
    <p>Console messsages of VM are catched and displayed below:</p>
    <div ref="logs" class="console">
      <div class="line" v-for="m, i of logs" :key="i">{{m}}</div>
    </div>
  </div>
</template>

<style scoped>
.console {
  margin: 15px;
  padding: 10px;
  background-color: #333;
  min-height: 100px;
  max-height: 300px;
  overflow-y: scroll;
  text-align: left;
}
.line {
  color: #eee;
  font-family: monospace;
  font-weight: bold;
  margin: 5px;
}
</style>
