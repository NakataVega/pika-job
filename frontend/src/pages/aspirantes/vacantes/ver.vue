<template>
  <q-card v-if="$store.state.user.id_aspirante">
    <q-card-section>
      <h5 style="margin: 0px; font-weight: bold;">{{this.nombre_vacante}}</h5>
      <q-item-label style="margin: 0px; font-style: italic; font-size: 16px;">{{this.organizacion}}</q-item-label>
      <q-item-label v-if="this.sueldo !== '0.00' && this.sueldo !== ''"
        style="margin: 5px 0px; font-style: italic; float: right; font-size: 20px;"
      >
        $ {{this.sueldo}} mensuales
      </q-item-label><br>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <h6 style="margin: 0px; font-weight: bold;">Descripción</h6>
      <p v-for="desc in this.descripcion" :key="desc.id" style="margin: 0px">
        {{ desc }} <br>
      </p>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <h6 style="margin: 0px; font-weight: bold;">Requisitos</h6>
      <p v-for="requ in this.requisitos" :key="requ.id" style="margin: 0px">
        {{ requ }} <br>
      </p>
      <div class="q-gutter-md row items-start" style="margin-top: 10px;">
        <q-btn
          label="Volver atrás"
          type="button" class="bg-grey-9 text-yellow-14"
          style="min-width:300px" :to="'/aspirante/vacantes'"
        />
        <q-btn v-if="!this.postulado" label="Postularse" type="button"
          class="bg-yellow-14" style="min-width:300px" @click="confirm = true"
        />
        <q-item-label v-else style="font-weight: bold;">
          Ya te has postulado recientemente a esta vacante, revisa tus postulaciones.
          <br>Para postularte nuevamente, deben transcurrir 7 días desde tu última postulación.
        </q-item-label>
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="help" color="yellow-14" text-color="grey-9" />
              <span class="q-ml-sm">¿Estas seguro de postularte a esta vacante?</span>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="No" color="grey-9" v-close-popup/>
              <q-btn flat label="Si" color="grey-9" v-close-popup @click="postularse()"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment'
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
      postulado: false,
      nombre_vacante: '',
      organizacion: '',
      sueldo: '',
      descripcion: '',
      requisitos: '',
      confirm: false
    }
  },
  methods: {
    async postularse () {
      const id = this.$route.params.id
      const { id_aspirante } = this.$store.state.user
      // const fecha = moment().format('YYYY-MM-DD')
      const { data } = await this.$axios.post('/postulaciones', {
        id_aspirante: id_aspirante,
        id_vacante: id,
        status: 1
      })
      console.log(data)
      this.$q.notify({
        position: 'top',
        group: false,
        timeout: 2500,
        message: '¡Postulación enviada!'
      })
      this.$router.push('/aspirante/vacantes')
    }
  },
  async mounted () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    else {
      const id = this.$route.params.id
      const { id_aspirante } = this.$store.state.user
      var { data: vacante } = await this.$axios.get('vacantes?$eager=organizacion', { params: { activo: 1, id: id } })
      vacante = vacante.data[0]
      if (!vacante) {
        this.$router.push('/aspirante/vacantes')
        this.$q.notify({
          position: 'top',
          group: false,
          timeout: 2500,
          message: 'Algo salió mal...'
        })
      } else {
        vacante.updatedAt = myDateFormat(vacante.updatedAt.replace('-', '/').split('T')[0])
        this.nombre_vacante = vacante.nombre_vacante
        this.organizacion = vacante.organizacion.nombre_orga
        this.sueldo = vacante.sueldo
        this.descripcion = vacante.descripcion.split('\n')
        this.requisitos = vacante.requisitos.split('\n')
        // Verificar si no se ha postulado en los ultimos 14 dias
        // Obtener postulacion más reciente
        var { data: postulacion } = await this.$axios.get(`postulaciones?id_vacante=${id}&id_aspirante=${id_aspirante}&$sort[id]=-1&$limit=1`)
        postulacion = postulacion.data[0]
        if (!postulacion) this.postulado = false
        else {
          const fechaPostu = moment(new Date(postulacion.createdAt))
          const dias = Math.abs(fechaPostu.diff(new Date(), 'days'))
          if (dias < 7) this.postulado = true
        }
      }
    }
  }
}
</script>
