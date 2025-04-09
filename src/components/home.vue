<!-- -->

<template>
    <div
        class=" absolute top-0 right-0 items-center min-h-screen  w-screen bg-[#20242A] text-white flex flex-row justify-start">
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
            class="text-white mx-auto z-[999] pt-1 pb-4 flex flex-col gap-[20px] w-[80%] md:w-[60%] md:ml-[25%] justify-around justify-start">
            <div
                class="flex items-center justify-center flex-row border-b py-2 border-[#FBCD00] border-solid opacity-[0.7] w-screen absolute left-0">
                <div class="logo text-4xl animate-pulse text-[#4D96FF]">Learnly </div>
                <div class="logo text-4xl animate-pulse text-[#FFD93D]">App </div>
            </div>

            <div class="font-bold opacity-[0.7] mt-18">Superheroes</div>
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
