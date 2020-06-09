<template>
  <q-card v-if="$store.state.user.admin === 1">
    <q-card-section>
      <h6 style="margin:0px">Aqui se registran las cuentras de las empresas</h6>
      <q-btn label="Agregar empresa" icon="add_box" style="margin-top: 10px;"
        type="button" class="bg-yellow-14" to="/admin/empresas/crear" append
      />
    </q-card-section>
    <q-card-section>
      <!--div class="q-pa-md"-->
      <div>
        <q-table v-if="items"
          grid
          title="Empresas registradas"
          :data="items"
          :columns="columns"
          hide-header
          virtual-scroll
          :virtual-scroll-item-size="this.items.length"
          :pagination="pagination"
          :rows-per-page-options="[0]"
        >
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-6">
              <q-card>
                <q-card-section class="text-center">
                  <strong style="font-size: 20px">{{ props.row.nombre_orga }}</strong>
                  <br />
                  <strong>{{ props.row.titulo_expe }}</strong>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    if (!this.$store.state.user.admin === 1) this.$router.push('/404')
    return {
      items: [],
      columns: [],
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  async mounted () {
    if (!this.$store.state.user.admin === 1) this.$router.push('/404')
    const { data } = await this.$axios.get('organizaciones?$sort[createdAt]=-1')
    this.items = data.data
    if (this.items.length === 0) this.items = null
  }
}
</script>
