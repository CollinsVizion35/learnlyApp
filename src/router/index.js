// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../components/welcome.vue";
import Home from "../components/home.vue";
import DC from "../components/superheroes/dc.vue";
import Invincible from "../components/superheroes/invincible.vue";
import Marvel from "../components/superheroes/marvel.vue";
import Princesses from "../components/homePrincess.vue";
import Cartoons from "../components/homeCartoon.vue";
import Cinderella from "../components/princesses/cinderella.vue";
import Aladdin from "../components/princesses/aladdin.vue";
import SnowWhite from "../components/princesses/snowWhite.vue";

const routes = [
  { path: "/", component: Welcome },
  { path: "/home", component: Home },
  { path: "/dc", component: DC },
  { path: "/invincible", component: Invincible },
  { path: "/marvel", component: Marvel },
  { path: "/princess", component: Princesses },
  { path: "/cartoon", component: Cartoons },
  { path: "/cinderella", component: Cinderella },
  { path: "/aladdin", component: Aladdin },
  { path: "/snowWhite", component: SnowWhite },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
