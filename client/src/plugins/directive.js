import Vue from "vue";

// Vue.directive("can", {
//   inserted(el, binding) {
//     var currentUser = $cookies.get("dataUser");
//     if (currentUser.roleId === 4 && currentUser.roleId === binding.value) {
//       el.parentNode.removeChild(el);
//     }
//   }
// });


Vue.directive('click-outside-dialog', {
  bind () {
      this.event = event => this.vm.$emit(this.expression, event)
      this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click', this.event)
  },   
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) { event.stopPropagation() }
})


export default {};
