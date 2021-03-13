<template>
	<v-container>
    <v-row class=" menu-header">
        <menu-header :class="`d-flex`"></menu-header>
    </v-row>
    <v-row>
      <v-col cols="12" sm="3" md="3" lg="3">
        <m-filter
        label="Giá"
        :items="filterPrice"
        :data.sync="filter.price"
        type="price"
        ></m-filter>
      </v-col>

      <v-col cols="12" sm="3" md="3" lg="3">
        <m-filter
        label="Đánh giá"
        :items="filterRating"
        :data.sync="filter.rating"
        type="rating"
        ></m-filter>
      </v-col>

       <v-col cols="12" sm="3" md="3" lg="3">
        <v-btn color="primary" outlined @click="removeSort()" >Mặc định</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat  v-if="courses.length">
          <v-layout
            v-resize="onResize"
            column
            class="table"
            :class="{ 'mt-4': isMobile }"
          >
            <v-row>
              <v-col v-for="(item, index) in courses" cols="12" sm="12" md="6" lg="6" :key="item.id">
                <m-item 
                :item="item" 
                :specialCourses.sync="specialCourses"
                v-on:action="viewDetail(item)"
                >
                  
                </m-item>
              </v-col>
            </v-row>
           </v-layout>

          <v-row justify="center">
            <v-col cols="8">
               <v-container class="max-width" v-if="courses.length">
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

        <v-card
        flat
        v-else
        height="300"
        class="text-center"
        >
            <h2>Không tìm thấy dữ liệu</h2>
        </v-card>
      </v-flex>
    </v-row>

  </v-container>
</template>

<script>

// components
import MItem from "./components/index/Item";
import Filter from "./components/search/Filter";


// store
import ComponentStore from "@/store/modules/component";


//mixin
import IsMobile from "@/mixins/is_mobile";

// service
import CourseService from "@/services/course";

export default {

	mixins: [IsMobile],

    components: {
    	'm-item': MItem,
      'm-filter': Filter
	},

	data(){
		return {
		currentPage: this.$route.query.hasOwnProperty("page") ? parseInt(this.$route.query.page) : 1,	
		pageCounts: 1,
    specialCourses: [],	
		courses: [],
	   itemsPerPage: this.$constant.pagination.ITEMS_PER_PAGE,
	   filter: {
        price: !this.$route.query.hasOwnProperty("orderPrice") ? "" : ( this.$route.query.orderPrice === "asc" ? 
          {
            key: "asc",
            name: "Giá thấp nhất"
          }
          : 
          {
            key: "desc",
            name: "Giá cao nhất"
        }),

        rating: !this.$route.query.hasOwnProperty("orderRating") ? "" : (this.$route.query.orderRating === "asc" ? 
          {
            key: "asc",
            name: "Đánh giá thấp nhất"
          }
          : 
          {
             key: "desc",
            name: "Đánh giá cao nhất"
        })
         
     },

	    filterPrice: [
        {
          key: "asc",
          name: "Giá thấp nhất"
        },
        {
          key: "desc",
          name: "Giá cao nhất"
        }
      ],

      filterRating: [
        {
          key: "asc",
          name: "Đánh giá thấp nhất"
        },
         {
          key: "desc",
          name: "Đánh giá cao nhất"
        }
      ],
		}
	},


  created(){
    this.retrieveData(this.$route.query);
  },


  watch: {
    courses(data){
      if(data.length){
         this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
      }else{
         this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
      }
    },
    '$route' (data, oldData)
    { 
      if(data.name === oldData.name){
        this.retrieveData(this.$route.query)
      }
    },
    // 
  },

  methods: {

    removeSort()
    {
      var query = Object.assign({}, this.$route.query);
      delete query.orderPrice;
      delete query.orderRating;

      this.filter.price = "";
      this.filter.rating = "";

      this.$router.push({
          query: query
      }).catch(error => {

      })
    },

    viewDetail(item){
       this.$router.push({
            name: "courseDetail",
            params: {
                id: item.id
            }
      })
    },

    nextPage(){

      var query = Object.assign({}, this.$route.query);
      query.page = this.currentPage;

      this.$router.push({
           query: query
      });

      this.retrieveData(query);
    },

    async retrieveData(query){

      var payload = query;
      payload.page = this.currentPage;


      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
      setTimeout(async () => {
        	const res = await CourseService.searchCourse(payload);
        	if(res.status === 200)
          {
            this.courses = res.data.data;
            this.specialCourses = res.data.listTopCourse;
            this.pageCounts = res.data.pageCounts;
          }
      }, 200);

    }
  }
}

</script>