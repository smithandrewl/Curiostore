<template>
  <v-container>
  <v-row>
    <v-col cols="12">

      <h1 class="secondary--text" style="font-size: 2.5rem; font-weight: 500;line-height: 1.2;
">Collections</h1>
    </v-col>
  </v-row>

    <v-row>
      <div class="primary" style="width:100%; min-height: 200px;padding:1.5em">
        <v-row>
          <v-col cols="4">
            <v-card
              class="mx-auto"
              :flat="flat"
              :loading="loading"
              :outlined="outlined"
              :elevation="elevation"
              :raised="raised"
              :width="width"
              :height="height"
            >
              <v-img

                class="white--text"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title class="align-end fill-height">Fossils</v-card-title>
              </v-img>


            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "Collections"
    }
</script>

<style scoped>

</style>
