<template>
  <q-page padding>
    <h3>Nueva vacante</h3>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="nombreVacante"
        label="Nombre de la vacante *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Ingrese el nombre de la vacante']"
      />

      <div class="q-pa-md q-gutter-sm">
        <q-btn label="Registrar vacante" type="submit" color="primary"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {

  data () {
    return {
      nombreVacante: ''
    }
  },
  methods: {
    async onSubmit () {
      /* const { data } = await this.$axios.post('/vacantes', {
        nombre_vacante: this.nombreVacante,
      }) */
      alert(this.nombreVacante)
      alert(this.$store.state.user.id_organizacion)
    }
  }
}
</script>
