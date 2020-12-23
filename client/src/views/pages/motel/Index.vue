<template>
	<v-container>
    <v-row>
      <v-flex :class="{ 'pa-4': !isMobile }">
        <v-card flat>


          <v-row no-gutter >
              <v-col cols="12" sm="3" md="2" lg="2">
                <filter-form
                label="Quận, huyện"
                :items="district"
                :data.sync="filterAddress.district"
                ></filter-form>
              </v-col>

              <v-col cols="12" sm="3" md="2" lg="2">
                <filter-form
                label="Phường, xã"
                :items="ward"
                :data.sync="filterAddress.ward"
                ></filter-form>
              </v-col>

               <v-col cols="12" sm="3" md="2" lg="2">
                
              </v-col>
          </v-row>

          <v-layout
            v-resize="onResize"
            column
            class="table"
            :class="{ 'mt-4': isMobile }"
            v-if="motels.length"
          >
            <v-row>
              <v-col v-for="(item, index) in motels" cols="12" :key="item.id">
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
import Filter from "./components/index/Filter";
import MItem from "./components/index/Item";
import ComponentStore from "@/store/modules/component";


//mixin
import IsMobile from "@/mixins/is_mobile";

// store
export default {

	mixins: [IsMobile],

    components: {
    	'filter-form': Filter,
    	'm-item': MItem
	},

	data(){
		return {

	    itemsPerPage: this.$constant.pagination.ITEMS_PER_PAGE,
	    isLoading: false,

			district: [],
			ward: [],

			filterAddress: {
				district: "",
				ward: "",
			},


			filterCost: {
				min: "",
				max: ""
			},

		}
	},

  created(){

    this.retrieveData();
      
  },

  computed: {
    currentPage: {
      get(){
         return this.$store.getters["motels/currentPage"]
      },
      set(page){
        this.$store.commit('motels/UPDATE_CURRENT_PAGE', page)
      }
    },
    pageCounts(){
      return this.$store.getters["motels/pageCounts"]
    },

    motels: {
      get(){
        return this.$store.getters["motels/motels"];
      }
    }
  },

  watch: {
    motels(data){
      if(data.length)
         this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
    }
  },

  methods: {

    viewDetail(item){
      var id = item._id;
      this.$router.push(this.$route.path + '/' + id);
    },

    nextPage(){
      this.retrieveData();
    },

    retrieveData(){
      var payLoad = {
        currentPage: this.currentPage
      };
      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
      setTimeout(async () => {
        this.$store.dispatch("motels/fetchPaging", payLoad);
      }, 200);

    }
  }
}

</script>