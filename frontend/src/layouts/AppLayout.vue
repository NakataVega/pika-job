<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-yellow-14 text-black">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title style="font-weight: bold;">
          PikaJob
        </q-toolbar-title>

        <!--div @click="logout">Cerrar sesión de {{ $store.state.user.email }}</div-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-9"
    >
      <q-list>
        <template v-if="$store.state.user.id_aspirante">
          <q-item clickable to="/perfil" v-ripple>
            <q-item-section avatar>
              <q-icon color="yellow-14" name="person" />
            </q-item-section>
            <q-item-section style="color:#ffd500; font-weight:bold;">Perfil</q-item-section>
          </q-item>
          <q-item clickable to="/experiencias-laborales" v-ripple>
            <q-item-section avatar>
              <q-icon color="yellow-14" name="business_center" />
            </q-item-section>
            <q-item-section style="color:#ffd500; font-weight:bold;">Experiencia laboral</q-item-section>
          </q-item>
          <q-item clickable to="/formaciones-academicas" v-ripple>
            <q-item-section avatar>
              <q-icon color="yellow-14" name="school" />
            </q-item-section>
            <q-item-section style="color:#ffd500; font-weight:bold;">Formación académica</q-item-section>
          </q-item>
          <q-item clickable to="/curriculum" v-ripple>
            <q-item-section avatar>
              <q-icon color="yellow-14" name="description" />
            </q-item-section>
            <q-item-section style="color:#ffd500; font-weight:bold;">Curriculum</q-item-section>
          </q-item>
        </template>
        <!--ORGANIZACIONES-->
        <template v-if="$store.state.user.id_organizacion">
          <q-item clickable to="" v-ripple>
            <q-item-section avatar>
              <q-icon color="yellow-14" name="dashboard"/>
            </q-item-section>
            <q-item-section style="color:#ffd500; font-weight:bold;">Administrar vacantes</q-item-section>
          </q-item>
        </template>
        <q-item clickable  @click="logout" v-ripple>
          <q-item-section avatar>
            <q-icon color="yellow-14" name="arrow_back" />
          </q-item-section>
          <q-item-section style="color:#ffd500; font-weight:bold;">Cerrar sesión  de {{ $store.state.user.email }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      localStorage.clear()
      document.location.reload()
    }
  }
}
</script>
