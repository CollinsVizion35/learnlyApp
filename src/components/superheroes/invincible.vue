<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue';

const quizTitle = ref('Swipe Quiz Game');
const currentIndex = ref(0);
const score = ref(0);
const totalAnswered = ref(0);

const questions = ref([
  {
    question: "What is the real name of Batman?",
    options: ["Clark Kent", "Bruce Wayne"],
    correctIndex: 1,
    category: "DC Comics",
    explanation: "Batman's secret identity is Bruce Wayne, a billionaire who witnessed his parents' murder as a child, inspiring his crusade against crime. Clark Kent is Superman's alter ego.",
    bgColor: "#4D96FF" // Blue
  },
  {
    question: "Which superhero is called the 'Man of Steel'?",
    options: ["Superman", "The Flash"],
    correctIndex: 0,
    category: "DC Comics",
    explanation: "Superman is nicknamed the 'Man of Steel' due to his invulnerability and Kryptonian biology, which grants him superhuman strength under Earth's yellow sun.",
    bgColor: "#8E44AD" // Purple
  },
  {
    question: "What is Wonder Woman's signature weapon?",
    options: ["Lasso of Truth", "Magic Hammer"],
    correctIndex: 0,
    category: "DC Comics",
    explanation: "The Lasso of Truth compels anyone bound by it to speak honestly. (Magic Hammer is associated with Thor from Marvel, not DC.)",
    bgColor: "#2ECC71" // Green
  },
  {
    question: "Who is the fastest DC superhero?",
    options: ["Green Arrow", "The Flash"],
    correctIndex: 1,
    category: "DC Comics",
    explanation: "The Flash (Barry Allen or Wally West) taps into the Speed Force, making him capable of moving at light speed and even breaking time barriers.",
    bgColor: "#E67E22" // Orange
  },
  {
    question: "What is my name?",
    options: ["Alfred Pennyworth", "James Gordon"],
    correctIndex: 0,
    category: "DC Comics",
    explanation: "I am Alfred Pennyworth and I serve as Bruce Wayne's loyal butler, surrogate father, and occasional field medic. James Gordon is Gotham City's police commissioner.",
    bgColor: "#E74C3C" // Red
  },
  {
    question: "Which villain is known as the 'Clown Prince of Crime'?",
    options: ["The Joker", "Bane"],
    correctIndex: 0,
    category: "DC Comics",
    explanation: "The Joker is Batman's arch-nemesis, a psychopathic criminal with a clown motif and a twisted sense of humor. Bane is a physical powerhouse who broke Batman's back.",
    bgColor: "#3498DB" // Light Blue
  },
  {
    question: "What planet is Superman originally from?",
    options: ["Mars", "Krypton"],
    correctIndex: 1,
    category: "DC Comics",
    explanation: "Superman (Kal-El) was born on Krypton, which was destroyed. His parents sent him to Earth, where he gained powers under our yellow sun.",
    bgColor: "#1ABC9C" // Turquoise
  },
  {
    question: "Which hero is nicknamed the 'Dark Knight'?",
    options: ["Batman", "Nightwing"],
    correctIndex: 0,
    category: "DC Comics",
    explanation: "Batman is called the 'Dark Knight' for his brooding vigilante persona. Nightwing is Dick Grayson (the first Robin) after he outgrew being Batman's sidekick.",
    bgColor: "#9B59B6" // Dark Purple
  },
  {
    question: "What powers Green Lantern's abilities?",
    options: ["Power Ring", "Infinity Gauntlet"],
    correctIndex: 0,
    category: "DC Comics",
    explanation: "Green Lanterns wield Power Rings that channel willpower to create hard-light constructs. (The Infinity Gauntlet is a Marvel artifact.)",
    bgColor: "#F1C40F" // Yellow
  },
  {
    question: "Who is Batman's iconic teenage sidekick?",
    options: ["Robin", "Kid Flash"],
    correctIndex: 0,
    category: "DC Comics",
    explanation: "Robin (Dick Grayson, Jason Todd, Tim Drake, or Damian Wayne) is Batman's crime-fighting partner. Kid Flash is The Flash's sidekick.",
    bgColor: "#34495E" // Gray Blue
  }
]);

// Swipe state management
const swipeState = reactive({
  startX: 0,
  endX: 0,
  isSwiping: false,
  swipeThreshold: 50, // minimum distance to consider it a swipe
  currentOffset: 0
});

// Initialize question states
const questionStates = reactive(
  questions.value.map(() => ({
    selectedOption: null,
    answeredCorrectly: false,
    showIncorrectMessage: false,
    attempted: false
  }))
);

const currentQuestion = computed(() => {
  return questions.value[currentIndex.value];
});

function handleTouchStart(e) {
  if (questionStates[currentIndex.value].answeredCorrectly) return;

  swipeState.startX = e.touches[0].clientX;
  swipeState.isSwiping = true;
  swipeState.currentOffset = 0;
}

function handleTouchMove(e) {
  if (!swipeState.isSwiping || questionStates[currentIndex.value].answeredCorrectly) return;

  swipeState.endX = e.touches[0].clientX;
  swipeState.currentOffset = swipeState.endX - swipeState.startX;

  // Prevent page scrolling while swiping
  e.preventDefault();
}

function handleTouchEnd() {
  if (!swipeState.isSwiping || questionStates[currentIndex.value].answeredCorrectly) return;

  const deltaX = swipeState.endX - swipeState.startX;

  // Reset swipe state
  swipeState.isSwiping = false;
  swipeState.startX = 0;
  swipeState.endX = 0;
  swipeState.currentOffset = 0;

  // Only proceed if swipe distance meets threshold
  if (Math.abs(deltaX) < swipeState.swipeThreshold) return;

  // Determine swipe direction and select corresponding option
  if (deltaX < 0) {
    // Swiped left - select first option (index 0)
    selectOption(currentIndex.value, 0);
  } else {
    // Swiped right - select second option (index 1)
    selectOption(currentIndex.value, 1);
  }
}

function selectOption(questionIdx, optionIdx) {
  if (questionStates[questionIdx].selectedOption !== null && !questionStates[questionIdx].showIncorrectMessage) return;

  questionStates[questionIdx].selectedOption = optionIdx;

  if (optionIdx === questions.value[questionIdx].correctIndex) {
    questionStates[questionIdx].answeredCorrectly = true;
    questionStates[questionIdx].showIncorrectMessage = false;

    if (!questionStates[questionIdx].attempted) {
      questionStates[questionIdx].attempted = true;
      totalAnswered.value++;
      score.value++;
    }
  } else {
    questionStates[questionIdx].showIncorrectMessage = true;
    questionStates[questionIdx].answeredCorrectly = false;

    if (!questionStates[questionIdx].attempted) {
      questionStates[questionIdx].attempted = true;
      totalAnswered.value++;
    }
  }
}

function tryAgain(idx) {
  questionStates[idx].selectedOption = null;
  questionStates[idx].showIncorrectMessage = false;
}


const showCongratsModal = ref(false);

function handleButtonClick() {
  if (currentIndex.value === questions.value.length - 1) {
    showCongratsModal.value = true;
  } else {
    goToNextQuestion();
  }
}

function goToNextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
  }
}

function closeModal() {
  showCongratsModal.value = false;
}

function restartQuiz() {
  currentIndex.value = 0;
  score.value = 0;
  totalAnswered.value = 0;
  showCongratsModal.value = false;

  // Reset all question states
  questions.value.forEach((_, idx) => {
    questionStates[idx].selectedOption = null;
    questionStates[idx].answeredCorrectly = false;
    questionStates[idx].showIncorrectMessage = false;
    questionStates[idx].attempted = false;
  });
}

function goToQuestion(idx) {
  // Only allow navigation to questions that haven't been answered correctly
  if (!questionStates[idx].answeredCorrectly) {
    currentIndex.value = idx;
  }
}

function resetQuiz() {
  currentIndex.value = 0;
  score.value = 0;
  totalAnswered.value = 0;

  // Reset all question states
  questions.value.forEach((_, idx) => {
    questionStates[idx].selectedOption = null;
    questionStates[idx].answeredCorrectly = false;
    questionStates[idx].showIncorrectMessage = false;
    questionStates[idx].attempted = false;
  });
}

function shuffleQuestions() {
  // Create array of indices
  const indices = [...Array(questions.value.length).keys()];

  // Shuffle indices using Fisher-Yates algorithm
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Create new arrays based on shuffled indices
  const shuffledQuestions = indices.map(i => questions.value[i]);
  const shuffledStates = indices.map(i => ({
    selectedOption: null,
    answeredCorrectly: false,
    showIncorrectMessage: false,
    attempted: false
  }));

  // Update reactive references
  questions.value = shuffledQuestions;

  // Reset states and indices
  indices.forEach((_, idx) => {
    questionStates[idx].selectedOption = null;
    questionStates[idx].answeredCorrectly = false;
    questionStates[idx].showIncorrectMessage = false;
    questionStates[idx].attempted = false;
  });

  currentIndex.value = 0;
  score.value = 0;
  totalAnswered.value = 0;
}
</script>

<template>
  <div class="min-h-screen w-full absolute top-0 right-0 overflow-hidden m-0 flex flex-row bg-[#20232A] text-white">
    <!-- Category Sidebar -->
    <div class="md:flex flex-col w-[20%] my-auto p-8 gap-16 text-left hidden">
      <h2 class="text-4xl font-semibold opacity-70 text-[blue]">Superheroes</h2>
      <h2 class="text-4xl font-semibold opacity-70">Princesses</h2>
      <h2 class="text-4xl font-semibold opacity-70">Cartoon</h2>
    </div>

    <!-- Main Quiz Area -->
    <div class="w-[100vw] lg:w-[80%] h-screen max-w-screen mx-auto my-5">
      <div class="flex justify-between items-center py-4 px-8">
        <div class="text-left text-[#cfd8dc] font-medium">Question {{ currentIndex + 1 }} of {{ questions.length }}
        </div>
        <div class="text-right font-medium text-white">Score: {{ score }}/{{ totalAnswered }}</div>
      </div>

      <div class="opacity-[0.7] my-2">Swipe Left or right for the correct options</div>

      <div class="relative overflow-hidden h-[70vh] w-full rounded-[12px]">
        <div class="relative w-full h-full transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div v-for="(question, idx) in questions" :key="idx" class="absolute w-full h-full box-border"
            :style="{ left: `${idx * 100}%` }">
            <div class="flex flex-row justify-center items-center w-full max-w-screen px-4 py-2">
              <div v-for="(option, optIdx) in question.options" :key="optIdx"
                class="flex flex-row items-center justify-center text-xs mx-4 bg-[#37474f] text-white px-4 py-2 rounded cursor-pointer transition-all duration-300"
                :class="{
                  'border-[#2196f3]': questionStates[idx].selectedOption === optIdx,
                  'bg-[#2e7d32] border-[#4caf50]': questionStates[idx].answeredCorrectly && optIdx === question.correctIndex,
                  'bg-[#c62828] border-[#f44336]': questionStates[idx].showIncorrectMessage && questionStates[idx].selectedOption === optIdx
                }">
                <!-- Left Arrow for First Option -->
                <font-awesome-icon v-if="optIdx === 0" icon="fa-solid fa-arrow-left" class="mr-2" />

                <span>{{ option }}</span>

                <!-- Right Arrow for Second Option -->
                <font-awesome-icon v-if="optIdx === 1" icon="fa-solid fa-arrow-right" class="ml-2" />
              </div>
            </div>

            <div class="w-full h-full perspective-[1000px]"
              :class="{ 'flipped': questionStates[idx].answeredCorrectly }">
              <div class="relative w-full h-full transition-transform duration-[0.8s] [transform-style:preserve-3d]"
                :class="{ 'rotate-y-180': questionStates[idx].answeredCorrectly }">

                <!-- Front Face -->

                <img v-if="questionStates[idx].answeredCorrectly" src="/public/img/alfred1.png"
                  class="absolute left-10 md:left-30 top-0 h-[100px] w-[100px] rotate-y-[180deg]" />
                <img v-if="!questionStates[idx].answeredCorrectly" src="/public/img/alfred2.png"
                  class="absolute right-10 md:Right-30 top-0 h-[100px] w-[100px]" />


                <div
                  class="absolute h-[400px] w-[80%] justify-center items-center right-[10%] top-10 [backface-visibility:hidden]"
                  @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                  <div class="h-[300px] w-full rounded-md text-2xl flex justify-center items-center shadow-md" :style="{
                    backgroundColor: question.bgColor,
                    transform: swipeState.isSwiping ? `translateX(${swipeState.currentOffset}px)` : 'none',
                    transition: swipeState.isSwiping ? 'none' : 'transform 0.3s ease'
                  }">
                    {{ question.question }}
                  </div>

                  <div v-if="questionStates[idx].showIncorrectMessage"
                    class="w-full mt-4 text-[#ef9a9a] flex justify-center items-center">
                    Incorrect. Try again!
                  </div>

                  <div class="flex justify-center items-center w-full self-center mt-4">
                    <button v-if="questionStates[idx].showIncorrectMessage" @click="tryAgain(idx)"
                      class="bg-[#FFD93D] flex justify-center items-center w-[200px] hover:bg-[#f57c00]">
                      Try Again
                    </button>
                  </div>
                </div>

                <!-- Back Face -->
                <div
                  class="absolute h-[350px] w-[80%] lg:w-[50%] my-4 rounded-md bg-[#4D96FF] text-2xl flex flex-col justify-center items-center left-[10%] top-10 [backface-visibility:hidden] rotate-y-180"
                  :style="{ backgroundColor: question.bgColor }">
                  <div class="p-4 bg-[#37474f] rounded">
                    <div class="text-[20px] mb-4">Explanation:</div> {{ question.explanation }}
                  </div>
                  <button @click="handleButtonClick"
                    class="mt-4 bg-[#2196f3] text-white px-6 py-2 rounded disabled:bg-[#cccccc] disabled:cursor-not-allowed"
                    :style="{ backgroundColor: question.bgColor }">
                    {{ currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'
                    }}
                    <font-awesome-icon v-if="currentIndex !== questions.length - 1" icon="fa-solid fa-arrow-right"
                      class="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition name="fade">
        <div v-if="showCongratsModal"
          class="fixed inset-0 bg-inherit bg-opacity-50 flex items-center justify-center z-[99999]"
          @click.self="closeModal">
          <div class="bg-[#20232A] p-8 rounded-lg max-w-md w-full mx-4 shadow-xl">
            <h2 class="text-2xl font-bold mb-4 text-center">🎉 Congratulations! 🎉
            </h2>
            <p class="mb-6 text-center">You've successfully completed the quiz!</p>
            <div class="flex justify-center gap-4">
              <button @click="closeModal"
                class="bg-[#2196f3] hover:bg-[#0c7cd5] text-white px-6 py-2 rounded transition-colors">
                Close
              </button>
              <button @click="restartQuiz"
                class="bg-[#37474f] border-2 hover:bg-gray-300 hover:text-[#37474f] px-6 py-2 rounded transition-colors">
                Restart Quiz
              </button>
            </div>
          </div>
        </div>
      </Transition>
      <!-- Swipe Instructions -->
      <!-- <div class="swipe-instructions flex justify-between w-full px-8 absolute bottom-4 text-white opacity-70">
        <div class="flex items-center">
          <font-awesome-icon icon="fa-solid fa-arrow-left" class="mr-2" />
          Swipe left for: {{ currentQuestion.options[0] }}
        </div>
        <div class="flex items-center">
          Swipe right for: {{ currentQuestion.options[1] }}
          <font-awesome-icon icon="fa-solid fa-arrow-right" class="ml-2" />
        </div>
      </div> -->

      <div class="flex justify-center gap-2 mt-4">
        <div v-for="(_, idx) in questions" :key="idx" class="w-3 h-3 rounded-full bg-[#bdbdbd] cursor-pointer"
          :class="{ 'bg-[#2196f3] scale-110': currentIndex === idx }" @click="goToQuestion(idx)"></div>
      </div>

      <div class="flex justify-center mt-4 gap-4">
        <button @click="resetQuiz" class="bg-[#4D96FF] text-white px-6 py-2 rounded hover:-translate-y-1">Reset
          Quiz</button>
        <button @click="shuffleQuestions" class="bg-[#3f51b5] text-white px-6 py-2 rounded hover:-translate-y-1">Shuffle
          Questions</button>
      </div>
    </div>
  </div>
</template>
