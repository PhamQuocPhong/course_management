<template>
	<v-container  v-show="show">

		<v-row >
			<v-col cols="12" sm="8" md="8" lg="8">

				<v-card v-if="course">
					<v-img v-if="course.avatar"  :src="course.avatar"></v-img>

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
				        	<v-card-title>
				        		<span> {{ course.title }} </span>
				        		<div class="blockBtn" v-bind:style="{position: style.position, right: style.right + 'px' }">

				        			<v-btn
					        		v-if="myCourseIds.includes(course.id) || joined"
					        		class="text-right mr-4" 
					        		outlined 
					        		small 
					        		color="primary"
					        		readonly
					        		>
					        			<v-icon>mdi-check-bold</v-icon>
					        			Đã tham gia
					        		</v-btn>


					        		<v-btn
					        		v-else 
					        		@click="enrollCourse(course.id)"
					        		class="text-right mr-4" 
					        		outlined 
					        		small 
					        		color="primary"
					        		>
					        			<v-icon>mdi-heart-circle</v-icon>
					        			Tham gia
					        		</v-btn>

					        		<v-btn 
					        		v-if="myFavoriteCourseIds.includes(course.id) || liked"
					        		class="text-right" 
					        		outlined 
					        		small 
					        		color="pink"
					        		>
					        			<v-icon>mdi-check-bold</v-icon>
					        			Đã thích
					        		</v-btn>

					        		<v-btn 
					        		v-else
					        		@click="handleLikeCourse(course)"
					        		class="text-right" 
					        		outlined 
					        		small 
					        		color="pink"

					        		>
					        			<v-icon>mdi-heart-circle</v-icon>
					        			Yêu thích
					        		</v-btn>
					        	</div>
				        	</v-card-title>

				          <v-card-text>
				            <v-row
				              align="center"
				              class="mx-0"
				            >
				            </v-row>

				            <div class="my-4" v-if="course.price && course.promotions.length">
				              <p class="text-decoration-line-through"> {{ course.price | toCurrency }} </p>
				            </div>
				         	
				            <div class="my-4 subtitle-1 red--text font-weight-bold">
				              {{ course.priceFinal | toCurrency }} 
				            </div>

				            <div>
				              <p> <span class="font-weight-bold" >Số học viên: </span> <code>{{ course.studentTotal || 0 }}</code> </p>
				            </div>

				            <div class="my-4 subtitle-1" v-if=" course.promotions && course.promotions.length">
				              <h2 class="font-weight-bold mb-2">Ưu đãi: </h2>

				              <div v-for="(promotion, index) in course.promotions">
				              	<span class=" red--text ">{{ promotion.name }}</span>
				              	<p>  {{ promotion.description }}</p>
				              </div>
				            </div>

				             <div class="my-4 subtitle-1">
				             	  <p>  <span class="font-weight-bold" >Mô tả: </span> {{ course.description }}</p>
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
				        	<v-card-text class="d-flex">
				        	 <v-rating
				                :value=" course.hasOwnProperty('rateTotal') ? course.rateTotal.total : 0"
				                color="amber"
				                dense
				                half-increments
				                readonly
				                size="20"
				              ></v-rating>
				              	<v-spacer></v-spacer>

				              	<v-btn v-if="myCourseIds.includes(course.id) || joined" 
				              	outlined small color="primary" 
				              	@click="addRating(course)"
				              	>
				              		Đánh giá
				          		</v-btn>
				            </v-card-text>

				            <v-card-text>
				              <h3>Lượt đánh giá: </h3>

				             <v-list two-line >
							      <v-list-item-group
							        active-class="pink--text"
							        multiple
							      >
							        <template  v-for="(item, index) in course.rates"> 
							          <v-list-item  :key="index">
							            <template v-slot:default="{ active }">
							              <v-list-item-content>
							                <v-list-item-title v-text="item.user.name"></v-list-item-title>

							                <v-list-item-subtitle v-text="item.comment"></v-list-item-subtitle>
							              </v-list-item-content>

							              <v-list-item-action>
							                    <v-rating
							                        :value="item.point"
							                        color="amber"
							                        dense
							                        half-increments
							                        readonly
							                        size="20"
							                      ></v-rating>
							              </v-list-item-action>
							            </template>
							          </v-list-item>

							          <v-divider
							            v-if="index < course.rates.length - 1"
							           
							          ></v-divider>
							        </template>
							      </v-list-item-group>
							  </v-list>
							</v-card-text>
				      
				        </v-card>
				      </v-tab-item>

				       <v-tab-item
				        :key="tabs[2]"
				      >
				        <v-card
				          color="basil"
				          flat
				        >
				        	<v-card-title>
				        	 	Tài liệu sơ bộ: 
				        	</v-card-title>
			            	<v-col cols="12" v-for="chapter, index in course.courseChapters" :key="index">
				              <v-card-text  v-if="chapter.preview">
				                <h3 class="red--text">  Chương {{  index+=1 }}:   {{ chapter.name }}</h3>
				                <p> <span class="font-weight-bold">Mô tả:</span>  {{ chapter.description }}  </p>

				                <v-expansion-panels
				                multiple
				                class="pt-4"
				                v-if="chapter.courseDocuments"
				               >
				                  <v-expansion-panel
				                    v-for="(courseDocument, documentIndex) in chapter.courseDocuments"
				                    :key="documentIndex"
				                    v-if="courseDocument.preview"
				                  >
				                    <v-expansion-panel-header>
				                      <h3>{{ courseDocument.name }} </h3>
				                    </v-expansion-panel-header>
				                    <v-expansion-panel-content>

				                      <div>
				                         <p >
				                         Mô tả: {{ courseDocument.description }}
				                        </p>
				                      </div>

				                      <div v-if="courseDocument.type === 0">
				                        <p >
				                         Tài liệu: <a  v-if="courseDocument.link" target="_blank"  :href="courseDocument.link"> {{ courseDocument.link }} </a>
				                        </p>
				                      </div>
				                      <div v-else-if="courseDocument.type === 1">
				                        Video: 

				                        <video width="100%" height="350" controls>
				                          <source :src="courseDocument.link" type="video/mp4">
				                        Your browser does not support the video tag.
				                        </video>
				                      </div>

				                    </v-expansion-panel-content>  
				                  </v-expansion-panel>
				                </v-expansion-panels>
				              </v-card-text>
            				</v-col>
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
						<v-card-text><b>Info:</b> {{ item.user.info }}</v-card-text>
					</div>

	
				</v-card>
			</v-col> 
		</v-row>

		<v-row>
			<div class="title">
				<h2> 
					<span>Khóa học liên quan</span>
				</h2>
			</div>
		</v-row>
					<v-row v-if="relatedCourses.length">
				<v-col cols="12"  sm="12" md="6" lg="6" v-for="(item, index) in relatedCourses" :key="item.id">
					<m-item :item="item" :key="item.id"></m-item>
				</v-col>
			</v-row>
		<m-add-rating
		v-if="isVisibleFormRating"
		title="Đánh giá"
		:ratings.sync="course.rates"
		:course="course"
		:myRating.sync="myRating"
		:isVisibleFormRating.sync="isVisibleFormRating"
		>
		</m-add-rating>
	</v-container>
</template>

<script type="text/javascript">

// components	
import Rating from "./components/detail/ListRating.vue";
import AddRating from "./components/detail/AddRating";

import CookieService from "@/services/cookie";
import CourseService from "@/services/course";
import UserService from "@/services/user";
import ProfileService from "@/services/profile";

import MItem from "./components/index/Item";

//mixin
import IsMobile from "@/mixins/is_mobile";
export default {

	mixins: [IsMobile],

    components: {
    	'm-rating': Rating,
    	'm-add-rating': AddRating,
    	'm-item': MItem
	},

	data(){
		return {

			show: false,
	        tab: 0,
	        tabs: [
	          'Thông tin chi tiết', 'Lượt đánh giá', 'Tài liệu' 
	        ],
	         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
	        course: {},
	        relatedCourses: [],
	        isVisibleFormRating: false,

	        myCourseIds: [],
	        myFavoriteCourseIds: [],
	        liked: false,
	        joined: false,
	        myRating: {},
		}
	},

	computed: {
		style: {
			get()
			{
				return {
					position: this.isMobile === true ? "relative" : "absolute",
	        		right: 10,
				}
			}
		},
		userInfo()
		{
			return CookieService.get("userInfo");
		},
		accessToken()
		{
			return CookieService.get("accessToken");
		}
	},

	async created(){

		if(this.userInfo)
		{
			this.getMyCourses();
			this.getMyFavoriteCourses();
			this.getMyRatingOfCourse(this.$route.params.id);
		}

		this.retrieveData();
	},

	watch: {
	    course(data){
	    if(data)
	        this.$store.dispatch("components/actionProgressHeader", { option: "hide" })
	    	this.show = true;
	    },

	    '$route'(data, oldData)
	    {
	    	if(data.name === oldData.name)
	    	{
	    		this.retrieveData();
	    	}
	    }
	},

	methods: {

		async handleLikeCourse(course)
		{
			if(!this.accessToken)
			{
				this.$router.push({
					name: "login"
				});
			}

			const res = await UserService.handleFavoriteCourse(course.id)
			if(res.status === 200)
			{
				this.liked = true;
				toastr.success("Bạn vừa thêm vào danh sách yêu thích", this.$lang.SUCCESS, { timeOut: 1000 });

			}
		},

		addRating(course)
		{
			this.isVisibleFormRating = true;
		},

		async enrollCourse(courseId)
		{
			if(!this.accessToken)
			{
				this.$router.push({
					name: "login"
				});
			}
			
			const res = await UserService.joinCourse(courseId);
			if(res.status === 200)
			{
				this.joined = true;
				toastr.success("Tham giá khóa học thành công", this.$lang.SUCCESS, { timeOut: 1000 });
			}
		},	

		async getMyCourses(userId)
		{
			const res = await ProfileService.getMyCourse(userId);
			if(res.status === 200)
			{
				this.myCourseIds = res.data.data.map(item => item.courseId);
			}
		},

		async getMyFavoriteCourses(userId)
		{
			const res = await ProfileService.getFavoriteCourse(userId);
			if(res.status === 200)
			{
				this.myFavoriteCourseIds = res.data.data.map(item => item.courseId);
			}
		},

		async getMyRatingOfCourse(courseId)
		{
	      	const res = await ProfileService.getMyRatingOfCourse(courseId);
		      if(res.status === 200)
		      {
		      	this.myRating = res.data.data;
		      }
		},

		async retrieveData()
		{
	      var id = this.$route.params.id;
	      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
	      setTimeout(async () => {



	      	var res = await CourseService.fetch(id);
	      	this.course = res.data.data
	      	this.relatedCourses = res.data.courseList;
	      }, 200);
	    },
	},


}	

</script>