<template>
  <v-card
  class="item"
    :loading="loading"
  >
    <v-row>
      <v-col cols="5" class="d-flex">
        <v-img 
          height="270"
          
          :aspect-ratio="16/9"
          :src="getItem.avatar"
        ></v-img>

        <v-img
        v-if="!getItem.avatar"
        height="270"
        src="@/assets/img/default.jpg"
        >
        </v-img>
      </v-col>
      <v-col cols="7">
        <v-card-title>{{ getItem.title }}</v-card-title>
          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :value="getItem.rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </v-row>

             <div class="my-4 subtitle-1 red--text font-weight-bold ">
              {{ getItem.price | toCurrency }}
            </div>

            <div>
              <p> Số học viên: <code>{{ getItem.studentTotal }}</code> </p>
            </div>

            <div class="teachers" v-if="getItem.courseTeachers.length">
              <p>Giảng viên: 
                <span v-for="(item, index) in getItem.courseTeachers" class="font-weight-bold">
                  {{ item.user.name }}<span v-if="index < getItem.courseTeachers.length - 1">, </span>
                </span>
              </p>
            </div>
          </v-card-text>
          <v-card-actions class="bottom">
            <div class="text-right">
<!--               <v-btn color="pink" class="mr-2"  outlined small @click="favorite(getItem)"> 
                Yêu thích
              </v-btn> -->
              <v-btn color="primary"  outlined small @click="viewDetail(getItem)">  Xem chi tiết</v-btn>
            </div>
          </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss">
.item {
  .bottom{
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>

<script>
// services 
import CookieService from "@/services/cookie";

export default {

  props: {
    item: Object
  },

  data: () => ({
    loading: false,
    selection: 1,
  }),

  computed: {
    getItem: {
      get(){
        return this.item
      }
    },
  },

  methods: {
    viewDetail(course){
      this.$router.push({
        name: "courseDetail",
        params: {
          id: course.id
        }
      })
    }
  },


}
</script>
