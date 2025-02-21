import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DeploymentTargetList from "../components/DeploymentTargetList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/targets",
      name: "targets",
      component: DeploymentTargetList,
    },
  ],
});

export default router;
