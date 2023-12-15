<template>
    <div class="form-field">
        <label  v-if="label">{{ label }}</label>
        <input :value="modelValue" v-if="type !== 'textarea'" :type="type" v-bind="$attrs" @input="updateValue"/>
        <textarea :value="modelValue" v-else v-bind="$attrs" @input="updateValue"></textarea>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';

defineProps({
    modelValue: null,
    label: String,
    type: {
        type: String,
        default: 'text'
    }
});

const emit = defineEmits(['update:modelValue'])

const updateValue = (val) => {
    emit('update:modelValue', val.target.value)
}
</script>

<style scoped lang="scss">
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;

    &:focus {
      border-color: blue;
      outline: none;
    }
  }
}
</style>
