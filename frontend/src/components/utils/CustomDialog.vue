<template>
    <div v-if="props.modelValue" class="dialog-overlay" @click.self="closeDialog">
        <div class="dialog">
            <form @submit.prevent class="menu-form">
                <div class="menu-form__fields">
                    <slot name="default">

                    </slot>
                </div>
                <button @click="handleSubmit" class="btn btn--primary">
                    {{ buttonLabel }}
                </button>
            </form>
            <button class="close-btn" @click="closeDialog">✕</button>
        </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

const props = defineProps({
    modelValue: Boolean,
    buttonLabel: {
        type: String,
        default: 'Ok'
    }
});
const emit = defineEmits(['update:modelValue', 'submit']);
const handleSubmit = () => {
    emit('submit')
}
const closeDialog = () => {
    emit('update:modelValue', false);
};
</script>

<style scoped lang="scss">
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.dialog {
  position: relative;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 300px;
  animation: fadeIn 0.3s ease-out;

  @media (max-width: 768px) {
    width: 90%;
  }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


.menu-form {
  display: flex;
  flex-direction: column;

  &__fields {
    padding: 20px 20px 0 20px;

    div:not(:last-child):after {
      margin-bottom: 10px;
    }
  }

  .btn {
    margin: 0;
    border: none;
    border-radius: 0 0 7.5px 7.5px;

    &:hover {
      background-color: darken(#007bff, 10%);
    }
  }
}
</style>
