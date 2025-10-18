<template>
  <div
    class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl
           transition-all duration-300 hover:bg-white/[0.07] hover:border-emerald-500/20
           hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] hover:-translate-y-1"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="relative z-10 p-4">
      <h3 class="mb-3 text-base font-semibold text-white/90 font-exo">
        <span class="inline-flex items-center">
          <Icon 
            name="ph:game-controller-bold" 
            class="w-5 h-5 mr-2 text-emerald-400" 
            loading="lazy"
            width="20"
            height="20"
            aria-hidden="true"
          />
          Play Snake
        </span>
      </h3>
      <p class="mb-4 text-sm text-white/60">
        Classic snake game. Use arrow keys to control.
      </p>
      
      <!-- Game canvas -->
      <div class="relative">
        <div 
          ref="gameCanvas" 
          tabindex="0"
          @keydown="handleKeyDown"
          @focus="gameFocused = true"
          @blur="gameFocused = false"
          class="relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg aspect-[2.1/1] overflow-hidden
                 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
          aria-label="Snake game canvas"
        >
          <!-- Game grid -->
          <div class="grid w-full h-full" :style="{ 
            gridTemplateColumns: `repeat(${gameGrid[0]?.length || GRID_SIZE_X}, 1fr)`,
            gridTemplateRows: `repeat(${gameGrid.length || GRID_SIZE_Y}, 1fr)`,
            gap: '1px'
          }">
            <template v-for="(row, rowIndex) in gameGrid" :key="`row-${rowIndex}`">
              <div 
                v-for="(_, colIndex) in row" 
                :key="`cell-${rowIndex}-${colIndex}`"
                class="relative w-full h-full"
              >
                <!-- Snake segment -->
                <div 
                  v-if="isSnake(rowIndex, colIndex)" 
                  class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[2px]"
                />
                
                <!-- Food -->
                <div 
                  v-if="isFood(rowIndex, colIndex)" 
                  class="absolute inset-0"
                >
                  <div class="w-full h-full bg-gradient-to-br from-amber-500 to-orange-500 rounded-full animate-pulse-slow" />
                </div>
              </div>
            </template>
          </div>
          
          <!-- Start game overlay -->
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
        <div v-if="gameActive" class="flex items-center justify-between w-full mt-2 text-xs text-white/70">
          <span>Score: {{ score }}</span>
          <span v-if="gameFocused" class="text-emerald-400">Game Active</span>
          <span v-else class="text-white/50">Click game to focus</span>
        </div>
      </div>
    </div>
    
    <!-- Spotlight effect -->
    <div
      class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
      :style="spotlightStyle"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Game configuration constants
const GRID_SIZE_X = 30
const GRID_SIZE_Y = 14
const INITIAL_SNAKE_LENGTH = 3
const GAME_SPEED = 150 // ms between game ticks

const { spotlightStyle, handleMouseMove, handleMouseLeave } = useSpotlightEffect()

// Game state management
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

// Initialize game state
const initGame = () => {
  const currentGridSizeX = gameGrid.value[0]?.length || GRID_SIZE_X
  const currentGridSizeY = gameGrid.value.length || GRID_SIZE_Y
  
  // Create initial snake in the middle of the grid
  const startX = Math.floor(currentGridSizeX / 2)
  const startY = Math.floor(currentGridSizeY / 2)
  
  snake.value = []
  for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
    snake.value.push({ x: startX - i, y: startY })
  }
  
  placeFood()
  
  // Reset game state
  gameActive.value = false
  gameOver.value = false
  score.value = 0
  direction.value = 'right'
  nextDirection.value = 'right'
}

// Place food at random position avoiding snake segments
const placeFood = () => {
  let newFoodPosition: {x: number, y: number}
  const currentGridSizeX = gameGrid.value[0]?.length || GRID_SIZE_X
  const currentGridSizeY = gameGrid.value.length || GRID_SIZE_Y
  
  // Ensure food doesn't spawn on snake
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * currentGridSizeX),
      y: Math.floor(Math.random() * currentGridSizeY)
    }
  } while (snake.value.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y))
  
  food.value = newFoodPosition
}

// Check if a grid cell contains part of the snake
const isSnake = (row: number, col: number) => {
  return snake.value.some(segment => segment.y === row && segment.x === col)
}

// Check if a grid cell contains food
const isFood = (row: number, col: number) => {
  return food.value.x === col && food.value.y === row
}

// Handle keyboard input for game controls
const handleKeyDown = (e: KeyboardEvent) => {
  if (!gameActive.value) return
  
  // Update direction based on arrow key input
  // Prevent 180-degree turns (can't go directly backward)
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
  
  // Prevent default scrolling behavior for arrow keys
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault()
  }
}

// Main game loop - executes every GAME_SPEED milliseconds
const gameLoop = () => {
  if (!gameActive.value || snake.value.length === 0) return

  // Apply queued direction change
  direction.value = nextDirection.value

  // Get the current head position
  const currentHead = snake.value[0]
  if (!currentHead) return

  // Calculate new head position based on current direction
  const head = { x: currentHead.x, y: currentHead.y }

  switch (direction.value) {
    case 'up':
      head.y -= 1
      break
    case 'down':
      head.y += 1
      break
    case 'left':
      head.x -= 1
      break
    case 'right':
      head.x += 1
      break
  }

  const currentGridSizeX = gameGrid.value[0]?.length || GRID_SIZE_X
  const currentGridSizeY = gameGrid.value.length || GRID_SIZE_Y

  // Check for collisions with walls or self
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

  // Add new head to snake
  snake.value.unshift(head)
  
  // Check if snake ate food
  if (head.x === food.value.x && head.y === food.value.y) {
    score.value++
    placeFood()
  } else {
    // Remove tail if no food was eaten (maintains snake length)
    snake.value.pop()
  }
}

// Start a new game
const startGame = () => {
  if (gameActive.value) return
  
  gameActive.value = true
  gameOver.value = false
  
  // Focus the game canvas for keyboard input
  if (gameCanvas.value) {
    gameCanvas.value.focus()
  }
  
  // Start the game loop interval
  gameInterval.value = window.setInterval(gameLoop, GAME_SPEED)
}

// End the current game
const endGame = () => {
  gameActive.value = false
  gameOver.value = true
  
  if (gameInterval.value !== null) {
    clearInterval(gameInterval.value)
    gameInterval.value = null
  }
}

// Reset game to initial state
const resetGame = () => {
  initGame()
  gameOver.value = false
}

// Lifecycle hooks
onMounted(() => {
  initGame()
  
  // Recalculate grid dimensions based on actual canvas size
  if (gameCanvas.value) {
    const canvasWidth = gameCanvas.value.clientWidth
    const canvasHeight = gameCanvas.value.clientHeight
    
    // Each cell is approximately 10px
    const actualGridSizeX = Math.floor(canvasWidth / 10)
    const actualGridSizeY = Math.floor(canvasHeight / 10)
    
    if (actualGridSizeX > 0 && actualGridSizeY > 0) {
      gameGrid.value = Array(actualGridSizeY).fill(0).map(() => Array(actualGridSizeX).fill(0))
      resetGame()
    }
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  if (gameInterval.value !== null) {
    clearInterval(gameInterval.value)
  }
})
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.2);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>