<template>
  <q-card>
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

          <q-input
            outlined
            v-model="email"
            label="Correo electrónico *"
            hint="Correo electrónico"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese su correo electrónico']"
            style="min-width:300px"
          />

          <q-input outlined label='Contraseña' v-model="password" :type="!showPassword ? 'password' : 'text'" hint="Contraseña"
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

          <q-input v-model="birth" mask="date" outlined label="Fecha de nacimiento" style="min-width:300px;">
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
            label="Conocimientos"
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

        <q-btn label="Actualizar información" type="submit" color="primary" style="min-width:300px"/>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      firstName: this.firstName,
      lastName1: this.lastName1,
      lastName2: this.lastName2,
      email: '',
      password: '',
      phone: this.phone,
      birth: this.birth,
      city: this.city,
      state: this.state,
      country: this.country,
      knowledge: this.knowledge,
      references: this.references,
      showPassword: false
    }
  },
  methods: {
    async onSubmit () {
      const { id_aspirante } = this.$store.state.user
      const { data } = await this.$axios.patch(`/aspirantes/${id_aspirante}`, {
        apellido_paterno: this.lastName1,
        apellido_materno: this.lastName2,
        nombre: this.firstName,
        telefono: this.phone,
        fecha_naci: this.birth,
        ciudad: this.city,
        estado: this.state,
        pais: this.country,
        conocimientos: this.knowledge,
        referencias: this.references
      })
      console.log(data)
      const { data: user } = await this.$axios.patch(`/users/${this.$store.state.user.id}`, {
        email: this.email,
        ...(this.password && { password: this.password })
      })
      console.log(user)
      this.$store.commit('setState', { user })
    }
  },
  async mounted () {
    const { data } = await this.$axios.get(`/aspirantes/${this.$store.state.user.id_aspirante}`)
    this.firstName = data.nombre
    this.lastName1 = data.apellido_paterno
    this.lastName2 = data.apellido_materno
    this.email = this.$store.state.user.email
    this.phone = data.telefono
    this.birth = data.fecha_naci
    this.city = data.ciudad
    this.state = data.estado
    this.country = data.pais
    this.knowledge = data.conocimientos
    this.references = data.referencias
    this.showPassword = false
  }
}
</script>
