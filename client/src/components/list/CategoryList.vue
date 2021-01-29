<template>
	<v-select
	:items="items"
	placeholder=" "
	item-text="name"
	v-model="getData"
	return-object
	:label="label"
	outlined
	dense
	> 
	</v-select>
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
	    }
	},

	computed: {
		getData: {
			get(){
				return this.data
			},
			set(data)
			{
				this.$emit("update:data", data);
			}
		}
	},
}
</script>