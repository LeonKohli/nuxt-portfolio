<template>
  <div
    class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl
           transition-all duration-300 hover:bg-white/[0.07] hover:border-emerald-500/20
           hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] hover:-translate-y-1 pointer-events-auto"
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
const GRID_SIZE_X = 30
const GRID_SIZE_Y = 14
const INITIAL_SNAKE_LENGTH = 3
const GAME_SPEED = 150

const { spotlightStyle, handleMouseMove, handleMouseLeave } = useSpotlightEffect()
const gameCanvas = ref<HTMLElement | null>(null)
const gameActive = ref(false)
const gameOver = ref(false)
const gameFocused = ref(false)
const score = ref(0)
const gameGrid = ref<number[][]>(Array(GRID_SIZE_Y).fill(0).map(() => Array(GRID_SIZE_X).fill(0)))
const snake = ref<{x: number, y: number}[]>([{ x: Math.floor(GRID_SIZE_X / 2), y: Math.floor(GRID_SIZE_Y / 2) }])
const food = ref<{x: number, y: number}>({ x: 0, y: 0 })
const direction = ref('right')
const nextDirection = ref('right')
let gameInterval: number | null = null

const gridSizeX = computed(() => gameGrid.value[0]?.length || GRID_SIZE_X)
const gridSizeY = computed(() => gameGrid.value.length || GRID_SIZE_Y)

const initGame = () => {
  const startX = Math.floor(gridSizeX.value / 2)
  const startY = Math.floor(gridSizeY.value / 2)

  snake.value = Array.from({ length: INITIAL_SNAKE_LENGTH }, (_, i) => ({
    x: startX - i,
    y: startY
  }))

  placeFood()

  gameActive.value = false
  gameOver.value = false
  score.value = 0
  direction.value = 'right'
  nextDirection.value = 'right'
}

const placeFood = () => {
  let newFoodPosition: {x: number, y: number}

  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * gridSizeX.value),
      y: Math.floor(Math.random() * gridSizeY.value)
    }
  } while (snake.value.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y))

  food.value = newFoodPosition
}

const isSnake = (row: number, col: number) =>
  snake.value.some(segment => segment.y === row && segment.x === col)

const isFood = (row: number, col: number) =>
  food.value.x === col && food.value.y === row

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

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault()
  }
}

const gameLoop = () => {
  if (!gameActive.value) return

  direction.value = nextDirection.value

  const { x, y } = snake.value[0]!
  const head = { x, y }

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

  if (
    head.x < 0 ||
    head.x >= gridSizeX.value ||
    head.y < 0 ||
    head.y >= gridSizeY.value ||
    snake.value.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    endGame()
    return
  }

  snake.value.unshift(head)

  if (head.x === food.value.x && head.y === food.value.y) {
    score.value++
    placeFood()
  } else {
    snake.value.pop()
  }
}

const startGame = () => {
  if (gameActive.value) return

  gameActive.value = true
  gameOver.value = false

  gameCanvas.value?.focus()

  gameInterval = window.setInterval(gameLoop, GAME_SPEED)
}

const endGame = () => {
  gameActive.value = false
  gameOver.value = true

  if (gameInterval) {
    clearInterval(gameInterval)
    gameInterval = null
  }
}

const resetGame = () => {
  initGame()
  gameOver.value = false
}

onMounted(() => {
  initGame()

  if (gameCanvas.value) {
    const actualGridSizeX = Math.floor(gameCanvas.value.clientWidth / 10)
    const actualGridSizeY = Math.floor(gameCanvas.value.clientHeight / 10)

    if (actualGridSizeX > 0 && actualGridSizeY > 0) {
      gameGrid.value = Array(actualGridSizeY).fill(0).map(() => Array(actualGridSizeX).fill(0))
      resetGame()
    }
  }
})

onUnmounted(() => {
  if (gameInterval) clearInterval(gameInterval)
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