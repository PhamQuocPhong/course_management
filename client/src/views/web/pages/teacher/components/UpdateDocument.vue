<template>
  <v-layout row justify-center>
    <v-container>
      <v-dialog
        persistent
        max-width="500"
        v-model="isVisibleFormUpdateDocument"
      >
        <v-card
          class="pb-8"
        >
            <v-card-title primary-title style="width:100%;">
              Cập nhật tài liệu
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="getDocument.name"
                      :rules="[
                        $validation.required(getDocument.name, 'Tiêu đề')
                      ]"
                      label="Tiêu đề"
                      required
                    ></v-text-field>
                  </v-col>

                   <v-col cols="12">

                    <v-checkbox
                    v-model="getDocument.preview"
                    label="Xem trước"
                  ></v-checkbox>
                   </v-col>

                  <v-col cols="12">
                    <m-dropzone
                     :data.sync="getDocument.link"
                     :multiple="false"
                     :typeUpload="getDocument.type === 1 ? `videos` : `files`"
                    >
                    </m-dropzone>
                  </v-col>

                  <v-col cols="12">
                     <v-textarea
                     outlined
                     rows="5"
                     v-model="getDocument.description"
                     label="Mô tả"
                     class="no-resize"
                     :rules="[
                        $validation.required(getDocument.description, 'Mô tả')
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
    isVisibleFormUpdateDocument: {
      type: Boolean,
      default: false,
    },
    data: [Array, String],
    course: Object,
    chapter: Object,
    courseDocument: Object,
    documentIndex: Number,
  },


  data() {
    return {
     
      valid: false,
    }
  },

  computed:
  {
    getChapter: {
      get(){
        return this.chapter
      }
    },
    getDocument: {
      get(){
        return this.courseDocument
      }
    }
  },

  methods: 
  {
    close(){
     this.$emit('update:isVisibleFormUpdateDocument', false) 
    },

    resetForm()
    {
      this.$refs.form.resetValidation();
    },

    async save()
    {

      if (this.$refs.form.validate()) 
      {

        this.$store.dispatch("components/progressLoading", { option: "show" });
        const res = await DocumentService.update(this.getDocument.id, this.getDocument);
        if(res.status === 200)
        { 

          this.getChapter.courseDocuments[this.documentIndex] = res.data.data;

           toastr.success(
              "<p> Cập nhật  thành công <p>",
              "Success",
              { timeOut: 3000 }
            );


        this.$store.dispatch("components/progressLoading", { option: "hide" });

          this.$emit("update:chapter", this.getChapter)
           this.$emit('update:isVisibleFormUpdateDocument', false);
        }
        else{
           toastr.error(
              "<p> Cập nhật thất bại <p>",
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
