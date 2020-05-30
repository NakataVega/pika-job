<template>
  <q-card v-if="$store.state.user.id_aspirante">
    <q-card-section>
      <h6 style="margin:0px">Editar formación académica</h6>
      <q-form @submit="onSubmit" class="q-gutter-md" style="margin-top:10px;">
        <div class="q-gutter-md row items-start">
          <q-input
            outlined autogrow
            v-model="programa"
            label="Programa educativo *"
            hint="Ej: Licienciatura en informática, Bachillerato general, Maestría en etc."
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el nombre del programa educativo']"
            style="min-width:300px;"
          />
          <q-input
            outlined autogrow
            v-model="institucion"
            label="Institución *"
            hint="Institución donde se cursó el programa"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el nombre de la institución']"
            style="min-width:300px;"
          />
          <q-input v-model="fecha_inicio" mask="date" outlined label="Fecha inicio" style="min-width:300px;">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="fecha_inicio" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-checkbox v-model="checkbox1" label="Actualmente estudio aqui" color="yellow-14" style="min-width:300px;"/>
          <q-input v-model="fecha_fin"
            mask="date" outlined
            label="Fecha fin" style="min-width:300px;"
            v-if="!checkbox1"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="fecha_fin" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-checkbox v-if="!checkbox1" v-model="checkbox2" label="Certificado/Titulado" color="yellow-14" style="min-width:300px;"/>
        </div>
        <div class="q-gutter-md row items-start">
          <q-btn label="Guardar formación" type="submit" class="bg-yellow-14" style="min-width:300px"/>
          <q-btn
            label="Volver atrás"
            type="button" class="bg-grey-9 text-yellow-14"
            style="min-width:300px" to=".."
          />
          <q-btn icon="delete" type="button" class="bg-red-9 text-white" style="float: right" @click="confirm = true">
              <q-tooltip class="bg-black text-white">Eliminar</q-tooltip>
            </q-btn>

            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="warning" color="yellow-14" text-color="grey-9" />
                  <span class="q-ml-sm">¿Estas seguro que deseas eliminar esta experiencia laboral?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="No" color="grey-9" v-close-popup/>
                  <q-btn flat label="Si" color="grey-9" v-close-popup @click="eliminar()"/>
                </q-card-actions>
              </q-card>
            </q-dialog>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    return {
      programa: this.programa,
      institucion: this.institucion,
      fecha_inicio: moment().format('YYYY-MM-DD'),
      checkbox1: true,
      fecha_fin: moment().format('YYYY-MM-DD'),
      checkbox2: false,
      confirm: false
    }
  },
  methods: {
    async eliminar () {
      const id = this.$route.params.id
      const { id_aspirante } = this.$store.state.user
      const { data } = await this.$axios.delete(`/formaciones-academicas/${id}?id_user=${id_aspirante}`)
      if (!data) {
        this.$router.push('..')
        this.$q.notify({
          position: 'top',
          group: false,
          timeout: 2500,
          message: 'Algo salió mal...'
        })
      }
      this.$router.push('..')
    },
    async onSubmit () {
      const id = this.$route.params.id
      const { id_aspirante } = this.$store.state.user
      if (this.checkbox1) {
        this.fecha_fin = null
        this.checkbox2 = false
      } else {
        this.fecha_fin = new Date(this.fecha_fin)
        this.fecha_fin = this.fecha_fin.getFullYear() + '/' + (this.fecha_fin.getMonth() + 1).toString().padStart(2, '0') + '/' + this.fecha_fin.getDate().toString().padStart(2, '0')
      }
      this.checkbox2 ? this.checkbox2 = 1 : this.checkbox2 = 0
      const { data } = await this.$axios.patch(`/formaciones-academicas/${id}`, {
        id_user: id_aspirante,
        titulo_formacion: this.programa,
        institucion: this.institucion,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        certificado: this.checkbox2
      })
      console.log(data)
      this.$q.notify({
        position: 'top',
        group: false,
        timeout: 2500,
        message: '¡Cambios realizados!'
      })
      this.$router.push('..')
    }
  },
  async mounted () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    else {
      const id = this.$route.params.id
      const { id_aspirante } = this.$store.state.user
      const { data } = await this.$axios.get(`/formaciones-academicas/${id}?id_user=${id_aspirante}`)
      if (!data) {
        this.$router.push('..')
        this.$q.notify({
          position: 'top',
          group: false,
          timeout: 2500,
          message: 'Algo salió mal...'
        })
      }
      this.programa = data.titulo_formacion
      this.institucion = data.institucion
      this.fecha_inicio = data.fecha_inicio
      if (!data.fecha_fin) this.fecha_fin = moment().format('YYYY-MM-DD')
      else this.fecha_fin = data.fecha_fin
      data.fecha_fin ? this.checkbox1 = false : this.checkbox1 = true
      data.certificado ? this.checkbox2 = true : this.checkbox2 = false
    }
  }
}
</script>
