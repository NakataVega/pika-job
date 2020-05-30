<template>
  <q-card class="bg-grey-4" v-if="!$store.state.user || (!$store.state.user.id_aspirante && !$store.state.user.id_organizacion)">
    <q-card-section>
      <img
        alt="Pika-job logo"
        src="~assets/pikajob-logo.png"
        style="max-height: 2oopx; max-width: 50%; margin-left: auto; margin-right:auto; display: block;"
      >
      <h4 style="margin-top: 5px;">Crear cuenta</h4>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        autocomplete="new-password"
      >
        <q-input
          outlined
          v-model="firstName"
          label="Nombre(s) *"
          hint="Nombre o nombres"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese su(s) nombre(s)']"
        />

        <q-input
          outlined
          v-model="lastName1"
          label="Apellido paterno *"
          hint="Apellido paterno"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese su apellido paterno']"
        />

        <q-input
          outlined
          v-model="lastName2"
          label="Apellido materno"
          hint="Apellido materno"
        />

        <q-input
          outlined
          v-model="email"
          label="Correo electrónico *"
          hint="Correo electrónico"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese su correo electrónico']"
        />

        <q-input outlined label='Contraseña' v-model="password" :type="!showPassword ? 'password' : 'text'" hint="Contraseña"
          :rules="[ val => val && val.length > 0 || 'Ingrese su contraseña']"
          >
          <template v-slot:append>
          <q-icon
              :name="!showPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPassword = !showPassword"
          />
          </template>
        </q-input>

        <div class="q-pa-md q-gutter-sm">
          <q-btn label="Ya tengo cuenta" type="button" class="bg-grey-9 text-yellow-14" to="/login"/>
          <q-btn label="Registrarme" type="submit" class="bg-yellow-14"/>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
function mailValido (mail) {
  if (mail.includes(' ')) return false
  var subs = mail.split('@')
  if (subs.length !== 2) return false
  if (subs[0].length === 0 || subs[1].length === 0) return false
  return true
}
export default {
  // name: 'LayoutName',
  data () {
    if (this.$store.state.user && (this.$store.state.user.id_aspirante || this.$store.state.user.id_organizacion)) this.$router.push('/')
    return {
      firstName: '',
      lastName1: '',
      lastName2: '',
      password: '',
      email: '',
      showPassword: false
    }
  },
  methods: {
    async onSubmit () {
      this.email = this.email.trim()
      if (mailValido(this.email)) {
        const { data: user, error } = await this.$axios.post('/users', {
          nombre: this.firstName,
          apellido_paterno: this.lastName1,
          apellido_materno: this.lastName2,
          email: this.email.trim(),
          password: this.password
        })
        if (error && error.response && error.response.data) {
          this.$q.notify({
            type: 'negative',
            position: 'top-right',
            group: false,
            timeout: 2500,
            message: error.response.data.errors.email
          })
        }
        if (!user) return
        const { data } = await this.$axios.post('/authentication', {
          strategy: 'local',
          email: this.email,
          password: this.password
        })
        if (data) {
          const { accessToken: token, user } = data
          this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
          await this.$store.dispatch('login', { user, token, userId: user.id })
          this.$router.push('/')
        }
      } else {
        this.$q.notify({
          type: 'negative',
          position: 'top-right',
          group: false,
          timeout: 2500,
          message: 'Ingrese una dirección de correo válida'
        })
      }
    }
  }
}
</script>
