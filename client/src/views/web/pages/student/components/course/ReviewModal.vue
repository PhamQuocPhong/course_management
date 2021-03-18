<template>
  <div>
    <v-layout row justify-center>
      <v-dialog
        v-model="open"
        persistent
        max-width="700"
      >
        <v-card>
          <v-card-title class="headline d-flex pb-4">
            Nhận xét
          </v-card-title>

          <v-card-text class="mt-4">
            <v-form ref="form"  :lazy-validation="lazy">
              <v-row>
                <v-col cols="12">
                    <v-textv-field v-model="form.message"></v-textv-field>
                </v-col>

                 <v-col cols="12">
                  <v-rating
                    v-model="form.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="20"
                  >
                  </v-rating>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <btn-save 
              :outlined="true"
              title="Save"
              @click="save()"
              color="blue darken-1"
            >
            </btn-save>
            
            <v-btn 
              :outlined="true"
              title="Close"
              @click="close()"
              color="blue darken-1"
              type="close"
            >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>

// mixins
import IsMobile from "@/mixins/is_mobile";

// services
import RatingService from "@/service/rating";

export default {

  mixins: [IsMobile, BackToList],

  props: {
    open: Boolean,
  },

  data(){
    return {
      lazy: false,
      form: {
        message: "",
        rating: 0,
      }
    }
  },

  methods: {
    async save(){
      const res = await RatingService.store(this.form); 
      console.log(res);
    },

    close(){
      this.$emit()
    }
  },


};
</script>
