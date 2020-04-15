<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  mounted () {
    if (this.$store.state.user.id_organizacion) this.$router.push('organizacion')
  }
}
</script>
