<template>
<v-layout>
	<v-select
	:items="items"
	placeholder=" "
	item-text="name"
	return-object
	v-model="getData"
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



	computed: {
		getData: {
			get()
			{
				return this.data
			},
			set(data)
			{
				this.$emit("update:data", data);
			}
		}
	}


}
</script>