<template>
	<v-container>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat>
          <v-row no-gutter>
            <h2>HHEHE</h2>
          </v-row>

          <v-layout
            v-resize="onResize"
            column
            class="table"
            :class="{ 'mt-4': isMobile }"
            v-if="courses.length"
          >
            <v-row>
              <v-col v-for="(item, index) in courses" cols="12" lg="9" :key="item.id">
                <m-item 
                :item="item" 
                v-on:action="viewDetail(item)"
                >
                  
                </m-item>
              </v-col>
            </v-row>
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

// components
import MItem from "./components/index/Item";

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
	},

	data(){
		return {
		currentPage: 1,	
		pageCounts: 1,	
		courses: [],

	    itemsPerPage: this.$constant.pagination.ITEMS_PER_PAGE,
	    isLoading: false,
	    isVisiblePriceModal: false,

	      sort: [
	        {
	          key: "price_asc",
	          name: "Giá thấp nhất"
	        },
	         {
	          key: "price_desc",
	          name: "Giá cao nhất"
	        }
      ]
		}
	},


  created(){

    this.retrieveData(this.$route.query);
  },



  watch: {
    courses(data){
      if(data.length)
         this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
    },
  },

  methods: {


    viewDetail(item){
      var id = item._id;
       this.$router.push({
            name: "motelDetail",
            params: {
                id: item._id
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
        	const res = await CourseService.fetchPaging(payload);
        	console.log(res);
      }, 200);

    }
  }
}

</script>