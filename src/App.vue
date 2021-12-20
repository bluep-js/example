<script>
export default {
  created () {
    // this.$store.dispatch('init')
  }
}
</script>

<template>
  <div id="nav">
    <router-link to="/">Editor</router-link> |
    <router-link to="/about">Browser VM</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 90%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
