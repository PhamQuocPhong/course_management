<template>
<v-layout v-resize="onResize">
  <v-container>

    <v-row>
      <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
        <m-menu></m-menu>
      </v-col>

      <v-col cols="12" md="8" :class="{ 'pa-0 mt-4': isMobile }">
        <v-card tile  style="height: 100%;">

          <v-card-title class="border-bottom">Khóa học đã đăng</v-card-title>
          <v-list two-line>
              <v-list-item-group
                v-model="selected"
                active-class="pink--text"
                multiple
              >
                <template v-for="(item, index) in postedCourses">
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
                         
                          <v-rating
                            :value="item.course.rateTotal.total"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                          ></v-rating>

                          <div class="my-4 subtitle-1">
                            <v-icon :color=" item.course.status  ? `green` : ``">mdi-check-bold</v-icon>
                            <span class="ml-2"> {{ item.course.status ? `Đã hoàn thành` : `Chưa hoàn thành` }} </span>
                          </div>

                          <div class="my-4 subtitle-1 red--text font-weight-bold">
                            <p> Số học viên: <code>{{ item.course.studentTotal || 0 }}</code> </p>
                          </div>

                          <v-btn color="primary" small outlined @click="viewDetail(item.course.id)" >Xem</v-btn>
                          
                        </v-card-text>
                    </v-col>
                </v-row>
                  <v-divider
                    v-if="index < postedCourses.length - 1"
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
      selected: [2],
      postedCourses: [],
      currentPage: 1,
      pageCounts: 1,
    }
  },

  created(){
    this.retrieveData();
  },

  methods: {
    async retrieveData()
    {
      const res = await ProfileService.getTeacherCourses();

      if(res.status === 200)
      {
        this.postedCourses = res.data.data;
        this.pageCounts = res.data.pageCounts;
      }
    },

    viewDetail(courseId)
    {
      this.$router.push({
        name: "teacherProfileCourseDetail",
        params: { id: courseId } 
      })
    },

  },


}
</script>