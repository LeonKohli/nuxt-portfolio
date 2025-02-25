<template>
  <section 
    class="flex flex-col justify-center min-h-screen px-4 pt-24 overflow-hidden sm:px-6 lg:px-8 md:pt-0" 
    id="about"
    ref="sectionRef"
    :class="{ 'section-visible': isVisible }"
  >
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4">
      <!-- Section Header -->
      <div class="flex flex-col items-center mb-10 text-center md:items-start md:text-left">
        <h2 class="font-bold tracking-tight">
          <span class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-exo">
            <span class="opacity-0 text-zinc-100 animate-fade-in" style="animation-delay: 200ms;">About</span>
            <span class="relative inline-block ml-3 opacity-0 group animate-fade-in" style="animation-delay: 400ms;">
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
          <div class="opacity-0 animate-fade-in" style="animation-delay: 600ms;">
            <p class="mb-6 text-xl md:text-2xl text-white/90 leading-relaxed [text-wrap:balance]">
              Hi, I'm 
              <span class="relative inline-block font-medium text-emerald-400">Leon</span>, 
              a Web Developer from Potsdam, Germany with a passion for creating intuitive, performant web experiences.
            </p>
            
            <!-- Developer Identity Cards - Horizontal Layout -->
            <div class="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
              <!-- Developer Card -->
              <div 
                class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl 
                       transition-all duration-300 hover:bg-white/[0.07] hover:border-emerald-500/20 
                       hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] hover:-translate-y-1"
                @mousemove="handleMouseMove($event, 0)"
                @mouseleave="handleMouseLeave(0)"
              >
                <div class="relative z-10 p-4">
                  <div class="flex items-center mb-2">
                    <div class="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
                      <Icon 
                        name="ph:code-bold" 
                        class="w-5 h-5 text-emerald-400" 
                        loading="lazy"
                        width="20"
                        height="20"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 class="text-base font-bold text-white/90 font-exo">Developer</h3>
                  </div>
                  <p class="text-sm text-white/70">
                    Crafting clean, performant web applications.
                  </p>
                </div>
                <!-- Spotlight effect -->
                <div 
                  class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
                  :style="spotlightStyles[0]"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl" />
                </div>
              </div>

              <!-- Explorer Card -->
              <div 
                class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl 
                       transition-all duration-300 hover:bg-white/[0.07] hover:border-emerald-500/20 
                       hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] hover:-translate-y-1"
                @mousemove="handleMouseMove($event, 1)"
                @mouseleave="handleMouseLeave(1)"
              >
                <div class="relative z-10 p-4">
                  <div class="flex items-center mb-2">
                    <div class="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
                      <Icon 
                        name="ph:compass-bold" 
                        class="w-5 h-5 text-emerald-400" 
                        loading="lazy"
                        width="20"
                        height="20"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 class="text-base font-bold text-white/90 font-exo">Explorer</h3>
                  </div>
                  <p class="text-sm text-white/70">
                    Finding elegant solutions to complex challenges.
                  </p>
                </div>
                <!-- Spotlight effect -->
                <div 
                  class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
                  :style="spotlightStyles[1]"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl" />
                </div>
              </div>

              <!-- Learner Card -->
              <div 
                class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl 
                       transition-all duration-300 hover:bg-white/[0.07] hover:border-emerald-500/20 
                       hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] hover:-translate-y-1"
                @mousemove="handleMouseMove($event, 2)"
                @mouseleave="handleMouseLeave(2)"
              >
                <div class="relative z-10 p-4">
                  <div class="flex items-center mb-2">
                    <div class="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
                      <Icon 
                        name="ph:trend-up-bold" 
                        class="w-5 h-5 text-emerald-400" 
                        loading="lazy"
                        width="20"
                        height="20"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 class="text-base font-bold text-white/90 font-exo">Learner</h3>
                  </div>
                  <p class="text-sm text-white/70">
                    Constantly growing with new technologies.
                  </p>
                </div>
                <!-- Spotlight effect -->
                <div 
                  class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
                  :style="spotlightStyles[2]"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl" />
                </div>
              </div>
            </div>

            <!-- Mini Snake Game -->
            <div class="hidden mt-6 opacity-0 animate-fade-in sm:block" style="animation-delay: 800ms;">
              <div 
                class="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl 
                       hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-300 group"
                @mousemove="handleMouseMove($event, 8)"
                @mouseleave="handleMouseLeave(8)"
              >
                <div class="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 transition-opacity duration-500 transform rotate-45 rounded-full bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent blur-xl opacity-70 group-hover:opacity-100"></div>
                
                <div class="relative z-10 p-4">
                  <div class="flex items-center mb-3">
                    <div class="flex items-center justify-center w-10 h-10 mr-3 transition-colors duration-300 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 group-hover:from-emerald-500/30 group-hover:to-emerald-500/20">
                      <Icon 
                        name="ph:game-controller-bold" 
                        class="w-5 h-5 transition-transform duration-300 text-emerald-400 group-hover:scale-110" 
                        loading="lazy"
                        width="20"
                        height="20"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 class="text-base font-bold transition-colors duration-300 text-white/90 font-exo group-hover:text-white">Take a Break with Snake</h3>
                  </div>
                  
                  <div class="flex flex-col items-center">
                    <!-- Game Canvas -->
                    <div 
                      ref="gameCanvas" 
                      class="relative w-full h-[140px] bg-black/20 border border-white/5 rounded-lg overflow-hidden mb-2 flex flex-col justify-between"
                      tabindex="0"
                      @keydown="handleKeyDown"
                      @focus="gameFocused = true"
                      @blur="gameFocused = false"
                    >
                      <!-- Game grid cells -->
                      <div 
                        v-for="(row, rowIndex) in gameGrid" 
                        :key="`row-${rowIndex}`" 
                        class="flex h-[10px] flex-grow"
                        style="min-height: 10px;"
                      >
                        <div 
                          v-for="(cell, colIndex) in row" 
                          :key="`cell-${rowIndex}-${colIndex}`" 
                          class="w-[10px] h-[10px] flex-grow"
                          style="min-width: 10px;"
                          :class="{
                            'bg-emerald-500': isSnake(rowIndex, colIndex),
                            'bg-emerald-300': isFood(rowIndex, colIndex)
                          }"
                        ></div>
                      </div>
                      
                      <!-- Game overlay -->
                      <div 
                        v-if="!gameActive && !gameOver" 
                        class="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
                      >
                        <p class="mb-2 text-sm text-white">Click to play</p>
                        <button 
                          @click="startGame" 
                          class="px-3 py-1 text-xs font-medium transition-colors duration-300 border rounded-md text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                        >
                          Start Game
                        </button>
                      </div>
                      
                      <!-- Game over overlay -->
                      <div 
                        v-if="gameOver" 
                        class="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
                      >
                        <p class="mb-1 text-sm text-white">Game Over</p>
                        <p class="mb-2 text-xs text-emerald-400">Score: {{ score }}</p>
                        <button 
                          @click="resetGame" 
                          class="px-3 py-1 text-xs font-medium transition-colors duration-300 border rounded-md text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                        >
                          Play Again
                        </button>
                      </div>
                      
                      <!-- Controls hint -->
                      <div 
                        v-if="gameActive" 
                        class="absolute bottom-1 right-1 text-[10px] text-white/40"
                      >
                        Use arrow keys
                      </div>
                    </div>
                    
                    <!-- Game info -->
                    <div v-if="gameActive" class="flex items-center justify-between w-full text-xs text-white/70">
                      <span>Score: {{ score }}</span>
                      <span v-if="gameFocused" class="text-emerald-400">Game Active</span>
                      <span v-else class="text-white/50">Click game to focus</span>
                    </div>
                  </div>
                </div>
                
                <!-- Spotlight effect -->
                <div 
                  class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
                  :style="spotlightStyles[8]"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Beyond Coding -->
          <div class="opacity-0 animate-fade-in" style="animation-delay: 700ms;">
            <h3 class="mb-6 text-xl font-bold text-white/90 font-exo">
              <span class="relative inline-block">
                <span class="absolute left-0 w-full h-px -bottom-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></span>
                Beyond Coding
              </span>
            </h3>
            
            <div class="space-y-5">
              <div 
                v-for="(item, index) in whatILove" 
                :key="index"
                class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl 
                       transition-all duration-300 hover:bg-white/[0.07] hover:border-emerald-500/20 
                       hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] hover:-translate-y-1"
                @mousemove="handleMouseMove($event, index + 3)"
                @mouseleave="handleMouseLeave(index + 3)"
              >
                <div class="relative z-10 p-4">
                  <div class="flex items-start">
                    <div class="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 group-hover:from-emerald-500/20 group-hover:to-emerald-500/10 shrink-0">
                      <Icon 
                        :name="item.icon" 
                        class="w-6 h-6 transition-all duration-300 text-emerald-400 group-hover:scale-110 group-hover:rotate-3" 
                        loading="lazy"
                        width="24"
                        height="24"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 class="mb-1 text-base font-semibold transition-colors duration-300 text-white/90 group-hover:text-white font-exo">
                        {{ item.title }}
                      </h3>
                      <p class="text-sm transition-colors duration-300 text-white/60 group-hover:text-white/70">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </div>
                <!-- Spotlight effect -->
                <div 
                  class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
                  :style="spotlightStyles[index + 3]"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute rounded-full -z-10 blur-3xl opacity-20 bg-gradient-to-br from-emerald-500/30 via-emerald-500/5 to-transparent w-96 h-96 -top-12 -right-12" />
        <div class="absolute rounded-full -z-10 blur-3xl opacity-10 bg-gradient-to-tl from-emerald-500/20 via-emerald-500/5 to-transparent w-80 h-80 -bottom-12 -left-12" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface SpotlightStyle {
  background: string;
  transform: string;
}

// Use a composable for spotlight effect management
const useSpotlightEffect = () => {
  const spotlightStyles = ref<SpotlightStyle[]>(Array(10).fill({
    background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
    transform: 'translate(0%, 0%)'
  }))

  const handleMouseMove = (event: MouseEvent, index: number) => {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const relativeX = ((event.clientX - rect.left) / rect.width) * 100
    const relativeY = ((event.clientY - rect.top) / rect.height) * 100

    spotlightStyles.value[index] = {
      background: `radial-gradient(circle at ${relativeX}% ${relativeY}%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)`,
      transform: 'translate(0%, 0%)'
    }
  }

  const handleMouseLeave = (index: number) => {
    spotlightStyles.value[index] = {
      background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
      transform: 'translate(0%, 0%)'
    }
  }

  return {
    spotlightStyles,
    handleMouseMove,
    handleMouseLeave
  }
}

const { spotlightStyles, handleMouseMove, handleMouseLeave } = useSpotlightEffect()

// Snake Game Logic
const GRID_SIZE_X = 30 // Increased horizontal grid size to match visual width
const GRID_SIZE_Y = 14 // Vertical grid size matches the height of the container
const INITIAL_SNAKE_LENGTH = 3
const GAME_SPEED = 150 // ms

// Game state
const gameCanvas = ref<HTMLElement | null>(null)
const gameActive = ref(false)
const gameOver = ref(false)
const gameFocused = ref(false)
const score = ref(0)
const gameGrid = ref<number[][]>(Array(GRID_SIZE_Y).fill(0).map(() => Array(GRID_SIZE_X).fill(0)))
const snake = ref<{x: number, y: number}[]>([{ x: Math.floor(GRID_SIZE_X / 2), y: Math.floor(GRID_SIZE_Y / 2) }])
const food = ref<{x: number, y: number}>({ x: 0, y: 0 })
const direction = ref<string>('right')
const nextDirection = ref<string>('right')
const gameInterval = ref<number | null>(null)

// Initialize the game
const initGame = () => {
  // Get current grid dimensions
  const currentGridSizeX = gameGrid.value[0]?.length || GRID_SIZE_X
  const currentGridSizeY = gameGrid.value.length || GRID_SIZE_Y
  
  // Create initial snake in the middle of the grid
  const startX = Math.floor(currentGridSizeX / 2)
  const startY = Math.floor(currentGridSizeY / 2)
  
  snake.value = []
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.value.push({ x: startX - i, y: startY })
  }
  
  // Place food
  placeFood()
  
  // Reset game state
  gameActive.value = false
  gameOver.value = false
  score.value = 0
  direction.value = 'right'
  nextDirection.value = 'right'
}

// Place food at random position
const placeFood = () => {
  let newFoodPosition: {x: number, y: number}
  
  // Get current grid dimensions
  const currentGridSizeX = gameGrid.value[0]?.length || GRID_SIZE_X
  const currentGridSizeY = gameGrid.value.length || GRID_SIZE_Y
  
  // Make sure food doesn't appear on snake
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * currentGridSizeX),
      y: Math.floor(Math.random() * currentGridSizeY)
    }
  } while (snake.value.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y))
  
  food.value = newFoodPosition
}

// Check if a cell contains snake
const isSnake = (row: number, col: number) => {
  return snake.value.some(segment => segment.y === row && segment.x === col)
}

// Check if a cell contains food
const isFood = (row: number, col: number) => {
  return food.value.x === col && food.value.y === row
}

// Handle keyboard input
const handleKeyDown = (e: KeyboardEvent) => {
  if (!gameActive.value) return
  
  switch (e.key) {
    case 'ArrowUp':
      if (direction.value !== 'down') nextDirection.value = 'up'
      break
    case 'ArrowDown':
      if (direction.value !== 'up') nextDirection.value = 'down'
      break
    case 'ArrowLeft':
      if (direction.value !== 'right') nextDirection.value = 'left'
      break
    case 'ArrowRight':
      if (direction.value !== 'left') nextDirection.value = 'right'
      break
  }
  
  // Prevent scrolling with arrow keys while playing
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault()
  }
}

// Game loop
const gameLoop = () => {
  if (!gameActive.value || snake.value.length === 0) return
  
  // Update direction
  direction.value = nextDirection.value
  
  // Calculate new head position
  const firstSegment = snake.value[0]
  if (!firstSegment) return
  
  const head: {x: number, y: number} = { 
    x: firstSegment.x,
    y: firstSegment.y
  }
  
  switch (direction.value) {
    case 'up':
      head.y = head.y - 1
      break
    case 'down':
      head.y = head.y + 1
      break
    case 'left':
      head.x = head.x - 1
      break
    case 'right':
      head.x = head.x + 1
      break
  }
  
  // Get current grid dimensions
  const currentGridSizeX = gameGrid.value[0]?.length || GRID_SIZE_X
  const currentGridSizeY = gameGrid.value.length || GRID_SIZE_Y
  
  // Check for collisions
  if (
    head.x < 0 || 
    head.x >= currentGridSizeX || 
    head.y < 0 || 
    head.y >= currentGridSizeY ||
    snake.value.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    endGame()
    return
  }
  
  // Add new head
  snake.value.unshift(head)
  
  // Check if snake ate food
  if (head.x === food.value.x && head.y === food.value.y) {
    // Increase score
    score.value++
    
    // Place new food
    placeFood()
  } else {
    // Remove tail if no food was eaten
    snake.value.pop()
  }
}

// Start the game
const startGame = () => {
  if (gameActive.value) return
  
  gameActive.value = true
  gameOver.value = false
  
  // Focus the game canvas
  if (gameCanvas.value) {
    gameCanvas.value.focus()
  }
  
  // Start game loop
  gameInterval.value = window.setInterval(gameLoop, GAME_SPEED)
}

// End the game
const endGame = () => {
  gameActive.value = false
  gameOver.value = true
  
  if (gameInterval.value !== null) {
    clearInterval(gameInterval.value)
    gameInterval.value = null
  }
}

// Reset the game
const resetGame = () => {
  initGame()
  gameOver.value = false
}

// Calculate actual grid dimensions based on canvas size
onMounted(() => {
  initGame()
  
  // Recalculate grid dimensions based on actual canvas size
  if (gameCanvas.value) {
    const canvasWidth = gameCanvas.value.clientWidth
    const canvasHeight = gameCanvas.value.clientHeight
    
    // Update grid size based on actual dimensions (each cell is 10px)
    const actualGridSizeX = Math.floor(canvasWidth / 10)
    const actualGridSizeY = Math.floor(canvasHeight / 10)
    
    if (actualGridSizeX > 0 && actualGridSizeY > 0) {
      // Only update if we got valid dimensions
      gameGrid.value = Array(actualGridSizeY).fill(0).map(() => Array(actualGridSizeX).fill(0))
      // Reset the game with new dimensions
      resetGame()
    }
  }
})

// Clean up interval on component unmount
onUnmounted(() => {
  if (gameInterval.value !== null) {
    clearInterval(gameInterval.value)
  }
})

const whatILove = [
  {
    icon: 'ph:bicycle-bold',
    title: 'Bicycle Touring',
    description: 'Exploring the world on two wheels and enjoying outdoor adventures.'
  },
  {
    icon: 'ph:house-bold',
    title: 'Smart Home',
    description: 'Building and tinkering with home automation and IoT solutions.'
  },
  {
    icon: 'ph:git-branch-bold',
    title: 'Open Source',
    description: 'Contributing to and supporting open source projects and communities.'
  }
]

// Use VueUse's useElementVisibility instead of manual intersection observer
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(sectionRef, { threshold: 0.2 })
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  will-change: transform, opacity;
  animation-play-state: paused;
}

.section-visible .animate-fade-in {
  animation-play-state: running;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>