import {defineStore} from 'pinia';
import {fetchWrapper} from '@/plugins/utils';

const baseUrl = 'http://localhost:5000/api';

export const useCategoriesStore = defineStore({
    id: 'categories',
    state: () => ({
        categories: [  ],
        loading: false,
        error: null
    }),
    actions: {
        async fetchCategories() {
            this.loading = true;
            this.error = null;
            try {
                this.categories = await fetchWrapper.get(`${baseUrl}/categories`);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        async addCategory(category) {
            this.loading = true;
            this.error = null;
            try {
                const newCategory = await fetchWrapper.post(`${baseUrl}/categories`, category);
                this.categories.push(newCategory);
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        // async updateCategory(category) {
        //     this.loading = true;
        //     this.error = null;
        //     try {
        //         const updatedCategory = await fetchWrapper.put(`${baseUrl}/categories/${category.id}`, category);
        //         const index = this.categories.findIndex(i => i.id === category.id);
        //         if (index !== -1) {
        //             this.categories[index] = updatedCategory;
        //         }
        //     } catch (error) {
        //         this.error = error;
        //     } finally {
        //         this.loading = false;
        //     }
        // },
        // async deleteCategory(id) {
        //     this.loading = true;
        //     this.error = null;
        //     try {
        //         await fetchWrapper.delete(`${baseUrl}/categories/${id}`);
        //         this.categories = this.categories.filter(category => category.id !== id);
        //     } catch (error) {
        //         this.error = error;
        //     } finally {
        //         this.loading = false;
        //     }
        // }
    },
    getters: {
        getCategories(state) {
            return state.categories;
        },
        isLoading(state) {
            return state.loading;
        },
        getError(state) {
            return state.error;
        }
    }
});
