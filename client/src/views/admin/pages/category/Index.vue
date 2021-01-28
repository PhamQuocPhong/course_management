<template>
  <v-container>
    <v-row>
      <label-table :title="$lang.CATEOGORY"> </label-table>
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
                              type="table-body"
                              class="mx-auto"
                          ></v-skeleton-loader>
                          </td>
                      </tr>
                      <tr v-else v-for="(item, index) in categories" :key="item.id">
                        <td class="text-center">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </td>
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
      currentPage: this.$constant.pagination.CURRENT_PAGE,
      itemsPerPage: this.$constant.pagination.ITEMS_PER_PAGE,
      isLoading: false,
    }
  },

  computed: {
    categories: {
      get(){
        return this.$store.getters["categories/categories"];
      }
    }
  },

  watch: {
    categories(data){
      if(data.length){
         this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
         this.isLoading = false
      }else{
        this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
        this.isLoading = false
      }
    },
  },

  methods: {

    retrieveData(query)
    {
      var payLoad = query;
      payLoad.page = this.currentPage;

      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
      setTimeout(async () => {
        this.$store.dispatch("categories/fetchPaging", payLoad);
      }, 200);
    },


    edit(item){
      this.$router.push({ name: "adminCategoryEdit", params: {id: item.id}});
    },

    create(){
      this.$router.push({ name: "adminCategoryCreate" });
    },

    async remove(item){
      var conf = confirm(this.$lang.REMOVE_CONFIRM);
      const findChild = await CategoryService.fetchByCondition(item.parentId)

      if(conf){
        const res = await CategoryService.delete(item.id);
        if(res.status === 200){
          toastr.success(this.$lang.REMOVE_SUCCESS, this.$lang.SUCCESS, { timeOut: 1000 });
        }else{
          toastr.error(this.$lang.REMOVE_FAIL, this.$lang.ERROR, { timeOut: 1000 });
        }
      }
    }
  },


  beforeDestroy()
  {
    this.$store.dispatch("categories/reset");
  }


};
</script>
