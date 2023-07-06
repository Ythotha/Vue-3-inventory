<template>
  <div
    v-mouse-drag="{ move: onDrag, start: onStart, end: onEnd }"
    class="inventory-grid"
    :class="{'grabbing' : isDragging }"
    ref="wrapperRef"
  >
    <template v-for="(row, i) in inventoryStore.inventory">
      <div
        v-for="(item, j) in row"
        :key="j"
        class="inventory-grid__cell"
        :data-position="`${i}-${j}`"
      >
        <div
          v-if="item"
          :data-position="`${i}-${j}`"
          class="inventory-grid__item"
          @click="onItemClick"
        >
          <img :src="item.img" :alt="item.text" class="inventory-grid__img">
          <span class="inventory-grid__quantity">
            {{ item.quantity }}
          </span>
        </div>
      </div>
    </template>
    <off-canvas v-model="isInfoVisible">
      <item-info/>
    </off-canvas>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useInventoryStore } from '@/stores/inventory'

import mouseDrag from '@/directives/v-mouse-drag'

import OffCanvas from './OffCanvas'
import ItemInfo from './ItemInfo'

export default {
  components: {
    OffCanvas,
    ItemInfo,
  },

  directives: {
    mouseDrag,
  },

  setup() {
    const inventoryStore = useInventoryStore()

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
      if (event.which !== 1) return
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

      copyNode.value = null

      if (fromY === toY && fromX === toX) return

      inventoryStore.changeItemPosition({fromY, fromX, toY, toX})
    }


    function onItemClick(event) {
      const [ toY, toX ] = event.target.dataset.position.split('-')

      inventoryStore.setCurrentItemAddress(`${toY}-${toX}`)
    }

    const isInfoVisible = computed({
      get() {
        return !!inventoryStore.getCurrentItem
      },
      set(val) {
        if(!val) {
          inventoryStore.clearCurrentItemAddress()
        }

      }
    })


    return {
      copyNode,
      wrapperRef,

      inventoryStore,

      isDragging,

      onDrag,
      onStart,
      onEnd,
      onItemClick,

      isInfoVisible,
    }
  },
}
</script>

<style lang="scss">
  .inventory-grid {
    position: relative;
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

    &__item,
    &__avatar {
      display: grid;
      place-items: center;
    }

    &__item {
      position: relative;
      
      height: 100%;

      cursor: pointer;
    }

    &.grabbing &__item{
      cursor: grabbing;
    }

    &__img {
      --img-size: 5.4rem;
      max-width: var(--img-size);
      max-height: var(--img-size);

      pointer-events: none;
    }

    &__quantity {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: .2rem .4rem;
      border: .1rem solid var(--color-gray);
      border-top-left-radius: .6rem;

      background-color: var(--color-black);

      font-size: 1rem;
    }

    &__avatar {
      position: fixed;
      top: 0;
      left: 0;
      border: .1rem solid var(--color-gray);
      border-radius: calc(var(--border-radius) * 2);
      
      background-color: var(--color-black);

      pointer-events: none;
    }

    &__avatar:not(.visible) {
      display: none;
    }

    &__info {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      max-width: 25rem;
      width: 100%;
      box-sizing: border-box;
    }
  }
</style>