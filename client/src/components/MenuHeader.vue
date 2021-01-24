<template>
<v-list  dense nav class="pt-0">
      <v-list-group
        v-for="item in categories"
        :key="item.id"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        dense
        
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title   v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.subCategory"
          :key="child.id"
          :to="{ name: 'courseIndex', params: { categoryId: child.id }}"
           @click="itemList($event)"
        >
          <v-list-item-content class="pointer">
            <v-list-item-title   v-text="child.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
</template>

<style>
@media(min-width: 768px)
{
	.v-list{
		min-height: 500px;
	}
}
</style>

<script type="text/javascript">

import CategoryService from "@/services/category";

export default {
	data(){
		return {
			categories: [
		       
		      ],
		}
	},

	created(){
		this.retrieveData();
	},

  watch: {
    categories(data)
    {
      console.log(data);
    }
  },

	methods: {
		async retrieveData(){
			const res = await CategoryService.fetchAll();
			if(res.status === 200){
				this.categories = res.data.data
			}
		},
  
	}
}
</script>