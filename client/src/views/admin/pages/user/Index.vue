<template>
  <v-container>
    <v-row>
      <label-table :title="$lang.USER"> </label-table>
    </v-row>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat>
          <v-row  :class="{ 'mt-4': isMobile }">
            <v-col cols="12" md="3" lg="3" sm="3">
              <m-filter
              label="Vai trò"
              :items="roles"
              :data.sync="filterRole"
              >
              </m-filter>
            </v-col>
            <v-col cols="12" md="3" lg="3" sm="3">
              <btn-create 
                title="Thêm giáo viên"
                v-on:action="create()"
                >
              </btn-create>
            </v-col>
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
                        <th class="text-center">Họ tên</th>
                        <th class="text-center">Email</th>
                        <th class="text-center">Vai trò</th>
                        <th class="text-center">Tình trạng</th>
              <!--           <th class="text-center">Hành động</th> -->
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
                      <tr v-else v-for="(item, index) in users" :key="item.id">

                        <td class="text-center">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </td>

                        <td class="text-center">{{ item.name }}</td>

                        <td class="text-center">{{ item.email }}</td>

                        <td class="text-center">{{ item.role.name }}</td>

                         <td>
                            <v-switch
                              v-model="item.active"
                              @change="handleStatus(item)"
                            >
                            </v-switch>
                         </td>

                    <!--      <td class="text-center">
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
                        </td> -->
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
                    v-for="(item, index) in users"
                    :key="item.id"
                    v-else
                  >
                    <td>
                      <ul class="flex-content">

                        <li class="flex-item" data-label="No.">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </li>

                        <li class="flex-item" data-label="Họ tên">{{ item.name }}</li>

                        <li class="flex-item" data-label="Email">{{ item.email }}</li>

                        <li class="flex-item" data-label="Vai trò">{{ item.role.name }}</li>

                         <li>
                            <v-switch
                              v-model="item.active"
                              @change="handleStatus(item)"
                            >
                            </v-switch>
                         </li>

                 <!--         <li class="flex-item" data-label="No.">
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
                        </li> -->

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

import Filter from "./components/index/Filter";

// services
import CategoryService from "@/services/category";
export default {

  components: {
    'm-filter': Filter
  },

  mixins: [IsMobile],

  created(){
    if(this.$route.query.hasOwnProperty('page')){
       this.$store.commit('users/UPDATE_CURRENT_PAGE', parseInt(this.$route.query.page));
    }

    this.retrieveData(this.$route.query);
  },

  data(){
    return {
      isLoading: false,
      filterRole: {},
      roles: [
        {
          key: 1,
          name: "Admin"
        },
        {
          key: 2,
          name: "Giáo viên"
        },
        {
          key: 3,
          name: "Sinh viên"
        }
      ]
    }
  },

  computed: {
    users: {
      get(){
        return this.$store.getters["users/users"];
      }
    },
    itemsPerPage: {
      get(){
        return this.$store.getters["users/itemsPerPage"];
      }
    },
    currentPage: {
      get(){
         return this.$store.getters["users/currentPage"]
      },
      set(page)
      {
        this.$store.commit('users/UPDATE_CURRENT_PAGE', page)
      }
    },
    pageCounts(){
      return this.$store.getters["users/pageCounts"]
    },
  },

  watch: {
    users(data){
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

    filter(searchCategory)
    {
      var query = Object.assign({}, this.$route.query);

      if(!searchCategory.id)
      {
        delete query.categoryId;
      }else{
        query.categoryId = searchCategory.id;
      }

      this.retrieveData(query);
    },

    nextPage()
    {
      var query = Object.assign({}, this.$route.query);
      query.page = this.currentPage;

      this.$router.push({
            query: query
      });

      this.retrieveData(query);
    },

    handleStatus(item)
    {
      var payload = item;
      this.$store.dispatch("users/update", payload);
    },

    retrieveData(query)
    {
      var payload = query;
      payload.page = this.currentPage;

      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
      this.isLoading = true;
      this.$store.dispatch("users/fetchPaging", payload);
    },


    edit(item){
      this.$router.push({ name: "adminCourseEdit", params: {id: item.id}});
    },

    create(){
      this.$router.push({ name: "adminUserCreate" });
    },

    async remove(item){

      var conf = confirm(this.$lang.REMOVE_CONFIRM);
      var condition = {
        parentId: item.id
      }

      if(conf){
        this.$store.dispatch("users/remove", item)
      }
    }
  },


  beforeDestroy()
  {
    this.$store.dispatch("users/reset");
  }


};
</script>
