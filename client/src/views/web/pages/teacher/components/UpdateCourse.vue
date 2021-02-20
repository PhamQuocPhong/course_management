<template>
  <v-layout row justify-center>
    <v-container>
      <v-dialog
        persistent
        max-width="700"
        v-model="isVisibleFormUpdateCourse"
      >
        <v-card
          class="pb-8"
        >
            <v-card-title primary-title style="width:100%;">
              Thêm chương
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="getCourse.title"
                    :rules="[
                      $validation.required(getCourse.title, 'Tiêu đề')
                    ]"
                    label="Tiêu đề"
                    required
                  ></v-text-field>


                      <v-text-field
                        v-model.number="getCourse.price" 
                        type="number" 
                        label="Giá"
                        :rules="[
                          $validation.required(getCourse.price, 'Giá')
                        ]"
                      >

                      <template v-slot:append>
                          <p> VNĐ</p>
                      </template>
                      </v-text-field>

                      <v-checkbox v-model="getCourse.status" label="Tình trạng">
                        
                      </v-checkbox>

                      <v-text-field
                        v-model="getCourse.description"
                        :rules="[
                          $validation.required(getCourse.description, 'Mô tả')
                        ]"
                        label="Mô tả"
                        required
                      ></v-text-field>

                      <v-subheader class="mt-3 mb-3 pa-0 font-weight-bold">Mô tả chi tiết</v-subheader>

                      <wysiwyg v-model="getCourse.fullDescription" />
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

import CourseService from "@/services/course";
import CookieService from "@/services/cookie";

export default {

  props: {
    isVisibleFormUpdateCourse: {
      type: Boolean,
      default: false,
    },
    data: [Array, String],
    course: Object,
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
    }
  },

  methods: {
    close(){
     this.$emit('update:isVisibleFormUpdateCourse', false) 
    },

    async save(){

      if (this.$refs.form.validate()) {
        this.getCourse.priceFinal = this.getCourse.price;
        const res = await CourseService.update(this.course.id, this.getCourse);
        if(res.status === 200)
        { 

           toastr.success(
              "<p> Cập nhật thành công <p>",
              "Success",
              { timeOut: 3000 }
            );

           this.$emit('update:isVisibleFormUpdateCourse', false);
        }
        else{
           toastr.error(
              "<p> Cập nhật thất bại <p>",
              "Error",
              { timeOut: 3000 }
            );
        }

      }
    },
  },
};
</script>
