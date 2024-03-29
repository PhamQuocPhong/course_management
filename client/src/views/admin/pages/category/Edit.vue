<template>
  <v-container>
        <v-row>
      <label-table :title="$lang.CATEGORY"> </label-table>
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

                <v-card-text v-if="getCategory">
                  <v-form class="form__custom" ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-row>
                      <v-col cols="12">
                        <m-category-list 
                          label="Danh mục cha" 
                          :data.sync="getCategory.parent"
                        >
                        </m-category-list>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          placeholder=" "
                          v-model="getCategory.name"
                          :rules="[
                            $validation.required(getCategory.name, 'Tiêu đề')
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
                          v-model="getCategory.description"
                          :rules="[
                            $validation.required(getCategory.description, 'Mô tả')
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

import CategoryService from "@/services/category";


export default {

  mixins: [IsMobile, BackToList],

  async created(){
    this.$store.dispatch("categories/fetchAll");
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
    getCategory: {
      get(){
        return this.$store.getters["categories/category"]
      },
    },
    categories: {
      get(){
        var categories = this.$store.getters["categories/categories"]
        categories.unshift({
          id: null,
          name: "Root"
        });
        return categories
      }
    }
  },

   watch: {
    getCategory(data){
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
      this.$store.dispatch("categories/fetch", payload);
    },

    async save(){

        if(this.$refs.form.validate()){
          var conf = confirm(this.$lang.SAVE_CONFIRM);
          if(conf){
            if(this.getCategory.parent)
            {
              this.getCategory.parentId = this.getCategory.parent.id;
            }
            else{
               this.getCategory.parentId = null;
            }
          
            const res = await CategoryService.update(this.id, this.getCategory);
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
    this.$store.dispatch("categories/reset");
  }

}
</script>
