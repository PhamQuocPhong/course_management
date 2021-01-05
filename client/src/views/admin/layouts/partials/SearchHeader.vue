<template>
	<v-text-field
    placeholder="Tìm nhà trọ..."
    item-text="name"
    return-object
    v-model="getInputSearch"
    :label="label"
    append-icon="mdi-search-web"
    outlined
  dense
  @keydown="emitEvent"
  @paste="emitEvent"
  hide-details

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
		}, 1200)
	},


}
</script>