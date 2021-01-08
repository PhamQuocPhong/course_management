<template>
  <v-list two-line v-if="ratings">
      <v-list-item-group
        active-class="pink--text"
        multiple
      >
        <template v-for="(item, index) in ratings">
          <v-list-item :key="item.id">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item.Users[0].name"></v-list-item-title>

                <v-list-item-subtitle v-text="item.comment"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                    <v-rating
                        :value="item.rating"
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
            v-if="index < ratings.length - 1"
            :key="index"
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

  data(){
    return {

    }
  },

  mounted(){
    console.log(this.ratings)
  }
}
</script>