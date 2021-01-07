<template>
	<v-container>
		<v-row v-show="show">
			<v-col cols="12" sm="8" md="8" lg="8">

				<v-card >
					
					<v-img v-if="course.image"  :src="course.image"></v-img>

					<v-img v-else src="@/assets/img/default.png"></v-img>
	
					<v-tabs
				      v-model="tab"
				      background-color="transparent"
				      color="basil"
				      grow
				    >
				      <v-tab
				        v-for="item in tabs"
				        :key="item"
				      >
				        {{ item }}
				      </v-tab>
				    </v-tabs>

				    <v-tabs-items v-model="tab">

				    	<!-- For info -->
				      <v-tab-item
				        :key="tabs[0]"
				      >
				        <v-card
				          color="basil"
				          flat
				        >
				        	<v-card-title>{{ course.title }}</v-card-title>
				          <v-card-text>
				            <v-row
				              align="center"
				              class="mx-0"
				            >

				            </v-row>

				            <div class="my-4 subtitle-1 red--text font-weight-bold">
				              {{ course.price }} triệu VNĐ
				            </div>

				            <div>
				              <code>{{course.area}}m<sup>2</sup></code>
				            </div>

				        </v-card-text>

					        <v-col cols="12" v-html="course.description">

					        </v-col>
				        </v-card>
				      </v-tab-item>

				      <!-- For rating -->

				      <v-tab-item
				        :key="tabs[1]"
				      >
				        <v-card
				          color="basil"
				          flat
				        >
				        	<v-card-text>
				        	 <v-rating
				                :value="course.rating"
				                color="amber"
				                dense
				                half-increments
				                readonly
				                size="20"
				              ></v-rating>
				            </v-card-text>

				            <v-card-text>
				              <h3>Lượt đánh giá: </h3>
				              <m-rating :ratings="course.ratings">
				              </m-rating>
							</v-card-text>
				      
				        </v-card>
				      </v-tab-item>
				    </v-tabs-items>
				</v-card>
			</v-col> 

			<v-col cols="12" sm="4" md="4" lg="4">
				<v-card v-if="motel.user">
					<v-card-title>{{ motel.user.name }}</v-card-title>
					<v-card-text><b>Họ tên:</b> {{ motel.user.phone }}</v-card-text>
					<v-card-text><b>Địa chỉ:</b> {{ motel.user.address }}</v-card-text>
					
					<v-card-text>
						<v-btn small outlined @click="openWindowChat(motel.user)">
							Chat với người bán
							<v-icon>mdi-account</v-icon>
						</v-btn>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-text>AAAAAAAAA</v-card-text>
				</v-card>
			</v-col> 
		</v-row>
	</v-container>
</template>

<script type="text/javascript">

// components	
import Carousel from "./components/detail/Carousel"
import Rating from "./components/detail/Rating"

//mixin
import IsMobile from "@/mixins/is_mobile";
export default {

	mixins: [IsMobile],

    components: {
    	'm-carousel': Carousel,
    	'm-rating': Rating
	},

	data(){
		return {

			show: false,
	        tab: 0,
	        tabs: [
	          'Thông tin chi tiết', 'Lượt đánh giá', 
	        ],
	         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		}
	},

	async created(){
		this.retrieveData();
	},

	computed: {
		course: {
			get(){
				return this.$store.getters["motels/course"];
			},

			set(){

			}
		}, 

		getImages: {
			get(){
				return this.$helper.convertStringToArrayImage(this.course.images)
			}
		},

	},

	watch: {
	    course(data){
	    if(data)
	        this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
	    	this.show = true;
	    }
	},

	methods: {
		retrieveData(){
	      var payload = { id: this.$route.params.id }
	      this.$store.dispatch("components/actionProgressHeader", { option: "show" })

	      setTimeout(async () => {
	        this.$store.dispatch("motels/fetch", payload);
	      }, 200);
	    },


	},

	beforeDestroy(){
		this.$store.commit("motels/DESTROY_MOTEL")
	}
}	

</script>