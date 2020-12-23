<template>
  <v-app id="message">
    <v-container fluid fluid-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm12 md12>
          <v-card class="elevation-10">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title class="text-center">Chat</v-toolbar-title>
            </v-toolbar>

            <v-list class="overflow-y-auto" style="max-height: 680px">
              <v-card-text>
                <div class="text-left pb-4 left">
                  <v-card-text style="background-color: #f1f1f1; color: #000000; border-radius: 5px">
                    <div><b>Nguyễn Trí</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:10</span>
                </div>

                <div class="text-right pb-4 right">
                  <v-card-text style="background-color: #c8e7ff; color: #000000; border-radius: 5px">
                    <div><b>Hoàng Quân</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:11</span>
                </div>

                <div class="text-left pb-4 left">
                  <v-card-text style="background-color: #f1f1f1; color: #000000; border-radius: 5px">
                    <div><b>Nguyễn Trí</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:10</span>
                </div>

                <div class="text-left pb-4 left">
                  <v-card-text style="background-color: #f1f1f1; color: #000000; border-radius: 5px">
                    <div><b>Nguyễn Trí</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:10</span>
                </div>

                <div class="text-right pb-4 right">
                  <v-card-text style="background-color: #c8e7ff; color: #000000; border-radius: 5px">
                    <div><b>Hoàng Quân</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:11</span>
                </div>

                <div class="text-right pb-4 right">
                  <v-card-text style="background-color: #c8e7ff; color: #000000; border-radius: 5px">
                    <div><b>Hoàng Quân</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:11</span>
                </div>

                <div class="text-left pb-4 left">
                  <v-card-text style="background-color: #f1f1f1; color: #000000; border-radius: 5px">
                    <div><b>Nguyễn Trí</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:10</span>
                </div>

                <div class="text-right pb-4 right">
                  <v-card-text style="background-color: #c8e7ff; color: #000000; border-radius: 5px">
                    <div><b>Hoàng Quân</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:11</span>
                </div>

                <div class="text-right pb-4 right">
                  <v-card-text style="background-color: #c8e7ff; color: #000000; border-radius: 5px">
                    <div><b>Hoàng Quân</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:11</span>
                </div>

                <div class="text-left pb-4 left">
                  <v-card-text style="background-color: #f1f1f1; color: #000000; border-radius: 5px">
                    <div><b>Nguyễn Trí</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:10</span>
                </div>

                <div class="text-right pb-4 right">
                  <v-card-text style="background-color: #c8e7ff; color: #000000; border-radius: 5px">
                    <div><b>Hoàng Quân</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:11</span>
                </div>

                <div class="text-right pb-4 right">
                  <v-card-text style="background-color: #c8e7ff; color: #000000; border-radius: 5px">
                    <div><b>Hoàng Quân</b></div>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </v-card-text>
                  <span style="font-size: 10px">10:11</span>
                </div>
              </v-card-text>
            </v-list>

            <v-card-text style="position: static; bottom: 0; left: 0; right: 0">
              <v-form>
                <v-text-field label="Message" name="message" type="text"></v-text-field>
                <v-btn block color="primary">Submit</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style>
.left,
.right {
  display: block;
  position: relative;
  clear: both;
}

.left {
  float: left;
  margin-left: 20px;
}
.right {
  float: right;
  margin-right: 20px;
}
</style>
