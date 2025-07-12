<template>
    <div>
        <table class="min-w-full divide-y divide-gray-200">
            <!-- ✅ THead: hanya Origin & View di mobile -->
            <thead class="bg-gray-50">
                <tr class="hidden md:table-row">
                    <th
                        class="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        ID
                    </th>
                    <th
                        class="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Origin
                    </th>
                    <th
                        class="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Destination
                    </th>
                    <th
                        class="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Status
                    </th>
                    <th
                        class="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Action
                    </th>
                </tr>
                <!-- Mobile: hanya Origin & Action -->
                <tr class="md:hidden">
                    <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Origin
                    </th>
                    <th
                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        Action
                    </th>
                </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200">
                <!-- Loading -->
                <tr v-if="loading">
                    <td
                        :colspan="5"
                        class="text-center py-6 text-gray-500 py-[100px]"
                    >
                        <div class="flex flex-col items-center">
                            <svg
                                class="animate-spin h-8 w-8 text-blue-500 mb-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            Loading shipments...
                        </div>
                    </td>
                </tr>

                <!-- Data rows -->
                <template v-else-if="shipments.length">
                    <template v-for="shipment in shipments" :key="shipment.id">
                        <!-- Main row -->
                        <tr
                            @click="toggleRow(shipment.id)"
                            class="cursor-pointer hover:bg-gray-50"
                        >
                            <!-- Desktop -->
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell"
                            >
                                {{ shipment.id }}
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                            >
                                {{ shipment.origin }}
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell"
                            >
                                {{ shipment.destination }}
                            </td>
                            <td
                                class="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell"
                            >
                                <span
                                    class="inline-flex px-2 py-1 rounded-full text-xs font-semibold"
                                    :class="statusClass(shipment.status)"
                                >
                                    {{ shipment.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm">
                                <RouterLink
                                    :to="`/shipment/${shipment.id}`"
                                    class="text-blue-600 hover:underline"
                                    @click.stop
                                >
                                    View
                                </RouterLink>
                            </td>
                        </tr>

                        <!-- Expand row (mobile only) -->
                        <tr
                            v-if="expandedRow === shipment.id"
                            class="md:hidden bg-gray-50"
                        >
                            <td
                                class="px-4 py-2 text-sm text-gray-700"
                                colspan="2"
                            >
                                <div>
                                    <strong>Destination:</strong>
                                    {{ shipment.destination }}
                                </div>
                                <div class="mt-2">
                                    <strong>Status:</strong>
                                    <span :class="statusClass(shipment.status)">
                                        {{ shipment.status }}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </template>
                </template>

                <!-- No data -->
                <tr v-else>
                    <td colspan="5" class="text-center py-6 text-gray-500">
                        No shipments found.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import { ref } from "vue";

    defineProps({
        shipments: Array,
        loading: Boolean,
    });

    const expandedRow = ref(null);

    function toggleRow(id) {
        expandedRow.value = expandedRow.value === id ? null : id;
    }

    function statusClass(status) {
        switch (status.toLowerCase()) {
            case "not assigned":
                return "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full";
            case "assigned":
                return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full";
            default:
                return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full";
        }
    }
</script>
