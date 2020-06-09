<template>
  <q-card v-if="$store.state.user.admin === 1">
    <q-card-section>
      <h6 style="margin:0px; font-weight: bold;">Registrar empresa</h6>
      <q-form @submit="onSubmit" class="q-gutter-md" style="margin-top:10px;">
        <div class="q-gutter-md row items-start">
          <q-input
            outlined
            v-model="nombre_orga"
            label="Nombre empresa *"
            hint="Nombre de la empresa u organización"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el nombre de la organización']"
            style="min-width:300px;"
          />

          <q-input
            outlined
            v-model="email"
            label="Email para incio de sesión *"
            hint="Email asignado a la organización"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el email para la organización']"
            style="min-width:300px;"
          />

          <q-input
            outlined
            v-model="password"
            label="Contraseña para incio de sesión *"
            hint="Contraseña asignada a la organización"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese la contraseña para la organización']"
            style="min-width:300px;"
          />
        </div>
        <div class="q-gutter-md row items-start">
            <q-btn label="Registrar empresa" type="submit" class="bg-yellow-14" style="min-width:300px"/>
            <q-btn
              label="Volver atrás"
              type="button" class="bg-grey-9 text-yellow-14"
              style="min-width:300px" :to="'/admin/empresas'"
            />
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
  data () {
    if (!this.$store.state.user.admin === 1) this.$router.push('/404')
    return {
      nombre_orga: this.nombre_orga,
      email: this.email,
      password: this.password
    }
  },
  methods: {
    async onSubmit () {
      if (!this.$store.state.user.admin === 1) this.$router.push('/404')
      if (mailValido(this.email)) {
        const { data: user, error } = await this.$axios.post('/users', {
          nombre_orga: this.nombre_orga,
          email: this.email.trim(),
          password: this.password,
          userType: 'organizacion'
        })
        console.log(user)
        if (error && error.response && error.response.data) {
          this.$q.notify({
            type: 'negative',
            position: 'top-right',
            group: false,
            timeout: 2500,
            message: error.response.data.errors.email
          })
        } else {
          this.$router.push('/admin/empresas')
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
  },
  async mounted () {
    if (!this.$store.state.user.admin === 1) this.$router.push('/404')
  }
}
</script>
