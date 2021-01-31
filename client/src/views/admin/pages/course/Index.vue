<template>
  <v-container>
    <v-row>
      <label-table :title="$lang.COURSE"> </label-table>
    </v-row>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat>
          <v-row  :class="{ 'mt-4': isMobile }">
            <v-col cols="12" md="3" lg="3" sm="3">
              <m-category-list
              label="Danh mục"
              :data.sync="searchCategory"
              v-on:action="filter(searchCategory)"
              >
              </m-category-list>
            </v-col>
            <v-col cols="12" md="3" lg="3" sm="3">
              <btn-create 
                :title="$lang.CREATE"
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
                        <th class="text-center">Hình ảnh</th>
                        <th class="text-center">Tiêu đề</th>
                        <th class="text-center">Giá</th>
                        <th class="text-center">Giá sau khuyến mãi</th>
                        <th class="text-center">Đánh giá</th>
                        <th class="text-center">Tình trạng</th>
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
                      <tr v-else v-for="(item, index) in courses" :key="item.id">

                        <td class="text-center">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </td>

                        <td class="text-center">{{ item.title }}</td>

                         <td class="text-center">
                            <img :src="item.avatar" width="120" height="70">

                         </td>

                        <td class="text-center">{{ item.price | toCurrency }}</td>

                        <td class="text-center">{{ item.priceFinal | toCurrency}}</td>

                         <td class="text-center">
                            <v-rating
                                v-model="item.rateTotal && item.rateTotal.total"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$ratingFull"
                                half-increments
                                hover
                                small
                                readonly
                              ></v-rating>
                              <span>( {{ item.rateTotal && item.rateTotal.turn }} )</span>
                         </td>
                         <td>
                            <v-switch
                              v-model="item.status"
                              @change="handleStatus(item)"
                            >
                            </v-switch>
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
                    v-for="(item, index) in courses"
                    :key="item.id"
                    v-else
                  >
                    <td>
                      <ul class="flex-content">

                        <li class="flex-item" data-label="No.">
                           {{ $helper.showIndex(index, currentPage, itemsPerPage) }}
                        </li>

                        <li class="flex-item" data-label="Tiêu đề">{{ item.title }}</li>

                         <li class="flex-item" data-label="Hình ảnh">
                            <img :src="item.avatar" width="120" height="70" >
                         </li>

                        <li  class="flex-item mt-8" data-label="Giá">{{ item.price | toCurrency }}</li>

                        <li class="flex-item" data-label="Giá sau khuyến mãi">{{ item.priceFinal | toCurrency}}</li>

                      
                         <li class="flex-item" data-label="Đánh giá">
                            <v-rating
                                v-model="item.rateTotal && item.rateTotal.total"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$ratingFull"
                                half-increments
                                hover
                                small
                                readonly
                              ></v-rating>
                               <span>( {{ item.rateTotal && item.rateTotal.turn }} )</span>
                         </li>

                          <li class="flex-item" data-label="Mô tả">{{ item.description }}</li>

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


// services
import CategoryService from "@/services/category";
export default {

  mixins: [IsMobile],

  created(){
    if(this.$route.query.hasOwnProperty('page')){
       this.$store.commit('courses/UPDATE_CURRENT_PAGE', parseInt(this.$route.query.page));
    }

    this.retrieveData(this.$route.query);
  },

  data(){
    return {
      isLoading: false,
      searchCategory: {}
    }
  },

  computed: {
    courses: {
      get(){
        return this.$store.getters["courses/courses"];
      }
    },
    itemsPerPage: {
      get(){
        return this.$store.getters["courses/itemsPerPage"];
      }
    },
    currentPage: {
      get(){
         return this.$store.getters["courses/currentPage"]
      },
      set(page)
      {
        this.$store.commit('courses/UPDATE_CURRENT_PAGE', page)
      }
    },
  },

  watch: {
    courses(data){
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

    handleStatus(item)
    {
      var payload = item;
      this.$store.dispatch("courses/update", payload);
    },

    retrieveData(query)
    {
      var payload = query;
      payload.page = this.currentPage;

      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
      this.isLoading = true;
      this.$store.dispatch("courses/fetchPaging", payload);
    },


    edit(item){
      this.$router.push({ name: "adminCourseEdit", params: {id: item.id}});
    },

    create(){
      this.$router.push({ name: "adminCourseCreate" });
    },

    async remove(item){

      var conf = confirm(this.$lang.REMOVE_CONFIRM);
      var condition = {
        parentId: item.id
      }

      if(conf){
        this.$store.dispatch("courses/remove", item)
      }
    }
  },


  beforeDestroy()
  {
    this.$store.dispatch("courses/reset");
  }


};
</script>
