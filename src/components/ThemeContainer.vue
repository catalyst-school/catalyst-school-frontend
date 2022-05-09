<script setup lang="ts">
import ThemeSectionContainer from '@/components/ThemeSectionContainer.vue';
import { reactive } from 'vue';
import { NSpace, NButton, NIcon } from 'naive-ui';
import { Book, ChartArcs, TestPipe } from '@vicons/tabler';

const theme = reactive({
    id: 1,
    title: 'Молярная масса',
    // sections это отдельная сущность в бд, на бэке они собираются в одно
    sections: [
        {
            id: 1,
            type: 'theory',
            // unit отдельная сущность, задача или теория запрос делается в зависимости от типа секции
            units: [
                {
                    id: 1,
                    type: 'theory',
                    title: 'Молярная масса',
                    content:
                        'характеристика вещества, отношение массы вещества к его количеству. Численно равна массе одного моля вещества, то есть массе вещества, содержащего число частиц, равное числу Авогадро. ',
                },
                {
                    id: 2,
                    type: 'theory',
                    title: 'Молярная масса 2',
                    content:
                        'характеристика вещества, отношение массы вещества к его количеству. Численно равна массе одного моля вещества, то есть массе вещества, содержащего число частиц, равное числу Авогадро. ',
                },
            ],
        },
        {
            id: 2,
            type: 'training',
            // unit отдельная сущность, задача или теория запрос делается в зависимости от типа секции
            units: [
                {
                    id: 1,
                    type: 'task',
                    title: 'Молярная масса',
                    content:
                        'характеристика вещества, отношение массы вещества к его количеству. Численно равна массе одного моля вещества, то есть массе вещества, содержащего число частиц, равное числу Авогадро. ',
                },
                {
                    id: 2,
                    type: 'task',
                    title: 'Молярная масса 2',
                    content:
                        'характеристика вещества, отношение массы вещества к его количеству. Численно равна массе одного моля вещества, то есть массе вещества, содержащего число частиц, равное числу Авогадро. ',
                },
            ],
        },
        {
            id: 3,
            type: 'test',
            units: [
                {
                    id: 3,
                    type: 'task',
                    title: 'Молярная масса',
                    content:
                        'характеристика вещества, отношение массы вещества к его количеству. Численно равна массе одного моля вещества, то есть массе вещества, содержащего число частиц, равное числу Авогадро. ',
                },
                {
                    id: 4,
                    type: 'task',
                    title: 'Молярная масса 2',
                    content:
                        'характеристика вещества, отношение массы вещества к его количеству. Численно равна массе одного моля вещества, то есть массе вещества, содержащего число частиц, равное числу Авогадро. ',
                },
            ],
        },
    ],
});

const addUnit = (sectionType: string) => {
    let targetSection = theme.sections.find((s) => s.type === sectionType);
    if (!targetSection) {
        return;
    }
    targetSection.units.push({ ...targetSection.units[0], id: targetSection.units.length });
};

const addSection = (sectionType: string) => {
    theme.sections.push({ id: theme.sections.length, type: sectionType, units: [] });
};
</script>

<template>
    <template v-for="section of theme.sections" :key="section.id">
        <ThemeSectionContainer
            :section="section"
            @add="addUnit(section.type)"
        ></ThemeSectionContainer>
    </template>
    <NSpace>
        <NButton size="large" secondary type="warning" @click="addSection('theory')">
            <template #icon>
                <NIcon :component="Book" />
            </template>
            Добавить теорию
        </NButton>
        <NButton size="large" secondary type="success" @click="addSection('training')">
            <template #icon>
                <NIcon :component="ChartArcs" />
            </template>
            Добавить тренажер
        </NButton>
        <NButton size="large" secondary type="error" @click="addSection('test')">
            <template #icon>
                <NIcon :component="TestPipe" />
            </template>
            Добавить контроль
        </NButton>
    </NSpace>
</template>

<style></style>
