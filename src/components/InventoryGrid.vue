<template>
  <div
    v-mouse-drag="{ move: onDrag, start: onStart, end: onEnd }"
    class="inventory-grid"
    :class="{'grabbing' : isDragging }"
    ref="wrapperRef"
  >
    <template v-for="(row, i) in matrix">
      <div
        v-for="(item, j) in row"
        :key="j"
        class="inventory-grid__cell"
        :data-position="`${i}-${j}`"
      >
        <inventory-item
          v-if="item"
          :id="index"
          :data-position="`${i}-${j}`"
          style="background: orange;"
          class="inventory-grid__item"
      >
        </inventory-item>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'

import mouseDrag from '@/directives/v-mouse-drag'

import InventoryItem from './InventoryItem.vue'

export default {
  components: {
    InventoryItem,
  },

  directives: {
    mouseDrag,
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
    
    const copyNode = ref(null)
    const wrapperRef = ref(null)
    const startPosition = reactive({ x: 0, y: 0 })
    const avatarSize = reactive({ width: 0, height: 0 })

    const isDragging = computed(() => {
      return Boolean(copyNode.value)
    })

    function onDrag(event) {
      if (!copyNode.value) return
      if (!copyNode.value.classList.contains('visible')) {
        copyNode.value.classList.add('visible')
      }
      
      const { top, right, bottom, left } = wrapperRef.value.getBoundingClientRect()

      const x = Math.max(Math.min(event.x - startPosition.x, right - avatarSize.width), left)
      const y = Math.max(Math.min(event.y - startPosition.y, bottom - avatarSize.height), top)

      copyNode.value.style.transform = `translate(${x}px, ${y}px)`
    }

    function onStart(event) {
      if (!event.target.classList.contains('inventory-grid__item')) return

      startPosition.x = event.offsetX
      startPosition.y = event.offsetY
      avatarSize.width = event.target.clientWidth
      avatarSize.height = event.target.clientHeight
      
      copyNode.value = event.target.cloneNode(true)
      copyNode.value.style.width = `${avatarSize.width}px`
      copyNode.value.style.height = `${avatarSize.height}px`
      copyNode.value.classList.add('inventory-grid__avatar')

      wrapperRef.value.appendChild(copyNode.value)
    }

    function onEnd(event) {
      if (!copyNode.value) return
      
      copyNode.value.remove()
      
      if (!event.target.dataset.position) return
      
      const [ fromY, fromX ] = copyNode.value.dataset.position.split('-')
      const [ toY, toX ] = event.target.dataset.position.split('-')

      matrix[fromY][fromX] = false
      matrix[toY][toX] = true

      copyNode.value = null
    }


    return {
      wrapperRef,
      matrix,

      isDragging,

      onDrag,
      onStart,
      onEnd,
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

    touch-action: none;

    &.grabbing {
      cursor: grabbing;
    }

    &__cell {
      width: 10.4rem;
      height: 10rem;
      background-color: var(--color-black);
      user-select: none;
    }

    &__item {
      height: 100%;

      cursor: grab;
    }

    &.grabbing &__item{
      cursor: grabbing;
    }

    &__avatar {
      display: none;
      position: fixed;
      top: 0;
      left: 0;

      pointer-events: none;
      border: 1px solid;
      border-radius: 24px;
    }

    &__avatar.visible {
      display: block;
    }
  }
</style>