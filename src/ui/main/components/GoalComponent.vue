<script lang="ts" setup>
import type { Goal } from '@/models/goal/Goal';
import { defineProps, defineEmits } from 'vue';

interface Props {
    goal: Goal;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: 'select', id: Goal['_id']): void;
}>();
</script>
<template>
    <div class="goal" @click="emit('select', props.goal._id)">
        <img v-if="props.goal.img" :src="props.goal.img" />
        <!--заглушка-->
        <img v-if="!props.goal.img" src="../../../images/cat-glass.svg" />
        <div class="goal__title">
            {{ props.goal.title }}
        </div>
    </div>
</template>
<style lang="scss" scoped>
.goal {
    width: 393px;
    height: 525px;

    &__title {
        text-align: center;
    }
}
</style>
