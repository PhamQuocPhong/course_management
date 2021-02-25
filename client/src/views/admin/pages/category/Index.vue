<template>
  <v-container>
    <v-row>
      <label-table :title="$lang.CATEGORY"> </label-table>
    </v-row>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat>
          <v-row no-gutters :class="{ 'mt-4': isMobile }">
            <btn-create 
              :title="$lang.CREATE"
              v-on:action="create()"
              >
            </btn-create>
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
                        <th class="text-center">No.</th>
                        <th class="text-center">Danh mục cha</th>
                        <th class="text-center">Tiêu đề</th>
                        <th class="text-center">Mô tả</th>
                        <th class="text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="isLoading">
                          <td colspan="100%">
                             <v-skeleton-loader
                              ref="skeleton"
                              type="table-tbody"
                              class="mx-auto"
                          ></v-skeleton-loader>
                          </td>
                      </tr>
                      <tr v-else v-for="(item, index) in categories" :key="item.id">

                        <td class="text-center">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </td>

                        <td class="text-center">{{ item.parent !== null ? item.parent.name : "" }}</td>

                        <td class="text-center">{{ item.name }}</td>

                        <td class="text-center">{{ item.description }}</td>

                        <td class="text-center">
                           <btn-detail
                            
                            :title="$lang.DETAIL"
                            v-on:action="edit(item)"
                            color="blue darken-1"
                            :classProp="`mr-4`"
                            type="edit"
                          ></btn-detail>

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
                  <tr v-if="isLoading">
                      <td colspan="100%">
                         <v-skeleton-loader
                            ref="skeleton"
                            type="table-body"
                            class="mx-auto"
                          ></v-skeleton-loader>
                      </td>
                  </tr>
                  <tr
                    v-for="(item, index) in categories"
                    :key="item.id"
                    v-else
                  >
                    <td>
                      <ul class="flex-content">

                        <li class="flex-item" data-label="No.">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </li>
                        <li class="flex-item" data-label="Tiêu đề">{{ item.name }}</li>

                        <li class="flex-item" data-label="Mô tả">{{ item.description }}</li>

                        <li class="flex-item" data-label="Thao tác">
                          <btn-detail
                            
                            :title="$lang.DETAIL"
                            v-on:action="edit(item)"
                            color="blue darken-1"
                            :classProp="`mr-4`"
                            type="edit"
                          ></btn-detail>

                          <btn-remove 
                            :title="$lang.REMOVE"
                            v-on:action="remove(item)"
                            type="remove"
                          >
                          </btn-remove>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </template>
              </v-simple-table>
            </v-responsive>
          </v-layout>

          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                 <pagination-custom
                  :pageCounts="pageCounts"
                  :currentPage.sync="currentPage"
                  :key="currentPage"
                  @change="nextPage()"
                 >
                   
                 </pagination-custom>
              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>

//mixin
import IsMobile from "@/mixins/is_mobile";
import Filter from "./components/index/Search";

// services
import CategoryService from "@/services/category";
export default {

  mixins: [IsMobile],

  created(){
    if(this.$route.query.hasOwnProperty('page')){
       this.$store.commit('categories/UPDATE_CURRENT_PAGE', parseInt(this.$route.query.page));
    }
    this.retrieveData(this.$route.query);
  },

  data(){
    return {
      isLoading: false,
    }
  },

  computed: {
    categories: {
      get(){
        return this.$store.getters["categories/categories"];
      }
    },
    itemsPerPage: {
      get(){
        return this.$store.getters["categories/itemsPerPage"];
      }
    },
    currentPage: {
      get(){
         return this.$store.getters["categories/currentPage"]
      },
      set(page)
      {
        this.$store.commit('categories/UPDATE_CURRENT_PAGE', page)
      }
    },
     pageCounts(){
      return this.$store.getters["categories/pageCounts"]
    },
  },

  watch: {
    categories(data){
      setTimeout(async () => {
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

    retrieveData(query)
    {
      var payLoad = query;
      payLoad.currentPage = this.currentPage;

      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
      this.isLoading = true;
      this.$store.dispatch("categories/fetchPaging", payLoad);
    },

    nextPage(){

      var query = Object.assign({}, this.$route.query);
      query.page = this.currentPage;

      delete query.currentPage;

      this.$router.push({
            query: query
      });

      this.retrieveData(query);
    },

    edit(item){
      this.$router.push({ name: "adminCategoryEdit", params: {id: item.id}});
    },

    create(){
      this.$router.push({ name: "adminCategoryCreate" });
    },

    async remove(item){

      var conf = confirm(this.$lang.REMOVE_CONFIRM);
      var condition = {
        parentId: item.id
      }

      const findChild = await CategoryService.fetchByCondition(condition);
      if(findChild.data.data)
      {
        toastr.error("Không thể xóa", this.$lang.ERROR, { timeOut: 1000 });
        return;
      }

      if(conf){

        this.$store.dispatch("categories/remove", item)

      }
    }
  },


  beforeDestroy()
  {
    this.$store.dispatch("categories/reset");
  }


};
</script>
