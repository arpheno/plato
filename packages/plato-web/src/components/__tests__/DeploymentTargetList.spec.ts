import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import DeploymentTargetList from '../DeploymentTargetList.vue'

vi.mock('axios')

describe('DeploymentTargetList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state initially', () => {
    const wrapper = mount(DeploymentTargetList)
    expect(wrapper.find('.loading').exists()).toBe(true)
  })

  it('shows empty state when no targets are available', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: [] })
    const wrapper = mount(DeploymentTargetList)
    
    await flushPromises()
    
    expect(wrapper.find('.empty-state').exists()).toBe(true)
    expect(wrapper.text()).toContain('No deployment targets configured yet')
  })

  it('displays targets when they are fetched successfully', async () => {
    const mockTargets = [
      {
        name: 'test-target',
        provider: 'local',
        host: 'localhost',
        config: { port: '8080' }
      }
    ]

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockTargets })
    const wrapper = mount(DeploymentTargetList)
    
    await flushPromises()

    expect(wrapper.find('.target-item').exists()).toBe(true)
    expect(wrapper.text()).toContain('test-target')
    expect(wrapper.text()).toContain('local')
    expect(wrapper.text()).toContain('localhost')
  })

  it('shows error state when API call fails', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('API Error'))
    const wrapper = mount(DeploymentTargetList)
    
    await flushPromises()

    expect(wrapper.find('.error').exists()).toBe(true)
    expect(wrapper.text()).toContain('Failed to fetch deployment targets')
  })
}) 