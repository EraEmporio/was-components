import './assets/styles/base.scss'

import PrimeVue from 'primevue/config';
import Tooltip from "primevue/tooltip";
import Was from './presets/was';

import * as components from './components'
import { App } from 'vue'

export default function install(app: App) {
  app.directive("tooltip", Tooltip);
  app.use(PrimeVue, {
    unstyled: true,
    pt: Was,
    ripple: true
  });
  for (const key in components) {
    // @ts-expect-error
    app.component(key, components[key])
  }
}

