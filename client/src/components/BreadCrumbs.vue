<template>
  <v-breadcrumbs :items="crumbs">
    <v-breadcrumbs-item slot="item" slot-scope="{ item }" exact :to="item.to">
      {{ item.text }}
    </v-breadcrumbs-item>
    <template v-slot:divider>
      <v-icon>mdi-forward</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script type="text/javascript">
export default {
  data() {
    return {};
  },

  mounted() {},

  computed: {
    crumbs() {
      let pathArray = this.$route.path.split("/");
      pathArray.shift();

      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {

        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          text: this.$route.matched[idx + 1].meta.breadCrumb || path
        });

        return breadcrumbArray;
      }, []);

      return breadcrumbs;
    }
  }
};
</script>
