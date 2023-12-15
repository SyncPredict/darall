<template>
    <div class="menu-item">
        <div class="container">
            <div class="content">
                <div v-if="item.image" class="image-container">
                    <img :src="imageUrl" :alt="`Image of ${item.name}`" class="image">
                </div>
                <div v-else class="image-placeholder">No image</div>
                <div class="info">
                    <h3 class="name">{{ item.name }}</h3>
                    <p class="description">{{ item.description }}</p>
                    <p class="price">Price: ${{ item.price }}</p>
                    <p class="category">Category: {{ categoryNames }}</p>
                </div>
                <div class="actions">
                    <button @click="editItem" class="btn btn--primary">Edit</button>
                    <span class="divider"></span>
                    <button @click="deleteItem" class="btn btn--primary">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, defineProps, defineEmits} from 'vue';
import {useCategoriesStore} from '@/stores/categories';

const props = defineProps({
    item: Object
});

const categoriesStore = useCategoriesStore();
const emit = defineEmits(['edit', 'delete']);

const editItem = () => emit('edit', props.item.id);
const deleteItem = () => emit('delete', props.item.id);

const imageUrl = computed(() => `http://localhost:5000/${props.item.image}`);
const categoryNames = computed(() => {
    const categories = categoriesStore.getCategories;
    return props.item.categories.length > 0
        ? categories.filter(el => props.item.categories.includes(el.id)).map(el => el.name).join(', ')
        : 'No categories';
});

</script>

<style lang="scss">

$menu-item-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


.menu-item {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: $light-background;
  box-shadow: $menu-item-shadow;
  overflow: hidden;

  & .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  & .content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  & .image-container, & .image-placeholder {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-bottom: 0.5px solid #a9a9a9;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  & .info {
    padding: 0 1em;
    flex-grow: 1;

    & .name {
      font-size: 1.2em;
      margin-bottom: 5px;
    }

    & .description {
      font-size: 0.9em;
      margin-bottom: 5px;
    }

    & .price, & .category {
      font-size: 0.8em;
      color: #666;
    }
  }

  & .actions {
    display: flex;
    justify-content: space-between;

    .btn {
      flex: 1;
      border-radius: 0;
      position: relative;

      &:first-child {
        border-bottom-left-radius: 7.5px;
      }

      &:last-child {
        border-bottom-right-radius: 7.5px;
      }

    }

    .divider {
      width: 2px;
      background-color: #ccc;
    }
  }
}
</style>
