import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', () => {
  const inventory = ref([
    [ {
        quantity: 5,
        name: 'TOTK',
        text: 'Game of the year 2023',
        img: 'https://loremflickr.com/cache/resized/65535_52230352689_bcee6be965_q_130_130_nofilter.jpg'
        // img: 'https://loremflickr.com/130/130'
      }, {
        quantity: 3,
        name: 'BOTW',
        text: 'Game of the year 2017',
        img: 'https://loremflickr.com/cache/resized/65535_52313363183_365d8c9e44_q_130_130_nofilter.jpg'
      }, {
        quantity: 4,
        name: 'XC2',
        text: 'Game of the year 2018',
        img: 'https://loremflickr.com/cache/resized/65535_52422330809_c86d4f09f3_q_130_130_nofilter.jpg'
      }, null, null ],
    [ null, null, null, null, null ],
    [ null, null, null, null, null ],
    [ null, null, null, null, null ],
    [ null, null, null, null, null ]
  ])

  function changeItemPosition(payload) {
    if (this.inventory[payload.toY][payload.toX] !== null)  {
      [
        this.inventory[payload.fromY][payload.fromX],
        this.inventory[payload.toY][payload.toX]
      ] = [
        this.inventory[payload.toY][payload.toX],
        this.inventory[payload.fromY][payload.fromX]
      ]
      return
    }

    this.inventory[payload.toY][payload.toX] = this.inventory[payload.fromY][payload.fromX] 
    this.inventory[payload.fromY][payload.fromX] = null
  }

  const currentItemAddress = ref('')
  const getCurrentItem = computed(() => {
    if (!currentItemAddress.value) return undefined
    const [ y, x ] = currentItemAddress.value.split('-')

    return inventory.value[y][x]
  })

  function setCurrentItemAddress(address) {
    currentItemAddress.value = address
  }

  function clearCurrentItemAddress() {
    currentItemAddress.value = ''
  }

  function subtractFromCurrentItem(value) {
    const [ y, x ] = currentItemAddress.value.split('-')
    const result = getCurrentItem.value.quantity - value

    if (result > 0) {
      inventory.value[y][x].quantity = result
    } else {
      currentItemAddress.value = ''
      inventory.value[y][x] =  null
    }
  }

  return { 
    inventory,
    changeItemPosition,

    currentItemAddress,
    getCurrentItem,
    setCurrentItemAddress,
    clearCurrentItemAddress,
    subtractFromCurrentItem,
  }
}, {persist: true})