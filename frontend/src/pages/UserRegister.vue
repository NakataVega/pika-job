<template>
  <q-page padding>
    <!-- content -->

    <h3>Crear cuenta</h3>
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
        <q-btn label="Registrarme" type="submit" color="primary"/>
        <q-btn label="Ya tengo una cuenta" type="button" color="secondary" to="../login"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
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
      const { data: user, error } = await this.$axios.post('/users', {
        nombre: this.firstName,
        apellido_paterno: this.lastName1,
        apellido_materno: this.lastName2,
        email: this.email,
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
    }
  }
}
</script>
