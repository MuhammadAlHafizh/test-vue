<template>
    <DefaultLayout>
        <div class="bg-white shadow rounded p-6 mt-6">
            <h2 class="text-2xl font-bold mb-4">Shipment Detail</h2>

            <!-- Grid responsive -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseInput
                    v-model="shipment.route"
                    id="route"
                    label="Route"
                    input-class="bg-[#ebebeb]"
                    readonly
                />
                <BaseInput
                    v-model="shipment.vehicle"
                    id="vehicle"
                    label="Vehicle Type"
                    input-class="bg-[#ebebeb]"
                    readonly
                />
                <BaseSelect
                    v-model="selectedTransporter"
                    id="transporter"
                    label="Assign Transporter"
                    :options="transporters"
                    required
                />
            </div>

            <!-- Pesan error -->
            <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>

            <!-- Tombol & pesan sukses -->
            <div class="flex flex-col mt-6">
                <BaseButton @click="updateShipment" class="w-fit">
                    Update
                </BaseButton>
                <p v-if="message" class="text-green-600 mt-4">
                    {{ message }}
                </p>
            </div>
        </div>
    </DefaultLayout>
</template>

<script setup>
    import DefaultLayout from "../../layouts/DefaultLayout.vue";
    import BaseInput from "../../components/BaseInput.vue";
    import BaseSelect from "../../components/BaseSelect.vue";
    import BaseButton from "../../components/BaseButton.vue";
    import { useShipmentStore } from "../../stores/shipmentStore";
    import { useTransporterStore } from "../../stores/transporterStore";
    import { ref, onMounted } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();
    const shipmentStore = useShipmentStore();
    const transporterStore = useTransporterStore();

    const shipment = ref({});
    const selectedTransporter = ref("");
    const message = ref("");
    const error = ref("");

    onMounted(() => {
        shipment.value = shipmentStore.getShipmentById(route.params.id);
        selectedTransporter.value = shipment.value.transporterId || "";
    });

    const transporters = transporterStore.transporters.map((t) => ({
        value: t.id,
        label: t.name,
    }));

    const updateShipment = () => {
        if (!selectedTransporter.value) {
            error.value = "Please select a transporter!";
            message.value = "";
            return;
        }

        // Reset error jika valid
        error.value = "";

        shipmentStore.updateShipment(shipment.value.id, {
            ...shipment.value,
            transporterId: selectedTransporter.value,
            status: "Assigned",
        });

        shipment.value.transporterId = selectedTransporter.value;

        message.value = "Updated successfully!";
    };
</script>
