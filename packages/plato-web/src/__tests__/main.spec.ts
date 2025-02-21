import { describe, it, expect, vi } from "vitest";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "../router";

vi.mock("vue", async () => {
  return {
    createApp: vi.fn(() => ({
      use: vi.fn().mockReturnThis(),
      mount: vi.fn(),
    })),
    defineComponent: vi.fn((options) => options),
    ref: vi.fn(),
    computed: vi.fn(),
    watch: vi.fn(),
  };
});

vi.mock("pinia", () => ({
  createPinia: vi.fn(() => ({})),
}));

vi.mock("../router", () => ({
  default: {},
}));

describe("Main", () => {
  it("initializes the app with required plugins", async () => {
    const mockApp = {
      use: vi.fn().mockReturnThis(),
      mount: vi.fn(),
    };
    vi.mocked(createApp).mockReturnValue(mockApp as any);

    const mockPinia = {};
    vi.mocked(createPinia).mockReturnValue(mockPinia as any);

    // Import main to trigger app initialization
    await import("../main");

    // Verify app creation
    expect(createApp).toHaveBeenCalled();

    // Verify plugin installation
    expect(mockApp.use).toHaveBeenCalledWith(mockPinia);
    expect(mockApp.use).toHaveBeenCalledWith(router);

    // Verify mounting
    expect(mockApp.mount).toHaveBeenCalledWith("#app");
  });
});
