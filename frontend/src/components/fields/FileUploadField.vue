<template>
    <div class="file-upload">
        <label v-if="label">{{ props.label }}</label>
        <input type="file" @change="handleFileChange"/>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
    label: String
});

const emit = defineEmits(['change'])
const handleFileChange = (event) => {
    emit('change', event);
};
</script>

<style scoped lang="scss">
.file-upload {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;


  input[type="file"] {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;

    &:focus {
      border-color: blue;
      outline: none;
    }
  }
}
</style>
