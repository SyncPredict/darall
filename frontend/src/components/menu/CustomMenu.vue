<template>
    <div class="menu-container">
        <custom-header>
            <template #categories>
                <div class="categories-container">
                    <selected-categories v-model="filter"></selected-categories>
                </div>
            </template>
            <template #filter>
                <select-category v-model="filter"></select-category>
            </template>
            <template #actions>
                <div class="actions-container">
                    <button @click="openCreateItemDialog" class="btn btn--primary">+</button>
                    <button @click="logout" class="btn btn--primary">Logout</button>
                </div>
            </template>
        </custom-header>
        <items-gallery @edit="openEditItemDialog" :filter="filter"></items-gallery>
    </div>
    <ItemDialog ref="itemDialogRef"/>
</template>


<script setup>
import ItemsGallery from "@/components/item/ItemsGallery.vue";
import {onMounted, ref} from "vue";
import CustomHeader from "@/components/utils/CustomHeader.vue";
import {useAuthStore} from '@/stores/auth';
import {useCategoriesStore} from '@/stores/categories';
import {useItemsStore} from '@/stores/items';
import SelectCategory from "@/components/category/SelectCategory.vue";
import SelectedCategories from "@/components/category/SelectedCategories.vue";
import ItemDialog from "@/components/item/ItemDialog.vue";

const filter = ref([]);
const itemDialogRef = ref(null);

const authStore = useAuthStore();
const categoriesStore = useCategoriesStore();
const itemsStore = useItemsStore();
const logout = async () => {
    await authStore.logout();
    // Редирект на страницу входа или другую страницу после выхода
};

const openCreateItemDialog = () => {
    itemDialogRef.value.openDialog(null)
}

const openEditItemDialog = (id) => {
    itemDialogRef.value.openDialog(id)
}


onMounted(() => {
    categoriesStore.fetchCategories()
    itemsStore.fetchItems()
})
</script>


<style scoped lang="scss">
.menu-container {
  box-sizing: border-box;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // Адаптивность: Менять макет на меньших экранах
  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 4px;
  }
}

.categories-container {
  padding: 0 10px;
  max-width: 400px;
  @media (max-width: 768px) {
    max-width: 175px;
  }
}

.actions-container {
  display: flex; // Установка flexbox для контейнера
  justify-content: space-between; // Равномерное распределение пространства между элементами
  padding: 0 5px; // Отступы вокруг контента внутри контейнера
  margin: 0 auto; // Центрирование контейнера
  width: calc(100% + 10px); // Ширина контейнера подстраивается под содержимое
  box-sizing: border-box; // Учет границ и внутренних отступов в ширине элемента
  @media (max-width: 768px) {
    width: 100%;
  }
}

</style>
