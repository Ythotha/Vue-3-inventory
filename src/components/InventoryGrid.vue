<template>
  <div
    @dragover.prevent
    @drop.prevent="onDrop"
    class="inventory-grid"
  >
    <template v-for="(row, i) in matrix">
      <div
        v-for="(item, j) in row"
        :key="j"
        class="inventory-grid__item"
        :data-position="`${i}-${j}`"
      >
        <inventory-item
          v-if="item"
          :id="index"
          :position="`${i}-${j}`"
          draggable="true"
          style="height: 100%; background: orange;"
      >
        </inventory-item>
      </div>
    </template>
  </div>
</template>

<script>
import { reactive } from 'vue'

import InventoryItem from './InventoryItem.vue'

export default {
  components: {
    InventoryItem,
  },

  setup() {
    // const matrix = reactive([
    //   [ true, false, false, false, false ],
    //   [ false, false, false, false, false ],
    //   [ false, false, false, false, false ],
    //   [ false, false, false, true, false ],
    //   [ false, false, false, false, false ]
    // ])

    const size = 5
    const matrix = reactive(Array(size).fill(null).map(() => Array(size).fill(false)))

    matrix[0][0] = true

    function onDrop(event) {
      if (!event.target.dataset.position) return

      const [ fromY, fromX ] = event.dataTransfer.getData('itemId').split('-')
      const [ toY, toX ] = event.target.dataset.position.split('-')

      matrix[fromY][fromX] = false
      matrix[toY][toX] = true
    }

    return {
      matrix,
      onDrop,
    }
  },
}
</script>

<style lang="scss">
  .inventory-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: .1rem;

    border: .1rem solid transparent;
    border-radius: var(--border-radius);

    background-color: var(--color-gray);

    overflow: hidden;

    &__item {
      width: 10.4rem;
      height: 10rem;
      background-color: var(--color-black);
      user-select: none;
    }
  }
</style>