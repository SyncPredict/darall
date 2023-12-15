const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                // Используйте обратные кавычки для многострочной строки
                additionalData: `
                    @import "@/styles/variables.scss";
                    @import "@/styles/common.scss";
                `
            }
        }
    }
})
