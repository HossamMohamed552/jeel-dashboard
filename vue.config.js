module.exports = {
  devServer:{
    proxy: "https://jeeladmin.suredemos.com/"
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style/index.scss";',
      },
    },
  },

};
