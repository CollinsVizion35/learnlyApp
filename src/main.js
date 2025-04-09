// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css"; // Tailwind CSS
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faBookmark, faStar, faStarHalfStroke, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faBookmark, faStar, faStarHalfStroke, faArrowLeft, faArrowRight );

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
