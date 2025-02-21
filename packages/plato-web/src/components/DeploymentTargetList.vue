<template>
  <div class="deployment-targets">
    <h2>Deployment Targets</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="targets.length === 0" class="empty-state">
        No deployment targets configured yet.
      </div>
      <ul v-else class="target-list">
        <li v-for="target in targets" :key="target.name" class="target-item">
          <div class="target-header">
            <h3>{{ target.name }}</h3>
            <span class="provider-badge" :class="target.provider">
              {{ target.provider }}
            </span>
          </div>
          <div class="target-details">
            <p>Host: {{ target.host }}</p>
            <p v-if="target.config">
              Config: {{ JSON.stringify(target.config, null, 2) }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface DeploymentTarget {
  name: string;
  provider: string;
  host: string;
  config?: Record<string, string>;
}

const targets = ref<DeploymentTarget[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchTargets = async () => {
  try {
    const response = await axios.get("/api/v1/targets");
    targets.value = Array.isArray(response?.data) ? response.data : [];
  } catch (e) {
    error.value = "Failed to fetch deployment targets";
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTargets();
});
</script>

<style scoped>
.deployment-targets {
  padding: 1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #dc3545;
  padding: 1rem;
  border: 1px solid #dc3545;
  border-radius: 4px;
  margin: 1rem 0;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 4px;
}

.target-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.target-item {
  border: 1px solid #dee2e6;
  border-radius: 4px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.target-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.provider-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
}

.provider-badge.local {
  background: #28a745;
  color: white;
}

.provider-badge.aws {
  background: #ff9900;
  color: black;
}

.provider-badge.raspberry_pi {
  background: #dc3545;
  color: white;
}

.target-details {
  color: #666;
  font-size: 0.875rem;
}
</style>
