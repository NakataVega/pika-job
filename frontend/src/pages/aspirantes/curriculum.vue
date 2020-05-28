<template>
  <q-card>
    <q-card-section>
      <h4 style="margin: 0px; font-weight:bold;">Tu curriculum</h4>
      <h6 style="margin: 0px;">Así es como los reclutadores verán toda tu información :)</h6>
    </q-card-section>
    <q-card-section>
      <div v-if="experiencias">
        <hr>
        <h5 style="margin: 0px; font-weight:bold;">Experiencia laboral</h5>
        <hr>
        <q-list>
          <q-item v-for="experiencia in experiencias" :key="experiencia.id">
            <q-item-section>
              <q-item-label style="margin: 5px; font-size: 20px; font-weight:bold;"> {{ experiencia.organizacion}} </q-item-label>
              <q-item-label style="margin: 0px 15px; font-size: 16px; font-style: italic;">* {{ experiencia.titulo_expe}} </q-item-label>
              <q-item-label style="margin: 5px 15px; font-size: 14px;">
                <q-icon name="calendar_today"/>
                {{ experiencia.fecha_inicio }} - {{ experiencia.fecha_fin }}
              </q-item-label>
              <q-item-label style="margin: 0px 15px; font-size: 14px;">
                <strong>Actividades / funciones:</strong>
                <p v-for="actividad in experiencia.actividades" :key="actividad" style="margin: 0px">
                  {{ actividad }}
                </p>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-if="formaciones">
        <hr>
        <h5 style="margin: 0px; font-weight:bold;">Formación académica</h5>
        <hr>
        <q-list>
          <q-item v-for="formacion in formaciones" :key="formacion.id">
            <q-item-section>
              <q-item-label style="margin: 5px; font-size: 20px; font-weight:bold;"> {{ formacion.institucion }} </q-item-label>
              <q-item-label style="margin: 0px 15px; font-size: 16px; font-style: italic;">* {{ formacion.titulo_formacion}} </q-item-label>
              <q-item-label style="margin: 5px 15px; font-size: 14px;">
                <q-icon name="calendar_today"/>
                {{ formacion.fecha_inicio }} - {{ formacion.fecha_fin }}
              </q-item-label>
              <q-item-label v-if="formacion.certificado" style="margin: 5px 15px; font-size: 14px;">
                <q-icon class="text-yellow-14" style="margin-right: 5px;" name="stars"/>
                  <strong>Certificado/Titulado</strong>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
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
      datosPers: [],
      experiencias: null,
      formaciones: null,
      columns: []
    }
  },
  async mounted () {
    // Datos personales
    const { data } = await this.$axios.get(`/aspirantes/${this.$store.state.user.id_aspirante}`)
    console.log(data)
    // Experiencias
    const { data: experiencias } = await this.$axios.get(`experiencias-laborales?id_user=${this.$store.state.user.id_aspirante}&$sort[fecha_inicio]=-1`)
    this.experiencias = experiencias.data.map(i => ({
      ...i,
      fecha_inicio: myDateFormat(i.fecha_inicio),
      fecha_fin: myDateFormat(i.fecha_fin),
      actividades: i.actividades.replace(/\n/ig, '\n').split('\n')
    }))
    if (this.experiencias.length === 0) this.experiencias = null
    // Formaciones
    const { data: formaciones } = await this.$axios.get(`formaciones-academicas?id_user=${this.$store.state.user.id_aspirante}&$sort[fecha_inicio]=-1`)
    this.formaciones = formaciones.data.map(i => ({
      ...i,
      fecha_inicio: myDateFormat(i.fecha_inicio),
      fecha_fin: myDateFormat(i.fecha_fin),
      certificado: Boolean(Number(i.certificado))
    }))
    if (this.formaciones.length === 0) this.formaciones = null
  }
}
</script>
