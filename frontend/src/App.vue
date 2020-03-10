<template>
  <div id="q-app">
    <router-view v-if="$store.state.loaded"/>
    <q-inner-loading :showing="!$store.state.loaded">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      loaded: false
    }
  },
  async beforeCreate () {
    const { token, userId } = this.$store.state
    if (token) {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
      const { data: user } = await this.$axios.get(`/users/${userId}`)
      if (user) {
        await this.$store.commit('setState', { user, token })
      }
      if (document.location.pathname === '/login') this.$router.push('/')
    } else if (document.location.pathname !== '/login') {
      this.$router.push('/login')
    }
    setTimeout(async () => {
      this.$store.commit('setState', { loaded: true })
    }, 1000)
  }
}
</script>
