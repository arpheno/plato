import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DeploymentTargetList from "../DeploymentTargetList.vue";
import axios from "axios";

vi.mock("axios");

const waitForUpdate = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe("DeploymentTargetList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading state initially", () => {
    const wrapper = mount(DeploymentTargetList);
    expect(wrapper.find(".loading").exists()).toBe(true);
  });

  it("shows empty state when no targets are available", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: [] });
    const wrapper = mount(DeploymentTargetList);
    await waitForUpdate();
    expect(wrapper.find(".empty-state").exists()).toBe(true);
    expect(wrapper.find(".loading").exists()).toBe(false);
  });

  it("displays targets when they are fetched successfully", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: [
        {
          name: "test-target",
          provider: "local",
          host: "localhost",
        },
      ],
    });
    const wrapper = mount(DeploymentTargetList);
    await waitForUpdate();
    expect(wrapper.find(".target-item").exists()).toBe(true);
    expect(wrapper.find(".loading").exists()).toBe(false);
  });

  it("displays target with config when available", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: [
        {
          name: "test-target",
          provider: "aws",
          host: "example.com",
          config: {
            region: "us-west-2",
            instance_type: "t2.micro",
          },
        },
      ],
    });
    const wrapper = mount(DeploymentTargetList);
    await waitForUpdate();
    expect(wrapper.find(".target-item").exists()).toBe(true);
    expect(wrapper.find(".loading").exists()).toBe(false);
    expect(wrapper.text()).toContain("us-west-2");
    expect(wrapper.text()).toContain("t2.micro");
  });

  it("shows error state when API call fails", async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error("API Error"));
    const wrapper = mount(DeploymentTargetList);
    await waitForUpdate();
    expect(wrapper.find(".error").exists()).toBe(true);
    expect(wrapper.find(".loading").exists()).toBe(false);
    expect(wrapper.text()).toContain("Failed to fetch deployment targets");
  });
});
