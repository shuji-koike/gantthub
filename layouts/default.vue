<template lang="pug">
div
  nav(class="navbar navbar-expand-md navbar-dark bg-dark")
    .navbar-brand gannthub
  nuxt
</template>
<style lang="sass">
nav.navbar
  opacity: 0
  transition: opacity .25s linear
  z-index: 1000
nav.navbar:hover
  opacity: 1
</style>
