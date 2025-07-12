<template>
    <nav class="bg-sidebar-color border-b border-white/10 shadow text-white">
        <div  class="container mx-auto px-4 py-4 flex items-center justify-between">
            <!-- Desktop Menu -->
            <ul class="hidden md:flex space-x-6">
                <li>
                    <RouterLink to="/" class="hover:underline">Home</RouterLink>
                </li>
                <!-- Tambah link lain di sini kalau perlu -->
            </ul>

            <!-- Hamburger Mobile -->
            <button class="md:hidden focus:outline-none" @click="toggleMenu">
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isOpen" class="md:hidden px-4 pb-4">
            <ul class="flex flex-col space-y-2">
                <li>
                    <RouterLink to="/" class="block py-2 hover:underline"
                        >Home</RouterLink
                    >
                </li>
                <!-- Tambah link lain di sini kalau perlu -->
            </ul>
        </div>
    </nav>
</template>

<script setup>
    import { ref } from "vue";
    import { RouterLink } from "vue-router";

    const isOpen = ref(false);
    const toggleMenu = () => (isOpen.value = !isOpen.value);
</script>
