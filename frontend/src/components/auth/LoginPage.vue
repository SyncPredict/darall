<template>
  <div class="login-page">
    <form @submit.prevent="handleSubmit" class="login-form">
      <FormField label="Email" class="mb-10" id="email" v-model="email" type="text" required />
      <FormField label="Password" class="mb-10" id="password" v-model="password" type="password" required />
      <button type="submit" class="btn btn--primary login-form__submit-button">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import FormField from '@/components/fields/FormField.vue';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    await authStore.login(email.value, password.value);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login-form {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .login-form__submit-button {
      width: 100%;
      border: none;
    }
  }
}
</style>
