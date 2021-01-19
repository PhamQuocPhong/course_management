<template>
<v-list class="pt-0">
      <v-list-group
        v-for="item in categories"
        :key="item.id"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
       
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title   v-text="item.name"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
         
          v-for="child in item.subCategory"
          :key="child.id"
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
		        {
		          action: 'mdi-ticket',
		          items: [{ title: 'List Item' }],
		          title: 'Attractions',
		        },
		        {
		          action: 'mdi-silverware-fork-knife',
		          items: [
		            { title: 'Breakfast & brunch' },
		            { title: 'New American' },
		            { title: 'Sushi' },
		          ],
		          title: 'Dining',
		        },
		        {
		          action: 'mdi-school',
		          items: [{ title: 'List Item' }],
		          title: 'Education',
		        },
		        {
		          action: 'mdi-run',
		          items: [{ title: 'List Item' }],
		          title: 'Family',
		        },
		        {
		          action: 'mdi-bottle-tonic-plus',
		          items: [{ title: 'List Item' }],
		          title: 'Health',
		        },
		        {
		          action: 'mdi-content-cut',
		          items: [{ title: 'List Item' }],
		          title: 'Office',
		        },
		        {
		          action: 'mdi-tag',
		          items: [{ title: 'List Item' }],
		          title: 'Promotions',
		        },
		      ],
		}
	},

	created(){
		this.retrieveData();
	},


	methods: {
		async retrieveData(){
			const res = await CategoryService.fetchAll();
			if(res.status === 200){
				this.categories = res.data.data
			}
		}
	}
}
</script>