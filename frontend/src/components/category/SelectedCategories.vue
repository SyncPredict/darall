<template>
    <div class="selected-categories">
        <div v-for="category in fullSelectedCategories" :key="category.id" class="selected-category">
            {{ category.name }}
            <span class="remove-category" @click.stop="removeCategory(category.id)">✕</span>
        </div>
    </div>
</template>

<script setup>
import {computed, defineEmits, defineProps} from 'vue'
import {useCategoriesStore} from "@/stores/categories";
const store = useCategoriesStore();
const emit = defineEmits(['update:modelValue'])
const props = defineProps(['modelValue'])

const allCategories = computed(() => store.getCategories);
const fullSelectedCategories = computed(() => {
    return allCategories.value.filter(category => props.modelValue.includes(category.id));
});
const removeCategory = id => {
    emit('update:modelValue', props.modelValue.filter(category => category !== id));
};
</script>


<style lang="scss">
.selected-categories {

  display: flex; // Используем flex-контейнер
  flex-direction: row; // Элементы выстраиваются в ряд
  overflow-x: scroll; // Добавляем горизонтальную прокрутку
  overflow-y: hidden; // Убираем вертикальную прокрутку
  max-width: 100%; // Максимальная ширина равна ширине select-input
  white-space: nowrap; // Запрещаем перенос элементов на новую строку

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; // Скрытие цвета ползунка полосы прокрутки
  }

  .selected-category {
    display: inline-block; // Устанавливаем inline-block для элементов категорий
    margin: 2.5px 5px 2.5px 2.5px; // Добавляем отступ справа для каждого элемента

    padding: 3px 5px;
    background-color: #e0e0e0;
    border-radius: 3px;


    .remove-category {
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
</style>