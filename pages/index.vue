<template>
  <div class="container">
    <p><input v-model="token" type="text" name="GITHUB_TOKEN" /></p>
    <section v-if="data.organization">
      <span>{{ data.organization.name }}</span>
      <ul>
        <li
          v-for="repo in data.organization.repositories.nodes"
          :key="repo.name"
        >
          <span>{{ repo.name }}</span>
          <ul v-for="issue in repo.issues.nodes" :key="issue.name">
            <li>
              <span>{{ issue.title }}</span>
              <span>#{{ issue.number }}</span>
            </li>
            <i>@{{ issue.author.login }}</i>
            <i v-for="user in issue.assignees.nodes" :key="user.login" v-if="">
              @{{ user.login }}
            </i>
            <i v-for="label in issue.labels.nodes" :key="label.name">
              <span>{{ label.name }}</span>
            </i>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import query from '~/schema/graphql/issues.gql'

export default {
  data() {
    return {
      token: '',
      data: {}
    }
  },
  watch: {
    token() {
      this.load()
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      if (!this.$data.token) {
        const res = await this.$axios.get('/data.json')
        this.$data.data = res.data.data
      } else {
        const res = await this.$axios.post(
          'https://api.github.com/graphql',
          { query },
          {
            headers: {
              Authorization: 'bearer ' + this.$data.token
            }
          }
        )
        this.$data.data = res.data.data
      }
    }
  }
}
</script>
