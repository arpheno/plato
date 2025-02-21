import { describe, it, expect } from "vitest";
import { createWebHistory } from "vue-router";
import router from "../index";
import HomeView from "../../views/HomeView.vue";
import DeploymentTargetList from "../../components/DeploymentTargetList.vue";

describe("Router", () => {
  it("has the correct routes configured", () => {
    const routes = router.options.routes;
    expect(routes).toHaveLength(2);

    // Check home route
    expect(routes[0]).toEqual({
      path: "/",
      name: "home",
      component: HomeView,
    });

    // Check targets route
    expect(routes[1]).toEqual({
      path: "/targets",
      name: "targets",
      component: DeploymentTargetList,
    });
  });

  it("uses web history mode", () => {
    expect(router.options.history).toBeInstanceOf(
      createWebHistory().constructor,
    );
  });
});
