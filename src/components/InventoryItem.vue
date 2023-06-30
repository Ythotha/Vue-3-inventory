<template>
  <div
    :id="id"
    class="inventory-item"
  >

  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: {
    id: Number,
    position: String,
  },

  setup(props) {
    const item = ref(null)

    function onDragStart(event) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('itemId', props.position)
    }

    return {
      item,
      onDragStart
    }
  },
}
</script>

<style>

</style>