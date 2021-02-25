<template>
<v-layout v-resize="onResize">
  <v-container>

    <v-row>
      <v-col cols="12" md="4" :class="{ 'pa-0': isMobile }">
        <m-menu></m-menu>
      </v-col>
 
      <v-col cols="12" md="8" :class="{ 'pa-0 mt-4': isMobile }"  >
        <v-card tile  style="height: 100%;" v-if="getCourse">

          <v-card-title class="border-bottom">
            {{ getCourse.title }}
            <v-btn outlined color="primary" small @click="addChapter()" class="ml-4">Thêm chương</v-btn>
             <v-btn outlined color="primary" small @click="updateCourse()" class="ml-4">Cập nhật</v-btn>
          </v-card-title>

          <v-row>
            <v-col cols="12">
               <v-card-text >
                <p>Giảng viên: 
                  <span v-for="(item, indexTeacher) in getCourse.courseTeachers" class="font-weight-bold">
                    {{ item.user.name }}<span v-if="indexTeacher < getCourse.courseTeachers.length - 1">, </span>
                  </span>
                </p>

                <p>Tình trạng:
                  <span class="font-weight-bold">
                    {{ getCourse.status === true ? "Đã hoàn thành" : "Chưa hoàn thành"  }}
                  </span>
                </p> 
            <!--     <div class="my-4 subtitle-1">
                  <p class="font-weight-bold mb-2">Ưu đãi: </p>

                  <div v-for="(promotion, indexPromotion) in getCourse.promotions" :key="indexPromotion">
                    <span class=" red--text ">{{ promotion.name }}</span>
                    <p>{{ promotion.description }}</p>
                  </div>
                </div> -->
              </v-card-text>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" v-for="chapter, index in getCourse.courseChapters" :key="index">
              <v-card-text >
                <h3 class="red--text">  Chương {{  showIndexChapter(index) }}:   {{ chapter.name }}</h3>
                <p> <span class="font-weight-bold">Mô tả:</span>  {{ chapter.description }}  </p>
                <div class="d-flex">
                  <v-btn class="mt-2" color="primary" outlined small @click="addDocument(chapter)"> Thêm tài liệu </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn class="mt-2" color="primary" outlined small @click="updateChapter(getCourse, chapter, index)"> Cập nhật chương </v-btn>
                  <v-btn class="mt-2 ml-2" color="red" outlined small @click="removeChapter(chapter, index)" > Xóa chương </v-btn>
                </div>


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

                    <div class="bottom d-flex">
                      <v-btn outlined color="primary" small @click="updateDocument(chapter, courseDocument, documentIndex)">Cập nhật</v-btn>

                       <v-btn outlined color="red" small @click="removeDocument(chapter, courseDocument, documentIndex)" class="ml-4">Xóa</v-btn>
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

  <m-update-course
  v-if="isVisibleFormUpdateCourse"
  :isVisibleFormUpdateCourse.sync="isVisibleFormUpdateCourse"
  :course.sync="getCourse"
   :chapter.sync="chapter"
  >

  </m-update-course>

  <m-add-chapter
  v-if="isVisibleFormAddChapter"
  :isVisibleFormAddChapter.sync="isVisibleFormAddChapter"
  :course.sync="getCourse"
  >
  </m-add-chapter>

  <m-update-chapter
  v-if="isVisibleFormUpdateChapter"
  :isVisibleFormUpdateChapter.sync="isVisibleFormUpdateChapter"
  :course.sync="getCourse"
   :chapter.sync="chapter"
     :chapterIndex.sync="chapterIndex"
  >
  </m-update-chapter>

   <m-add-document
   v-if="isVisibleFormAddDocument"
  :isVisibleFormAddDocument.sync="isVisibleFormAddDocument"
  :course.sync="getCourse"
  :chapter.sync="chapter"
  >
  </m-add-document>

  <m-update-document
   v-if="isVisibleFormUpdateDocument"
  :isVisibleFormUpdateDocument.sync="isVisibleFormUpdateDocument"
  :chapter.sync="chapter"
  :courseDocument.sync="courseDocument"
  :documentIndex="documentIndex"
  >
  </m-update-document>
</v-layout>
</template>

<script type="text/javascript">
// services
import CourseService from "@/services/course";
import ChapterService from "@/services/chapter";
import DocumentService from "@/services/document";

// component
import Menu from './components/Menu.vue';
import AddChapter from './components/AddChapter.vue';
import UpdateChapter from './components/UpdateChapter.vue';
import AddDocument from './components/AddDocument.vue';
import UpdateDocument from './components/UpdateDocument.vue';

import UpdateCourse from './components/UpdateCourse.vue';

// mixins
import IsMobile from "@/mixins/is_mobile";

export default {

  components: {
    'm-menu': Menu,
    'm-add-chapter': AddChapter,
    'm-update-chapter': UpdateChapter,
    'm-add-document': AddDocument,
    'm-update-document': UpdateDocument,

    'm-update-course': UpdateCourse,
  },

  mixins: [IsMobile],

  data(){
    return {
      getCourse: {},
      chapter: {},
      isVisibleFormUpdateCourse: false,
      isVisibleFormAddChapter: false,
      isVisibleFormAddDocument: false,
      isVisibleFormUpdateDocument: false,
      isVisibleFormUpdateChapter: false,
      documentIndex: 0,
      chapterIndex: 0,
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

    async removeDocument(chapter, courseDocument, documentIndex)
    {
      var conf = confirm("Bạn muốn xóa tài liệu này?");
      if(conf)
      {
        const res = await DocumentService.delete(courseDocument.id);
        if(res.status === 200)
        {
           toastr.success(
              "<p> Xóa thành công <p>",
              "Success",
              { timeOut: 3000 }
            );
          chapter.courseDocuments.splice(documentIndex, 1);
        }
      }
    },

    showIndexChapter(index)
    {
      return index+=1;
    },

    addChapter()
    {
      this.isVisibleFormAddChapter = true;
    },

    async removeChapter(chapter, chapterIndex)
    {
      var conf = confirm("Bạn muốn xóa chương này?");
      if(conf)
      {
        const res = await ChapterService.delete(chapter.id);
        if(res.status === 200)
        {
          this.getCourse.courseChapters.splice(chapterIndex, 1);
          toastr.success(
            "<p> Xóa thành công <p>",
            "Success",
            { timeOut: 3000 }
          );

          this.$forceUpdate();
        }
      }
    },

    addDocument(chapter)
    {
      this.chapter = {...chapter};
      this.isVisibleFormAddDocument = true;
    },

    updateChapter(course, courseChapter, chapterIndex)
    {
      this.chapter = {...courseChapter };
      this.chapterIndex = chapterIndex;
      this.isVisibleFormUpdateChapter = true;
    },

    updateDocument(chapter, courseDocument, documentIndex)
    {
      this.chapter = {...chapter };
      this.courseDocument = {...courseDocument};
      this.documentIndex = documentIndex;
      this.isVisibleFormUpdateDocument = true;
    },

    updateCourse()
    {
      this.isVisibleFormUpdateCourse = true;
    }
  },


}
</script>