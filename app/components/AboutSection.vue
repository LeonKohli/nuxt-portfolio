<template>
  <section class="flex flex-col justify-center h-screen px-4 sm:px-6 lg:px-8" id="about">
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem]">
      <!-- Section Header -->
      <div class="flex w-full mb-16 space-between">
        <div class="w-full">
          <h2 class="w-full font-bold tracking-tight text-center md:text-left">
            <span class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-exo">
              <span class="text-zinc-100">About</span>
              <span class="relative inline-block ml-3 group">
                <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                  Me
                </span>
              </span>
            </span>
          </h2>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-3xl space-y-8">
        <!-- Introduction -->
        <div class="space-y-6">
          <p class="text-xl md:text-2xl text-white/90 leading-relaxed [text-wrap:balance]">
            Hi, I'm <span class="font-medium text-emerald-400">Leon</span>, a Full Stack Web Developer from 
            <span class="inline-flex items-center gap-1.5">
              <Icon name="ph:map-pin-fill" class="w-5 h-5 text-emerald-400" />
              <span class="text-white">Potsdam (Germany)</span>
            </span>.
          </p>
          
          <p class="text-lg leading-relaxed md:text-xl text-white/70">
            I specialized in building fast and secure web applications and solving problems using modern technologies.
          </p>
        </div>

        <!-- Interests & Skills -->
        <div class="flex flex-col gap-8 pt-4 md:flex-row">
          <!-- What I Do -->
          <div class="flex-1 space-y-4">
            <h3 class="text-sm font-medium tracking-wider uppercase text-emerald-400/90">
              What I Do
            </h3>
            <div class="space-y-3">
              <div class="flex items-start gap-3 group">
                <Icon 
                  name="ph:code-bold" 
                  class="w-5 h-5 mt-1 transition-colors text-white/30 group-hover:text-emerald-400" 
                />
                <span class="text-white/70">Building fast & secure web applications</span>
              </div>
              <div class="flex items-start gap-3 group">
                <Icon 
                  name="ph:shield-check-bold" 
                  class="w-5 h-5 mt-1 transition-colors text-white/30 group-hover:text-emerald-400" 
                />
                <span class="text-white/70">Implementing robust security measures</span>
              </div>
              <div class="flex items-start gap-3 group">
                <Icon 
                  name="ph:lightbulb-bold" 
                  class="w-5 h-5 mt-1 transition-colors text-white/30 group-hover:text-emerald-400" 
                />
                <span class="text-white/70">Solving complex technical challenges</span>
              </div>
            </div>
          </div>

          <!-- What I Love -->
          <div class="flex-1 space-y-4">
            <h3 class="text-sm font-medium tracking-wider uppercase text-emerald-400/90">
              What I Love
            </h3>
            <div class="space-y-3">
              <div class="flex items-start gap-3 group">
                <Icon 
                  name="ph:lock-key-bold" 
                  class="w-5 h-5 mt-1 transition-colors text-white/30 group-hover:text-emerald-400" 
                />
                <span class="text-white/70">Cybersecurity & Penetration Testing</span>
              </div>
              <div class="flex items-start gap-3 group">
                <Icon 
                  name="ph:devices-bold" 
                  class="w-5 h-5 mt-1 transition-colors text-white/30 group-hover:text-emerald-400" 
                />
                <span class="text-white/70">IoT & Smart Home Solutions</span>
              </div>
              <div class="flex items-start gap-3 group">
                <Icon 
                  name="ph:robot-bold" 
                  class="w-5 h-5 mt-1 transition-colors text-white/30 group-hover:text-emerald-400" 
                />
                <span class="text-white/70">Home Automation & Integration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional script needed for this simplified version
</script> 