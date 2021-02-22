<template>
<v-layout v-resize="onResize">
  <v-container>

    <v-row>
      <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
        <m-menu></m-menu>
      </v-col>

      <v-col cols="12" md="8" :class="{ 'pa-0 mt-4': isMobile }">
        <v-card tile  style="height: 100%;">

          <v-card-title class="border-bottom">Khóa học yêu thích</v-card-title>

          <v-list two-line>
              <v-list-item-group
                v-model="selected"
                active-class="pink--text"
                multiple
              >
                <template v-for="(item, index) in favoriteCourses">
                  <v-row>
                      <v-col cols="5">
                        <v-img 
                          v-if="item.course.avatar"
                          width="100%"
                          height="auto"
                          :src="item.course.avatar"
                          contain
                          :aspect-ratio="16/9"
                        ></v-img>

                        <v-img
                        v-else
                        width="100%"
                        height="auto"
                        contain
                        :aspect-ratio="16/9"
                        src="@/assets/img/default_course.png"
                        >

                        </v-img>
                      </v-col>
                      <v-col cols="7">
                          <v-card-title>{{ item.course.title }}</v-card-title>
                            <v-card-text>
                              <v-row
                                align="center"
                                class="mx-0"
                              >
                                <v-rating
                                  :value="item.course.rating"
                                  color="amber"
                                  dense
                                  half-increments
                                  readonly
                                  size="14"
                                ></v-rating>

                              </v-row>
                               <v-row class="pa-4">
                                  <v-btn outlined color="red" small @click="removeFavoriteCourse(item.course.id, index)">Bỏ thích</v-btn>
                                </v-row>
                            </v-card-text>
                        </v-col>
                </v-row>

                  <v-divider
                    v-if="index < favoriteCourses.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-layout>
</template>

<script type="text/javascript">
// services
import ProfileService from "@/services/profile";
import CookieService from "@/services/cookie";

// component
import Menu from './components/Menu.vue';

// mixins
import IsMobile from "@/mixins/is_mobile";

export default {

  components: {
    'm-menu': Menu
  },

  mixins: [IsMobile],

  data(){
    return {
      userId: CookieService.get('userInfo').id,
      selected: [2],
      favoriteCourses: [],
      currentPage: 1,
      pageCounts: 1,
    }
  },

  created(){
    this.retrieveData(this.userId);
  },

  methods: {
    async retrieveData(userId){
      const res = await ProfileService.getFavoriteCourse(userId);

      if(res.status === 200)
      {
        this.favoriteCourses = res.data.data;
        this.pageCounts = res.data.pageCounts;
      }
    },
    async removeFavoriteCourse(courseId, index)
    {
       const res = await ProfileService.removeFavoriteCourse(courseId);
        if(res.status === 200)
        {
          this.favoriteCourses.splice(index, 1);
        }
    }
  },


}
</script>