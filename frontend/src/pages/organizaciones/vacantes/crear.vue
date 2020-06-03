<template>
  <q-card v-if="$store.state.user.id_organizacion">
    <q-card-section>
      <h6 style="margin:0px">Datos de la vacante</h6>
      <q-form @submit="onSubmit" class="q-gutter-md" style="margin-top:10px;">
        <div class="q-gutter-md row items-start">
          <q-input
            outlined autogrow
            v-model="nombre_vacante"
            label="Nombre de la vacante *"
            hint="Ej: Programador, Administrador de redes, etc."
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el nombre de la vacante']"
            style="min-width:300px;"
          />
          <q-input
            outlined autogrow
            v-model="lugar"
            label="Lugar de la vacante *"
            hint="Ej: Guadalajara, Jalisco. Zapopan, Jalisco. etc,"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el lugar de la vacante']"
            style="min-width:300px;"
          />
          <q-input
            outlined autogrow
            v-model="sueldo"
            label="Sueldo mensual *"
            hint="Puede poner 0.00 para mantener oculto al momento de mostrar"
            lazy-rules
            :rules="[ val => val && val.length > 3 && val[0] !== '#' || 'Ingrese el sueldo']"
            style="min-width:300px;"
            mask="#.##"
            fill-mask="#"
            reverse-fill-mask
            input-class="text-right"
            prefix="$ "
          />
        </div>
        <div class="q-gutter-md">
          <q-input
            outlined
            autogrow
            style="min-width:300px"
            v-model="descripcion"
            label="Descripción de la vacante"
            hint="Escriba aquí las actividades que se realizan en la vacante"
            lazy-rules
            :rules="[ val => val && val.length > 50 || 'Debe contener al menos 50 caracteres']"
          />
          <q-input
            outlined
            autogrow
            style="min-width:300px"
            v-model="requisitos"
            label="Requisitos"
            hint="Escriba aquí los requisitos para la vacante"
            lazy-rules
            :rules="[ val => val && val.length > 50 || 'Debe contener al menos 50 caracteres']"
          />
        </div>
        <div class="q-gutter-md row items-start">
          <q-btn label="Publicar vacante" type="submit" class="bg-yellow-14" style="min-width:300px"/>
          <q-btn
            label="Volver atrás"
            type="button" class="bg-grey-9 text-yellow-14"
            style="min-width:300px" to="/tus-vacantes"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
// import moment from 'moment'
export default {
  data () {
    if (!this.$store.state.user.id_organizacion) this.$router.push('/404')
    return {
      nombre_vacante: this.nombre_vacante,
      lugar: this.lugar,
      sueldo: this.sueldo,
      descripcion: this.descripcion,
      requisitos: this.requisitos
    }
  },
  methods: {
    async onSubmit () {
      const { id_organizacion } = this.$store.state.user
      const { data } = await this.$axios.post('/vacantes', {
        id_organizacion: id_organizacion,
        nombre_vacante: this.nombre_vacante.trim(),
        lugar: this.lugar.trim(),
        sueldo: this.sueldo.trim(),
        descripcion: this.descripcion.trim(),
        requisitos: this.requisitos.trim(),
        activo: 1
      })
      console.log(data)
      this.$q.notify({
        position: 'top',
        group: false,
        timeout: 2500,
        message: '¡Vacante publicada!'
      })
      this.$router.push('/tus-vacantes')
    }
  }
}
</script>
