<template>
	<v-select
	:items="categories"
	placeholder=" "
	item-text="name"
	return-object
	v-model="getData"
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

	created(){
		if(!this.items || this.items.length <= 0)
		{
			this.$store.dispatch("categories/fetchAll");
		}
	},


	computed: {
		getData: {
			get(){
				if(this.$route.query.hasOwnProperty("categoryId"))
				{
					return this.data
				}
			},
			set(data)
			{
				this.$emit("update:data", data);
								this.$emit("action");
			}
		},
		categories: {
			get(){
				if(!this.items || this.items.length <= 0)
				{
					var categories = this.$store.getters["categories/categories"];
					categories.unshift({id: null, name: "Tất cả"});
					return categories;
				}else{
					return this.items
				}
			}
		}
	},
}
</script>