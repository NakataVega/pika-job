<template>
  <q-card v-if="$store.state.user.id_organizacion">
    <q-card-section>
      <h6 style="margin:0px">Aquí puedes gestionar tus vacantes publicadas</h6>
      <q-btn label="Agregar vacante" icon="add_box" style="margin-top: 10px;"
        type="button" class="bg-yellow-14" to="tus-vacantes/crear" append
      />
    </q-card-section>
    <q-card-section>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  data () {
    if (!this.$store.state.user.id_organizacion) this.$router.push('/404')
    return {
      items: [],
      columns: []
    }
  },
  async mounted () {
    if (!this.$store.state.user.id_organizacion) this.$router.push('/404')
    {
      const { data } = await this.$axios.get(`vacantes?id_organizacion=${this.$store.state.user.id_organizacion}`)
      console.log(data)
    }
  }
}
</script>
