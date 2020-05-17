<template>
  <v-container fluid>
    <v-form
      ref="formOk"
      v-model="validOk"
      lazy-validation
    >
      <v-row class="justify-center mb-4">
        <h2 class="mb-2">Одноклассники</h2>
      </v-row>

      <v-row class="justify-center mb-2">
        <div class="mb-2">
          <v-btn
            @click.prevent="login()"
            large
            color="success"
            class="text-none"
            dense
          >
            Авторизоваться
          </v-btn>
        </div>
      </v-row>

      <v-row class="justify-center mb-2">
        <v-alert
          outlined
          type="warning"
          prominent
          border="left"
          class="alert-width"
        >
          Для проведения сентимент анализа вставьте ссылку на фотографию, видео или пост
        </v-alert>
      </v-row>

      <v-row class="justify-center">
        <v-text-field
          v-model='textSentiment'
          :rules="ruleRequired"
          label="Ссылка на текст"
          outlined
          class="input-width"
          dense
          flat
        ></v-text-field>
      </v-row>

      <v-row class="justify-center">
        <v-alert
          type="error"
          class="alert-width"
          dense
          v-show="errorLoad"
        >
          Ошибка при загрузке данных.
        </v-alert>
      </v-row>

      <v-row class="justify-center">
        <v-alert
          type="error"
          class="alert-width"
          dense
          v-show="errorUrl"
        >
          Некорректная ссылка
        </v-alert>
      </v-row>

      <v-row class="justify-center">
        <div class="mb-2">
          <v-btn
            @click.prevent="sentiment()"
            large
            color="success"
            class="text-none"
            dense
            :disabled="!okStatus"
          >
            Проанализировать
          </v-btn>
        </div>
      </v-row>
    </v-form>
    <v-row class="justify-center">
      <v-data-table
        class="table mt-4"
        :headers="headersComments"
        :items="filteredComments"
        :items-per-page="15"
        disable-sort
      >
        <template v-slot:item.sentiment="{ item }">
          <v-icon v-if="item.sentiment === 'good'" :style="{ color: 'green' }">mdi-thumb-up</v-icon>
          <v-icon v-if="item.sentiment === 'bads'" :style="{ color: 'red' }">mdi-thumb-down</v-icon>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'Ok',
  components: {
  },
  data () {
    return {
      textSentiment: '',
      validOk: true,
      dataText: [],
      ruleRequired: [
        v => !!v || 'Обязательное поле'
      ],
      errorLoad: false,
      errorUrl: false,
      headersComments: [
        {
          text: 'Комментарии',
          value: 'text'
        },
        {
          text: '',
          value: 'sentiment'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      okStatus: 'okStatus'
    }),
    filteredComments () {
      return this.dataText.map(item => {
        if (item.text.includes('Сообщение содержит прикрепленные файлы (смотрите в полной версии сайта)')) {
          item.text = ''
          item.sentiment = 'neutral'
          return item
        } else {
          return item
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setOkStatus: 'setOkStatus'
    }),

    login () {
      window.OkLogin()
        .then((status) => {
          this.setOkStatus(status)
        })
        .catch((status) => {
          this.setOkStatus(status)
        })
    },

    sentiment () {
      this.errorLoad = false
      this.errorUrl = false

      if (this.$refs.formOk.validate()) {
        const idsUrl = this.textSentiment.split('/')
        let type
        if (this.textSentiment.includes('/pphotos/')) {
          type = 'USER_PHOTO'
        } else if (this.textSentiment.includes('/video/')) {
          type = 'GROUP_MOVIE'
        } else if (this.textSentiment.includes('/topic/')) {
          type = 'GROUP_TOPIC'
        } else if (this.textSentiment.includes('/album/')) {
          type = 'GROUP_PHOTO'
        } else {
          this.errorUrl = true
          type = ''
        }

        if (type !== '') {
          this.getComments(idsUrl, type)
        }
      }
    },
    getComments (idsUrl, type) {
      window.OkGetComments(idsUrl[idsUrl.length - 1], type)
        .then((info) => {
          if (type === 'GROUP_MOVIE' && info.length === 0) {
            this.getComments(idsUrl, 'MOVIE')
          } else {
            axios({ url: 'http://localhost:3000/sentiment', data: { info }, method: 'POST' })
              .then(resp => {
                this.dataText = resp.data
              })
              .catch(err => {
                this.dataText = []
                console.log(err)
              })
          }
        })
        .catch(() => {
          this.errorLoad = true
          console.log('Ошибка загрузки данных')
          this.dataText = []
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.input-width {
  max-width: 400px;
}
.alert-width {
  max-width: 400px;
  width: 100%;
}
.v-data-table.table {
  border-collapse: collapse;
  border-spacing: 0px;
  width: 800px;

  border: 0;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 10px 0 rgba(100,114,140,0.2);

  thead {

    th {
      font-size: 14px;
      line-height: 22px;
      color: #59606A;
      font-weight: bold;
    }

    tr:last-child th{
      border-bottom: 0;
    }
  }

  tbody {

    tr td:last-child{
      border-right: 0;

      @media screen and (max-width: 767px) {
        border-right: 1px solid #E2E4E7;
      }
    }

    tr:nth-child(odd) {
      background-color: rgba(89,96,106,0.05);
    }

    td, th {
      font-size: 14px;
      line-height: 22px;
      color: #434850;
      border-right: 1px solid #E2E4E7;

      [class^=icon-], [class*=" icon-"] {
        color: #8B939E;
      }
    }

    tr:not(:last-child) td:not(.v-data-table__mobile-row),
    tr:not(:last-child) th:not(.v-data-table__mobile-row){
      border-bottom: 0;
    }
  }
}
</style>
