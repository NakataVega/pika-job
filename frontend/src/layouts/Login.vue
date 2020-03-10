<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <q-card class="my-card">
        <q-card-section>
          <q-form
            @submit="onSubmit"
            class="q-gutter-md"
            autocomplete="new-password"
          >
            <q-input
              filled
              v-model="email"
              label="Correo electrónico *"
              hint="Correo electrónico"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Ingrese su correo electrónico']"
            />

             <q-input label='Contraseña' v-model="password" filled :type="!showPassword ? 'password' : 'text'" hint="Contraseña"
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

            <div>
              <q-btn label="Ingresar" type="submit" color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
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
      }
    }
  }
}
</script>
