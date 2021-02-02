<template>
  <v-container>
        <v-row>
      <label-table :title="$lang.USER"> </label-table>
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
                          v-model="form.name"
                          :rules="[
                            $validation.required(form.name, 'Họ tên')
                          ]"
                          >
                          <template v-slot:label>
                            <div>
                              <b> Họ tên <span class="red--text"> * </span> </b>
                            </div>
                          </template>
                        </v-text-field>
                      </v-col>


                      <v-col cols="12">
                        <v-text-field
                          type="password"
                          placeholder=" "
                          v-model="form.password"
                          :rules="[
                            $validation.required(form.password, 'Mật khẩu')
                          ]"
                          >
                          <template v-slot:label>
                            <div>
                              <b> Mật khẩu <span class="red--text"> * </span> </b>
                            </div>
                          </template>
                        </v-text-field>
                      </v-col>


                      <v-col cols="12">
                        <v-text-field
                          type="email"
                          placeholder=" "
                          v-model="form.email"
                          :rules="[
                            $validation.required(form.email, 'Email'),
                            $validation.email(form.email, 'Email')
                          ]"
                          >
                          <template v-slot:label>
                            <div>
                              <b> Email<span class="red--text"> * </span> </b>
                            </div>
                          </template>
                        </v-text-field>
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

// services
import UserService from "@/services/user";

export default {

  mixins: [IsMobile, BackToList],

  created(){
    this.$store.dispatch("users/fetchAll");
  },

  data(){
    return {
      valid: true,
      lazy: false,
      form: {
        name: "",
        email: "",
        password: "",
        roleId: 2,
        active: true,
      }
    }
  },


  computed: {
    users: {
      get(){
        return this.$store.getters["users/users"];
      }
    }
  },

  methods: {
    async save(){

       if(this.$refs.form.validate()){

        var conf = confirm(this.$lang.SAVE_CONFIRM);
        if(conf){

          const res = await UserService.store(this.form);
          
          if(res.status === 200){
            toastr.success(this.$lang.CREATE_SUCCESS, this.$lang.SUCCESS, { timeOut: 1000 });
            this.backToList();
            this.$refs.form.resetValidation();
            
          }else{
           toastr.error(res.message ||  this.$lang.CREATE_FAIL, this.$lang.ERROR, { timeOut: 1000 });
          }
        }
      }
    },
  },



};
</script>
