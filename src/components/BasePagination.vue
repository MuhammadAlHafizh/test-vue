<template>
    <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4"
    >
        <!-- Kiri: Showing -->
        <div class="text-sm text-gray-700">
            Showing {{ from }} to {{ to }} of {{ totalResults }} results
        </div>

        <!-- Kanan: Pagination Controls -->
        <div class="flex items-center gap-2 flex-wrap">
            <!-- Prev -->
            <button
                class="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                :disabled="currentPage === 1"
                @click="$emit('prev')"
            >
                Prev
            </button>

            <!-- Page Select -->
            <select
                v-model="selectedPage"
                @change="goToPage"
                class="border rounded px-2 py-1"
            >
                <option v-for="page in totalPages" :key="page" :value="page">
                    {{ page }}
                </option>
            </select>

            <!-- Next -->
            <button
                class="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                :disabled="currentPage === totalPages"
                @click="$emit('next')"
            >
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from "vue";

    const props = defineProps({
        currentPage: Number,
        totalPages: Number,
        perPage: Number,
        totalResults: Number,
    });

    const emit = defineEmits(["prev", "next", "go"]);

    // Hitungan range
    const from = computed(() => {
        if (props.totalResults === 0) return 0;
        return (props.currentPage - 1) * props.perPage + 1;
    });

    const to = computed(() => {
        const calc = props.currentPage * props.perPage;
        return calc > props.totalResults ? props.totalResults : calc;
    });

    // Select Page
    const selectedPage = ref(props.currentPage);

    watch(
        () => props.currentPage,
        (newVal) => {
            selectedPage.value = newVal;
        }
    );

    const goToPage = () => {
        emit("go", Number(selectedPage.value));
    };
</script>
