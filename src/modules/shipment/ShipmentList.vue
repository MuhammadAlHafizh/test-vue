<template>
    <DefaultLayout>
        <div class="bg-white p-6 mt-6 rounded shadow overflow-x-auto">
            <!-- Header -->
            <div
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
            >
                <h2 class="text-2xl font-semibold text-gray-800">Shipments</h2>
                <input
                    v-model="search"
                    type="text"
                    placeholder="Search shipments..."
                    class="border border-gray-300 px-4 py-2 w-full md:w-1/3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <!-- Content -->
            <ShipmentTable :shipments="paginatedShipments" :loading="loading" />

            <!-- Pagination -->
            <BasePagination
                :currentPage="page"
                :totalPages="totalPages"
                :perPage="perPage"
                :totalResults="filteredShipments.length"
                :disabled="loading"
                @prev="handlePrev"
                @next="handleNext"
                @go="handleGo"
            />
        </div>
    </DefaultLayout>
</template>

<script setup>
    import { ref, computed, onMounted, watch } from "vue";
    import DefaultLayout from "../../layouts/DefaultLayout.vue";
    import ShipmentTable from "../../components/ShipmentTable.vue";
    import BasePagination from "../../components/BasePagination.vue";
    import { useShipmentStore } from "../../stores/shipmentStore";

    const store = useShipmentStore();
    const shipments = computed(() => store.shipments);

    const search = ref("");
    const page = ref(1);
    const perPage = 5;
    const loading = ref(true);

    onMounted(() => {
        store.startRealTimeUpdates();
        simulateLoading();
    });

    watch([search, page], () => {
        simulateLoading();
    });

    const filteredShipments = computed(() => {
        if (!search.value) return shipments.value;

        const q = search.value.toLowerCase().trim();

        return shipments.value.filter((s) =>
            [
                String(s.id),
                s.origin || '',
                s.destination || '',
                s.status || ''
            ].some((field) =>
                field.toLowerCase().includes(q)
            )
        );
    });


    const totalPages = computed(() => {
        return Math.ceil(filteredShipments.value.length / perPage) || 1;
    });

    const paginatedShipments = computed(() => {
        const start = (page.value - 1) * perPage;
        return filteredShipments.value.slice(start, start + perPage);
    });

    function handlePrev() {
        if (page.value > 1) page.value--;
    }

    function handleNext() {
        if (page.value < totalPages.value) page.value++;
    }

    function handleGo(p) {
        if (p >= 1 && p <= totalPages.value) page.value = p;
    }

    function simulateLoading() {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
        }, 500);
    }
</script>
