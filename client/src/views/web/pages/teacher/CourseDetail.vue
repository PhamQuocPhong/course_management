<template>
<v-layout v-resize="onResize">
  <v-container>

    <v-row>
      <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
        <m-menu></m-menu>
      </v-col>

      <v-col cols="12" md="8" :class="{ 'pa-0': isMobile }"  v-if="getCourse">
        <v-card tile  style="height: 100%;">

          <v-card-title class="border-bottom">{{ getCourse.title }}</v-card-title>

          <v-row>
            <v-col cols="12" v-for="chapter, index in getCourse.courseChapters" :key="index">
              <v-card-text >
                <h3> {{ chapter.name }}</h3>
                <v-btn class="mt-2" color="primary" outlined small @click="addDocument(chapter)"> Thêm tài liệu </v-btn>

                <v-expansion-panels
                multiple
                class="pt-4"
                v-if="chapter.courseDocuments"
               >
                  <v-expansion-panel
                    v-for="(courseDocument, index) in chapter.courseDocuments"
                    :key="index"
                  >
                    <v-expansion-panel-header>
                      Item
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-layout>
</template>

<script type="text/javascript">
// services
import CourseService from "@/services/course";


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
      getCourse: {},
    }
  },

  created(){
    var id = this.$route.params.id;

    this.retrieveData(id);
  },

  methods: {
    async retrieveData(courseId)
    {
      const res = await CourseService.fetch(courseId);

      if(res.status === 200)
      {
        this.getCourse = res.data.data;
      }
    },

    addDocument(chapter)
    {
      chapter.courseDocuments.push({
        id: 1
      })
    }
  },


}
</script>