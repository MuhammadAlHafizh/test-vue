<template>
    <div class="mb-4">
        <label :for="id" class="block text-sm font-medium mb-1">{{ label }}</label>
        <input
            :id="id"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :type="type"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :class="[
                'w-full border rounded px-3 py-2    ',
                inputClass
            ]"
        />
    </div>
</template>

<script setup>
    defineProps({
        id: String,
        label: String,
        modelValue: String,
        type: { type: String, default: "text" },
        placeholder: String,
        disabled: Boolean,
        readonly: Boolean,
        inputClass: String,
    });
    defineEmits(["update:modelValue"]);
</script>
