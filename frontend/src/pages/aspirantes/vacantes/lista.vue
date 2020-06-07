<style>
  .link {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .link:hover {
    color: rgb(255,214,0);
    text-decoration: underline;
    cursor: pointer;
  }
</style>
<template>
  <q-card v-if="$store.state.user.id_aspirante">
    <q-card-section>
      <h6 style="margin:0px; font-weight:bold;">Vacantes disponibles</h6>
    </q-card-section>
    <q-card-section>
      <q-table v-if="items"
        grid
        :data="items"
        :columns="columns"
        hide-header
        virtual-scroll
        :virtual-scroll-item-size="this.items.length"
        :pagination="pagination"
        :rows-per-page-options="[0]" hide-bottom
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-12 col-md-12">
            <q-card>
              <q-card-section>
                <q-item class="link" :to="'/aspirante/vacantes/ver/' + props.row.id" style="margin: 0px;">
                  <strong style="font-size: 20px">{{ props.row.nombre_vacante }}</strong>
                </q-item>
                <q-item-label style="margin: 0px 15px; font-size: 16px; font-style: italic;">{{ props.row.organizacion.nombre_orga }} </q-item-label>
                <i style="font-weight:bold; margin-left:10px;" v-if="parseFloat(props.row.sueldo) !== 0">
                  <q-icon size="xs" name="attach_money"
                  v-if="parseFloat(props.row.sueldo) !== 0"
                /> {{props.row.sueldo}} mensuales</i>
                <q-item-label style="margin: 0px 15px; font-size: 16px; font-style: italic;">Fecha publicación: {{ props.row.updatedAt }} </q-item-label>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script>
var stringSimilarity = require('string-similarity')

function toMonth (number) {
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
  if (!obj) return 'Actualidad'
  else {
    var f = new Date(obj)
    return f.getDate() + '/' + toMonth(f.getMonth() + 1) + '/' + f.getFullYear()
  }
}
export default {
  data () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    return {
      items: [],
      columns: [],
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  async mounted () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    else {
      const id_aspirante = this.$store.state.user.id_aspirante
      // Obtener cadena de las experiencias
      var { data: experiencias } = await this.$axios.get('experiencias-laborales?', { params: { id_user: id_aspirante } })
      var strSkills = ''
      if (experiencias.total !== 0) {
        for (let index = 0; index < experiencias.data.length; index++) {
          strSkills = strSkills + experiencias.data[index].titulo_expe + ' ' + experiencias.data[index].actividades
        }
      }
      // Obtener conocimientos
      const { data: perfil } = await this.$axios.get(`/aspirantes/${id_aspirante}`)
      strSkills = strSkills + ' ' + perfil.conocimientos
      strSkills = strSkills.replace(/\n/g, ' ')
      // console.log(strSkills)
      const { data } = await this.$axios.get('vacantes?$eager=organizacion', { params: { activo: 1 } })
      this.items = data.data.map(i => ({
        ...i,
        updatedAt: myDateFormat(i.updatedAt.replace('-', '/').split('T')[0]),
        strVacante: i.descripcion + ' ' + i.requisitos,
        similitud: 0
      }))
      if (this.items.length === 0) this.items = null
      else {
        for (let index = 0; index < this.items.length; index++) {
          this.items[index].similitud = stringSimilarity.compareTwoStrings(strSkills, this.items[index].strVacante)
          console.log(this.items[index].similitud)
        }
        // Ordenar por relevancia
        this.items.sort(function (a, b) {
          if (a.similitud < b.similitud) {
            return 1
          }
          if (a.similitud > b.similitud) {
            return -1
          }
          return 0
        })
      }
    }
  }
}
</script>
