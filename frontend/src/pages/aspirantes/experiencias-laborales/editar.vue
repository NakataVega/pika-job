
<template>
  <q-card v-if="$store.state.user.id_aspirante">
    <q-card-section>
      <h6 style="margin:0px">Editar experiencia laboral</h6>
      <q-form @submit="onSubmit" class="q-gutter-md" style="margin-top:10px;">
        <div class="q-gutter-md row items-start">
          <q-input
            outlined autogrow
            v-model="organizacion"
            label="Empresa u organización *"
            hint="Nombre de la empresa u organización"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el nombre de la organización']"
            style="min-width:300px;"
          />

          <q-input
            outlined autogrow
            v-model="cargo"
            label="Cargo *"
            hint="Cargo desempeñado en la organización"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el cargo desempeñado en la organización']"
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

          <q-checkbox v-model="checkbox" label="Actualmente trabajo aqui" color="yellow-14" style="min-width:300px;"/>

          <q-input v-model="fecha_fin"
            mask="date" outlined
            label="Fecha fin" style="min-width:300px;"
            v-if="!checkbox"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="fecha_fin" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            outlined
            autogrow
            style="min-width:300px"
            v-model="funciones"
            label="Funciones y actividades"
            hint="Describe aqui las funciones y actividades que desempeñabas en esta empresa"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese una descripción de sus actividades en esta organización']"
          />
        </div>

        <div class="q-gutter-md row items-start">
            <q-btn label="Guardar cambios" type="submit" class="bg-yellow-14" style="min-width:300px"/>
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
      organizacion: this.organizacion,
      cargo: this.cargo,
      fecha_inicio: moment().format('YYYY-MM-DD'),
      checkbox: true,
      fecha_fin: moment().format('YYYY-MM-DD'),
      funciones: this.funciones,
      confirm: false
    }
  },
  methods: {
    async eliminar () {
      const id = this.$route.params.id
      const { id_aspirante } = this.$store.state.user
      const { data } = await this.$axios.delete(`/experiencias-laborales/${id}?id_user=${id_aspirante}`)
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
      if (this.checkbox) this.fecha_fin = null
      else {
        this.fecha_fin = new Date(this.fecha_fin)
        this.fecha_fin = this.fecha_fin.getFullYear() + '/' + (this.fecha_fin.getMonth() + 1).toString().padStart(2, '0') + '/' + this.fecha_fin.getDate().toString().padStart(2, '0')
      }
      const { data } = await this.$axios.patch(`/experiencias-laborales/${id}`, {
        id_user: id_aspirante,
        titulo_expe: this.cargo,
        organizacion: this.organizacion,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        actividades: this.funciones
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
      const { data } = await this.$axios.get(`/experiencias-laborales/${id}?id_user=${id_aspirante}`)
      if (!data) {
        this.$router.push('..')
        this.$q.notify({
          position: 'top',
          group: false,
          timeout: 2500,
          message: 'Algo salió mal...'
        })
      }
      this.organizacion = data.organizacion
      this.cargo = data.titulo_expe
      this.fecha_inicio = data.fecha_inicio
      this.fecha_fin = data.fecha_fin
      this.funciones = data.actividades
      if (!data.fecha_fin) this.fecha_fin = moment().format('YYYY-MM-DD')
      else this.fecha_fin = data.fecha_fin
      if (data.fecha_fin) this.checkbox = false
    }
  }
}
</script>
