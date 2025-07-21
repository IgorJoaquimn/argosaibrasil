<template>
    <footer class="bg-background mt-auto">
        <div class="container mx-auto px-4 lg:px-8 py-6 lg:py-8">
            <div class="flex flex-col items-center space-y-6">
                <!-- Logo Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 w-full max-w-4xl">
                    <!-- INCT Logo -->
                    <div class="flex justify-center items-center">
                        <img src="@/assets/logos/inct.png" alt="INCT"
                            class="h-12 sm:h-16 md:h-20 w-auto object-contain hover:opacity-80 transition-opacity duration-200" />
                    </div>

                     <!-- DCC Logo -->
                    <div class="flex justify-center items-center">
                        <img src="@/assets/logos/Logo-DCC.png" alt="DCC"
                            class="h-12 sm:h-16 md:h-20 w-auto object-contain hover:opacity-80 transition-opacity duration-200" />
                    </div>

                    <!-- UFMG Logo -->
                    <div class="flex justify-center items-center">
                        <img src="@/assets/logos/Logo_UFMG.png" alt="UFMG"
                            class="h-12 sm:h-16 md:h-20 w-auto object-contain hover:opacity-80 transition-opacity duration-200" />
                    </div>

                    <!-- PUC Minas Logo -->
                    <div class="flex justify-center items-center">
                        <img src="@/assets/logos/brasao-pucminas-2025_PRETO.png" alt="PUC Minas"
                            class="h-12 sm:h-16 md:h-20 w-auto object-contain hover:opacity-80 transition-opacity duration-200" />
                    </div>
                </div>

                <!-- Optional copyright or additional text -->
                <div class="text-center text-sm text-gray-600">
                    <p>&copy; 2025 Argos AI Brasil. Todos os direitos reservados.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
// Footer component for displaying partner logos
</script>
