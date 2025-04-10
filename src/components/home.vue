<!-- -->
<script setup>
import { ref, onMounted } from 'vue'

const showAlfredModal = ref(false)

onMounted(() => {
    const hasVisited = localStorage.getItem('hasVisited')
    if (!hasVisited) {
        showModal.value = true
        localStorage.setItem('hasVisited', 'true')
    }
})

function closeAlfredModal() {
    showAlfredModal.value = false
}



const showCecilModal = ref(false)

function closeCecilModal() {
    showCecilModal.value = false
}
</script>

<template>
    <div
        class=" absolute top-0 right-0 items-center min-h-screen mb-32 w-screen bg-[#20242A] text-white flex flex-row justify-start">

        <div v-if="showAlfredModal"
            class=" fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-[9999]">
            <div
                class="bg-[#20242A] border-amber-50 border text-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg text-center z-[9999]">
                <p class="text-2xl font-bold mb-4">Welcome to learnlyApp</p>

                <img src="/public/img/alfred1.png"
                    class="flex items-center justify-center mx-auto h-[100px] w-[100px] rotate-y-[180deg]" />

                <p class="text-lg mb-4 p-2">I am Alfred Pennyworth and I and my friends would be taking you on some easy
                    quizzes.</p>
                <button @click="closeAlfredModal"
                    class="bg-[#FFD93D] text-[#20242A] font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition">
                    Okay
                </button>
            </div>
        </div>

        
        <div v-if="showCecilModal"
            class=" fixed inset-0 bg-transparent bg-opacity-60 flex items-center justify-center z-[99999]">
            <div
                class="bg-[#20242A] border-amber-50 border text-white rounded-2xl p-6 w-11/12 max-w-md shadow-lg text-center z-[9999]">
                <p class="text-2xl font-bold mb-4">Out of Bound</p>

                <img src="/public/img/Cecil1.png"
                    class="flex items-center justify-center mx-auto h-[100px] w-[100px] rotate-y-[180deg]" />

                <p class="text-lg mb-4 p-2">Room not yet ready, come back later.</p>
                <button @click="closeCecilModal"
                    class="bg-[#FFD93D] text-[#20242A] font-semibold px-6 py-2 rounded-md hover:bg-gray-200 transition">
                    Okay
                </button>
            </div>
        </div>


        <div
            class="fixed top-70 md:top-auto md:text-left md:justify-start md:items-start left-[-18vw] z-[9999] text-white flex flex-row md:flex-col items-center rotate-90 md:rotate-0 w-[50%] md:w-auto md:left-0 md:my-auto md:p-8 gap-16">
            <div class="cursor-pointer flex flex-col items-center justify-center text-[#FBCD00]">
                <div class=" opacity-[0.7] h-[10px] w-[10px] bg-[#FBCD00] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical"> Superheroes
                </h2>
            </div>
            <div @click="navigateToPrincess" class="cursor-pointer flex flex-col items-center justify-center">
                <div class=" bg-transparent opacity-[0.7] h-[10px] w-[10px] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical">Princesses
                </h2>
            </div>
            <div @click="navigateToCartoon" class="cursor-pointer flex flex-col items-center justify-center">
                <div class=" bg-transparent opacity-[0.7] h-[10px] w-[10px] rounded-full cursor-pointer"></div>
                <h2 class="md:text-4xl font-semibold opacity-[0.7] text-left writing-mode-vertical">Cartoons</h2>
            </div>
        </div>
        <div
            class="text-white mx-auto z-[99] pt-1 pb-4 flex flex-col gap-[20px] w-[80%] md:w-[60%] md:ml-[25%] justify-around justify-start">
            <div
                class="flex items-center justify-center flex-row border-b py-4 border-[#FBCD00] border-solid opacity-[0.7] w-screen fixed bg-[#20242A] top-0 left-0">
                <div class="logo text-4xl animate-pulse text-[#4D96FF]">Learnly </div>
                <div class="logo text-4xl animate-pulse text-[#FFD93D]">App </div>
            </div>

            <div class="font-bold opacity-[0.7] mt-24">Superheroes</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-32 my-auto ml-[5vw]">

                <div @click="navigateToDc"
                    class="bg-[#E36A39] animate-pulse flex flex-row relative rounded-md w-[80vw] justify-end md:w-[30vw] justify-between cursor-pointer p-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                    <img src="/img/superman.png" class="h-[200px] w-[200px] absolute bottom-0 left-[-15%] z-[99]" />
                    <div class="w-[40vw] ml-32 md:w-[15vw] z-[999]">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center">
                            <font-awesome-icon icon="fa-solid fa-bookmark" style="color: #edeff2;" />
                        </div>
                        <img src="/img/dcLogo.png" class="h-[50px] w-[100px] mt-2 mb-6" />
                        <h3 class="text-left w-full">Detective Comics</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star-half-stroke" />
                            <h3 class="ml-2">4.5</h3>
                        </div>
                        <h3 class="text-left w-full">Play Now!</h3>
                    </div>
                </div>

                <div @click="navigateToInvin"
                    class="bg-[#9e9e9e] animate-pulse flex flex-row relative rounded-md w-[80vw] justify-end md:w-[30vw] justify-between cursor-pointer p-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                    <img src="/img/omniman.png" class="h-[200px] w-[200px] absolute bottom-0 left-[-15%] z-[99]" />
                    <div class="w-[40vw] ml-32 md:w-[15vw] z-[999]">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center">
                            <font-awesome-icon icon="fa-solid fa-bookmark" style="color: #edeff2;" />
                        </div>
                        <img src="/img/invincibleLogo.png" class="h-[50px] w-[100px] mt-2 mb-6" />
                        <h3 class="text-left w-full">Invincible</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star-half-stroke" />
                            <h3 class="ml-2">4.5</h3>
                        </div>
                        <h3 class="text-left w-full">Play Now!</h3>
                    </div>
                </div>

                <div @click="navigateToMarvel"
                    class="bg-[#4D7895] animate-pulse flex flex-row relative rounded-md w-[80vw] justify-end md:w-[30vw] justify-between cursor-pointer p-4 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                    <img src="/img/spiderman.png" class="h-[200px] w-[200px] absolute bottom-0 left-[-15%] z-[99]" />
                    <div class="w-[40vw] ml-32 md:w-[15vw] z-[999]">
                        <div class="absolute top-0 right-0 flex flex-row gap-sm justify-end mx-8 items-center">
                            <font-awesome-icon icon="fa-solid fa-bookmark" style="color: #edeff2;" />
                        </div>
                        <img src="/img/marvelLogo.png" class="h-[50px] w-[100px] mt-2 mb-6" />
                        <h3 class="text-left w-full">Marvel Studios</h3>
                        <div class="flex flex-row gap-sm justify-start items-center">
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <font-awesome-icon icon="fa-solid fa-star" />
                            <h3 class="ml-2">5.0</h3>
                        </div>
                        <h3 class="text-left w-full">Play Now!</h3>
                    </div>
                </div>


            </div>
        </div>

    </div>

    <div class="fixed bottom-2 left-0 right-0 p-4 flex flex-row md:hidden w-[80vw] mx-auto bg-[#3C4147] rounded-2xl items-center justify-evenly z-[9999]
    shadow-2xl transform rotate-x-6 perspective-1000">
        <div class="flex flex-col gap-3 relative items-center justify-center"><font-awesome-icon
                icon="fa-solid fa-gamepad" class="text-[#FFD93D]" />
            <div class="absolute bottom-[-100%] w-[50px] h-[5px] bg-[#FFD93D]"></div>
        </div>
        <font-awesome-icon icon="fa-solid fa-heart" class="text-white opacity-[0.5]"  @click="showCecilModal = true"/>
        <font-awesome-icon icon="fa-solid fa-user" class="text-white opacity-[0.5]"  @click="showCecilModal = true"/>
        <font-awesome-icon icon="fa-solid fa-gear" class="text-white opacity-[0.5]"  @click="showCecilModal = true"/>
    </div>
</template>


<script>
export default {
    methods: {
        navigateToDc() {
            console.log("Navigating to /dc");
            this.$router.push('/dc');
        },
        navigateToInvin() {
            console.log("Navigating to /invincible");
            this.$router.push('/invincible');
        },
        navigateToMarvel() {
            console.log("Navigating to /marvel");
            this.$router.push('/marvel');
        },
        navigateToSuperheroes() {
            console.log("Navigating to /home");
            this.$router.push('/home');
        },
        navigateToPrincess() {
            console.log("Navigating to /princess");
            this.$router.push('/princess');
        },
        navigateToCartoon() {
            console.log("Navigating to /cartoon");
            this.$router.push('/cartoon');
        },
    },
};
</script>
