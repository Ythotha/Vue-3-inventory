<template>
  <div class="app-bottom">
    <Skeletor class="app-aside__content" width="100%" height="36"/> 
    <button
      class="app-bottom__close"
      type="button"
    >
      <icon-base>
        <icon-cross></icon-cross>
      </icon-base>
    </button>
  </div>
</template>

<script>
import { Skeletor } from 'vue-skeletor';

import IconBase from './icons/IconBase'
import IconCross from './icons/IconCross'

export default {
  components: {
    Skeletor,
    IconBase,
    IconCross,
  }
}
</script>

<style lang="scss">
  .app-bottom {
    position: relative;
    border: var(--default-border);
    border-radius: var(--border-radius);
    padding: 1.8rem;
    padding-right: 6.8rem;
    background-color: var(--color-black);

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