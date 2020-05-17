<template>
  <v-container fluid>
    <v-row class="review">
      <v-col lg="4" md="6">
        <v-card
          class="review-item"
          outlined
          tile
        >
          <v-card-title>Шаг №1</v-card-title>
          <span class="number">Выберите одну из соц. сетей</span>
        </v-card>
      </v-col>

      <v-col lg="4" md="6">
        <v-card
          class="review-item"
          outlined
          tile
        >
          <v-card-title>Шаг №2</v-card-title>
          <span class="number">Авторизируйтесь</span>
        </v-card>
      </v-col>

      <v-col lg="4" md="6">
        <v-card
          class="review-item"
          outlined
          tile
        >
          <v-card-title>Шаг №3</v-card-title>
          <span class="number">Вставьте ссылку на пост, фото, видео или обсуждение</span>
        </v-card>
      </v-col>

      <v-col lg="4" md="6">
        <v-card
          class="review-item"
          outlined
          tile
        >
          <v-card-title>Шаг №4</v-card-title>
          <span class="number">Нажмите на кнопку "проанализировать"</span>
        </v-card>
      </v-col>

      <v-col lg="4" md="6">
        <v-card
          class="review-item"
          outlined
          tile
        >
          <v-card-title>Шаг №5</v-card-title>
          <span class="number">Получите список комментариев с тональностями</span>
        </v-card>
      </v-col>
    </v-row>
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
  margin: 0 15px 16px 15px;
  color: #2C3035;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 0.54px;
  line-height: 30px;
}

.review {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

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
