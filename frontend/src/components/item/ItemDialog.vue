<template>
    <CustomDialog :button-label="submitLabel" v-model="dialog"
                  @submit="handleSubmit">
        <template #default>
            <item-form v-model="item"/>
        </template>
    </CustomDialog>
</template>
<script setup>
import {computed, ref, defineExpose} from "vue";
import ItemForm from "@/components/item/ItemForm.vue";
import {useItemsStore} from "@/stores/items";
import CustomDialog from "@/components/utils/CustomDialog.vue";

const store = useItemsStore();
const initItem = () => {
    return {
        id: null,
        name: '',
        description: '',
        price: 0,
        categories: [],
        image: null
    }
}
const dialog = ref(false);
const item = ref(initItem())
const submitLabel = computed(() => item.value.id ? "Save" : "Create");
const items = computed(() => store.getItems);


const handleSubmit = async () => {
    try {
        if (item.value.id) {
            await store.updateItem(item.value);
        } else {
            await store.addItem(item.value);
        }
    } catch (error) {
        // Handle errors appropriately
        console.error("Error submitting form:", error);
    } finally {
        dialog.value = false
    }
};

const openDialog = (id) => {
    if (id) {
        const editItem = items.value.find((el) => el.id === id)
        if (editItem) {
            item.value = {...editItem}
        }
    } else {
        item.value = initItem()
    }
    dialog.value = true
}

defineExpose({openDialog})
</script>
