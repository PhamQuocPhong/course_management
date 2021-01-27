<template>
	<v-btn
		:outlined="outlined"
		:small="checkSmall"
		:color="color"
		:class="classProp"
		@click="emitClick()"
	>	
		{{title}}
		<v-icon v-if="icon">{{icon}}</v-icon>
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
				default: "cyan darken-1"
			},

			outlined: {
				type: Boolean,
				default: false
			},
		},

		data() {
			return {
				roles: this.$constant.roles,
				checkSmall: this.small 	
			}
		},
		mounted(){
			this.checkSizeBtn()
		},

		methods: {
			checkSizeBtn(){

				this.checkSmall = false
					
			},

			emitClick(){
				this.$emit('action')
			},
		},


}
</script>