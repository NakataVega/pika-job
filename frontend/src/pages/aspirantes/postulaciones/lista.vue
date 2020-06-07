<template>
  <q-card v-if="$store.state.user.id_aspirante">
    <q-card-section>
      <h5 style="margin: 0px; font-weight:bold;">Tus postulaciones</h5>
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
        :rows-per-page-options="[0]"
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <q-btn label="Ver vacante" style="float: right; margin: 10px; z-index: 7;" class="text-yellow-14 bg-grey-9"
                :to="'/aspirante/vacantes/ver/' + props.row.vacante.id"
              />
              <br>
              <q-card-section>
                <strong style="font-size: 23px">{{ props.row.nombre_vacante }}</strong><br/>
                <strong style="font-style: italic;">{{props.row.nombre_orga}}</strong><br/>
                <span style="float: right;">Fecha de postulación: <span style="font-style:italic;">{{props.row.createdAt}}</span></span><br/><br/>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
      <h6 v-else style="margin:0px;">No tienes postulaciones</h6>
    </q-card-section>
  </q-card>
</template>

<script>
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
    // return fecha.toLocaleDateString()
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
      const { data } = await this.$axios.get(`postulaciones?id_aspirante=${id_aspirante}&$sort[createdAt]=-1`, {
        params: {
          $eager: '[vacante, aspirante]',
          $joinRelation: '[vacante, aspirante]'
        }
      })
      this.items = data.data.map(i => ({
        ...i,
        createdAt: myDateFormat(i.createdAt.replace(/-/g, '/').split('T')[0]),
        id_organizacion: i.vacante.id_organizacion,
        nombre_vacante: i.vacante.nombre_vacante,
        nombre_orga: ''
      }))
      for (let index = 0; index < this.items.length; index++) {
        var { data: organizacion } = await this.$axios.get('organizaciones', { params: { id: this.items[index].id_organizacion } })
        this.items[index].nombre_orga = organizacion.data[0].nombre_orga
      }
      if (this.items.length === 0) this.items = null
    }
  }
}
</script>
