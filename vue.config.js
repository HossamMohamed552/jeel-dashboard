module.exports = {
  devServer:{
    hot: true,
    port: 4000,
    public: 'https://localhost:5001',
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
