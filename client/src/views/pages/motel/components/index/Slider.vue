<template>
  <v-layout row justify-center>
    <v-container>
      <v-dialog
        persistent
        max-width="500"
        v-model="isVisible"
      >
        <v-card
          class="pb-8"
        >
          <div class="d-flex border-bottom" >
            <v-card-title primary-title style="width:100%;">
              Upload avatar
            </v-card-title>
             
          </div>
        </v-card>
    </v-dialog>
    </v-container>
  </v-layout>
</template>
<style scoped="">

.content {
  display: flex;
  justify-content: space-between;
}
.cropper-area {
  width: 350px;
}


</style>

<script>
import DropZone from "@/components/custom/DropZone.vue";
import Modal from "@/store/models/modal";
import User from "@/store/models/user";

export default {

  components: {
    'dropzone': DropZone
  },
    
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },

  },


  data() {
    return {
      imgSrc: null,
      cropImg: null,
      data: {
        left: 92,
        top: 36.9375,
        width: 250,
        height: 350,
      },
      userInfo: this.$cookies.get('dataUser'),
    };
  },

  mounted(){
    this.setImage();
    this.setCropBoxData();
  },


  methods: {
    close(){
     this.$emit('update:isVisible', false) 
    },

    async save(){

    },


  },


};
</script>
