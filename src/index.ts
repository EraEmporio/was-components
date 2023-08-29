/* import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
 */

import './assets/main.scss'

import * as components from './components'

import { App } from 'vue'

export default function install (app: App) {
  for (const key in components) {
    // @ts-expect-error
    app.component(key, components[key])
  }
}