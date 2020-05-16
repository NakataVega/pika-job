<template>
  <q-card>
    <q-card-section>
      <h6 style="margin:0px">Editar experiencia laboral</h6>
      <q-form @submit="onSubmit" class="q-gutter-md" style="margin-top:10px;">
        <div class="q-gutter-md row items-start">
          <q-input
            outlined autogrow
            v-model="organizacion"
            label="Empresa u organización *"
            hint="Nombre de la empresa u organización"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el nombre de la organización']"
            style="min-width:300px;"
          />

          <q-input
            outlined autogrow
            v-model="cargo"
            label="Cargo *"
            hint="Cargo desempeñado en la organización"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Ingrese el cargo desempeñado en la organización']"
            style="min-width:300px;"
          />

          <q-input v-model="fecha_inicio" mask="date" outlined label="Fecha inicio" style="min-width:300px;">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="fecha_inicio" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-checkbox v-model="checkbox" label="Actualmente trabajo aqui" color="yellow-14" style="min-width:300px;"/>

          <q-input v-model="fecha_fin"
            mask="date" outlined
            label="Fecha fin" style="min-width:300px;"
            v-if="!checkbox"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="fecha_fin" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            outlined
            autogrow
            style="min-width:300px"
            v-model="funciones"
            label="Funciones y actividades"
            hint="Describe aqui las funciones y actividades que desempeñabas en esta empresa"
          />
        </div>

        <div class="q-gutter-md row items-start">
            <q-btn label="Guardar experiencia" type="submit" class="bg-yellow-14" style="min-width:300px"/>
            <q-btn
              label="Volver atrás"
              type="button" class="bg-grey-9 text-yellow-14"
              style="min-width:300px" to="../experiencias-laborales"
            />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      organizacion: this.organizacion,
      cargo: this.cargo,
      fecha_inicio: this.fecha_inicio,
      checkbox: true,
      fecha_fin: this.fecha_fin,
      funciones: this.funciones
    }
  },
  methods: {
    async onSubmit () {
      console.log('eo')
    }
  }
}
</script>
