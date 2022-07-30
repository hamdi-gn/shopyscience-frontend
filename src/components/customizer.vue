<template>
  <div>


  </div>
</template>
<script>
import { mapState } from "vuex";
import { layoutClasses } from "../constants/layout";
export default {
  name: "customizer",
  data() {
    return {
      customizer: "",
      sidebarSetting: "color",
      layoutType: "ltr",
      sidebarType: "default",
      mixLayout: "default",
      styleObject: {
        position: "fixed",
        left: "0",
        top: "0",
        opacity: "0",
      },
    };
  },
  mounted() {
    this.layout.color.color = localStorage.getItem("color");
    this.layout.color.primary_color = localStorage.getItem("primary_color");
    this.layout.color.secondary_color = localStorage.getItem("secondary_color");
  },
  computed: {
    ...mapState({
      layout: (state) => state.layout.layout,
      data: (state) => JSON.stringify(state.layout.layout),
    }),
  },
  methods: {
    openCustomizerSetting(val) {
      this.customizer = val;
    },
    customizerSetting(val) {
      this.sidebarSetting = val;
    },
    customizeLayoutType(val) {
      this.$store.dispatch("layout/setLayoutType", val);
      this.layoutType = val;
    },
    customizeSidebarSetting(val) {
      this.layout.settings.sidebar_setting = val;
    },
    handlePageLayputs(val, layout) {
      const layoutobj = layoutClasses.find(
        (item) => Object.keys(item).pop() === layout
      );
      this.$store.dispatch("layout/setCustomizeSidebarType", layoutobj[layout]);
      this.layout.settings.layout = layout;
      this.$router.push({ query: { layout: layout } }).catch((err) => err);
      if (layoutobj[layout].split(" ").includes("compact-sidebar")) {
        this.$store.state.menu.activeoverlay = true;
        document.getElementById("sidebar-menu").classList.remove("d-flex");
      } else {
        this.$store.state.menu.activeoverlay = false;
        document.getElementById("sidebar-menu").classList.add("d-flex");
      }

      if (layout === "Dubai") {
        this.$store.state.layout.boxlayout = true;
      } else {
        this.$store.state.layout.boxlayout = false;
      }

      if (layout === "Tokyo" || layout === "Moscow" || layout === "Rome") {
        this.$store.state.menu.togglesidebar = true;
      }
    },
    customizeSidebarBackround(val) {
      this.layout.settings.sidebar_backround = val;
    },
    customizeMixLayout(val) {
      this.mixLayout = val;
      this.$store.dispatch("layout/setLayout", val);
    },
    customizeColor() {
      const primary = document.getElementById("ColorPicker1").value;
      const secondary = document.getElementById("ColorPicker2").value;
      this.$store.dispatch("layout/setColorScheme", { primary, secondary });
    },
    resetColor() {
      localStorage.setItem("primary_color", "#7366ff");
      localStorage.setItem("secondary_color", "#f73164");
      window.location.reload();
    },
    customizeDarkColorScheme(val) {
      this.$store.dispatch("layout/setColorDarkScheme", val);
    },
    copyText() {
      this.$refs.layout.select();
      document.execCommand("copy");
      this.$toasted.show("Code Copied to clipboard", {
        theme: "outline",
        position: "top-right",
        type: "default",
        duration: 2000,
      });
    },
  },
};
</script>
