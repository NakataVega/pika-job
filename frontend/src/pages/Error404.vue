<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">
      Lo sentimos, no hay nada aquí
    </p>
    <strong>ERROR (404)</strong>
    <br/><br/>
    <q-btn
      class="bg-yellow-14 text-grey-9"
      style="width:200px;"
      to="/"
      label="Sácame de aquí"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
