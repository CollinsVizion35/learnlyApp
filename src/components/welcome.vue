<template>
    <!-- #20232A -->
    <div class=" absolute top-0 right-0 flex items-center justify-center h-screen w-screen bg-[#20232A] text-white flex-row">
      <h1 class="logo text-[120px] font-bold animate-pulse text-[#4D96FF]">Learnly </h1>
      <h1 class="logo text-[120px] font-bold animate-pulse text-[#FFD93D]">App </h1>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  onMounted(() => {
    setTimeout(() => {
      router.push('/home')
    }, 3000)
  })
  </script>
  