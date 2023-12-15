<template>
    <CustomDialog button-label="Create" :model-value="props.modelValue" @update:model-value="handleClose"
                  @submit="handleSubmit">
        <template #default>
            <FormField class="mb-10" label="Name" v-model="name" placeholder="Name"/>
        </template>
    </CustomDialog>
</template>
<script setup>
import {defineEmits, defineProps, ref} from "vue";
import {useCategoriesStore} from "@/stores/categories";
import CustomDialog from "@/components/utils/CustomDialog.vue";
import FormField from "@/components/fields/FormField.vue";


const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }

});


const name = ref('')
const store = useCategoriesStore();
const emit = defineEmits(['close'])


const handleSubmit = async () => {
    try {
        await store.addCategory({name: name.value});
    } catch (error) {
        // Handle errors appropriately
        console.error("Error submitting form:", error);
    } finally {
        handleClose()
    }
};

const handleClose = () => {
    emit('close')
};
</script>
