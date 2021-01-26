<template>
  <div>
    <v-card class="mb-3">
      <breadcrumbs></breadcrumbs>
    </v-card>
    <v-card class="main-layout pa-3">
      <router-view></router-view>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
