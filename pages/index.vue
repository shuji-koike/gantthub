<template lang="pug">
section.container-fluid
  h2 timeline
  div
    section(v-for="repository in repositories")
      h4 {{repository.name}}
      section(v-for="issue in repository.issues.nodes")
        h5
          a(:href="issue.url" target="_blank")
            span &#35;{{issue.number}} {{issue.title}}
        ul
          li(v-for="assignee in issue.assignees.nodes")
            span {{assignee.login}}
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      repositories: []
    }
  },
  async mounted() {
    const data = await axios.get("/mock.json").then(a => a.data.data)
    this.$data.repositories = data.organization.repositories.nodes
  }
}
</script>
<style lang="sass">
section
  background: #fff
svg#screen
  position: absolute
  top: 0
  right: 0
  width: 100vw
  height: 100vh
</style>
