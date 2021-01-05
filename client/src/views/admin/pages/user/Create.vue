<template>
  <v-container>
        <v-row>
      <label-table :title="$lang.HOBBY"> </label-table>
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
              <v-card>
                <v-card-title class="border-bottom">
                  {{ $lang.CREATE }}
                </v-card-title>

                <v-card-text>
                  <v-form class="form__custom" ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          placeholder=" "
                          v-model="newHobby.value"
                          :rules="[
                            $validation.required(newHobby.value, 'タイトル')
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
                        <div class="label">
                         <b> ステータス </b>
                        </div>
                        <v-radio-group
                            row
                            v-model="newHobby.isValid"
                          >
                            <v-radio
                              label="表示"
                              :value="true"
                            ></v-radio>
                            <v-radio
                              label="非表示"
                              :value="false"
                            ></v-radio>
                        </v-radio-group>
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

import HobbyServices from "@/services/hobby";

export default {

  mixins: [IsMobile, BackToList],

  data(){
    return {
      valid: true,
      lazy: false,
      newHobby: {
        value: "",
        isValid: true,
      }
    }
  },

  methods: {
    async save(){
       if(this.$refs.form.validate()){

        var conf = confirm(this.$lang.SAVE_CONFIRM);
        if(conf){

          const res = await HobbyServices.store(this.newHobby);
          
          if(!res){
            toastr.error(this.$lang.CREATE_FAIL, this.$lang.ERROR, { timeOut: 1000 });
          }else{
           toastr.success(this.$lang.CREATE_SUCCESS, this.$lang.SUCCESS, { timeOut: 1000 });
            this.backToList();
            this.newHobby.value = "";
            this.$refs.form.resetValidation();
            this.$forceUpdate();
          }
        }
      }
    },
  },


};
</script>
