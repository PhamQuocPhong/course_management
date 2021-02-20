<template>
  <v-layout row justify-center>
    <v-container>
      <v-dialog
        persistent
        max-width="500"
        v-model="isVisibleFormAddDocument"
      >
        <v-card
          class="pb-8"
        >
            <v-card-title primary-title style="width:100%;">
              Thêm tài liệu
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.name"
                      :rules="[
                        $validation.required(form.name, 'Tiêu đề')
                      ]"
                      label="Tiêu đề"
                      required
                    ></v-text-field>
                  </v-col>

                   <v-col cols="12">

                      <v-checkbox
                    v-model="form.preview"

                    label="Xem trước"
                  ></v-checkbox>
                   </v-col>

                  <v-col cols="12">
                    <m-dropzone
                     :data.sync="form.link"
                     :multiple="false"
                     :typeUpload="form.type === 1 ? `videos` : `files`"
                    >
                    </m-dropzone>
                  </v-col>

                  <v-col cols="12">
                     <v-textarea
                     outlined
                     rows="5"
                     v-model="form.description"
                     label="Mô tả"
                     class="no-resize"
                     :rules="[
                        $validation.required(form.comment, 'Mô tả')
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

import DocumentService from "@/services/document";
import CookieService from "@/services/cookie";

export default {

  props: {
    isVisibleFormAddDocument: {
      type: Boolean,
      default: false,
    },
    data: [Array, String],
    course: Object,
    chapter: Object,
  },


  data() {
    return {
      form: {
        name: "",
        link: "",
        type: 0,
        description: "",
        preview: false,
        courseChapterId: this.chapter.id
      },
      valid: false,
    }
  },

  computed:
  {
    getChapter: {
      get(){
        return this.chapter
      }
    }
  },

  methods: 
  {
    close(){
     this.$emit('update:isVisibleFormAddDocument', false) 
    },

    resetForm()
    {
      this.form = {
        name: "",
        link: "",
        type: 0,
        description: "",
        preview: false,
        courseChapterId: this.chapter.id
      }
      this.$refs.form.resetValidation();
    },

    async save()
    {

      if (this.$refs.form.validate()) 
      { 
                              this.$store.dispatch("components/progressLoading", { option: "show" });
        const res = await DocumentService.store(this.form);
        if(res.status === 201)
        { 

          this.getChapter.courseDocuments.push(res.data.data)
          this.$emit("update:chapter", this.getChapter)

           toastr.success(
              "<p> Thêm  thành công <p>",
              "Success",
              { timeOut: 3000 }
            );

            this.$store.dispatch("components/progressLoading", { option: "hide" });
           this.$emit('update:isVisibleFormAddDocument', false);
        }
        else{
           toastr.error(
              "<p> Thêm thất bại <p>",
              "Error",
              { timeOut: 3000 }
            );
           
            this.$store.dispatch("components/progressLoading", { option: "hide" });
        }

        this.resetForm();
      }
    },
  },

};
</script>
