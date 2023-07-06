<template>
  <div class="item-info">
    <div class="item-info__filler">
      <div class="item-info__content">
        <div class="item-info__img-wrapper">
          <img :src="currentItem.img" alt="" class="item-info__img">
        </div>
        <div class="item-info__separator" aria-hidden="true">
        </div>
        <span class="item-info__name">
          {{ currentItem.name }}
        </span>
        <span v-for="i in 4" :key="i" class="item-info__text">
          {{ currentItem.text }}
        </span>
      </div>
    </div>
    <div class="item-info__bottom">
      <template v-if="!removeItemDialogVisible">
        <div class="item-info__separator" aria-hidden="true">
        </div>
        <button
          @click="toggleRemoveDialogVisibility"
          class="btn btn_color_red item-info__remove"
          type="button"
        >
          Удалить предмет
        </button>
      </template>
      <template v-if="removeItemDialogVisible">
        <input v-model="removeQuantity" min="1" :max="currentItem.quantity" class="input" type="number" placeholder="Введите количество">
        <div class="item-info__row">
          <button
            @click="toggleRemoveDialogVisibility"
            class="btn btn_small"
            type="button"
          >
            Отмена
          </button>
          <button
            @click="subtractFromItem"
            class="btn btn_small btn_color_red"
            type="button"
          >
            Подтвердить
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useInventoryStore } from '@/stores/inventory'

export default {
  setup() {
    const inventoryStore = useInventoryStore()
    const currentItem = computed(() => {
      return inventoryStore.getCurrentItem
    })

    const removeItemDialogVisible = ref(false)
    function toggleRemoveDialogVisibility() {
      removeItemDialogVisible.value = !removeItemDialogVisible.value
    }

    const removeQuantity = ref('')
    function subtractFromItem() {
      inventoryStore.subtractFromCurrentItem(removeQuantity.value)
    }

    return {
      currentItem,
      removeItemDialogVisible,
      toggleRemoveDialogVisibility,
      removeQuantity,

      subtractFromItem,
    }
  },
}
</script>
<style lang="scss">
  .item-info {
    position: relative;
    display: flex;
    flex-direction: column;
    height: inherit;
    box-sizing: border-box;
    padding: 2rem 1.5rem;

    text-align: center;

    &__filler {
      position: relative;
      flex-grow: 1;
    }

    &__content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
    }

    &__content::-webkit-scrollbar {
      display: none;
    }

    &__img-wrapper {
      position: relative;
      margin-inline: auto;
      width: 88%;
    }

    &__img-wrapper::before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    &__img {
      position: absolute;
      top: 50%;
      left: 50%;
      max-width: 100%;
      max-height: 100%;
      
      transform: translate(-50%, -50%);
    }

    &__separator {
      border-top: .1rem solid var(--color-gray);
    }

    &__name,
    &__text {
      display: block;
    }

    &__name {
      margin-block: 1.6rem 2.4rem;

      font-size: 2em;
    }

    &__text {
      margin-block: 1.6rem;
    }

    &__remove {
      margin-top: 1.8rem;
    }

    &__row {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
  }
</style>