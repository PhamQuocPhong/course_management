<template>
  <v-container>
    <v-row>
      <label-table :title="$lang.COURSE"> </label-table>
    </v-row>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat>
          <v-row no-gutters>
            <btn-create 
              :title="$lang.CREATE"
              v-on:action="create()"
              >
            </btn-create>

            <v-spacer></v-spacer>
          </v-row>

          <v-layout
            v-resize="onResize"
            column
            class="table"
            :class="{ 'mt-4': isMobile }"
          >
            <v-responsive :aspect-ratio="$constant.aspectRatio.TABLE">
              <v-simple-table :class="{ mobile: isMobile }">
                <template v-slot:default v-if="!isMobile">
                   <thead>
                      <tr>
                        <th class="text-center">番号</th>
                        <th class="text-center">タイトル</th>
                        <th class="text-center">ステータス</th>
                        <th class="text-center">アクション</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="isLoading">
                          <td colspan="100%">
                             <skeleton-custom></skeleton-custom>
                          </td>
                      </tr>
                      <tr v-else v-for="(item, index) in courses" :key="item.id">
                        <td class="text-center">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </td>
                        <td class="text-center">{{ item.value }}</td>

                       <td class="text-center">
                          <v-chip
                          :color="$helper.showStatusColor(item.isValid)"
                          dark
                          small
                          >
                            {{item.isValid === true ? "表示" : "非表示"}}
                          </v-chip>
                        </td>

                        <td class="text-center">
                           <btn-edit
                            
                            :title="$lang.DETAIL"
                            v-on:action="edit(item)"
                            color="blue darken-1"
                            :classProp="`mr-4`"
                            type="edit"
                          ></btn-edit>

                          <btn-remove 
                            :title="$lang.REMOVE"
                            v-on:action="remove(item)"
                            type="remove"
                          >
                          </btn-remove>
                        </td>
                      </tr>
                    </tbody>
                </template>

                <template v-slot:default v-else>

                </template>
              </v-simple-table>
            </v-responsive>
          </v-layout>

        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>

//mixin
import IsMobile from "@/mixins/is_mobile";


// services
import CourseServices from "@/services/course";
export default {

  mixins: [IsMobile],
  data(){
    return {
      currentPage: this.$constant.pagination.CURRENT_PAGE,
      itemsPerPage: this.$constant.pagination.ITEMS_PER_PAGE,
      isLoading: false,
      courses: [],
    }
  },


  watch: {
    courses(data){
      this.isLoading = true
      this.$store.dispatch("components/actionProgressHeader", {option: "show"});
      if(data.length > 0 ){
        setTimeout(() => {
          this.$store.dispatch('components/actionProgressHeader', {option: "hide"});
           this.isLoading = false
        }, 200)
      }else{
        this.$store.dispatch('components/actionProgressHeader', {option: "hide"});
        this.isLoading = false
      }
    }
  },


  methods: {

    edit(item){
      this.$router.push('/courses/' + item.id);
    },

    create(){
      this.$router.push('/courses/create');
    },

    async remove(item){
      var conf = confirm(this.$lang.REMOVE_CONFIRM);

      if(conf){
        const res = await CourseServices.delete(item.id);
        if(!res){
          
          toastr.error(this.$lang.REMOVE_FAIL, this.$lang.ERROR, { timeOut: 1000 });
        }else{
          toastr.success(this.$lang.REMOVE_SUCCESS, this.$lang.SUCCESS, { timeOut: 1000 });
        }
      }
    }
  },


};
</script>
