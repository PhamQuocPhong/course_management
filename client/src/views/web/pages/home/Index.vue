<template>
<div id="home">
	<m-header></m-header>
	<v-container>
		<v-row>
			<v-col cols="12" md="3" lg="3" class="pa-0">
				<v-card>
					<m-menu></m-menu>
				</v-card>
			</v-col>

			<v-col cols="12" md="9" lg="9" class="pa-0">
				<v-card>
					<m-carousel fluid :items.native="sliders"></m-carousel>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<div class="title">
				<h2> 
					<span>Mới nhất </span>
				</h2>
			</div>

			<v-row v-if="newestCourses.length">
				<v-col cols="12"  sm="12" md="6" lg="6" v-for="(item, index) in newestCourses" :key="item.id">
					<m-item :item="item" :key="item.id"></m-item>
				</v-col>
			</v-row>
		</v-row>
	

		<v-row>
			<div class="title">
				<h2> 
					<span>Quan tâm nhất </span>
				</h2>
			</div>

			<v-row v-if="mostJoinCourses.length">
				<v-col cols="12"  sm="12" md="6" lg="6" v-for="(item, index) in mostJoinCourses" :key="item.id">
					<m-item :item="item" :key="item.id"></m-item>
				</v-col>
			</v-row>
		</v-row>

		<v-row>
			<div class="title">
				<h2> 
					<span>Xem nhiều nhất </span>
				</h2>
			</div>

			<v-row v-if="mostWatchingCourses.length">
				<v-col cols="12"  sm="12" md="6" lg="6" v-for="(item, index) in mostWatchingCourses" :key="item.id">
					<m-item :item="item" :key="item.id"></m-item>
				</v-col>
			</v-row>
		</v-row>


	</v-container>
	<v-main>
				
	</v-main>
	<m-footer></m-footer>
</div>
</template>

<style lang="scss">


</style>

<script type="text/javascript">
// components
import Header from "@/views/web/layouts/partials/Header.vue";
import Footer from "@/views/web/layouts/partials/Footer.vue";
import Carousel from "./components/Carousel";
import MenuNavigation from "./components/Menu";

import Item from "./components/Item";

// services
import HomeService from "@/services/home";

export default {

	components: {
		'm-header': Header,
		'm-footer': Footer,
		'm-carousel': Carousel,
		'm-menu': MenuNavigation,
		'm-item': Item,
	},

	data(){
		return {
			sliders: [
			  {
	            src: 'node.jpg',
	          },
	          {
	           src: 'php.jpg',
	          },
	          {
	            src: 'vue.jpg',
	          },
	          {
	            src: 'flutter.jpg',
	          },
			],

			mostJoinCourses: [],	
			mostWatchingCourses: [],
			newestCourses: [],
			mostRatingCourses: [],
		}
	},

	created(){
		this.retrieveData();
	},

	methods: {
		async retrieveData(){
			const newestCoursesResponse = await HomeService.getNewestCourses();
			if(newestCoursesResponse.status === 200){
				this.newestCourses = newestCoursesResponse.data.data;
			
			}

			const mostWatchingCoursesResponse = await HomeService.getMostJoinCourses();
			if(mostWatchingCoursesResponse.status === 200){
				this.mostWatchingCourses = mostWatchingCoursesResponse.data.data;
			}

			const mostJoinCoursesResponse = await HomeService.getMostJoinCourses();
			if(mostJoinCoursesResponse.status === 200){
				this.mostJoinCourses = mostJoinCoursesResponse.data.data;
			}

			const mostRatingCoursesResponse = await HomeService.getMostRatingCourses();
			if(mostRatingCoursesResponse.status === 200){
				this.mostRatingCourses = mostRatingCoursesResponse.data.data;
			}
		}
	}
}
</script>