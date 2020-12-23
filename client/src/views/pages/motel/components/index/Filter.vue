<template>
	<v-layout>
 		<v-select
	    :items="items"
	    placeholder=" "
	    item-text="name"
	    v-model="getData"
      item-value="id"
	    @change="emitChange()"
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
    items: Array,
    label: String,
	},

	data(){
		return {
      getData: this.data,
    }
	},


  methods: {
    emitChange(){
      this.$emit("update:data", this.getData);
    }
  },


}
</script>