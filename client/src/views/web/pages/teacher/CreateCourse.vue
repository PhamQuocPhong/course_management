<template>
  <v-layout v-resize="onResize">
      <v-container>
        <v-row>
          <label-table title="Profile"> </label-table>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
            <m-menu></m-menu>
          </v-col>

          <v-col cols="12" md="8" :class="{ 'pa-0': isMobile }">
            <v-card tile  style="height: 100%;">
                <v-card-title class="headline d-flex pb-4">
                  Đăng bài
                </v-card-title>

                <v-card-text class="mt-4">
                       
                  <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="form.title"
                        :rules="[
                          $validation.required(form.title, 'Tiêu đề')
                        ]"
                        label="Tiêu đề"
                        required
                      ></v-text-field>

                      <v-text-field
                        type="number"
                        v-model.number="form.area"
                        :rules="[
                          $validation.required(form.area, 'Diện tích')
                        ]"
                        label="Diện tích"
                        required 
                      >

                      <template v-slot:append>
                          <p>m<sup>2</sup></p>
                      </template>

                      </v-text-field>

                      <v-text-field
                        v-model.number="form.price" 
                        type="number" 
                        label="Giá"
                        :rules="[
                          $validation.required(form.price, 'Giá')
                        ]"
                      >

                      <template v-slot:append>
                          <p>triệu VNĐ</p>
                      </template>
                      </v-text-field>


                      <m-dropzone
                       :data.sync="form.images"
                       :multiple="true"
                      >
                      </m-dropzone>
                   </v-form>

                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <btn-save 
                    :outlined="true"
                    title="Save"
                    v-on:action="save()"
                    color="blue darken-1"
                    type="save"
                  >
                  </btn-save>
                  
                  <btn-cancel 
                    :outlined="true"
                    title="Close"
                    v-on:action="close()"
                    color="blue darken-1"
                    type="close"
                  >
                  </btn-cancel>
                </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
    </v-container>
</v-layout>
</template>


<script>

// components 
import Menu from './components/Menu.vue';

// services
import CourseService from "@/services/course";
import CookieService from "@/services/cookie";


//mixins
import IsMobile from "@/mixins/is_mobile";
export default {

  components: {
    'm-menu': Menu
  },

  mixins: [IsMobile],

  data(){
    return {
      lazy: false,
      valid: true,
      form: {
        title: "",
        price: 0,
        images: "",
      }
    }
  },

  created(){

  },

  methods: {
    async save(){

      if (this.$refs.form.validate()) {
        const res = await CourseService.store(this.form);

        if(res.status === 201)
        {
           toastr.success(
              "<p> Đăng bài thành công <p>",
              "Success",
              { timeOut: false }
            );
           this.form.images = [];

        }else{
          toastr.error("Internal Server Error", "Error", {
              timeOut: 1000
          });
        }
          
        this.$refs.form.reset();
      }
    }
  }


};


</script>