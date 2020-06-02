<template>
  <q-card v-if="$store.state.user.id_aspirante">
    <q-card-section>
      <h6 style="margin:0px; font-weight:bold;">Vacantes disponibles</h6>
    </q-card-section>
  </q-card>
</template>

<script>
/* function toMonth (number) {
  if (number === 1) return 'Enero'
  if (number === 2) return 'Febrero'
  if (number === 3) return 'Marzo'
  if (number === 4) return 'Abril'
  if (number === 5) return 'Mayo'
  if (number === 6) return 'Junio'
  if (number === 7) return 'Julio'
  if (number === 8) return 'Agosto'
  if (number === 9) return 'Septiembre'
  if (number === 10) return 'Octubre'
  if (number === 11) return 'Noviembre'
  if (number === 12) return 'Diciembre'
}
function myDateFormat (obj) {
  console.log(obj)
  if (!obj) return 'Actualidad'
  else {
    var f = new Date(obj)
    console.log('-------')
    console.log(f)
    // return fecha.toLocaleDateString()
    return f.getDate() + '/' + toMonth(f.getMonth() + 1) + '/' + f.getFullYear()
  }
} */
export default {
  data () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    return {
      items: [],
      columns: []
    }
  },
  async mounted () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    else {
      /* const { data } = await this.$axios.get('vacantes?activo=1')
      this.items = data.data.map(i => ({
        ...i,
        descripcion: i.descripcion.split('\n'),
        requisitos: i.requisitos.split('\n'),
        createdAt: myDateFormat(i.createdAt.replace('-', '/').split('T')[0]),
        updatedAt: myDateFormat(i.updatedAt.replace('-', '/').split('T')[0])
      }))
      if (this.items.length === 0) this.items = null
      console.log(this.items) */
      // const vacantes = await this.$axios.get('organizaciones?$eager=vacantes')
      const vacantes = await this.$axios.get('vacantes?$eager=organizacion', { params: { activo: 1 } })
      console.log(vacantes)
    }
  }
}
</script>
