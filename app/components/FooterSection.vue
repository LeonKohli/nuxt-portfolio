<template>
  <footer class="relative px-4 py-24 overflow-hidden sm:px-6 lg:px-8">
    <!-- Background Elements -->
    <div class="absolute inset-0 opacity-15">
      <Icon 
        name="simple-icons:vuedotjs" 
        class="absolute text-green-400 w-14 h-14 left-10 top-10" 
      />
      <Icon 
        name="simple-icons:typescript" 
        class="absolute text-green-400 w-14 h-14 right-20 top-20" 
      />
      <Icon 
        name="simple-icons:python" 
        class="absolute text-green-400 w-14 h-14 left-1/4 bottom-20" 
      />
    </div>

    <!-- Content -->
    <div class="relative w-10/12 md:w-8/12 mx-auto max-w-[110rem] text-center">
      <!-- Main Content -->
      <h2 class="mb-12 text-3xl font-bold tracking-wide sm:text-4xl md:text-6xl lg:text-7xl font-exo">
        Let's
        <span class="relative inline-block group">
          <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
            connect
          </span>
        </span>
      </h2>

      <p class="mb-12 text-white/70 max-w-[75ch] mx-auto tracking-wide text-lg">
        I am always open to new opportunities and collaborations. Whether you have a question, 
        a project proposal, or just want to say hello, feel free to get in touch.
      </p>

      <!-- Contact Button -->
      <button 
        class="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-black group"
        @click="copyEmail"
      >
        <span 
          class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0A0A0A_0%,#0A0A0A_50%,#166534_100%)]" 
        />
        <span 
          class="inline-flex items-center justify-center w-full h-full px-8 py-2 text-lg font-medium text-white transition-colors duration-300 bg-black rounded-lg cursor-pointer backdrop-blur-3xl group-hover:bg-black/80"
        >
          <Icon 
            :name="copied ? 'lucide:check' : 'lucide:copy'" 
            class="w-5 h-5 mr-3 transition-colors group-hover:text-emerald-400"
          />
          {{ copied ? 'Copied!' : 'Copy Email' }}
        </span>
      </button>

      <!-- Social Links -->
      <div class="flex justify-center mt-12 space-x-6">
        <a 
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors duration-300 text-white/40 hover:text-white"
        >
          <Icon :name="link.icon" class="w-6 h-6" />
          <span class="sr-only">{{ link.name }}</span>
        </a>
      </div>

      <!-- Copyright -->
      <div class="mt-12 text-sm text-white/40">
        © {{ new Date().getFullYear() }} Leon Kohlhaussen. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const copied = ref(false)
const email = 'contact@leonkohli.dev'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/leonkohli', icon: 'simple-icons:github' },
  { name: 'GitLab', url: 'https://gitlab.com/opendata-apps/mantis', icon: 'simple-icons:gitlab' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/leon-kohlhau%C3%9Fen/', icon: 'simple-icons:linkedin' },
]

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}
</script> 