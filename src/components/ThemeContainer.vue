<script setup lang="ts">
import UnitContainer from './UnitContainer.vue';
import { reactive } from 'vue';

const units = reactive([
    {
        id: 1,
        type: 'theory',
        title: 'Молярная масса',
        content:
            'характеристика вещества, отношение массы вещества к его количеству. Численно равна массе одного моля вещества, то есть массе вещества, содержащего число частиц, равное числу Авогадро. ',
    },
]);
</script>

<template>
    <template v-for="unit of units" :key="unit.id">
        <UnitContainer :unit="unit"></UnitContainer>
    </template>
</template>
