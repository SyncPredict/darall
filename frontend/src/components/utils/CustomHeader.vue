<template>
    <div class="header">
        <h1 class="header__title">Restaurant Menu</h1>
        <div class="header__controls">
            <div class="header__filter_categories">
                <slot name="categories">

                </slot>
            </div>
            <div class="header__filter">
                <slot name="filter">

                </slot>
            </div>
            <div class="header__buttons">
                <slot name="actions">
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: $light-gray;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &__title {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: $dark-gray;
  }

  // Использование медиа-запросов для адаптивности
  &__controls {
    display: flex;
    // Устанавливаем обертывание элементов при необходимости
    flex-wrap: wrap;
    gap: 10px; // Добавляем небольшой зазор между элементами

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px; // Уменьшаем зазор на маленьких экранах
    }

    // Стили для дочерних элементов, чтобы они реагировали на изменение ориентации
    & > * {
      flex: 1 1 auto; // Позволяет элементам растягиваться и сжиматься

      @media (max-width: 768px) {
        width: 100%; // На маленьких экранах занимаем всю ширину
      }
    }
  }
}

</style>

