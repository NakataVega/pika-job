<template>
  <q-card v-if="$store.state.user.id_aspirante">
    <q-card-section>
      <h6>Edita tu información personal y de contacto, esto es importante para los reclutadores :)</h6>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="q-gutter-md row items-start">
          <q-input
            outlined
            v-model="firstName"
            label="Nombre(s) *"
            hint="Nombre o nombres"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese su(s) nombre(s)']"
            style="min-width:300px"
          />

          <q-input
            outlined
            v-model="lastName1"
            label="Apellido paterno *"
            hint="Apellido paterno"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese su apellido paterno']"
            style="min-width:300px"
          />

          <q-input
            outlined
            v-model="lastName2"
            label="Apellido materno"
            hint="Apellido materno"
            style="min-width:300px"
          />

          <!--q-input
            outlined
            v-model="email"
            label="Correo electrónico *"
            hint="Correo electrónico"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese su correo electrónico']"
            style="min-width:300px"
          /-->

          <q-input outlined label='Nueva contraseña' v-model="password" :type="!showPassword ? 'password' : 'text'" hint="Si desea cambiar la contraseña, ingresela aquí"
            style="min-width:300px;"
          >
            <template v-slot:append>
            <q-icon
                :name="!showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
            />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="phone"
            mask="(###) ### - ####"
            label="Teléfono / Celular"
            hint="Teléfono / Celular"
            style="min-width:300px"
          />

          <q-input v-model="birth" mask="date" outlined label="Fecha de nacimiento" style="min-width:300px;"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese su fecha de nacimiento']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="birth" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            outlined
            v-model="city"
            label="Ciudad"
            hint="Ciudad"
            style="min-width:300px"
          />

          <q-input
            outlined
            v-model="state"
            label="Estado"
            hint="Estado"
            style="min-width:300px"
          />

          <q-input
            outlined
            v-model="country"
            label="Pais"
            hint="Pais"
            style="min-width:300px"
          />

        </div>
        <div class="q-gutter-md">
          <q-input
            outlined
            autogrow
            style="min-width:300px"
            v-model="knowledge"
            label="Conocimientos y habilidades"
            hint="Escribe aqui tus actitudes y aptitudes que consideres que el reclutador deba saber :)"
          />
          <q-input
            outlined
            autogrow
            style="min-width:300px"
            v-model="references"
            label="Referencias"
            hint="Referencias"
          />
        </div>
        <div class="q-gutter-md row items-start">
          <q-file
            outlined style="width:300px" use-chips
            v-model="image" label="Foto de perfíl" accept=".jpg, .jpeg, .png" max-files="1"
          />
          <div>
            <img :src="'/uploads/' + imagen" style="width:200px;">
          </div>
        </div>
        <q-btn label="Actualizar información" type="submit" class="bg-yellow-14 text-grey-9" style="min-width:300px"/>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    return {
      firstName: this.firstName,
      lastName1: this.lastName1,
      lastName2: this.lastName2,
      // email: '',
      password: '',
      phone: this.phone,
      birth: this.birth,
      city: this.city,
      state: this.state,
      country: this.country,
      knowledge: this.knowledge,
      references: this.references,
      image: null,
      showPassword: false,
      imagen: '0.png'
    }
  },
  methods: {
    async onSubmit () {
      const formData = new FormData()
      formData.append('apellido_paterno', this.lastName1.trim())
      formData.append('apellido_materno', this.lastName2.trim() || '')
      formData.append('nombre', this.firstName.trim())
      formData.append('telefono', this.phone || '')
      formData.append('fecha_naci', this.birth)
      formData.append('ciudad', this.city.trim() || '')
      formData.append('estado', this.state.trim() || '')
      formData.append('pais', this.country.trim() || '')
      formData.append('conocimientos', this.knowledge.trim() || '')
      formData.append('referencias', this.references.trim() || '')
      if (this.image) formData.append('imagen', this.image)
      const { id_aspirante } = this.$store.state.user
      const { data } = await this.$axios.patch(`/aspirantes/${id_aspirante}`, formData)
      if (this.image) this.imagen = data.imagen
      this.lastName1 = data.apellido_paterno
      this.lastName2 = data.apellido_materno
      this.firstName = data.nombre
      this.phone = data.telefono
      this.city = data.ciudad
      this.state = data.estado
      this.country = data.pais
      this.knowledge = data.conocimientos
      this.references = data.referencias
      /* const { data } = await this.$axios.patch(`/aspirantes/${id_aspirante}`, {
        apellido_paterno: this.lastName1,
        apellido_materno: this.lastName2,
        nombre: this.firstName,
        telefono: this.phone,
        fecha_naci: this.birth,
        ciudad: this.city,
        estado: this.state,
        pais: this.country,
        conocimientos: this.knowledge,
        referencias: this.references,
        imagen: this.image
      }) */
      const { data: user } = await this.$axios.patch(`/users/${this.$store.state.user.id}`, {
        // email: this.email.trim(),
        ...(this.password && { password: this.password })
      })
      // this.email = user.email
      this.password = ''
      this.$store.commit('setState', { user })
      this.$q.notify({
        position: 'bottom-right',
        group: false,
        timeout: 2500,
        message: '¡Cambios realizados!'
      })
    }
  },
  async mounted () {
    if (!this.$store.state.user.id_aspirante) this.$router.push('/404')
    else {
      const { data } = await this.$axios.get(`/aspirantes/${this.$store.state.user.id_aspirante}`)
      this.firstName = data.nombre
      this.lastName1 = data.apellido_paterno
      this.lastName2 = data.apellido_materno || ''
      // this.email = this.$store.state.user.email
      this.phone = data.telefono || ''
      this.birth = data.fecha_naci
      this.city = data.ciudad || ''
      this.state = data.estado || ''
      this.country = data.pais || ''
      this.knowledge = data.conocimientos || ''
      this.references = data.referencias || ''
      this.showPassword = false
      this.imagen = data.imagen || '0.png'
    }
  }
}
</script>
