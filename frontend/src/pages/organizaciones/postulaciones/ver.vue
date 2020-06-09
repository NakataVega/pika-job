<template>
  <q-card v-if="$store.state.user.id_organizacion && info">
    <q-btn label="Volver atrás" type="button" class="bg-grey-9 text-yellow-14" style="min-width:100px; float: right; margin: 15px; z-index: 1;"
      :to="'/organizacion/postulaciones'"
    />
    <q-card-section style="margin-bottom: 0px;">
      <p style="margin: 0px; font-size: 18px;">Postulación para vacante: <strong>{{this.nombre_vacante}}</strong></p>
      <p style="margin: 0px; font-size: 18px;">Fecha de postulación: <span style="font-style: italic">{{this.fecha}}</span></p>
      <h5 style="margin: 0px; font-weight: bold;">Curriculum del aspirante:</h5>
    </q-card-section>
    <q-card-section style="margin-top: 0px;" v-if="datoPers" class="row items-start">
      <q-card-section class="col-md-4 col-sm-12 row items-start">
        <div class="col-md-12 col-sm-6 col-xs-12" style="overflow:hidden; position: relative;">
          <img :src="'/uploads/' + this.imagen" style="width:100%">
          <div style="position:absolute; left:0; bottom:0; padding:16px;">
            <q-item-label
              class="text-white" style="background-color:rgba(13,13,13,0.6); margin:0px; padding:7px; font-size:24px; font-weight:bold;">
              {{datoPers.nombre}} {{datoPers.apellido_paterno}} {{datoPers.apellido_materno}}
            </q-item-label>
          </div>
        </div>
        <div class="col-md-12 col-sm-6 col-xs-12" style="padding:5px;font-weight:bold; font-size: 18px;">
          <q-item v-if="datoPers.ciudad || datoPers.estado || datoPers.pais">
            <q-icon size="sm" class="text-yellow-14" name="place" style="margin-right: 5px"/> {{this.localidad}}
          </q-item>
          <q-item v-if="datoPers.telefono">
            <q-icon size="sm" class="text-yellow-14" name="phone" style="margin-right: 5px"/> {{datoPers.telefono}}
          </q-item>
          <q-item v-if="this.email">
            <q-icon size="sm" class="text-yellow-14" name="mail" style="margin-right: 5px"/> {{this.email}}
          </q-item>
          <div v-if="datoPers.conocimientos">
            <hr>
            <h5 style="margin:0px;font-weight:bold;"><q-icon size="md" class="text-yellow-14" name="assessment"/> Conocimientos y habilidades</h5>
            <hr>
            <div style="padding: 0px 10px;">
              <p style="font-size:14px; font-style:italic; font-weight:normal; margin:0px;"
                v-for="conocimiento in datoPers.conocimientos" :key="conocimiento">{{conocimiento}}
              </p>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="col-md-8 col-sm-12">
        <div v-if="experiencias">
          <hr>
          <h5 style="margin: 0px; font-weight:bold;"><q-icon size="md" class="text-yellow-14" name="business_center"/> Experiencia laboral</h5>
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
          <h5 style="margin: 0px; font-weight:bold;"><q-icon size="md" class="text-yellow-14" name="school"/> Formación académica</h5>
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
        <div v-if="datoPers.referencias">
          <hr>
          <h5 style="margin:0px;font-weight:bold;"><q-icon size="md" class="text-yellow-14" name="import_contacts"/> Referencias</h5>
          <hr>
          <div style="padding: 0px 10px;">
            <p style="font-size:14px; font-style:italic; font-weight:normal; margin:0px;"
              v-for="referencia in datoPers.referencias" :key="referencia">{{referencia}}
            </p>
          </div>
        </div>
      </q-card-section>
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
      info: null,
      nombre_vacante: null,
      fecha: null,
      datoPers: null,
      email: null,
      experiencias: null,
      formaciones: null,
      imagen: '0.png',
      localidad: ''
    }
  },
  async mounted () {
    if (!this.$store.state.user.id_organizacion) this.$router.push('/404')
    else {
      const id = this.$route.params.id
      const { data } = await this.$axios.get(`postulaciones/${id}`, {
        params: {
          $eager: '[vacante, aspirante]',
          $joinRelation: '[vacante, aspirante]',
          'vacante.id_organizacion': this.$store.state.user.id_organizacion
        }
      })
      if (!data) {
        this.$router.push('/organizacion/postulaciones')
        this.$q.notify({
          position: 'top',
          group: false,
          timeout: 2500,
          message: 'Algo salió mal...'
        })
      } else {
        if (data.status === 1) {
          await this.$axios.patch(`/postulaciones/${id}`, {
            status: 2
          })
          this.$store.commit('setState', { postulacionesNuevas: this.$store.state.postulacionesNuevas - 1 })
        }
        this.info = data
        this.nombre_vacante = this.info.vacante.nombre_vacante
        this.fecha = myDateFormat(this.info.createdAt.replace(/-/g, '/').split('T')[0])
        // LIMPIAR DATOS PERSONALES
        this.datoPers = this.info.aspirante
        if (this.datoPers.ciudad === '') this.datoPers.ciudad = null
        else this.localidad = this.localidad + this.datoPers.ciudad + ', '
        if (this.datoPers.estado === '') this.datoPers.estado = null
        else this.localidad = this.localidad + this.datoPers.estado + ', '
        if (this.datoPers.pais === '') this.datoPers.pais = null
        else this.localidad = this.localidad + this.datoPers.pais + '.'
        if (this.datoPers.conocimientos === '' || !this.datoPers.conocimientos) this.datoPers.conocimientos = null
        else this.datoPers.conocimientos = this.datoPers.conocimientos.split('\n')
        if (this.datoPers.fecha_naci === '') this.datoPers.fecha_naci = null
        if (this.datoPers.referencias === '' || !this.datoPers.referencias === '') this.datoPers.referencias = null
        else this.datoPers.referencias = this.datoPers.referencias.split('\n')
        if (this.datoPers.telefono === '') this.datoPers.telefono = null
        if (this.datoPers.imagen === '' || !this.datoPers.imagen) this.datoPers.imagen = '0.png'
        else this.imagen = this.datoPers.imagen
        // obtener la demas informacion
        const id_aspirante = this.info.aspirante.id
        // Experiencias
        const { data: experiencias } = await this.$axios.get(`experiencias-laborales?id_user=${id_aspirante}&$sort[fecha_inicio]=-1`)
        this.experiencias = experiencias.data.map(i => ({
          ...i,
          fecha_inicio: myDateFormat(i.fecha_inicio),
          fecha_fin: myDateFormat(i.fecha_fin),
          actividades: i.actividades.replace(/\n/ig, '\n').split('\n')
        }))
        if (this.experiencias.length === 0) this.experiencias = null
        // Formaciones
        const { data: formaciones } = await this.$axios.get(`formaciones-academicas?id_user=${id_aspirante}&$sort[fecha_inicio]=-1`)
        this.formaciones = formaciones.data.map(i => ({
          ...i,
          fecha_inicio: myDateFormat(i.fecha_inicio),
          fecha_fin: myDateFormat(i.fecha_fin),
          certificado: Boolean(Number(i.certificado))
        }))
        if (this.formaciones.length === 0) this.formaciones = null
        // Obtener email
        const { data: email } = await this.$axios.get(`users?id_aspirante=${id_aspirante}`)
        this.email = email.data[0].email
      }
    }
  }
}
</script>
