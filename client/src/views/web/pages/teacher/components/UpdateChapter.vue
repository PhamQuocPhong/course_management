<template>
  <v-layout row justify-center>
    <v-container>
      <v-dialog
        persistent
        max-width="500"
        v-model="isVisibleFormUpdateChapter"
      >
        <v-card
          class="pb-8"
        >
            <v-card-title primary-title style="width:100%;">
              Thêm chương
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="getChapter.name"
                      :rules="[
                        $validation.required(getChapter.name, 'Tiêu đề')
                      ]"
                      label="Tiêu đề"
                      required
                    ></v-text-field>
                  </v-col>

                   <v-col cols="12">

                  <v-checkbox
                    v-model="getChapter.preview"

                    label="Xem trước"
                  ></v-checkbox>
                   </v-col>


                  <v-col cols="12">
                     <v-textarea
                     outlined
                     rows="5"
                     v-model="getChapter.description"
                     label="Mô tả"
                     class="no-resize"
                     :rules="[
                        $validation.required(getChapter.description, 'Mô tả')
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

import ChapterService from "@/services/chapter";
import CookieService from "@/services/cookie";

export default {

  props: {
    isVisibleFormUpdateChapter: {
      type: Boolean,
      default: false,
    },
    chapterIndex: Number,
    data: [Array, String],
    course: Object,
    chapter: Object,
  },


  data() {
    return {
      valid: false,
    }
  },


  computed: {
    getCourse: {
      get()
      {
        return this.course
      }
    },

    getChapter: {
      get(){
        return this.chapter
      }
    },
  },

  methods: {
    close(){
     this.$emit('update:isVisibleFormUpdateChapter', false) 
    },

    async save(){
      if (this.$refs.form.validate()) {

        this.$store.dispatch("components/progressLoading", { option: "show" });
        const res = await ChapterService.update(this.getChapter.id, this.getChapter);
        if(res.status === 200)
        { 

           toastr.success(
              "<p> Cập nhật thành công <p>",
              "Success",
              { timeOut: 3000 }
            );

            this.getCourse.courseChapters[this.chapterIndex].name  = res.data.data.name;
            this.getCourse.courseChapters[this.chapterIndex].preview  = res.data.data.preview;
            this.getCourse.courseChapters[this.chapterIndex].description  = res.data.data.description;
            
           this.$store.dispatch("components/progressLoading", { option: "hide" });
           this.$emit('update:isVisibleFormUpdateChapter', false);
        }
        else{
           toastr.error(
              "<p> Cập nhật thất bại <p>",
              "Error",
              { timeOut: 3000 }
            );
            this.$store.dispatch("components/progressLoading", { option: "hide" });
        }

        this.$refs.form.reset();
      }
    },
  },
};
</script>
