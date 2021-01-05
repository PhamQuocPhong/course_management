<template>
  <div id="layout-basic">
    <toolbar-header></toolbar-header>
    <v-main>
      <div id="page-wrapper">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </v-main>
  </div>
</template>
<script>
import Header from "./partials/Header";
import Footer from "./partials/Footer";

export default {
  components: { "toolbar-header": Header, "m-footer": Footer }
};
</script>
