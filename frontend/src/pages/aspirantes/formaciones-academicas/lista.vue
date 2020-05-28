<template>
  <q-card>
    <q-card-section>
      <h6 style="margin:0px">Aquí puedes gestionar tu formación académica, esta información sirve de referencia para los reclutadores :)</h6>
      <p>Tip: Se recomienda solo capturar estudios medio superiores y superiores</p>
      <q-btn label="Agregar formación" icon="add_box" style="margin-top: 10px;"
        type="button" class="bg-yellow-14" to="formaciones-academicas/crear" append
      />
    </q-card-section>
    <q-card-section>
      <div>
        <q-table v-if="items"
          grid
          title="Tu formación académica"
          :data="items"
          :columns="columns"
          hide-header hide-bottom
        >
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-4 col-md-4">
              <q-card>
                <q-card-section class="text-center">
                  <strong style="font-size: 20px">{{ props.row.institucion }}</strong>
                  <br />
                  {{ props.row.titulo_formacion }}
                </q-card-section>
                <q-separator />
                <q-card-section class="text-center">
                  <p style="margin:0px">{{ props.row.fecha_inicio }} - {{ props.row.fecha_fin }}</p>
                </q-card-section>
                <q-separator />
                <q-card-section class="text-center" v-if="props.row.certificado">
                  <q-icon class="text-yellow-14" style="margin-right:5px" name="stars"/>
                  <strong>Certificado/Titulado</strong>
                </q-card-section>
                <q-card-section class="q-pa-md q-gutter-sm">
                   <q-btn icon="edit" type="button" label="Editar" class="bg-grey-9 text-yellow-14" :to="'formaciones-academicas/editar/' + props.row.id">
                    <!--q-tooltip class="bg-black text-white">Editar</q-tooltip-->
                  </q-btn>
                  <!--q-btn icon="delete" type="button" class="bg-red-9 text-white" style="float: right">
                    <q-tooltip class="bg-black text-white">Eliminar</q-tooltip>
                  </q-btn-->
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
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
    return {
      items: [],
      columns: []
    }
  },
  async mounted () {
    const { data } = await this.$axios.get(`formaciones-academicas?id_user=${this.$store.state.user.id_aspirante}&$sort[fecha_inicio]=-1`)
    this.items = data.data.map(i => ({
      ...i,
      fecha_inicio: myDateFormat(i.fecha_inicio),
      fecha_fin: myDateFormat(i.fecha_fin),
      certificado: Boolean(Number(i.certificado))
    }))
    if (this.items.length === 0) this.items = null
  }
}
</script>
