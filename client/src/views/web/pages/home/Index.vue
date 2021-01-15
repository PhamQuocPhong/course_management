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
			<v-col cols="12" sm="6" md="6" lg="3" v-for="item in labels">
				<v-card>
					<v-card-title absolute>{{ item.title }}</v-card-title>
					<v-img :src="item.image" height="200" ></v-img>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<h2>Quan tâm nhất</h2>

			<v-row v-if="mostJoinCourses.length">
				<v-col cols="12"  sm="12" md="6" lg="6" v-for="(item, index) in mostJoinCourses">
					<m-item :item="item" :key="item.id"></m-item>
				</v-col>
			</v-row>
		</v-row>

		<v-row>
			<h2>Xem nhiều nhất</h2>

			<v-row v-if="mostWatchingCourses.length">
				<v-col cols="12"  sm="12" md="6" lg="6" v-for="(item, index) in mostWatchingCourses">
					<m-item :item="item" :key="item.id"></m-item>
				</v-col>
			</v-row>
		</v-row>

		<v-row>
			<h2>Mới nhất</h2>

			<v-row v-if="newestCourses.length">
				<v-col cols="12"  sm="12" md="6" lg="6" v-for="(item, index) in newestCourses">
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
	            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
	          },
	          {
	            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
	          },
	          {
	            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
	          },
	          {
	            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
	          },
			],

			labels: [
				{
					title: "Rẻ nhất",
					image: "https://avatars2.githubusercontent.com/u/45070636?s=460&u=198666aa3eb37f3e7b6fd8e745d53385ffa6ee8f&v=4",
				},
				{
					title: "Hay nhất",
					image: "https://avatars2.githubusercontent.com/u/45070636?s=460&u=198666aa3eb37f3e7b6fd8e745d53385ffa6ee8f&v=4",
				},
				{
					title: "Quan tâm nhiều nhất",
					image: "https://avatars2.githubusercontent.com/u/45070636?s=460&u=198666aa3eb37f3e7b6fd8e745d53385ffa6ee8f&v=4",
				},
				{
					title: "Rẻ nhất",
					image: "https://avatars2.githubusercontent.com/u/45070636?s=460&u=198666aa3eb37f3e7b6fd8e745d53385ffa6ee8f&v=4",
				}
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