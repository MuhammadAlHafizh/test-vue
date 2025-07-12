<template>
    <div class="mb-4">
        <label :for="id" class="block text-sm font-medium mb-1">{{
            label
        }}</label>
        <select
            :id="id"
            :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)"

            class="w-full border rounded px-3 py-2"
        >
            <option disabled value="">-- Select --</option>
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
    defineProps({
        id: String,
        label: String,
        modelValue: String,
        options: Array,
    });
    defineEmits(["update:modelValue"]);
</script>
