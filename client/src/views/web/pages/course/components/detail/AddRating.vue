<template>
  <v-layout row justify-center>
    <v-container>
      <v-dialog
        persistent
        max-width="500"
        v-model="isVisibleFormRating"
      >
        <v-card
          class="pb-8"
        >
            <v-card-title primary-title style="width:100%;">
              {{ title }}
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                      <v-card-subtitle>Vote</v-card-subtitle>
                      <v-rating
                        v-model="form.point"
                        color="amber"
                        dense
                        half-increments
                        
                        size="20"

                      >
                      </v-rating>
                  </v-col>

                  <v-col cols="12">
                     <v-textarea
                     outlined
                     rows="5"
                     v-model="form.comment"
                     label="Nội dung"
                     class="no-resize"
                     :rules="[
                        $validation.required(form.comment, 'Nội dung')
                      ]"
                     >
                     </v-textarea>
                  </v-col>
                </v-row>
              </v-form>
        
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <btn-save 
                :outlined="true"
                title="Submit"
                v-on:action="save()"
                color="blue darken-1"
                type="save"
              >
              </btn-save>
              
               <btn-cancel
                :outlined="true"
                :title="$lang.CANCEL"
                v-on:action="close()"
              > </btn-cancel>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </v-container>
  </v-layout>
</template>

<script>

import UserService from "@/services/user";
import CookieService from "@/services/cookie";

export default {

  props: {
    isVisibleFormRating: {
      type: Boolean,
      default: false,
    },
    title: String,
    course: Object,
    myRating: Object,
    ratings: Array,
  },

  created()
  {
    if(this.myRating)
    {
      this.form = this.myRating;
    }
  },

  data() {
    return {
      form: {
        comment: "",
        point: 1,
        courseId: this.course.id,
        userInfo: CookieService.get('userInfo')
      },
      valid: false,
    }
  },
  
  computed: {
    getRatings: {
      get()
      {
        return this.ratings;
      }
    }
  },

  methods: {
    close(){
     this.$emit('update:isVisibleFormRating', false) 
    },

    async save(){


      if (this.$refs.form.validate()) {
        this.$store.dispatch("components/progressLoading", { option: "show" })
        const res = await UserService.ratingCourse(this.course.id, this.form);
        if(res.status === 200)
        { 
           toastr.success(
              "<p> Đánh giá thành công <p>",
              "Success",
              { timeOut: false }
            );

           if(!this.myRating)
           {
              this.getRatings.unshift(res.data.data);
           }else{

            var indexRating = this.getRatings.findIndex(item => item.id === res.data.data.id);
            this.getRatings[indexRating] = res.data.data;
           }

          this.$emit("update: course", this.getCourse); 
          this.$emit('update:isVisibleFormRating', false);
          this.$store.dispatch("components/progressLoading", { option: "hide" });
          this.$forceUpdate();

        }
        else{
           toastr.error(
              "<p> Đánh giá thất bại <p>",
              "Error",
              { timeOut: false }
            );
            this.$store.dispatch("components/progressLoading", { option: "hide" });
        }

        this.$refs.form.reset();
      }
    },
  },
};
</script>
