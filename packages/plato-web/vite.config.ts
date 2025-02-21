/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    testTimeout: 10000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "coverage/**",
        "dist/**",
        "node_modules/**",
        "src/test/**",
        "**/*.d.ts",
      ],
      include: ["src/**/*.{js,ts,vue}"],
      thresholds: {
        lines: 45,
        functions: 20,
        statements: 45,
        branches: 75,
      },
    },
  },
});
