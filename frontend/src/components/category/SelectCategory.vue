<template>
    <div class="select-category">
        <div class="select-input" @click="toggleDropdown">
            <input class="search-input" type="text" v-model="searchQuery" @input="filterCategories"
                   placeholder="Select categories"/>
        </div>
        <div v-if="dropdownVisible" class="dropdown">
            <div class="add-category" @click="openDialog">Add Category</div>
            <div v-if="filteredCategories.length">
                <div v-for="category in filteredCategories" :key="category.id" class="dropdown-item"
                     @click="selectCategory(category.id)">
                    {{ category.name }}
                </div>
            </div>
            <div v-else class="no-items">No items</div>
        </div>
    </div>
    <category-dialog v-model="dialog" @close="closeDialog"></category-dialog>

</template>

<script setup>
import {ref, computed, watch, defineProps, defineEmits} from 'vue';
import {useCategoriesStore} from "@/stores/categories";
import CategoryDialog from "@/components/category/CategoryDialog.vue";


const props = defineProps({
    modelValue: {type: Array, default: () => []},
});

const dialog = ref(false);
const store = useCategoriesStore();
const searchQuery = ref('');
const dropdownVisible = ref(false);
const emit = defineEmits(['update:modelValue', 'add']);
const allCategories = computed(() => store.getCategories);

watch(searchQuery, newValue => {
    if (!newValue) dropdownVisible.value = false;
});
const updateValue = (val) => {
    emit('update:modelValue', val);
}
const openDialog = () => dialog.value = true
;
const closeDialog = () => dialog.value = false;

const filterCategories = () => dropdownVisible.value = !!searchQuery.value;

const toggleDropdown = () => dropdownVisible.value = !dropdownVisible.value;

const resetInput = () => {
    searchQuery.value = '';
    dropdownVisible.value = false;
};


const selectCategory = id => {
    updateValue([...props.modelValue, id]);
    resetInput();
};


const filteredCategories = computed(() => {
    return allCategories.value.filter(category =>
        category.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        !props.modelValue.includes(category.id)
    );
});


</script>

<style scoped lang="scss">
.select-category {
  position: relative;
  box-sizing: border-box;

  .select-input {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid #ccc;
    padding: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    text-overflow: ellipsis;
    height: 40px;
    width: 100%; // Используйте 100% ширины для лучшей адаптивности

    .search-input {
      flex-grow: 1;
      border: none;
      min-width: 60px;

      &:focus {
        outline: none;
      }
    }


  }


  .dropdown {
    position: absolute;
    width: 100%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;

    .dropdown-item {
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #f0f0f0;
      }
    }

    .add-category {
      padding: 10px;
      background-color: #e6e6e6;
      text-align: center;
      cursor: pointer;
      border-top: 1px solid #ccc;

      &:hover {
        background-color: #d6d6d6;
      }
    }

    .no-items {
      padding: 10px;
    }
  }

  // Добавляем медиа-запросы для адаптивности
  @media (max-width: 768px) {
    max-width: 100%; // Увеличиваем ширину на мобильных устройствах

    .select-input {
      flex-direction: column;
      .search-input {
        width: 100%; // Используйте всю доступную ширину
      }
    }
  }
}


</style>
