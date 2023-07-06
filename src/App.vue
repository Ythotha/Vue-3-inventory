<template>
  <div class="app">
    <div class="app__inner">
      <div class="app__row">
        <app-aside class="app__aside"/>
        <inventory-grid/>
      </div>
      <app-bottom class="app__bottom"/>
    </div>
  </div>
</template>

<script>
import AppAside from './components/AppAside'
import InventoryGrid from './components/InventoryGrid'
import AppBottom from './components/AppBottom'
import '../node_modules/vue-skeletor/dist/vue-skeletor.css'
import 'vue-skeletor/dist/vue-skeletor.css'

export default {
  name: 'App',
  components: {
    AppAside,
    InventoryGrid,
    AppBottom,
  },

  setup() {
    return {}
  },
}
</script>

<style lang="scss">
  .app {
    --gap: 2.4rem;

    display: grid;
    place-items: center;
    align-content: center;
    gap: var(--gap);
    min-height: inherit;

    &__inner {
      display: grid;
      gap: var(--gap);

      max-width: 78.5rem;
    }

    &__row {
      display: grid;
      grid-template-columns: 30% auto;
      gap: var(--gap);
    }

    &__aside {
      height: 100%;
      box-sizing: border-box;
    }

    &__bottom {
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>
