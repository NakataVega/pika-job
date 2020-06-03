<template>
  <q-card v-if="$store.state.user.id_aspirante">
    <q-card-section>
      aaaaa
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    return {
    }
  },
  async mounted () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    else {
      const id = this.$route.params.id
      const { data } = await this.$axios.get('vacantes?$eager=organizacion', { params: { activo: 1, id: id } })
      console.log(data)
    }
  }
}
</script>
