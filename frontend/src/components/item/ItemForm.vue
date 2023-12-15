<template>
    <FormField class="mb-10" label="Name" :model-value="props.modelValue.name"
               @update:model-value="updateValue($event,'name')" placeholder="Name"/>
    <FormField class="mb-10" label="Description" :model-value="props.modelValue.description"
               @update:model-value="updateValue($event,'description')"
               placeholder="Description" type="textarea"/>
    <FormField class="mb-10" label="Price" :model-value="props.modelValue.price" placeholder="Price"
               @update:model-value="updateValue($event,'price')"
               type="number"/>
    <FileUploadField class="mb-10" label="Image" @change="handleFileUpload"/>
    <div class="category-field mb-10">
        <label>Categories</label>
        <select-category :model-value="props.modelValue.categories"
                         @update:model-value="updateValue($event,'categories')"></select-category>
        <selected-categories :model-value="props.modelValue.categories"
                             @update:model-value="updateValue"></selected-categories>

    </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";
import FormField from '../fields/FormField.vue';
import FileUploadField from '../fields/FileUploadField.vue';
import SelectCategory from "@/components/category/SelectCategory.vue";
import SelectedCategories from "@/components/category/SelectedCategories.vue";


const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {
                id: null,
                name: '',
                description: '',
                price: 0,
                categories: [],
                image: null
            }
        }
    }
})

const emit = defineEmits(['update:modelValue'])
const updateValue = (val, key) => {
    const newVal = Object.assign(props.modelValue)
    newVal[key] = val
    emit("update:modelValue", newVal)
}
const handleFileUpload = event => {
    updateValue(event.target.files[0], 'image')
};
</script>


<style lang="scss">
.category-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>