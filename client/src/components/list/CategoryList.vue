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
		noParent: Boolean,
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
					if(this.categories.length)
					{
						var categoryId = +this.$route.query.categoryId;
						var findCategory = this.categories.find(item => item.id === categoryId);
						return findCategory;
					}
				}else{
					return this.data;
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
					if(this.noParent)
					{
						var categories = this.$store.getters["categories/noParentCategories"];
						categories.unshift({id: null, name: "Tất cả"});
					}else{
						var categories = this.$store.getters["categories/categories"];
						categories.unshift({id: null, name: "Tất cả"});
					}
					return categories;
				}else{
					return this.items
				}
			}
		}
	},
}
</script>