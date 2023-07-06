<template>
  <Transition :name="`slide-from-${position}`">
    <div
      v-if="modelValue"
      class="offcanvas" 
      :class="position"
      :style="`--offcanvas-width: ${maxWidth}`"
    >
      <slot
        class="offcanvas__inner"
      />
      <button
        @click="closeOffcanvas"
        class="offcanvas__close"
        type="button"
      >
        <icon-base>
          <icon-cross></icon-cross>
        </icon-base>
      </button>
    </div>
    </Transition>
</template>

<script>
import { watch, toRefs } from 'vue'

import IconBase from './icons/IconBase'
import IconCross from './icons/IconCross'

export default {
  components: {
    IconBase,
    IconCross
  },

  props: {
    modelValue: Boolean,
    maxWidth: {
      type: String,
      default: '25rem',
    },
    position: {
      type: String,
      default: 'right'
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { modelValue, maxWidth, position } = toRefs(props)
    
    watch(modelValue, (value) => {
      if (value && position.value === 'right') {
        document.querySelector(':root').style.setProperty('--slide-from-right-distance', maxWidth.value)
      }
    })

    function closeOffcanvas() {
      emit('update:modelValue', false)
    }

    return {
      closeOffcanvas,
    }
  }
}
</script>

<style lang="scss">
  .offcanvas {
    position: absolute;

    width: min(100%, var(--offcanvas-width));
    box-sizing: border-box;
    
    background: rgba(38, 38, 38, 0.50);
    backdrop-filter: blur(8px);

    &.right,
    &.left {
      top: 0;
      height: 100%;
    }

    &.right {
      right: 0;

      border-left: .1rem solid var(--color-gray);
    }

    &__close {
      --close-btn-indent: .8rem;
      position: absolute;
      top: var(--close-btn-indent);
      right: var(--close-btn-indent);

      background-color: transparent;
      border: none;

      color: var(--color-white);

      cursor: pointer;
    }
  }
</style>