<template>
  <q-layout view="hHh Lpr fFf">
    <!--img
      alt="background"
      src="~assets/background.png"
      style="position: absolute; width: 100%; height: 100%!important"
    -->
    <picture style="position: absolute; width: 100%; height: 100%!important">
      <source media="(min-width: 680px)" srcset="~assets/background.png">
      <img src="~assets/bg-movil.jpg" alt="Ejemplo" style="opacity: 0.5;">
    </picture>
    <q-page-container>
      <q-page class="flex flex-center" style="margin: 0px 25px;">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
