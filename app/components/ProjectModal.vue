<script setup lang="ts">
const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits<{
  close: []
}>()

const isOpen = computed(() => !!props.project)
</script>

<template>
  <Dialog :open="isOpen" @update:open="emit('close')">
    <DialogContent class="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">{{ project?.title }}</DialogTitle>
        <DialogDescription class="text-green-500">
          {{ project?.subtitle }}
        </DialogDescription>
      </DialogHeader>
      
      <div class="mt-6">
        <p class="text-muted-foreground">{{ project?.description }}</p>
        
        <div class="flex flex-wrap gap-3 mt-6">
          <Badge 
            v-for="tech in project?.tech" 
            :key="tech.name"
            variant="secondary"
            class="px-3 py-1"
          >
            {{ tech }}
          </Badge>
        </div>
      </div>

      <DialogFooter class="mt-8">
        <Button
          v-if="project?.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          class="mr-4"
        >
          <Icon name="lucide:code" 
            class="w-4 h-4 mr-2" 
            loading="lazy"
            width="16"
            height="16"
            aria-hidden="true"
          />
          View Code
        </Button>
        <Button
          v-if="project?.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="lucide:external-link" 
            class="w-4 h-4 mr-2" 
            loading="lazy"
            width="16"
            height="16"
            aria-hidden="true"
          />
          Visit Project
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template> 