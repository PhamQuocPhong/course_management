<template>
	<v-btn
		outlined
		color="orange darken-1"
		:class="classProp"
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

			classProp: {
				type: String,
			},
			color: {
				type: String,
				default: "orange darken-1"
			},
		},

		data() {
			return {
				roles: this.$constant.roles,
			}
		},
		methods: {
			emitClick(){
				this.$emit('action')
			},
		},


}
</script>