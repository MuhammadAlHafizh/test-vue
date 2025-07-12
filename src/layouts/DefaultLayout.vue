<template>
    <div class="flex flex-col min-h-screen">
        <Navbar />

        <!-- MAIN CONTENT CONTAINER -->
        <main class="flex-1 container mx-auto px-4 py-4">
            <slot />
        </main>

        <Footer />
    </div>
</template>

<script setup>
    import Navbar from "../components/Navbar.vue";
    import Footer from "../components/Footer.vue";
</script>
