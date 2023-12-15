import {defineStore} from 'pinia';
import {fetchWrapper} from '@/plugins/utils';

const baseUrl = 'http://localhost:5000/api';

export const useItemsStore = defineStore({
    id: 'items',
    state: () => ({
        items: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchItems() {
            this.loading = true;
            this.error = null;
            try {
                this.items = await fetchWrapper.get(`${baseUrl}/items`);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addItem(item) {
            this.loading = true;
            this.error = null;
            try {
                const formData = new FormData();
                // Добавление свойств объекта item в formData
                Object.keys(item).forEach(key => {
                    if (key !== 'image') {
                        formData.append(key, item[key]);
                    }
                });
                // Добавление изображения
                if (item.image) {
                    formData.append('image', item.image, item.image.name);
                }
                const newItem = await fetchWrapper.post(`${baseUrl}/items`, formData, true);
                this.items.push(newItem);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async updateItem(item) {
            this.loading = true;
            this.error = null;
            try {
                const formData = new FormData();
                // Добавление свойств объекта item в formData
                Object.keys(item).forEach(key => {
                    if (key !== 'image') {
                        formData.append(key, item[key]);
                    }
                });
                // Добавление изображения
                if (item?.image?.name) {
                    formData.append('image', item.image, item.image.name);
                }
                const updatedItem = await fetchWrapper.put(`${baseUrl}/items/${item.id}`, formData, true);
                const index = this.items.findIndex(i => i.id === item.id);
                if (index !== -1) {
                    this.items[index] = updatedItem;
                }
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async deleteItem(id) {
            this.loading = true;
            this.error = null;
            try {
                await fetchWrapper.delete(`${baseUrl}/items/${id}`);
                this.items = this.items.filter(item => item.id !== id);

            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        }
    },
    getters: {
        getItems(state) {
            return state.items;
        },
        isLoading(state) {
            return state.loading;
        },
        getError(state) {
            return state.error;
        }
    }
});
