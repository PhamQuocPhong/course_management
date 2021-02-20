<template>
	<v-text-field
	    placeholder="Tìm kiếm khóa học..."
	    item-text="name"
	    return-object
	    v-model="getInputSearch"
	    :label="label"
	    outlined
	  dense
	  @keydown="emitEvent"
	  @paste="emitEvent"
	  hide-details
	  style="border-radius: 30px 0 0 30px;"
	>            
	</v-text-field>
</template>

<script type="text/javascript">
import _ from 'lodash';

export default{

	props: {
		data: [Array, Object, String],
		label: String,
	},

	data(){
		return {
			getInputSearch: this.data,
			oldVal: null,
		}
	},

	methods: {
		emitEvent: _.debounce( function(val) {
			if(this.oldVal !== this.getInputSearch){
				this.oldVal = this.getInputSearch;
				this.$emit("update:data", this.getInputSearch);
			}else{

			}
		}, 100)
	},


}
</script>