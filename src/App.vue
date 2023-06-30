<template>
  <div class="app">
    <inventory-grid></inventory-grid>
  </div>
</template>

<script>
import InventoryGrid from './components/InventoryGrid.vue'

export default {
  name: 'App',
  components: {
    InventoryGrid,
  },

  setup() {
    return {}
  },
}
</script>

<style>
  .app {
    display: grid;
    place-items: center;
    min-height: inherit;
  }
</style>
