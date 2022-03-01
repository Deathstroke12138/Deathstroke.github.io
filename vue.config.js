module.exports = {
    devServer: {
        open: true
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import '@/assets/scss/_variable.scss';`
            }
        }
    }
}
