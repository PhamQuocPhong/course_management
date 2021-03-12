<template>
	<v-layout>
 		<v-select
	    :items="items"
	    placeholder=" "
	    item-text="name"
	    v-model="getData"
      	return-object
	    @change="emitChange()"
	    @input="emitChange()"
	    :label="label"
	    outlined
	    dense
	  > 
	  </v-select>
	</v-layout>
</template>


<script type="text/javascript">
export default{
	props: {
		data: {
			type: [Array, String, Object, Number]
		},
		type: String,
    		items: Array,
	    label: String,
		},

		data(){
			return {
	     	 getData: this.data,
	    }
	},

	watch: {
		data(data){
			if(!data || data === "")
			{
				this.getData = "";
			}
		}
	},

  	methods: {
	    emitChange()
	    {

	    	var query = Object.assign({}, this.$route.query);
	    	if(this.type === "price")
	    	{
	    		query.orderPrice = this.getData.key;
	    	}else if(this.type === "rating")
	    	{
	    		query.orderRating = this.getData.key;
	    	}
	    	
	    	this.$router.push({
	    		name: "courseSearch",
	    		query: query
	    	}).catch(error => {

	    	})

	       this.$emit("update:data", this.getData);
	    }
	 },


}
</script>