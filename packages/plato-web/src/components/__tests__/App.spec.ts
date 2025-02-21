import { describe, it, expect } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import App from "../../App.vue";
import HomeView from "../../views/HomeView.vue";
import DeploymentTargetList from "../DeploymentTargetList.vue";

describe("App", () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component: HomeView },
      { path: "/targets", component: DeploymentTargetList },
    ],
  });

  it("renders navigation links", () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    const links = wrapper.findAll("nav a");
    expect(links).toHaveLength(2);
    expect(links[0].text()).toBe("Home");
    expect(links[1].text()).toBe("Deployment Targets");
  });

  it("applies active class to current route", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });

    await router.push("/targets");
    await wrapper.vm.$nextTick();

    const activeLink = wrapper.find("nav a.router-link-active");
    expect(activeLink.exists()).toBe(true);
    expect(activeLink.text()).toBe("Deployment Targets");
  });

  it("renders router view", () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router],
        stubs: ["RouterView"],
      },
    });

    expect(wrapper.find("main").exists()).toBe(true);
    expect(wrapper.find("router-view-stub").exists()).toBe(true);
  });
});
