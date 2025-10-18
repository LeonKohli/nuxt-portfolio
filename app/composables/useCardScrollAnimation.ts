/**
 * Composable for handling card scroll animations with viewport visibility tracking
 *
 * This composable manages:
 * - Viewport visibility detection across different screen sizes
 * - Card position calculations for mobile (snap-center) and desktop (snap-start)
 * - Smart detection of which cards are entering the viewport
 * - Integration with scroll behavior and animation callbacks
 *
 * @example
 * ```ts
 * const { scrollLeft, scrollRight } = useCardScrollAnimation({
 *   scrollContainer,
 *   projects,
 *   onAnimate: (index) => animateCard(index)
 * })
 * ```
 */

interface UseCardScrollAnimationOptions {
  /** Ref to the scroll container element */
  scrollContainer: Ref<HTMLElement | null>
  /** Array of projects or items being scrolled */
  projects: Ref<any[]> | any[]
  /** Callback to trigger animation for a specific card index */
  onAnimate: (index: number) => void
  /** Optional: Custom scroll animation duration in ms (default: 400) */
  scrollDuration?: number
  /** Optional: Visibility threshold (0-1, default: 0.2 = 20%) */
  visibilityThreshold?: number
}

interface CardDimensions {
  cardWidth: number
  cardGap: number
  spacer: number
  isMobile: boolean
}

export function useCardScrollAnimation(options: UseCardScrollAnimationOptions) {
  const {
    scrollContainer,
    projects,
    onAnimate,
    scrollDuration = 400,
    visibilityThreshold = 0.2,
  } = options

  // Get reactive window width
  const { width } = useWindowSize()

  // Track which cards are currently visible
  const visibleCardIndices = ref(new Set<number>())

  /**
   * Calculate card dimensions based on current screen size
   * Mobile: 85vw (max 380px) with 16px gaps
   * Desktop: 384px with 24px gaps
   */
  const getCardDimensions = (): CardDimensions => {
    const isMobile = width.value < 768
    const cardWidth = isMobile ? Math.min(width.value * 0.85, 380) : 384
    const cardGap = isMobile ? 16 : 24
    const spacer = isMobile ? 16 : 0 // Initial spacer on mobile for centering

    return { cardWidth, cardGap, spacer, isMobile }
  }

  /**
   * Computed scroll distance for one card movement
   * Includes card width + gap for proper snap behavior
   */
  const cardScrollDistance = computed(() => {
    const { cardWidth, cardGap } = getCardDimensions()
    return cardWidth + cardGap
  })

  /**
   * Calculate the left edge position of a card at given index
   * Accounts for spacer and accumulated widths of previous cards
   */
  const getCardPosition = (index: number): number => {
    const { cardWidth, cardGap, spacer } = getCardDimensions()
    return spacer + (cardWidth + cardGap) * index
  }

  /**
   * Get all card indices that are currently visible in the viewport
   * Uses a visibility threshold to determine if a card counts as "visible"
   */
  const getVisibleCardIndices = (): Set<number> => {
    if (!scrollContainer.value) return new Set<number>()

    const container = scrollContainer.value
    const scrollLeft = container.scrollLeft
    const viewportWidth = container.clientWidth
    const scrollRight = scrollLeft + viewportWidth

    const { cardWidth } = getCardDimensions()
    const visible = new Set<number>()

    const projectsList = unref(projects)

    // Check each card for viewport overlap
    for (let i = 0; i < projectsList.length; i++) {
      const cardLeft = getCardPosition(i)
      const cardRight = cardLeft + cardWidth

      // Calculate how much of the card is visible
      const visibleWidth = Math.min(cardRight, scrollRight) - Math.max(cardLeft, scrollLeft)
      const threshold = cardWidth * visibilityThreshold

      if (visibleWidth > threshold) {
        visible.add(i)
      }
    }

    return visible
  }

  /**
   * Detect which card will enter the viewport after scrolling
   * Different logic for mobile (snap-center) vs desktop (snap-start)
   *
   * @param direction - 'left' for previous, 'right' for next
   * @returns Card index that will enter viewport, or -1 if none
   */
  const getEnteringCardIndex = (direction: 'left' | 'right'): number => {
    if (!scrollContainer.value) return -1

    const container = scrollContainer.value
    const currentScroll = container.scrollLeft
    const viewportWidth = container.clientWidth
    const { cardWidth, isMobile } = getCardDimensions()

    // Calculate where scroll will be after animation
    const scrollAmount = cardScrollDistance.value
    const newScrollPosition = direction === 'right'
      ? currentScroll + scrollAmount
      : Math.max(0, currentScroll - scrollAmount)

    const projectsList = unref(projects)

    if (direction === 'right') {
      // Find card entering from the right
      if (isMobile) {
        // Mobile: Find card that will be centered
        const centerPosition = newScrollPosition + viewportWidth / 2
        for (let i = 0; i < projectsList.length; i++) {
          const cardLeft = getCardPosition(i)
          const cardCenter = cardLeft + cardWidth / 2
          if (Math.abs(cardCenter - centerPosition) < cardWidth / 2) {
            return i
          }
        }
      } else {
        // Desktop: Find rightmost card at viewport edge
        const rightEdge = newScrollPosition + viewportWidth
        for (let i = projectsList.length - 1; i >= 0; i--) {
          const cardLeft = getCardPosition(i)
          const cardRight = cardLeft + cardWidth
          if (cardLeft < rightEdge && cardRight >= rightEdge - cardWidth * 0.5) {
            return i
          }
        }
      }
    } else {
      // Find card entering from the left
      if (isMobile) {
        // Mobile: Find card that will be centered
        const centerPosition = newScrollPosition + viewportWidth / 2
        for (let i = projectsList.length - 1; i >= 0; i--) {
          const cardLeft = getCardPosition(i)
          const cardCenter = cardLeft + cardWidth / 2
          if (Math.abs(cardCenter - centerPosition) < cardWidth / 2) {
            return i
          }
        }
      } else {
        // Desktop: Find leftmost card at viewport edge
        const leftEdge = newScrollPosition
        for (let i = 0; i < projectsList.length; i++) {
          const cardLeft = getCardPosition(i)
          const cardRight = cardLeft + cardWidth
          if (cardRight > leftEdge && cardLeft <= leftEdge + cardWidth * 0.5) {
            return i
          }
        }
      }
    }

    return -1
  }

  /**
   * Update visible cards set with current viewport state
   */
  const updateVisibleCards = () => {
    nextTick(() => {
      visibleCardIndices.value = getVisibleCardIndices()
    })
  }

  /**
   * Scroll to previous card(s) with animation
   */
  const scrollLeft = () => {
    if (!scrollContainer.value) return

    const enteringCardIndex = getEnteringCardIndex('left')

    // Perform smooth scroll
    scrollContainer.value.scrollBy({
      left: -cardScrollDistance.value,
      behavior: 'smooth',
    })

    // Only animate cards that weren't already visible
    if (enteringCardIndex >= 0 && !visibleCardIndices.value.has(enteringCardIndex)) {
      onAnimate(enteringCardIndex)
    }

    // Update visibility tracking after scroll completes
    setTimeout(updateVisibleCards, scrollDuration)
  }

  /**
   * Scroll to next card(s) with animation
   */
  const scrollRight = () => {
    if (!scrollContainer.value) return

    const enteringCardIndex = getEnteringCardIndex('right')

    // Perform smooth scroll
    scrollContainer.value.scrollBy({
      left: cardScrollDistance.value,
      behavior: 'smooth',
    })

    // Only animate cards that weren't already visible
    if (enteringCardIndex >= 0 && !visibleCardIndices.value.has(enteringCardIndex)) {
      onAnimate(enteringCardIndex)
    }

    // Update visibility tracking after scroll completes
    setTimeout(updateVisibleCards, scrollDuration)
  }

  // Initialize visible cards on mount
  onMounted(updateVisibleCards)

  // Update visible cards when window resizes
  watch(width, updateVisibleCards)

  // Expose public API
  return {
    scrollLeft,
    scrollRight,
    cardScrollDistance,
    visibleCardIndices: readonly(visibleCardIndices),
  }
}
