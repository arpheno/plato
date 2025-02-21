import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Configure Vue Test Utils
config.global.stubs = {}

// Mock console.error to avoid noise in tests
vi.spyOn(console, 'error').mockImplementation(() => {}) 