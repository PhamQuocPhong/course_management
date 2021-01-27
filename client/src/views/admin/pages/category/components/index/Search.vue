<template>
 	<v-text-field
	    placeholder="Search title..."
	    v-model="getData"
	    :label="label"
	    outlined
	    dense
	    append-icon="mdi-search-web"
	> 
	 <template v-slot:append>
		 	<v-btn @click="emitChange" color="white" outlined small class="primary" >
		 		<v-icon>mdi-search-web</v-icon>
		 	</v-btn>
		 </template>         
	</v-text-field>
</template>


<script type="text/javascript">

import UserService from "@/services/user";

export default{
	props: {
		data: {
			type: [Array, String, Object, Number]
			},
	    items: Array,
		    label: String,
	},


	data(){
		return {
	      getData: this.$route.query.hasOwnProperty('searchkey') ? this.$route.query.searchkey : this.data,
	    }
	},

  	methods: {
	    emitChange(){

	      var query = Object.assign({}, this.$route.query);

	      query.searchKey = this.getData;
	      this.$router.push({
	          name: 'adminMotelIndex', 
	          query: query
	      });


	      var payLoad = Object.assign({}, query);
	      payLoad.searchKey = this.getData;


	      this.$store.dispatch("components/actionProgressHeader", { option: "show" })
	      setTimeout(async () => {
	       this.$store.dispatch("motels/fetchPaging", payLoad);
	      }, 200);

	      this.$emit("update:data", this.getData);
	
	    }
	 },


}
</script>