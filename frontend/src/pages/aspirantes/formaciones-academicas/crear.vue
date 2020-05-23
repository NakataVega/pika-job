<template>
  <q-card>
    <q-card-section>
      <h6 style="margin:0px">Agregar nueva formación académica</h6>
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
          <q-input v-model="fecha_fin" mask="date" outlined label="Fecha fin" style="min-width:300px;" v-if="!checkbox1">
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
            style="min-width:300px" to="../formaciones-academicas"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      programa: this.programa,
      institucion: this.institucion,
      // fecha_inicio: new Date().getFullYear() + '/' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '/' + new Date().getDate(),
      fecha_inicio: moment().format('YYYY-MM-DD'),
      checkbox1: true,
      // fecha_fin: new Date().getFullYear() + '/' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '/' + new Date().getDate(),
      fecha_fin: moment().format('YYYY-MM-DD'),
      checkbox2: false
    }
  },
  methods: {
    async onSubmit () {
      const { id_aspirante } = this.$store.state.user
      if (this.checkbox1) {
        this.fecha_fin = null
        this.checkbox2 = false
      }
      this.checkbox2 ? this.checkbox2 = 1 : this.checkbox2 = 0
      const { data } = await this.$axios.post('/formaciones-academicas', {
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
        message: '¡Formación guardada!'
      })
      this.$router.push('../formaciones-academicas')
    }
  }
}
</script>
