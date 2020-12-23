<template>
	 <v-pagination
      v-model="getCurrentPage"
      class="my-4"
      :length="pageCounts"
      @input="nextPage()"
    ></v-pagination>
</template>

<script type="text/javascript">
export default {

	props: {
		currentPage: {
			type: Number,
			default: 1
		},
		pageCounts: {
			type: Number,
			required: true,
		}
	},

	data(){
		return {
			getCurrentPage: this.currentPage
		}	
	},

	methods: {
		nextPage(){
			this.$emit("update:currentPage", this.getCurrentPage)
			this.$emit("change")
		}
	}
}
</script>