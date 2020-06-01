<template>
  <q-card style="background-color: rgba(255,255,255,0.2)"
    v-if="!$store.state.user || (!$store.state.user.id_aspirante && !$store.state.user.id_organizacion)"
  >
    <q-card-section>
      <img
        alt="Pika-job logo"
        src="~assets/pikajob-logo.png"
        style="max-height: 2oopx; max-width: 50%; margin-left: auto; margin-right:auto; display: block;"
      >
      <br>
      <!--h3 style="margin-top: 10px;">Iniciar sesión</h3-->
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        autocomplete="new-password"
      >
        <q-input
          outlined
          v-model="email"
          label="Correo electrónico *"
          hint="Correo electrónico"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Ingrese su correo electrónico']"
        />

        <q-input label='Contraseña' v-model="password" outlined :type="!showPassword ? 'password' : 'text'" hint="Contraseña"
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
          <q-btn label="No tengo cuenta" type="button" class="bg-grey-9 text-yellow-14" to="/register"/>
          <q-btn label="Ingresar" type="submit" class="bg-yellow-14"/>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    if (this.$store.state.user && (this.$store.state.user.id_aspirante || this.$store.state.user.id_organizacion)) this.$router.push('/')
    return {
      password: '',
      email: '',
      showPassword: false
    }
  },
  methods: {
    async onSubmit () {
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
      } else {
        this.$q.notify({
          type: 'negative',
          position: 'top-right',
          group: false,
          timeout: 2500,
          message: 'Datos incorrectos'
        })
      }
    }
  }
}
</script>
