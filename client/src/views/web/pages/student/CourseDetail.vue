<template>
<v-layout v-resize="onResize">
  <v-container>

    <v-row>
      <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
        <m-menu></m-menu>
      </v-col>

      <v-col cols="12" md="8" :class="{ 'pa-0 mt-4': isMobile }"  v-if="getCourse">
        <v-card tile  style="height: 100%;">

          <v-card-title class="border-bottom" >
            {{ getCourse.title }}
          </v-card-title>

          <v-row>
            <v-col cols="12" v-for="chapter, index in getCourse.courseChapters" :key="index">
              <v-card-text >
                <h3 class="red--text">  Chương {{ index+=1 }}:   {{ chapter.name }}</h3>

                <v-expansion-panels
                multiple
                class="pt-4"
                v-if="chapter.courseDocuments"
               >
                  <v-expansion-panel
                    v-for="(courseDocument, documentIndex) in chapter.courseDocuments"
                    :key="documentIndex"
                  >
                    <v-expansion-panel-header>
                      <h3>{{ courseDocument.name }} </h3>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content  v-if="courseDocument.preview">

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
import DocumentService from "@/services/document";

// component
import Menu from './components/Menu.vue';


// mixins
import IsMobile from "@/mixins/is_mobile";

export default {

  components: {
    'm-menu': Menu,

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
  },


}
</script>