<template>
  <v-app id="detail">
    <v-container>
      <v-layout row>
        <v-flex xs12 sm12 md7>
          <v-carousel>
            <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex xs12 sm12 md12 class="squeeze"></v-flex>

        <!-- Table Information-->
        <v-flex xs12 sm12 md4>
          <v-card>
            <div class="pl-4 pt-2 text-center">
              <h1>Hilton Hotel</h1>
            </div>

            <div class="pl-4 pb-2 pt-2 text-center">
              <v-rating background-color="yellow lighten-3" color="yellow" large></v-rating>
            </div>

            <div class="pl-4 pb-2 pt-4">
              <v-icon>mdi-gmail</v-icon>
              <span> nguyentri.7264@gmail.com</span>
            </div>

            <div class="pl-4 pb-2 pt-4">
              <v-icon>mdi-cellphone</v-icon>
              <span> 0949667264</span>
            </div>

            <div class="pl-4 pb-2 pt-4">
              <v-icon dart>mdi-google-maps</v-icon>
              <span>SAN FRANCISCO UNITED STATES</span>
            </div>

            <div class="pl-4 pb-2 pt-4">
              <v-icon dart>mdi-eye</v-icon>
              <span>134</span>
            </div>

            <div class="pl-4 pb-2 pt-4 text-center">
              <hr />
              <div class="pt-2">
                <span class="price">$100</span>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>

      <div class="pt-10"></div>

      <v-layout row>
        <v-flex xs12 sm12 md7>
          <v-card>
            <v-toolbar color="cyan" dark flat>
              <template>
                <v-tabs v-model="tab" align-with-title>
                  <v-tab v-for="item in itemsTab" :key="item">
                    {{ item }}
                  </v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <!-- Description-->
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card flat>
                  <v-card-text
                    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus fugiat nobis enim quia repellat. Officia natus iste fuga facilis distinctio magni aperiam doloribus atque sed facere, culpa, soluta aspernatur temporibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
                    quidem odit minima sunt dolores recusandae nobis? Cumque blanditiis nemo quos accusantium laudantium, necessitatibus numquam, odio dolorum est ratione ex dignissimos.m
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <!-- Review -->
              <v-tab-item>
                <v-list class="overflow-y-auto" style="max-height: 400px">
                  <v-card flat>
                    <v-layout row>
                      <v-row justify="space-around" xs3 style="margin-top: 55px !important">
                        <div>
                          <v-avatar size="110">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                          </v-avatar>
                          <div class="text-center pt-5">
                            <span class="font-weight-bold">John Doe</span>
                          </div>
                        </div>
                      </v-row>

                      <v-flex xs9>
                        <v-card-title>
                          <div class="pr-4 pl-2">
                            <div class="pl-4 pb-2 pt-2">
                              <h3 class="headline mb-0">"Kangaroo Valley Safari"</h3>
                              <v-rating background-color="yellow lighten-3" color="yellow" large></v-rating>
                            </div>
                            <div class="font-weight-light">{{ card_text }}</div>
                          </div>
                        </v-card-title>
                      </v-flex>
                    </v-layout>
                  </v-card>

                  <v-card flat>
                    <v-layout row>
                      <v-row justify="space-around" xs3 style="margin-top: 55px !important">
                        <div>
                          <v-avatar size="110">
                            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                          </v-avatar>
                          <div class="text-center pt-5">
                            <span class="font-weight-bold">John Doe</span>
                          </div>
                        </div>
                      </v-row>

                      <v-flex xs9>
                        <v-card-title>
                          <div class="pr-4 pl-2">
                            <div class="pl-4 pb-2 pt-2">
                              <h3 class="headline mb-0">"Kangaroo Valley Safari"</h3>
                              <v-rating background-color="yellow lighten-3" color="yellow" large></v-rating>
                            </div>
                            <div class="font-weight-light">{{ card_text }}</div>
                          </div>
                        </v-card-title>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-list>
              </v-tab-item>
              <!-- End Review -->

              <!-- Write Review -->
              <v-tab-item>
                <v-card flat>
                  <div class="pt-4 pl-2">
                    <v-rating background-color="yellow lighten-3" color="yellow" large></v-rating>
                  </div>
                  <v-card-text>
                    <v-form ref="form">
                      <v-text-field label="Title" outlined></v-text-field>
                      <v-text-field label="Content" outlined></v-text-field>

                      <v-btn outlined color="indigo">Leave a review</v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-flex>

        <v-flex xs1 class="squeeze"></v-flex>

        <v-flex xs12 sm12 md4>
          <v-card class="pr-2 pl-2">
            <div class="pl-4 pt-2 text-center">
              <h1>Best Seller</h1>
            </div>

            <v-list class="overflow-y-auto" style="max-height: 400px">
              <div class="pt-4 pb-4">
                <!-- Related-->

                <div class="pt-2 pb-2">
                  <v-card>
                    <v-layout>
                      <v-flex xs5>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75" style="height: 100%; border-radius: 5px"></v-img>
                      </v-flex>
                      <v-flex xs7>
                        <v-card-text>
                          <div>
                            <span>Kangaroo Valley Safari</span>
                            <v-rating background-color="yellow lighten-3" color="yellow" small class="text-center"></v-rating>
                            <div>$100</div>
                          </div>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div>

                <div class="pt-2 pb-2">
                  <v-card>
                    <v-layout>
                      <v-flex xs5>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75" style="height: 100%; border-radius: 5px"></v-img>
                      </v-flex>
                      <v-flex xs7>
                        <v-card-text>
                          <div>
                            <span>Kangaroo Valley Safari</span>
                            <v-rating background-color="yellow lighten-3" color="yellow" small class="text-center"></v-rating>
                            <div>$100</div>
                          </div>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div>

                <div class="pt-2 pb-2">
                  <v-card>
                    <v-layout>
                      <v-flex xs5>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75" style="height: 100%; border-radius: 5px"></v-img>
                      </v-flex>
                      <v-flex xs7>
                        <v-card-text>
                          <div>
                            <span>Kangaroo Valley Safari</span>
                            <v-rating background-color="yellow lighten-3" color="yellow" small class="text-center"></v-rating>
                            <div>$100</div>
                          </div>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div>

                <div class="pt-2 pb-2">
                  <v-card>
                    <v-layout>
                      <v-flex xs5>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75" style="height: 100%; border-radius: 5px"></v-img>
                      </v-flex>
                      <v-flex xs7>
                        <v-card-text>
                          <div>
                            <span>Kangaroo Valley Safari</span>
                            <v-rating background-color="yellow lighten-3" color="yellow" small class="text-center"></v-rating>
                            <div>$100</div>
                          </div>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div>

                <div class="pt-2 pb-2">
                  <v-card>
                    <v-layout>
                      <v-flex xs5>
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75" style="height: 100%; border-radius: 5px"></v-img>
                      </v-flex>
                      <v-flex xs7>
                        <v-card-text>
                          <div>
                            <span>Kangaroo Valley Safari</span>
                            <v-rating background-color="yellow lighten-3" color="yellow" small class="text-center"></v-rating>
                            <div>$100</div>
                          </div>
                        </v-card-text>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </div>
              </div>
              <!-- End Related -->
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style>
.squeeze {
  flex-basis: 2.333333% !important;
}

.price {
  color: red;
  font-size: 20px;
  font-weight: bold;
}
</style>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      tab: null,
      itemsTab: ["DESCRIPTION", "REVIEWS", "WRITE A REVIEW"],
      card_text:
        "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
    };
  },
};
</script>
