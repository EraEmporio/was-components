import './assets/styles/base.scss'

import PrimeVue from 'primevue/config';
import Tooltip from "primevue/tooltip";
import Was from './presets/was';
import ptBrLocale from './utils/primeLocalePtBr';
import { usePrimeVue } from "primevue/config";
import * as components from './components'
import { App } from 'vue'

export default function install(app: App, options: any) {
  app.directive("tooltip", Tooltip);
  app.use(PrimeVue, {
    unstyled: true,
    pt: Was,
    ripple: true,
    locale: {
      ...ptBrLocale
    },
  });

  app.mixin({
    created() {
      const primevue = usePrimeVue();
      primevue.config.pt = Was;
    },
  });

  for (const key in components) {
    // @ts-expect-error
    app.component(key, components[key])
  }
}

