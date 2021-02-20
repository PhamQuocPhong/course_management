<template>
  <v-layout v-resize="onResize">
      <v-container>

        <v-row>
          <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
            <m-menu></m-menu>
          </v-col>

          <v-col cols="12" md="8" :class="{ 'pa-0 mt-4': isMobile }">
            <v-card tile  style="height: 100%;">
                <v-card-title class="headline d-flex pb-4">
                  Tạo khóa học
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
                        v-model.number="form.price" 
                        type="number" 
                        label="Giá"
                        :rules="[
                          $validation.required(form.price, 'Giá')
                        ]"
                      >

                      <template v-slot:append>
                          <p> VNĐ</p>
                      </template>
                      </v-text-field>


                      <m-dropzone
                       :data.sync="form.avatar"
                       :multiple="false"
                       typeUpload="courses"
                      >
                      </m-dropzone>

                      <v-text-field
                        v-model="form.description"
                        :rules="[
                          $validation.required(form.description, 'Mô tả')
                        ]"
                        label="Mô tả"
                        required
                      ></v-text-field>

                      <v-subheader class="mt-3 mb-3 pa-0 font-weight-bold">Mô tả chi tiết</v-subheader>

                      <wysiwyg v-model="form.fullDescription" />

                      <div class="d-flex" style="align-items: center;">
                        <v-subheader class="mt-3 mb-3 pa-0 font-weight-bold">Chương</v-subheader>

                        <v-col cols="12" sm="6" md="3" lg="3">
                          <v-btn outlined small color="primary" @click="addChapter()"> Thêm chương</v-btn>
                        </v-col>
                      </div>

                      <v-row>
                        <v-col cols="12" md="6" lg="6" v-for="item, index in form.chapters" :key="index">
                          <v-card class="pa-4">
                            <v-text-field
                              :rules="[
                                $validation.required(item.name, 'Tiêu đề chương')
                              ]"
                              v-model="item.name"
                              label="Tiêu đề"
                            >
                            </v-text-field>

                            <div class="d-flex" style="align-items: center;">
                              <v-checkbox
                                v-model="item.preview"

                                label="Xem trước"
                              ></v-checkbox>

                              <v-btn outlined small color="red" class="ml-4" @click="removeChapter(index)">
                                Xóa
                              </v-btn>
                            </div>
                             
                          </v-card>
                        </v-col>
                      </v-row>

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
        description: "",
        fullDescription: "",
        avatar: "",
        chapters: [
          {
            name: "",
            description: "",
            preview: false,
          }
        ],
      },
      chapters: Array.from({length: 10}, (_, i) => i + 1),
      chapterCount: "",
      techers: [],
    }
  },

  created(){

  },

  methods: {

    removeChapter(index)
    {
      this.form.chapters.splice(index, 1);
    },

    addChapter()
    {
      this.form.chapters.push({
        name: "",
        description: "",
        preview: false,
      })
    },

    async save()
    {
      if (this.$refs.form.validate()) 
      {
        this.$store.dispatch("components/progressLoading", { option: "show" });
        this.form.priceFinal = this.form.price;

        const res = await CourseService.store(this.form);
        if(res.status === 201)
        {
           toastr.success(
              "<p> Tạo khóa học thành công <p>",
              "Success",
              { timeOut: false }
            );
          this.$refs.form.reset();

          this.$store.dispatch("components/progressLoading", { option: "hide" });
        }else{
          toastr.error("Internal Server Error", "Error", {
              timeOut: 1000
          });
          this.$store.dispatch("components/progressLoading", { option: "hide" });
        }
          
        this.$refs.form.reset();
      }
    }
  }


};


</script>