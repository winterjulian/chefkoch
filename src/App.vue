<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <component :is="currentView"/>
</template>

<script>
import MainPage from './components/pages/MainPage'
import AddPage from './components/pages/AddPage'

const routes = {
  '/': MainPage,
  '/add': AddPage
}

export default {
  name: 'App',
  components: {
    MainPage
  },

  data() {
    return {
      currentPath: window.location.hash
    }
  },

  mounted() {
    window.addEventListener('hashchange', () => {
      console.log('CHANGE');
      console.log(window.location.hash)
      this.currentPath = window.location.hash
    })
  },

  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/']
    }
  }
}
</script>

<style>
#app {
  height:100%;
  min-height:100%;
}
</style>
