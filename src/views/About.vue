<script>
import { Vm } from '@bluepjs/vm'
import DemoActor from '@/actor'
import PageModule from '@/vm/page.module'

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
        try {
          const line = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a ? a.toString() : '').join(' ')
          this.logs.push(`DBG: ${line}`)
        } catch (e) {
          // let's go simple :)
          console.log(e, args)
        }
        if (this.$refs.logs) {
          this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight
        }
      }
    })

    // add page module to Vm
    this.vm.addModule(PageModule)
    // wait for next tick to be sure that $refs are created
    await new Promise(resolve => setTimeout(resolve, 0))
    await this.vm.M('page').init(this.$refs.demo.children)

    // update libraries
    this.vm.updateLibraries(this.$store.state.vm.libraries)

    // create demo actor with id required for sample library
    this.demoActor = new DemoActor('90df7b49-7f94-4ac7-9bec-3193f20908b9')
    // and add actor to virtual machine
    this.vm.M('actor').addActor(this.demoActor)

    // start vm
    this.vm.start()
  }
}
</script>

<template>
  <div class="about">
    <h1>Browser VM example</h1>
    <p>This page is example of @bluepjs virtual machine running in browser.</p>
    <div class="demo-page" ref="demo">
      <div id="div-1">Div 1</div>
      <div id="div-2">Div 2</div>
      <button id="btn-1">Button 1</button>
      <button id="btn-2">Button 2</button>
    </div>
    <p><input type="checkbox" v-model="debug"/> Debug logs</p>
    <p>Machine created on page visit and destroyed on page leave.</p>
    <p>Console messsages of VM are catched and displayed below:</p>
    <div ref="logs" class="console">
      <div class="line" v-for="m, i of logs" :key="i">{{m}}</div>
    </div>
  </div>
</template>

<style scoped>
.demo-page {
  margin: 15px;
  padding: 10px;
  background-color: #eee;
}
.demo-page div {
  min-width: 50px;
  min-height: 50px;
  border: 1px solid #ddd;
}
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
