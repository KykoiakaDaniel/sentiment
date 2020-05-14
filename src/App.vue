<template>
  <v-app>
    <v-app-bar
      app
      color="#3F51B5"
      dark
    >
      <router-link to="/" class="title font-weight-regular ml-2 text-none">Сентимент-анализ</router-link>

      <v-spacer></v-spacer>

      <router-link class="title font-weight-regular ml-2 text-none" to="/vk">VK</router-link>
      <router-link class="title font-weight-regular ml-2 text-none" to="/ok">Одноклассники</router-link>
    </v-app-bar>

    <v-container fluid>
      <v-content>
        <router-view></router-view>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  })
}
</script>

<style lang="scss">

body,
#app {
  font-family: 'SF Pro Display';
  font-size: 20px;
  line-height: 20px;
}
.text-none {
  text-decoration: none;
  color: #FFFFFF !important;
}

</style>
