<template>
    <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        @click="$emit('click')"
        :type="type"
    >
        <slot />
    </button>
</template>

<script setup>
    defineProps({
        type: { type: String, default: "button" },
    });
</script>
