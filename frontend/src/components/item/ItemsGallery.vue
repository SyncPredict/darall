<template>
    <div class="gallery-container">
        <div v-for="item in items" :key="item.id" class="gallery-item">
            <menu-item :item="item" @edit="openEditItemDialog" @delete="deleteItem"/>
        </div>
    </div>
</template>


<script setup>
import {computed,  defineProps, defineEmits} from 'vue'
import {useItemsStore} from "@/stores/items";
import MenuItem from "@/components/item/MenuItem.vue";

const itemsStore = useItemsStore()
const emit = defineEmits(['edit'])

const openEditItemDialog = (id) => {
    emit('edit', id)
};
const deleteItem = async (id) => {
    await itemsStore.deleteItem(id)
};


const props = defineProps({
    filter: {
        type: Array,
        default() {
            return []
        }
    }
})
const items = computed(() => {
    const allItems = itemsStore.getItems
    if (props.filter.length > 0)
        return allItems.filter(el => el.categories.some(element => props.filter.includes(element)))
    else
        return allItems
});
</script>


<style lang="scss" scoped>
.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
  justify-items: center;

  .gallery-item {
    width: 100%;
    max-width: 400px; // Максимальная ширина для отдельных элементов
  }
}


</style>
