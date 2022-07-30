<template>
  <div class="header-wrapper row m-0">
    <form
      class="form-inline search-full"
      action="#"
      method="get"
      :class="{ open: searchOpen }"
    >
      <div class="form-group w-100">
        <div class="Typeahead Typeahead--twitterUsers">
          <div class="u-posRelative">
            <input
              class="demo-input Typeahead-input form-control-plaintext w-100"
              type="text"
              v-on:keyup="searchterm"
              v-model="terms"
              placeholder="Search Shopy Science .."
              name="q"
              title=""
              autofocus
            />
            <div class="spinner-border Typeahead-spinner" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <feather
              class="close-search"
              type="x"
              @click="search_close()"
            ></feather>
          </div>
          <div
            :class="searchResult ? 'Typeahead-menu is-open' : 'Typeahead-menu'"
            v-if="menuItems.length"
          >
            <div
              class="ProfileCard u-cf"
              v-for="(menuItem, index) in menuItems.slice(0, 8)"
              :key="index"
            >
              <div class="ProfileCard-avatar header-search">
                <!-- <feather :type="menuItem.icon"></feather> -->
              </div>
              <div class="ProfileCard-details">
                <div class="ProfileCard-realName">
                  <span @click="removeFix()"
                    ><router-link
                      :to="{ path: menuItem.path }"
                      class="realname"
                      >{{ menuItem.title }}</router-link
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            :class="
              searchResultEmpty ? 'Typeahead-menu is-open' : 'Typeahead-menu'
            "
          >
            <div class="tt-dataset tt-dataset-0">
              <div class="EmptyMessage">
                Your search turned up 0 results. Opps There are no result found.
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="header-logo-wrapper">
      <div class="logo-wrapper">
        <router-link to="/">
          <img class="img-fluid" src="../assets/images/logo/logo.png" alt />
        </router-link>
      </div>
      <div class="toggle-sidebar" @click="toggle_sidebar">
        <feather
          class="status_toggle middle sidebar-toggle"
          type="sliders"
          id="sidebar-toggle"
        ></feather>
      </div>
    </div>
    <div class="left-header col horizontal-wrapper pl-0">
      <ul class="horizontal-menu">
        <li class="mega-menu outside">
          <a
            class="nav-link"
            href="javascript:void(0);"
          >
            <feather type="layers"></feather><span>Bonus Ui</span>
          </a>
        </li>
        <li class="level-menu outside">
          <a class="nav-link" href="#">
            <feather type="inbox"></feather>
            <span>Level Menu</span></a
          >
        </li>
      </ul>
    </div>
    <div class="nav-right col-8 pull-right right-header p-0">
      <ul class="nav-menus">
        <li class="maximize">
          <a
            class="text-dark"
            href="javascript:void(0)"
            @click="toggle_fullscreen()"
          >
            <feather type="maximize"></feather
          ></a>
        </li>
        <li class="profile-nav onhover-dropdown p-0 mr-0">
          <div class="media profile-media">
            <img
              class="b-r-10"
              src="../assets/images/dashboard/profile.jpg"
              alt=""
            />
            <div class="media-body">
              <span>{{currentUser.first_name}} {{currentUser.last_name}}</span>
              <p class="mb-0 font-roboto">
                {{currentUser.username}} <i class="middle fa fa-angle-down"></i>
              </p>
            </div>
          </div>
          <ul class="profile-dropdown onhover-show-div">
            <li>
              <a><feather type="log-in"></feather><span @click="Logout" >Log out</span></a
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
var body = document.getElementsByTagName("body")[0];
import { mapState } from "vuex";
import axios from 'axios'
export default {
  name: "Search",
  data() {
    return {
      currentUser: {},
      terms: "",
      searchOpen: false,
      searchResult: false,
      searchResultEmpty: false,
      close_sidebar_var: false,
      clicked: false,
      mobile_toggle: false,
      mobile_search: false,
      openbonusUI: false,
      openLevelmenu: false,
      openlanguage: false,
      mobile_accordian: false,
      mixLayout: "light-only",
    };
  },
  components: {
  },
  computed: {
    ...mapState({
      menuItems: (state) => state.menu.searchData,
      megamenuItems: (state) => state.menu.megamenu,
    }),
  },
  mounted() {
    this.GetUser()
  },
  methods: {
    async Logout() {
      await axios.post('https://shopyscience.herokuapp.com/authentication/logout/',
      {
        headers:{
          Authorization: `Token ${localStorage.getItem('access_token')}`,
        },
      })
      .then(() => {
        localStorage.clear(),
        this.$router.push('/connexion')
      })
    },
      async GetUser() {
        await axios.get('https://shopyscience.herokuapp.com/authentication/user/', 
        {
          headers:{
            Authorization: `Token ${localStorage.getItem('access_token')}`,
          },
        })
        .then((res) => {
          this.currentUser = res.data
        })
        .catch(() => {
          localStorage.clear(),
          this.$router.push('/connexion')
        })
      },
    toggle_sidebar() {
      this.$store.dispatch("menu/opensidebar");
    },
    setNavActive(item) {
      this.$store.dispatch("menu/setBonusNavActive", item);
    },
    openlangpicker() {
      this.openlanguage = !this.openlanguage;
    },
    openlevelmenu() {
      this.openLevelmenu = !this.openLevelmenu;
    },
    openmegamenu() {
      this.openbonusUI = !this.openbonusUI;
    },
    closeBonusUI() {
      this.openbonusUI = false;
    },
    search_open() {
      this.searchOpen = true;
    },
    search_close() {
      this.searchOpen = false;
    },
    searchterm: function () {
      this.$store.dispatch("menu/searchTerm", this.terms);
    },
    changeLocale(locale) {
      this.setLang(locale);
    },
    mobileaccordian() {
      this.mobile_accordian = !this.mobile_accordian;
    },
    addFix() {
      body.classList.add("offcanvas");
      this.searchResult = true;
    },
    removeFix() {
      body.classList.remove("offcanvas");
      this.searchResult = false;
      this.terms = "";
    },
    toggle_fullscreen() {
      if (
        (document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)
      ) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    customizeMixLayout(val) {
      this.mixLayout = val;
      this.$store.dispatch("layout/setLayout", val);
    },
  },
  watch: {
    "$i18n.locale"(to, from) {
      if (from !== to) {
        this.$router.go(this.$route.path);
      }
    },
    menuItems: function () {
      this.terms ? this.addFix() : this.removeFix();
      if (!this.menuItems.length) this.searchResultEmpty = true;
      else this.searchResultEmpty = false;
    },
  },
};
</script>
