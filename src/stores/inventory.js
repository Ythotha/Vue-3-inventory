import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useInventoryStore = defineStore('inventory', () => {
  const inventory = ref([
    [ {
        quantity: 5,
        name: 'TOTK',
        text: 'Game of the year 2023',
        img: 'https://dummyimage.com/600x600/000000/ffffff'
      }, {
        quantity: 3,
        name: 'BOTW',
        text: 'Game of the year 2017',
        img: 'https://dummyimage.com/600x600/25dbc6/000000'
      }, {
        quantity: 4,
        name: 'XC2',
        text: 'Game of the year 2018',
        img: 'https://dummyimage.com/600x600/ffffff/000000'
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
