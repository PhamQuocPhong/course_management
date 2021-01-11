<template>
<v-layout v-resize="onResize">
  <v-container>
    <v-row>
      <label-table title="Profile"> </label-table>
    </v-row>

    <v-row>
      <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
        <m-menu></m-menu>
      </v-col>

      <v-col cols="12" md="8" :class="{ 'pa-0': isMobile }">
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
                          v-if="item.images"
                          width="100%"
                          height="auto"
                          :src="$helper.getMainImageMotel(item.images)"
                          contain
                          :aspect-ratio="16/9"
                        ></v-img>

                        <v-img
                        v-else
                        width="100%"
                        height="auto"
                        contain
                        :aspect-ratio="16/9"
                        src="@/assets/img/default.png"
                        >

                        </v-img>
                      </v-col>
                      <v-col cols="7">
                      <v-card-title>{{ item.title }}</v-card-title>
                        <v-card-text>
                          <v-row
                            align="center"
                            class="mx-0"
                          >
                            <v-rating
                              :value="item.rating"
                              color="amber"
                              dense
                              half-increments
                              readonly
                              size="14"
                            ></v-rating>

                          </v-row>

                          <div class="my-4 subtitle-1 red--text font-weight-bold">
                            {{ item.price }} triệu VNĐ
                          </div>

                          <div>
                            <code>{{item.area}}m<sup>2</sup></code>
                          </div>

                          <div class="my-4 subtitle-1 text-decoration-underline" v-if="item.has_furniture">
                            Có nội thất
                          </div>
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
import Course from "@/services/course";
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
      userId: CookieService.get('userInfo')._id,
      selected: [2],
      postedCourses: [],
      currentPage: 1,
      pageCounts: 1,
    }
  },

  created(){
    this.retrieveData(this.userId);
  },

  methods: {
    async retrieveData(userId){
      const res = await Course.getAllByOwner(userId);
      if(res.status === 200)
      {
        this.postedCourses = res.data.data;
        this.pageCounts = res.data.pageCounts;
      }
    }
  },


}
</script>