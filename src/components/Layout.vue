<template>
    <div :class="['common-layout', isActive ? 'light-theme' : 'dark-theme']">
        <el-container>
            <el-header :class="headerClasses">
                <el-row class="items-center">
                    <el-col :span="2">
                        <div class="icon-select-container">
                            <el-icon>
                                <Tools />
                            </el-icon>
                            <el-select v-model="selectedValue" placeholder="请选择语言" class="custom-select">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" :disabled="item.disabled" />
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="19"></el-col>
                    <el-col :span="2" class="flex justify-end">
                        <el-button type="primary" class="mr-2">提交</el-button>
                        <el-button type="danger">删除</el-button>
                    </el-col>
                    <el-col :span="1" class="flex justify-center">
                        <el-switch inline-prompt :active-icon="dayIcon" :inactive-icon="darkIcon" v-model="isActive"
                            @change="toggleActive" />
                    </el-col>
                </el-row>
            </el-header>
            <el-main :class="mainClasses">
                <Editor :theme="editorTheme" :language="editorLanguage" />
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Editor from './Editor.vue';
import dayIcon from '../assets/day.svg?component';
import darkIcon from '../assets/dark.svg?component';
import languageList from '../const/language.js'

const selectedValue = ref('')
const options = languageList
const editorTheme = ref('vs-dark')
const editorLanguage = selectedValue
const isActive = ref(false)

const toggleActive = (value) => {
    isActive.value = value
    editorTheme.value = isActive.value ? 'vs' : 'vs-dark'
}

const headerClasses = computed(() => ({
    'bg-gray-300 text-gray-800': !isActive.value,
    'dark:bg-gray-800 dark:text-white': isActive.value,
    'p-4': true,
}))

const mainClasses = computed(() => ({
    'bg-white text-black': !isActive.value,
    'dark:bg-gray-900 dark:text-white': isActive.value,
    'p-4': true,
}))
</script>

<style lang="scss" scoped>
.common-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.el-container {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.icon-select-container {
    display: flex;
    align-items: center;
}

.custom-select {
    width: 12rem;
    margin-left: 0.5rem;
    transition: background-color 0.3s, color 0.3s;
}

:deep(.el-select__wrapper) {
    background: var(--main-bg-color) !important;
}

:deep(.el-select-dropdown__wrap) {
    background: var(--main-bg-color) !important;
}


.light-theme {
    --main-bg-color: #fff;
    --header-bg-color: #f5f5f5;
    --header-text-color: #333;
    --main-text-color: #333;
}

.dark-theme {
    --main-bg-color: #2c2c2c;
    --header-bg-color: #333;
    --header-text-color: #fff;
    --main-text-color: #fff;
}

.el-header {
    background-color: var(--header-bg-color);
    color: var(--header-text-color);
}

.el-main {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
    padding: 1rem;
}
</style>