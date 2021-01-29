<template>
  <v-container>
        <v-row>
      <label-table :title="$lang.COURSE"> </label-table>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="12" sm="8" md="6" lg="6">
        <v-flex :class="{ 'pa-4': !isMobile }">
            <v-layout
              v-resize="onResize"
              column
              class="table"
              :class="{ 'mt-4': isMobile }"
            >
              <v-card v-show="!isLoading">
                <v-card-title class="border-bottom">
                  {{ $lang.DETAIL }}
                </v-card-title>

                <v-card-text v-if="getCourse">
                  <v-form class="form__custom" ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-row>
                      <v-col cols="12">
                        <m-category-list 
                          label="Danh mục" 
                          :items="categories"  
                          :data.sync="getCourse.categoryId"
                        >
                        </m-category-list>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          placeholder=" "
                          v-model="getCourse.name"
                          :rules="[
                            $validation.required(getCourse.name, 'Tiêu đề')
                          ]"
                          >
                          <template v-slot:label>
                            <div>
                              <b> タイトル <span class="red--text"> * </span> </b>
                            </div>
                          </template>
                        </v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-textarea
                        class="no-resize"
                          placeholder=" "
                          v-model="getCourse.description"
                          :rules="[
                            $validation.required(getCourse.description, 'Mô tả')
                          ]"
                          >
                          <template v-slot:label>
                            <div>
                              <b> Tiêu đề <span class="red--text"> * </span> </b>
                            </div>
                          </template>
                        </v-textarea>
                      </v-col>

                    </v-row>
                </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <btn-save 
                    :outlined="true"
                    :title="$lang.SAVE"
                    v-on:action="save()"
                    color="blue darken-1"
                    type="save"
                  >
                  </btn-save>
                  
                   <btn-back-list
                    :outlined="true"
                    :title="$lang.BACK"
                    v-on:action="backToList()"
                  > </btn-back-list>
                </v-card-actions>
              </v-card>
            </v-layout>
          </v-flex>
        </v-col>
    </v-row>
  </v-container>
</template>


<script>
//mixin
import IsMobile from "@/mixins/is_mobile";
import BackToList from "@/mixins/back_list";

import CourseService from "@/services/category";


export default {

  mixins: [IsMobile, BackToList],

  async created(){
    this.$store.dispatch("courses/fetchAll");
    this.retrieveData();
  },

  data(){
    return {
      valid: true,
      lazy: false,
      isLoading: true,
      id: this.$route.params.id // String!
    }
  },

  computed: {
    getCourse: {
      get(){
        return this.$store.getters["courses/course"]
      },
    },
    categories: {
      get(){
        var categories = this.$store.getters["categories/categories"]
        return categories
      }
    }
  },

   watch: {
    getCourse(data){
      setTimeout(() => {
         if(data.length){
         this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
         this.isLoading = false
        }else{
          this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
          this.isLoading = false
        }
      }, 200)
    },
  },


  methods: {
    
    async retrieveData()
    {
      var payload = {
        id: this.id
      }
      this.isLoading = true;
      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
      this.$store.dispatch("courses/fetch", payload);
    },

    async save(){

        if(this.$refs.form.validate()){
          var conf = confirm(this.$lang.SAVE_CONFIRM);
          if(conf){
            if(this.getCourse.parent)
            {
              this.getCourse.parentId = this.getCourse.parent.id;
            }
            else{
               this.getCourse.parentId = null;
            }
          
            const res = await CourseService.update(this.id, this.getCourse);
            if(!res){
              toastr.error(this.$lang.UPDATE_FAIL, this.$lang.ERROR, { timeOut: 1000 });
            }else{
             toastr.success(this.$lang.UPDATE_SUCCESS, this.$lang.SUCCESS, { timeOut: 1000 });
            this.backToList();
            }
          }
        }
    },
  },

  beforeDestroy()
  {
    this.$store.dispatch("courses/reset");
  }

}
</script>
