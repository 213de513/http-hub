import query from './base/query.vue';
import reqBody from './base/reqBody.vue';
import mix from './base/mix.vue';
import dyamicUrl from './dyamicUrl/index.vue';
import allRes from './allRes/index.vue';
import Part from './part/index.vue';
import Modules from './module/index.vue';
import myError from './errorCatch/index.vue'
import CacheTime from './cacheTime/index.vue'
import Api from './api/hub.vue'
function install (Vue) {
  Vue.component('api-query', query)
  Vue.component('api-req-body', reqBody)
  Vue.component('api-mix', mix)
  Vue.component('api-dyamic-url', dyamicUrl)
  Vue.component('api-all', allRes)
  Vue.component('api-part', Part)
  Vue.component('api-module', Modules)
  Vue.component('api-error', myError)
  Vue.component('api-cache', CacheTime)
  Vue.component('api-api', Api)
}
export default {
  install
}