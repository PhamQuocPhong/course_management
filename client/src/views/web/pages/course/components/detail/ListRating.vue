<template>
  <v-list two-line >
      <v-list-item-group
        active-class="pink--text"
        multiple
      >
        <template  v-for="(item, index) in getRatings"> 
          <v-list-item  :key="index">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.user.name"></v-list-item-title>

                <v-list-item-subtitle v-text="item.comment"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                    <v-rating
                        :value="item.point"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="20"
                      ></v-rating>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < getRatings.length - 1"
           
          ></v-divider>
        </template>
      </v-list-item-group>
  </v-list>
</template>

<script type="text/javascript">
export default {
  props: {
    ratings: Array
  },


  computed: {
    getRatings: {
      get()
      {
        return this.ratings
      }
    }
  }
}
</script>