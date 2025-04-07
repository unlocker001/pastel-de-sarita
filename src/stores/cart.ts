import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() => 
    items.value.reduce((total, item) => total + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  function addItem(item: Omit<CartItem, 'quantity'>) {
    const existingItem = items.value.find(i => i.id === item.id)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...item, quantity: 1 })
    }
  }

  function removeItem(id: string | number) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(id: string | number, newQuantity: number) {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.quantity = newQuantity
    }
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})