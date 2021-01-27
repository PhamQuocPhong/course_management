<template>
  <v-col cols="12" :class="{ 'pa-0': isMobile }">
    <div class="triangle">
      <v-chip :color="color" label :text-color="textColor">
        <v-icon left>mdi-label</v-icon>
        {{ title }}
      </v-chip>
    </div>
  </v-col>
</template>

<style type="text/css" scoped>
.triangle {
  display: inline-block;
  background: #e91e63;
  position: relative;
  padding: 4px;
  color: #fff;
}

.triangle .v-chip {
  min-width: 150px;
}

.triangle:after {
  content: "";
  display: block;
  position: absolute;
  left: 100%;
  width: 0;
  height: 0;
  border-style: solid;
}

.triangle:after {
  top: 0px;
  border-color: transparent transparent transparent #e91e63;
  border-width: 20px;
}
</style>

<script type="text/javascript">
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: "pink"
    },
    textColor: {
      type: String,
      default: "white"
    }
  },

  data() {
    return {};
  },

  computed: {
    isMobile: {
      get() {
        return window.innerWidth < 769;
      }
    }
  }
};
</script>
