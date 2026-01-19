<template>
  <div class="pt-24 overflow-x-hidden">
    <!-- Hide the main navbar on project pages -->

    <!-- Navigation with Back Button -->
    <header class="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg">
      <div class="container flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
        <NuxtLink
          to="/#projects"
          class="flex items-center gap-2 transition-colors group text-white/80 hover:text-white"
        >
          <Icon
            name="lucide:arrow-left"
            class="w-5 h-5 transition-transform group-hover:-translate-x-1"
          />
          <span class="text-sm font-medium">Back to Projects</span>
        </NuxtLink>

        <nav class="flex items-center gap-2">
          <NuxtLink
            v-if="project?.repo"
            :to="project.repo"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 transition-colors text-white/60 hover:text-white"
            aria-label="View GitHub Repository"
          >
            <Icon name="ph:github-logo-fill" class="w-5 h-5" />
          </NuxtLink>

          <NuxtLink
            v-if="project?.link"
            :to="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 transition-colors text-emerald-400/80 hover:text-emerald-400"
            aria-label="Visit Live Site"
          >
            <Icon name="lucide:external-link" class="w-5 h-5" />
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Error State -->
    <section v-if="!project && !pending" class="container px-4 py-16 mx-auto text-center max-w-7xl">
      <Icon name="lucide:file-question" class="w-16 h-16 mx-auto mb-4 text-white/30" />
      <h1 class="mb-2 text-2xl font-bold text-white">Project Not Found</h1>
      <p class="mb-8 text-white/70">The project you're looking for doesn't exist or has been moved.</p>
      <NuxtLink
        to="/#projects"
        class="inline-flex items-center gap-2 px-4 py-2 transition-colors rounded-lg bg-white/10 hover:bg-white/15"
      >
        <Icon name="lucide:layout-grid" class="w-4 h-4" />
        <span>Browse All Projects</span>
      </NuxtLink>
    </section>

    <!-- Loading State -->
    <section v-else-if="pending" class="container px-4 py-16 mx-auto text-center max-w-7xl">
      <div class="w-10 h-10 mx-auto border-4 rounded-full animate-spin border-white/10 border-t-white/60" />
      <p class="mt-4 text-white/70">Loading project details...</p>
    </section>

    <!-- Project Content -->
    <main v-else-if="project" class="container px-4 pb-24 mx-auto max-w-7xl">
      <!-- Hero Section -->
      <section class="mb-16">
        <!-- Project Image -->
        <figure class="relative mb-8 h-[280px] w-full overflow-hidden rounded-2xl md:h-[400px] lg:h-[500px]">
          <NuxtImg
            :src="project.image"
            :alt="project.title"
            class="object-cover w-full h-full"
            width="1280"
            height="640"
            loading="eager"
            format="webp"
            quality="90"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <!-- Project Status -->
          <div class="absolute flex gap-2 right-4 top-4">
            <div
              v-if="project.featured"
              class="px-3 py-1 text-sm font-medium border rounded-full bg-amber-500/20 text-amber-400 border-amber-500/30 backdrop-blur-xl"
            >
              <div class="flex items-center gap-1.5">
                <Icon name="lucide:star" class="h-3.5 w-3.5" aria-hidden="true" />
                <span>Featured</span>
              </div>
            </div>

            <div
              v-if="project.status"
              class="px-3 py-1 text-sm font-medium border rounded-full backdrop-blur-xl"
              :class="{
                'bg-emerald-500/20 text-emerald-400 border-emerald-500/20': project.status === 'completed',
                'bg-amber-500/20 text-amber-400 border-amber-500/20': project.status === 'in-progress',
                'bg-neutral-500/20 text-neutral-400 border-neutral-500/20': project.status === 'archived',
              }"
            >
              <span class="capitalize">{{ project.status.replace('-', ' ') }}</span>
            </div>
          </div>
        </figure>

        <!-- Project Title -->
        <h1 class="mb-4 text-4xl font-bold font-exo md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80">
            {{ project.title }}
          </span>
        </h1>

        <!-- Project Subtitle -->
        <p class="mb-6 text-xl text-white/80 md:text-2xl">
          {{ project.subtitle }}
        </p>

        <!-- Project Metadata Grid -->
        <div class="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
          <!-- Technology Used -->
          <section class="p-4 border rounded-xl border-white/10 bg-white/5">
            <h3 class="mb-2 text-sm font-medium text-white/60">Tech Stack</h3>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="tech in project.tech"
                :key="tech.name"
                class="flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-white/90"
              >
                <Icon
                  :name="tech.icon"
                  class="h-3.5 w-3.5"
                  aria-hidden="true"
                />
                <span class="text-sm">{{ tech.name }}</span>
              </li>
            </ul>
          </section>

          <!-- Project Info -->
          <section class="p-4 border rounded-xl border-white/10 bg-white/5">
            <h3 class="mb-2 text-sm font-medium text-white/60">Project Info</h3>
            <ul class="space-y-2">
              <li v-if="project.category" class="flex items-center gap-2 text-sm text-white/80">
                <Icon name="lucide:folder" class="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>{{ getCategoryLabel(project.category) }}</span>
              </li>

              <li v-if="project.startDate" class="flex items-center gap-2 text-sm text-white/80">
                <Icon name="lucide:calendar" class="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>
                  {{ project.startDate }}
                  <span v-if="project.endDate"> - {{ project.endDate }}</span>
                  <span v-else> - Present</span>
                </span>
              </li>

              <li v-if="project.complexity" class="flex items-center gap-2 text-sm text-white/80">
                <Icon name="lucide:gauge" class="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <div class="flex gap-0.5">
                  <Icon
                    v-for="n in 5"
                    :key="n"
                    :name="n <= (project.complexity || 0) ? 'lucide:star' : 'lucide:star'"
                    class="h-3.5 w-3.5"
                    :class="n <= (project.complexity || 0) ? 'text-amber-400' : 'text-white/10'"
                  />
                </div>
              </li>

              <!-- Add downloads information -->
              <li v-if="project.downloads" class="flex items-center gap-2 text-sm text-white/80">
                <Icon name="lucide:download" class="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>{{ project.downloads }} Downloads</span>
              </li>
            </ul>
          </section>

          <!-- Tags -->
          <section v-if="project.tags?.length" class="p-4 border rounded-xl border-white/10 bg-white/5">
            <h3 class="mb-2 text-sm font-medium text-white/60">Tags</h3>
            <ul class="flex flex-wrap gap-1.5">
              <li
                v-for="tag in project.tags"
                :key="tag"
                class="px-2 py-1 text-xs rounded-full bg-white/10 text-white/80"
              >
                {{ tag }}
              </li>
            </ul>
          </section>
        </div>
      </section>

      <!-- Content Sections -->
      <div class="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
        <article class="space-y-12 md:col-span-2">
          <!-- Markdown Content -->
          <ContentRenderer
            :value="project"
            class="prose prose-lg prose-invert max-w-none"
          >
            <!-- Empty slot when no content is available -->
            <template #empty>
              <!-- Fallback for empty content -->
              <p class="italic text-white/60">No content available for this project.</p>
            </template>
          </ContentRenderer>
        </article>

        <!-- Sidebar -->
        <aside>
          <!-- Call to Action -->
          <div class="sticky space-y-4 top-24">
            <!-- View Demo -->
            <a
              v-if="project.link"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-full gap-2 px-4 py-3 transition-colors rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            >
              <Icon name="lucide:external-link" class="w-5 h-5" />
              <span class="font-medium">View Live Demo</span>
            </a>

            <!-- View Code -->
            <a
              v-if="project.repo"
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-full gap-2 px-4 py-3 transition-colors rounded-xl bg-white/10 text-white/90 hover:bg-white/15"
            >
              <Icon name="ph:github-logo-fill" class="w-5 h-5" />
              <span class="font-medium">View on GitHub</span>
            </a>

            <!-- Related Projects -->
            <section v-if="relatedProjects.length" class="mt-12 space-y-6">
              <h3 class="text-lg font-bold text-white/90">Related Projects</h3>

              <ul>
                <li
                  v-for="relatedProject in relatedProjects"
                  :key="relatedProject.slug"
                  class="block group"
                >
                  <NuxtLink
                    :to="`/projects/${relatedProject.slug}`"
                    class="flex items-start gap-3 p-3 transition-colors rounded-lg hover:bg-white/5"
                  >
                    <div class="w-12 h-12 overflow-hidden rounded-lg shrink-0">
                      <NuxtImg
                        :src="relatedProject.image"
                        :alt="relatedProject.title"
                        width="48"
                        height="48"
                        class="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h4 class="font-medium transition-colors text-white/90 group-hover:text-white">
                        {{ relatedProject.title }}
                      </h4>
                      <p class="text-sm truncate text-white/60">{{ relatedProject.subtitle }}</p>
                    </div>
                  </NuxtLink>
                </li>
              </ul>
            </section>
          </div>
        </aside>
      </div>

      <!-- Navigation Between Projects -->
      <nav v-if="previousProject || nextProject" class="grid grid-cols-1 gap-4 pt-8 border-t border-white/10 md:grid-cols-2">
        <NuxtLink
          v-if="previousProject"
          :to="`/projects/${previousProject.slug}`"
          class="flex items-center gap-4 p-4 transition-colors group rounded-xl bg-white/5 hover:bg-white/10 project-nav-link"
        >
          <Icon
            name="lucide:arrow-left"
            class="w-5 h-5 transition-colors text-white/60 group-hover:text-white"
          />
          <div>
            <p class="text-sm text-white/60">Previous Project</p>
            <h4 class="font-medium transition-colors text-white/90 group-hover:text-white">
              {{ previousProject.title }}
            </h4>
          </div>
        </NuxtLink>

        <NuxtLink
          v-if="nextProject"
          :to="`/projects/${nextProject.slug}`"
          class="flex items-center justify-end gap-4 p-4 transition-colors group rounded-xl bg-white/5 hover:bg-white/10 project-nav-link"
        >
          <div class="text-right">
            <p class="text-sm text-white/60">Next Project</p>
            <h4 class="font-medium transition-colors text-white/90 group-hover:text-white">
              {{ nextProject.title }}
            </h4>
          </div>
          <Icon
            name="lucide:arrow-right"
            class="w-5 h-5 transition-colors text-white/60 group-hover:text-white"
          />
        </NuxtLink>
      </nav>
    </main>

    <!-- Custom Footer - Simpler version than the main page -->
    <footer class="py-8 border-t border-white/10 bg-black/30">
      <div class="container px-4 mx-auto max-w-7xl">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <p class="text-sm text-white/60">
              &copy; {{ new Date().getFullYear() }} Leon Kohlhaußen
            </p>
          </div>

          <div class="flex items-center gap-4">
            <a
              href="https://github.com/LeonKohli"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors text-white/60 hover:text-white/90"
              aria-label="GitHub"
            >
              <Icon name="ph:github-logo-fill" class="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/leonkohli"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors text-white/60 hover:text-white/90"
              aria-label="LinkedIn"
            >
              <Icon name="ph:linkedin-logo-fill" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Get the route and project ID directly - no computed property to avoid reactivity issues
const route = useRoute();


// Category display labels mapping
const categoryLabels = {
  web: 'Web Application',
  mobile: 'Mobile Application',
  extension: 'Browser Extension',
  api: 'API Service',
  library: 'Software Library',
  other: 'Other',
} as const;

// Helper function to get readable category label
const getCategoryLabel = (category: string): string => {
  return categoryLabels[category as keyof typeof categoryLabels] || category;
};

const { data: project, pending } = await useAsyncData(
  `project-${route.params.id}`,
  () => queryCollection('projects')
    .where('slug', '=', route.params.id as string)
    .first()
)

// SEO Meta tags - with better error handling
watchEffect(() => {
  if (project.value) {
    // Only set meta data when we have a valid project
    useSeoMeta({
      title: project.value.title || 'Project Details',
      description: project.value.description 
        ? (project.value.description.slice(0, 160) + '...') 
        : 'View details about this project',
      ogTitle: project.value.title || 'Project Details',
      ogDescription: project.value.description 
        ? (project.value.description.slice(0, 160) + '...') 
        : 'View details about this project',
      ogImage: project.value.image || '',
    });
  } else if (!pending.value && !project.value) {
    // Set "not found" meta data
    useSeoMeta({
      title: 'Project Not Found',
      description: 'The requested project could not be found',
    });
  }
});

const { data: allProjects } = await useAsyncData(
  'all-projects',
  () => queryCollection('projects').order('sort', 'ASC').all()
)

const projectIndex = computed(() =>
  allProjects.value?.findIndex(p => p.slug === project.value?.slug) ?? -1
)

const previousProject = computed(() =>
  projectIndex.value > 0 ? allProjects.value?.[projectIndex.value - 1] : null
)

const nextProject = computed(() => {
  const idx = projectIndex.value
  const projects = allProjects.value
  return idx >= 0 && projects && idx < projects.length - 1 ? projects[idx + 1] : null
})

const relatedProjects = computed(() => {
  const current = project.value
  const all = allProjects.value
  if (!current || !all) return []

  return all
    .filter(p => p.slug !== current.slug)
    .map(p => ({
      project: p,
      score: (p.category === current.category ? 3 : 0) +
             p.tech.filter(t => current.tech.some(ct => ct.name === t.name)).length * 2 +
             (p.tags && current.tags ? p.tags.filter((t: string) => current.tags?.includes(t)).length * 2 : 0)
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.project)
})
</script>

<style>
/* Hide main navbar on project pages */
nav.main-navbar {
  display: none !important;
}

/* Project navigation animation */
.project-nav-link {
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.project-nav-link:hover {
  transform: translateY(-2px);
}

/* Prose customizations for dark theme */
.prose-invert {
  --tw-prose-body: rgb(255 255 255 / 0.8);
  --tw-prose-headings: rgb(255 255 255 / 0.95);
  --tw-prose-links: rgb(52 211 153);
  --tw-prose-bold: rgb(255 255 255 / 0.9);
  --tw-prose-code: rgb(52 211 153);
  --tw-prose-pre-bg: rgb(0 0 0 / 0.5);
}

.prose-invert :where(a):not(:where([class~="not-prose"] *)) {
  text-decoration: underline;
  text-decoration-color: rgb(52 211 153 / 0.3);
  transition: all 0.2s ease;
}

.prose-invert :where(a):not(:where([class~="not-prose"] *)):hover {
  text-decoration-color: rgb(52 211 153);
  color: rgb(16 185 129);
}

.prose-invert :where(img):not(:where([class~="not-prose"] *)) {
  border-radius: 0.75rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

/* Responsive adjustments */
@media (prefers-reduced-motion: reduce) {
  .project-nav-link:hover {
    transform: none;
  }
}
</style>