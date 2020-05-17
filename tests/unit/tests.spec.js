import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vkontakte from '@/views/Vkontakte.vue'
import Odnoklassniki from '@/views/Odnoklassniki.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Vkontakte.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      vkId: () => 2
    }

    store = new Vuex.Store({
      getters
    })
  })

  it('Проверка правильного ввода ссылки для ВК', () => {
    const wrapper = shallowMount(Vkontakte, { store, localVue })
    const url = 'https://vk.com/city_73?w=wall-103924276_1322369'
    expect(wrapper.vm.checkUrlVk(url)).toBe(true)
  })

  it('Проверка некорректного ввода ссылки для ВК', () => {
    const wrapper = shallowMount(Vkontakte, { store, localVue })
    const url = 'https://vue-test-utils.vuejs.org/ru/guides/#%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5'
    expect(wrapper.vm.checkUrlVk(url)).toBe(false)
  })
  it('Проверка пустого ввода ссылки для ВК', () => {
    const wrapper = shallowMount(Vkontakte, { store, localVue })
    const url = ''
    expect(wrapper.vm.checkUrlVk(url)).toBe(false)
  })
})

describe('Odnoklassniki.vue', () => {
  let getters
  let store

  beforeEach(() => {
    getters = {
      okStatus: () => true
    }

    store = new Vuex.Store({
      getters
    })
  })

  it('Проверка правильного ввода ссылки для Одноклассников', () => {
    const wrapper = shallowMount(Odnoklassniki, { store, localVue })
    const url = 'https://ok.ru/embjapan/topic/151691915088076'
    expect(wrapper.vm.checkUrlOk(url)).toBe(true)
  })

  it('Проверка некорректного ввода ссылки для Одноклассников', () => {
    const wrapper = shallowMount(Odnoklassniki, { store, localVue })
    const url = 'https://jestjs.io/docs/ru/getting-started'
    expect(wrapper.vm.checkUrlOk(url)).toBe(false)
  })
  it('Проверка пустого ввода ссылки для Одноклассников', () => {
    const wrapper = shallowMount(Odnoklassniki, { store, localVue })
    const url = ''
    expect(wrapper.vm.checkUrlOk(url)).toBe(false)
  })
})
