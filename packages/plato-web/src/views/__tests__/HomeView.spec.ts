import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../HomeView.vue";
import DeploymentTargetList from "../../components/DeploymentTargetList.vue";

describe("HomeView", () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/targets", name: "targets", component: DeploymentTargetList },
    ],
  });

  it("renders welcome message", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });

    expect(wrapper.find("h1").text()).toBe("Welcome to Plato");
    expect(wrapper.find(".home > p").text()).toContain(
      "DevOps automation platform",
    );
  });

  it("renders all feature sections", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });

    const features = wrapper.findAll(".feature");
    expect(features).toHaveLength(3);

    const featureTitles = features.map((f) => f.find("h3").text());
    expect(featureTitles).toContain("Deployment Management");
    expect(featureTitles).toContain("Project Overview");
    expect(featureTitles).toContain("Automated Deployments");
  });

  it("contains a link to deployment targets", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    });

    const link = wrapper.find("a.btn");
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe("View Targets");
    expect(link.attributes("href")).toBe("/targets");
  });
});
