// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../components/Welcome.vue";
import Home from "../components/Home.vue";
import DC from "../components/superheroes/dc.vue";
import Invincible from "../components/superheroes/invincible.vue";
import Marvel from "../components/superheroes/marvel.vue";

const routes = [
  { path: "/", component: Welcome },
  { path: "/home", component: Home },
  { path: "/dc", component: DC },
  { path: "/invincible", component: Invincible },
  { path: "/marvel", component: Marvel },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
