<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    class="icon-base"
    :width="_width"
    :height="_height"
    viewBox="0 0 24 24"
    role="presentation"
  >
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconLang: String,
    width: [Number, String],
    height: [Number, String],
    size: {
      type: [Number, String],
      default: 24,
    },
    /** Цвет иконки в формате как для CSS */
    iconColor: {
      type: String,
      default: 'currentColor',
    },
  },

  computed: {
    _width () {
      return this.width || this.size
    },
    _height () {
      return this.height || this.size
    },
  },
}
</script>

<style>
  .icon-base {
    display: block;
  }

</style>
