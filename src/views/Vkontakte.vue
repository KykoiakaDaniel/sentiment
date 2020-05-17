<template>
  <v-container fluid>
    <v-form
      ref="formVK"
      v-model="validVK"
      lazy-validation
    >
      <v-row class="justify-center mb-4">
        <h2 class="mb-2">ВКонтакте</h2>
      </v-row>

      <v-row class="justify-center mb-2">
        <div class="mb-2">
          <v-btn
            @click.prevent="changeUser()"
            large
            color="success"
            class="text-none"
            dense
          >
            Сменить пользователя
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
          Для проведения сентимент анализа вставьте ссылку на пост, видео, фото или тему обсуждения
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
            :disabled="!vkId"
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
  name: 'Vkontakte',
  components: {
  },
  data () {
    return {
      textSentiment: '',
      validVK: true,
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
      vkId: 'vkId'
    }),
    filteredComments () {
      return this.dataText.map(item => {
        if (item.text.startsWith('[id')) {
          const partsText = item.text.split(' ')
          let pureText = ''

          partsText.forEach((element, index) => {
            if (index !== 0) {
              pureText += element + ' '
            }
          })

          item.text = pureText
          return item
        } else {
          return item
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setVkId: 'setVkId'
    }),

    changeUser () {
      if (this.vkId !== '') {
        window.VkLogout()
          .then((info) => {
            if (info === null) {
              this.setVkId('')
              window.VkLogin()
                .then((info) => {
                  if (info !== undefined && info.user !== undefined && info.user.id !== undefined) {
                    this.setVkId(info.user.id)
                  }
                })
            }
          })
      } else {
        window.VkLogin()
          .then((info) => {
            if (info !== undefined && info.user !== undefined && info.user.id !== undefined) {
              this.setVkId(info.user.id)
            }
          })
      }
    },

    sentiment () {
      this.errorLoad = false
      this.errorUrl = false

      if (this.$refs.formVK.validate()) {
        const partsUrl = this.textSentiment.split(/\/topic-|z=photo|z=video|w=wall/)
        const idsUrl = partsUrl[1].split(/_|%/)

        if (this.textSentiment.includes('z=photo')) {
          this.getPhotoComments(idsUrl[0], idsUrl[1])
        } else if (this.textSentiment.includes('z=video')) {
          this.getVideoComments(idsUrl[0], idsUrl[1])
        } else if (this.textSentiment.includes('/topic-')) {
          this.getBoardComments(idsUrl[0], idsUrl[1])
        } else if (this.textSentiment.includes('w=wall')) {
          this.getWallComments(idsUrl[0], idsUrl[1])
        } else {
          this.errorUrl = true
        }
      }
    },

    getWallComments (idOwner, idPost) {
      window.getVkWall(idOwner, idPost)
        .then((info) => {
          axios({ url: 'http://localhost:3000/sentiment', data: { info }, method: 'POST' })
            .then(resp => {
              this.dataText = resp.data
            })
            .catch(err => {
              this.dataText = []
              console.log(err)
            })
        })
        .catch(() => {
          this.errorLoad = true
          console.log('Ошибка загрузки данных')
          this.dataText = []
        })
    },

    getVideoComments (idOwner, idVideo) {
      window.getVkVideo(idOwner, idVideo)
        .then((info) => {
          axios({ url: 'http://localhost:3000/sentiment', data: { info }, method: 'POST' })
            .then(resp => {
              this.dataText = resp.data
            })
            .catch(err => {
              this.dataText = []
              console.log(err)
            })
        })
        .catch(() => {
          this.errorLoad = true
          console.log('Ошибка загрузки данных')
          this.dataText = []
        })
    },

    getPhotoComments (idOwner, idPhoto) {
      window.getVkPhoto(idOwner, idPhoto)
        .then((info) => {
          axios({ url: 'http://localhost:3000/sentiment', data: { info }, method: 'POST' })
            .then(resp => {
              this.dataText = resp.data
            })
            .catch(err => {
              this.dataText = []
              console.log(err)
            })
        })
        .catch(() => {
          this.errorLoad = true
          console.log('Ошибка загрузки данных')
          this.dataText = []
        })
    },

    getBoardComments (idGroup, idTopic) {
      window.getVkBoard(idGroup, idTopic)
        .then((info) => {
          axios({ url: 'http://localhost:3000/sentiment', data: { info }, method: 'POST' })
            .then(resp => {
              this.dataText = resp.data
            })
            .catch(err => {
              this.dataText = []
              console.log(err)
            })
        })
        .catch(() => {
          this.errorLoad = true
          console.log('Ошибка загрузки данных')
          this.dataText = []
        })
    }
  },
  created () {
    if (this.vkId === '') {
      window.VkLogin()
        .then((info) => {
          if (info !== undefined && info.user !== undefined && info.user.id !== undefined) {
            this.setVkId(info.user.id)
          }
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
