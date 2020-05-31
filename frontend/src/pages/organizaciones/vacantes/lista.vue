<template>
  <q-card v-if="$store.state.user.id_organizacion">
    <q-card-section>
      <h6 style="margin:0px">Aquí puedes gestionar tus vacantes publicadas</h6>
      <q-btn label="Agregar vacante" icon="add_box" style="margin-top: 10px;"
        type="button" class="bg-yellow-14" to="tus-vacantes/crear" append
      />
    </q-card-section>
    <q-card-section>
      <q-table v-if="items"
        grid
        title="Tus vacantes"
        :data="items"
        :columns="columns"
        hide-header hide-bottom
      >
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <div v-if="props.row.activo === 1" style="position: absolute; margin: 10px; padding:2px 6px; border-radius: 5px;" class="bg-yellow-14">
                <q-icon size="sm" name="done"/> Activa
              </div>
              <div v-else style="position: absolute; margin: 10px; padding:2px 6px; border-radius: 5px;" class="bg-red-7 text-white">
                <q-icon size="sm" name="cancel_presentation"/> No activa
              </div>
              <br>
              <q-card-section class="text-center">
                <strong style="font-size: 20px">{{ props.row.nombre_vacante }}</strong>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <i>Publicada: {{props.row.createdAt}}</i><br>
                <i v-if="props.row.updatedAt !== props.row.createdAt">Actualizada: {{props.row.updatedAt}}<br></i>
                <q-icon size="xs" name="place"/><i>{{props.row.lugar}}</i><br>
                <q-icon size="xs" name="attach_money"/><i style="font-weight:bold;">{{props.row.sueldo}}</i>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <strong>Descripción</strong><br>
                <p v-for="desc in props.row.descripcion" :key="desc" style="margin: 0px">
                  {{ desc }}
                </p>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <strong>Requisitos</strong><br>
                <p v-for="requisito in props.row.requisitos" :key="requisito" style="margin: 0px">
                  {{ requisito }}
                </p>
              </q-card-section>
              <q-card-section class="q-pa-md q-gutter-sm">
                <q-btn icon="edit" label="Editar" type="button" class="bg-grey-9 text-yellow-14" :to="'tus-vacantes/editar/' + props.row.id">
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
      this.items = data.data.map(i => ({
        ...i,
        descripcion: i.descripcion.split('\n'),
        requisitos: i.requisitos.split('\n'),
        createdAt: myDateFormat(i.createdAt.split('T')[0]),
        updatedAt: myDateFormat(i.updatedAt.split('T')[0])
      }))
      if (this.items.length === 0) this.items = null
    }
  }
}
</script>
