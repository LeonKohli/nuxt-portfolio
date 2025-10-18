<template>
  <section 
    v-motion="'section-fade'"
    class="flex flex-col justify-center min-h-screen px-4 pt-24 overflow-hidden sm:px-6 lg:px-8 md:pt-0" 
    id="about"
  >
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4">
      <!-- Section Header -->
      <div class="flex flex-col items-center mb-10 text-center md:items-start md:text-left">
        <h2 class="font-bold tracking-tight">
          <span class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-exo">
            <span
              v-motion="'section-fade'"
              class="text-zinc-100"
            >About</span>
            <span
              v-motion="'section-fade-up'"
              class="relative inline-block ml-3 group"
            >
              <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                Me
              </span>
            </span>
          </span>
        </h2>
      </div>

      <!-- Content -->
      <div class="relative">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <!-- Left Column: Bio -->
          <div
            v-motion="'section-fade-up'"
            class="transition-all duration-700"
          >
            <p class="mb-6 text-xl md:text-2xl text-white/90 leading-relaxed [text-wrap:balance]">
              Hi, I'm 
              <span class="relative inline-block font-medium text-emerald-400">Leon</span>, 
              a Web Developer from Potsdam, Germany with a passion for creating intuitive, performant web experiences.
            </p>
            
            <!-- Snake Game -->
            <div class="mt-6">
              <SnakeGame />
            </div>
          </div>

          <!-- Right Column: Beyond Coding -->
          <div
            v-motion="'section-fade-up-delay-sm'"
            class="transition-all duration-700"
          >
            <BeyondCoding />
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute rounded-full -z-10 blur-3xl opacity-20 bg-gradient-to-br from-emerald-500/30 via-emerald-500/5 to-transparent w-96 h-96 -top-12 -right-12" />
        <div class="absolute rounded-full -z-10 blur-3xl opacity-10 bg-gradient-to-tl from-emerald-500/20 via-emerald-500/5 to-transparent w-80 h-80 -bottom-12 -left-12" />
      </div>
    </div>
  </section>
</template>
