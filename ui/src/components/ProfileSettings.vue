<template>
  <v-container>
    <v-row>
      <v-col cols="12">

        <h1 class="secondary--text" style="font-size: 2.5rem; font-weight: 500;line-height: 1.2;
">Profile Settings</h1>
      </v-col>
    </v-row>


        <v-row >
          <v-col cols="12">
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Ful L. Name</v-toolbar-title>
                <div class="flex-grow-1"></div>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Name"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-textarea
                    id="password"
                    label="Bio"
                    name="password"
                    prepend-icon="mdi-book"
                  ></v-textarea>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>

    import store from "@/store/index";

    export default {
        name: "ProfileSettings",
        data: ()=>{
            return {
                "title": "fdsa"
            }
        }
    }
</script>

<style scoped>

</style>
