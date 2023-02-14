import { registerMicroApps, start } from 'qiankun'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
function registerMicroAppsMain() {
  registerMicroApps([
    {
      name: 'childApp',
      entry: '//localhost:8081',
      container: '#container',
      activeRule: '/',
    }
  ])
  start({
    prefetch: false,
    strictStyleIsolation: true,
    excludeAssetFilter: (assetUrl) => {
      const whiteList = [];
      const whiteWords = ['vue'];
      if (whiteList.includes(assetUrl)) { return true }
      return whiteWords.some(w => { return assetUrl.includes(w)})
    }
  })
}
new Vue({
  render: h => h(App),
  mounted: () => {
    registerMicroAppsMain()
  }
}).$mount('#app')
