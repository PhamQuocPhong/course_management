<template>
	<v-btn
		outlined
		:small="checkSmall"
		:color="color"
		@click="emitClick()"
	>	
		{{title}}
	</v-btn>
</template>

<script type="text/javascript">


export default {
		props: {
			title: {
				type: String,
			},

			icon: {
				type: String,
				default: ""
			},
			small: {
				type: Boolean,
				default: true
			},
			color: {
				type: String,
				default: "red darken-1"
			},

		},

		data() {
			return {
				checkSmall: this.small 	
			}
		},

		methods: {
			emitClick(){
				this.$emit('action')
			},
		},


}
</script>