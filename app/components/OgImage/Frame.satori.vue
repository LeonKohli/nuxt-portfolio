<script setup>
import { computed } from "vue";
const props = defineProps({
  colorMode: { type: String, required: false, default: "dark" },
  title: { type: String, required: false },
  description: { type: String, required: false },
  bg: { type: String, required: false },
  icon: { type: String, required: false },
  logo: { type: String, required: false },
  image: { type: String, required: false },
  username: { type: String, required: false },
  socials: { type: Array, required: false }
});
const hasBg = computed(() => !!props.bg);
</script>

<template>
  <div
    class="relative h-full w-full flex items-center justify-center overflow-hidden text-neutral-900 dark:text-white"
    :class="hasBg ? '' : 'bg-neutral-100 dark:bg-neutral-900'"
    :style="hasBg ? { backgroundImage: bg } : void 0"
  >
    <!-- Inner frame with refined border. Satori reads neither Tailwind 4's calc() radius nor its --tw-border-style, so both are spelled out. -->
    <div class="absolute inset-4 border border-solid border-neutral-300 dark:border-neutral-700 rounded-[4px]" />
    <div class="absolute inset-5 border border-solid border-neutral-200 dark:border-neutral-800 rounded-[4px]" />

    <!-- Background image with better treatment -->
    <div
      v-if="image"
      class="absolute inset-0 w-full h-full bg-cover bg-center opacity-[0.07]"
      :style="{ backgroundImage: `url(${image})` }"
    />

    <!-- Subtle corner accents -->
    <div class="absolute top-4 left-4 w-8 h-8 border-solid border-l-2 border-t-2 border-neutral-400 dark:border-neutral-600" />
    <div class="absolute top-4 right-4 w-8 h-8 border-solid border-r-2 border-t-2 border-neutral-400 dark:border-neutral-600" />
    <div class="absolute bottom-4 left-4 w-8 h-8 border-solid border-l-2 border-b-2 border-neutral-400 dark:border-neutral-600" />
    <div class="absolute bottom-4 right-4 w-8 h-8 border-solid border-r-2 border-b-2 border-neutral-400 dark:border-neutral-600" />

    <div class="flex flex-col items-center text-center px-8 lg:px-20 relative">
      <h1 class="flex items-center gap-5 text-[72px] font-bold leading-tight tracking-tight" style="display: block; line-clamp: 2; text-overflow: ellipsis; text-wrap: balance;">
        <Icon
          v-if="icon"
          :name="icon"
          mode="svg"
          class="opacity-90"
        />
        {{ title }}
      </h1>
      <p v-if="description" class="text-[28px] max-w-[800px] text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed" style="display: block; line-clamp: 3; text-overflow: ellipsis;">
        {{ description }}
      </p>
    </div>

    <img
      v-if="logo"
      :src="logo"
      class="absolute bottom-6 left-6 h-[100px] w-auto opacity-90"
    >
    <div class="absolute bottom-6 right-6 flex items-center gap-4">
      <div
        v-if="username"
        class="text-neutral-500 dark:text-neutral-400 font-normal text-lg mr-2"
      >
        {{ username }}
      </div>
      <Icon
        v-for="social of socials"
        :key="social.name"
        :name="social.icon"
        class="w-6 h-6 text-neutral-400 dark:text-neutral-500"
      />
    </div>
  </div>
</template>
