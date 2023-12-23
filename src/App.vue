<template>
  <div :class="$i18n.locale === 'en' ? '' : 'rtl'">
    <router-view />
    <Toast/>
  </div>
</template>

<script>
import Toast from "@/components/Shared/Toast/index.vue";
export default {
  components:{
    Toast
  },
  created() {
  },
  beforeCreate(){
  },
  mounted(){
  },
  watch:{
  }
};
</script>

<style lang="scss">
@import "@/assets/style/scss/__variables";

@font-face {
    font-family: DiodrumArabic ;
    src: url('~@/assets/fonts/NotoNaskhArabicUI-Regular.ttf');
}

* {
  &:lang(ar) {
    font-family: "DiodrumArabic", sans-serif;
  }
}


// style scroll bar general
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: $color-notify;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: $color-primary;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(118, 35, 108, 0.75);
}
@media (max-width: 991px) {
  .table th {
    display: none;
  }

  .table tr {
    display: table;
    width: 100%;
  }

  .table td {
    display: table-row;
    position: relative;
    width: 100%;
    vertical-align: top;
    min-height: 36px;
    // text-align: start !important;
  }

  .table td .td-data,
  .table td .td-data {
    display: block;
    padding: 8px;
  }
  .table td .td-actions {
    text-align: start;
    padding: 0 8px;
  }
  .table tr td:first-child {
    background: linear-gradient(to left, #76236C, #58C6F2);;
    --bs-table-accent-bg: linear-gradient(to left, #76236C, #58C6F2);;
    color: #fff;
  }

  .table tr td:first-child span {
    color: #fff;
  }
  .table.no-responsive-bg-color tr td:first-child {
    background-color: #fff;
    color: color(primary);
  }
  .table.no-responsive-bg-color tr:not(:first-child) td:first-child {
    background-color: #fff;
    color: color(primary);
    // border-top: 2px solid #3dafc8;
  }
  .table td:before {
    content: attr(data-th);
  /*  border-left: 1px solid #dee2e6;**/
    display: table-cell;
    padding: 10px;
    width: 130px;
    line-height: 36px;
  }

  [dir="ltr"] .table td:before {
    border-left: 0;
    /* border-right: 1px solid #dee2e6;**/
  }

  .table {
    thead {
      display: none;
    }

    tr {
      display: table;
      width: 100%;
    }

    td {
      display: table-row;
      position: relative;
      width: 100%;
      vertical-align: top;
      min-height: 36px;

      // text-align: start !important;

      .td-data {
        display: flex;
        padding: 8px;
      }

      .td-actions {
        text-align: start;
        padding: 0 8px;
      }
    }

    tr td:first-child {
      background: color(primary);
      --bs-table-accent-bg: color(primary);
      color: #fff;

      span {
        color: #fff;
      }
    }

    &.no-responsive-bg-color tr {
      td:first-child {
        background-color: #fff;
        color: color(primary);
      }

      &:not(:first-child) td:first-child {
        background-color: #fff;
        color: color(primary);
        border-top: 2px solid color(border-color);
      }
    }

    td {
      // border-bottom: 1px solid rgba(#8395b7, 0.25);
    }

    td:before {
      content: attr(data-th);
      // border-left: 1px solid rgba(#8395b7, 0.25);
      display: table-cell;
      padding: 10px;
      width: 130px;
      line-height: 36px;
    }
  }

  [dir="ltr"] .table td:before {
    border-left: 0;
    // border-right: 1px solid rgba(#8395b7, 0.25);
  }
}
</style>
