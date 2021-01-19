<template>
	<v-container  v-show="show">
		<v-row>
			<v-col cols="12" sm="8" md="8" lg="8">

				<v-card >
					
					<v-img v-if="course.image"  :src="course.image"></v-img>

					<v-img v-else src="@/assets/img/default.jpg"></v-img>
	
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

				            <p>{{ course.description }}</p>

				            <div class="my-4 subtitle-1 red--text font-weight-bold">
				              {{ course.price | toCurrency }} VNĐ
				            </div>

				             <div>
				              <p> Số học viên: <code>{{ course.studentTotal }}</code> </p>
				            </div>


				        </v-card-text>

					        <v-col cols="12" v-html="course.fullDescription">

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
				                :value=" course.hasOwnProperty('rateTotal') ? course.rateTotal.total : 0"
				                color="amber"
				                dense
				                half-increments
				                readonly
				                size="20"
				              ></v-rating>
				            </v-card-text>

				            <v-card-text>
				              <h3>Lượt đánh giá: </h3>
				              <m-rating :ratings="course.rates">
				              </m-rating>
							</v-card-text>
				      
				        </v-card>
				      </v-tab-item>
				    </v-tabs-items>
				</v-card>
			</v-col> 

			<v-col cols="12" sm="4" md="4" lg="4">
				<v-card>
					<v-subheader>Giảng viên: </v-subheader>

					<div v-for="(item, index) in course.courseTeachers">
						<v-divider></v-divider>
						<v-card-title>Họ tên: <router-link class="pl-2" :to="`/users/${item.user.id}`" >{{ item.user.name }}</router-link></v-card-title>
						<v-card-text><b>Email:</b> {{ item.user.email }}</v-card-text>
					</div>

		
					<v-card-text>AAAAAAAAA</v-card-text>
				</v-card>
			</v-col> 
		</v-row>

		<v-row>
			<div class="title">
				<h2> 
					<span>Khóa học liên quan</span>
				</h2>
			</div>

			<!-- <v-row v-if="newestCourses.length">
				<v-col cols="12"  sm="12" md="6" lg="6" v-for="(item, index) in newestCourses" :key="item.id">
					<m-item :item="item" :key="item.id"></m-item>
				</v-col>
			</v-row> -->
		</v-row>
	</v-container>
</template>

<script type="text/javascript">

// components	
import Rating from "./components/detail/ListRating";
import CourseService from "@/services/course";

//mixin
import IsMobile from "@/mixins/is_mobile";
export default {

	mixins: [IsMobile],

    components: {
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
	        course: {},
		}
	},

	async created(){
		this.retrieveData();
	},

	watch: {
	    course(data){
	    	console.log(data);
	    if(data)
	        this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
	    	this.show = true;
	    }
	},

	methods: {
		retrieveData(){
	      var id = this.$route.params.id;
	      this.$store.dispatch("components/actionProgressHeader", { option: "show" })

	      setTimeout(async () => {
	      	var res = await CourseService.fetch(id);
	      	this.course = res.data.data
	      }, 200);
	    },


	},

}	

</script>