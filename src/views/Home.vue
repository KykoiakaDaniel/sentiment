<template>
  <v-container fluid>
    <div class="home d-flex justify-center display-1">
      Сайт для сентимент-анализа текстовых данных социальных сетей
    </div>
    <v-card class="px-6 py-3">
      <v-row class="review">
        <v-col lg="4" md="6">
          <v-card
            class="review-item"
            outlined
            tile
          >
            <v-card-title>Пример №1</v-card-title>
            <span class="number">4</span>
            <v-card-text>Добавлено в прошлом месяце: 999</v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" md="6">
          <v-card
            class="review-item"
            outlined
            tile
          >
            <v-card-title>Пример №2</v-card-title>
            <span class="number">4</span>
            <v-card-text>Добавлено в прошлом месяце: 999</v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" md="6">
          <v-card
            class="review-item"
            outlined
            tile
          >
            <v-card-title>Пример №3</v-card-title>
            <span class="number">4</span>
            <v-card-text>Добавлено в прошлом месяце: 999</v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" md="6">
          <v-card
            class="review-item"
            outlined
            tile
          >
            <v-card-title>Пример №4</v-card-title>
            <span class="number">4</span>
            <v-card-text>Добавлено в прошлом месяце: 999</v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" md="6">
          <v-card
            class="review-item"
            outlined
            tile
          >
            <v-card-title>Пример №5</v-card-title>
            <span class="number">4</span>
            <v-card-text>Добавлено в прошлом месяце: 999</v-card-text>
          </v-card>
        </v-col>
        <v-col lg="4" md="6">
          <v-card
            class="review-item"
            outlined
            tile
          >
            <v-card-title>Пример №6</v-card-title>
            <span class="number">4</span>
            <v-card-text>Добавлено в прошлом месяце: 999</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.number {
  display: block;
  margin: 0 15px;
  color: #2C3035;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0.54px;
  line-height: 30px;
}

.review {

  [class^=col-] {

    &:nth-child(1) {

      .review-item:before {
        background-color: #FFA62F;
      }
    }

    &:nth-child(2) {

      .review-item:before {
        background-color: #4EA751;
      }
    }

    &:nth-child(3) {

      .review-item:before {
        background-color: #8251E0;
      }
    }

    &:nth-child(4) {

      .review-item:before {
        background-color: #F02F35;
      }
    }

    &:nth-child(5) {

      .review-item:before {
        background-color: #1E6CEB;
      }
    }

    &:nth-child(6) {

      .review-item:before {
        background-color: #CF97FA;
      }
    }
  }

  &-item {
    padding-bottom: 12px;
    position: relative;
    overflow: hidden;
    border-color: #E2E4E7;
    border-radius: 5px;

    &:before {
      position: absolute;
      z-index: 5;
      content: '';
      top: calc(100% - 5px);
      left: 0;
      width: 100%;
      height: 5px;
    }
  }
}
</style>
