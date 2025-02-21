<template>
  <div class="home">
    <h1>Welcome to Plato</h1>
    <p>Your DevOps automation platform for managing multiple side projects.</p>
    
    <div class="features">
      <div class="feature">
        <h3>Deployment Management</h3>
        <p>Configure and manage deployment targets across different environments.</p>
        <RouterLink to="/targets" class="btn">View Targets</RouterLink>
      </div>
      
      <div class="feature">
        <h3>Project Overview</h3>
        <p>Get a bird's eye view of all your projects and their deployment status.</p>
      </div>
      
      <div class="feature">
        <h3>Automated Deployments</h3>
        <p>Set up automated deployment pipelines for your projects.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature h3 {
  color: #42b983;
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #3aa876;
}
</style> 