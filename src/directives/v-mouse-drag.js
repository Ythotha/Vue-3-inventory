export default {
  mounted(el, binding) {
    el.__mouse_move_handler = (event) => {
      binding.value.move(event)
    }

    el.__mouse_down_handler = (event) => {
      window.addEventListener('mousemove', el.__mouse_move_handler)
      binding.value.start(event)
    }

    el.__mouse_up_handler = (event) => {
      window.removeEventListener('mousemove', el.__mouse_move_handler)
      binding.value.end(event)
    }

    el.addEventListener('mousedown', el.__mouse_down_handler)
    window.addEventListener('mouseup', el.__mouse_up_handler)
  },
  beforeUnmount(el) {
    window.removeEventListener('mousemove', el.__mouse_move_handler)
    el.removeEventListener('mousedown', el.__mouse_down_handler)
    window.removeEventListener('mouseup', el.__mouse_up_handler)
  },
}