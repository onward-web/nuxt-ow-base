import { defineNuxtModule, createResolver, addPlugin } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "nuxt-ow-base",
    configKey: "nuxtOwBase"
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    addPlugin(resolver.resolve("./runtime/plugin"));
  }
});

export { module as default };
