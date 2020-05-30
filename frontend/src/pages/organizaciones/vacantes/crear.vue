<template>
  <q-card v-if="$store.state.user.id_organizacion">
    <q-card-section>
      <h6 style="margin:0px">Datos de la vacante</h6>
      <q-form @submit="onSubmit" class="q-gutter-md" style="margin-top:10px;">
        <div class="q-gutter-md row items-start">
          <q-btn label="Publicar vacante" type="submit" class="bg-yellow-14" style="min-width:300px"/>
          <q-btn
            label="Volver atrás"
            type="button" class="bg-grey-9 text-yellow-14"
            style="min-width:300px" to="../tus-vacantes"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
// import moment from 'moment'
export default {
  data () {
    if (!this.$store.state.user.id_organizacion) this.$router.push('/404')
    return {
      nombre_vacante: null
    }
  },
  methods: {
    async onSubmit () {
      const { id_organizacion } = this.$store.state.user
      console.log(id_organizacion)
    }
  }
}
</script>
