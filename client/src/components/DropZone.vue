<template>
  <vue-dropzone
    ref="myVueDropzone"
    id="upload"
    :options="dropzoneOptions"
    @vdropzone-drag-drop="remove"
    @vdropzone-complete="complete"
    @vdropzone-removed-file="remove"
    :useCustomSlot="true"
    v-model="getData"
  >
    <div class="dropzone-custom-content">
      <h3 class="dropzone-custom-title">ドラッグとドロップして、コンテンツをアップロード。</h3>
      <v-icon>mdi-cloud-upload</v-icon>
    </div>
  </vue-dropzone>
</template>

<script>

import UploadService from "@/services/upload";

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";


export default {
  name: "uploadFile",
  props: ['data', 'maxFiles'],

  components: {
    vueDropzone: vue2Dropzone
  },

  created(){
    if(this.data.length){
      this.$refs.myVueDropzone
    }
  },

  data: function() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 10, // 10 MB
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        uploadMultiple: true,
        dictRemoveFile: 'Xóa',
        maxFiles: 2,
      },
      getData: [],
      fileTemp: [],
    };
  },

  watch: {
    data(data){
      if(data.length <= 0){
        this.$refs.myVueDropzone.removeAllFiles();
      }
    }
  },

  methods: {

    async complete(file) {

      const formData = new FormData();
      formData.append("myFile", file); 

      const res = await UploadService.image(formData);
      if(res.data){
        this.getData.push(res.data.link);
        this.fileTemp.push(file);
        this.$emit("update:data", this.getData);
      }
      // var files = this.$refs.myVueDropzone.dropzone.files

      
    },
    remove(file) {
      var findIndex = this.fileTemp.indexOf(file);
      this.getData.splice(findIndex, 1);
      this.$emit("update:data", this.getData);
    }
  },


};
</script>
