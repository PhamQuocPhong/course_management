<template>
	<v-select
	:items="teachers"
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
			this.$store.dispatch("users/fetchAllTeacher");
		}
	},
	computed: {
		getData: {
			get(){
				if(this.$route.query.hasOwnProperty("teacherId"))
				{
					if(this.teachers.length)
					{
						var teacherId = +this.$route.query.teacherId;
						var findTeacher = this.teachers.find(item => item.id === teacherId);
						return findTeacher;
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
		teachers: {
			get(){
				if(!this.items || this.items.length <= 0)
				{
					var teachers = this.$store.getters["users/teachers"];
					return teachers;
				}else{
					return this.items
				}
			}
		}
	},
}
</script>