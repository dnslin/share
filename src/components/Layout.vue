<template>
    <div :class="['common-layout', isActive ? 'light-theme' : 'dark-theme']">
        <el-container>
            <el-header>
                <el-row>
                    <el-col :span="2">
                        <div class="icon-select-container">
                            <el-icon>
                                <Tools />
                            </el-icon>
                            <el-select v-model="selectedValue" placeholder="请选择语言"
                                :class="['custom-select', isActive ? 'light-select' : 'dark-select']"
                                style="width: 200px;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" :disabled="item.disabled" />
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="18"></el-col>
                    <el-col :span="3">
                        <el-button type="primary">提交按钮</el-button>
                        <el-button type="danger">删除按钮</el-button>
                    </el-col>
                    <el-col :span="1">
                        <el-switch inline-prompt :active-icon="dayIcon" :inactive-icon="darkIcon" v-model="isActive"
                            @change="toggleActive" />
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <Editor :theme="editorTheme" :language="editorLanguage" />
            </el-main>
        </el-container>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import Editor from './Editor.vue';
import dayIcon from '../assets/day.svg?component';
import darkIcon from '../assets/dark.svg?component';
import languageList from '../const/language.js'
const selectedValue = ref('')
const options = languageList
const editorTheme = ref('vs-dark');
const editorLanguage = selectedValue;
const isActive = ref(false);

const toggleActive = (value) => {
    isActive.value = value;
    // 按钮切换时，切换编辑器主题
    editorTheme.value = isActive.value ? 'vs' : 'vs-dark';
};
</script>

<style scoped>
.common-layout {
    display: flex;
    flex-direction: column;
}

.el-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 60px;
}

.el-main {
    flex: 1;
    padding: 10px;
}

.dark-theme .el-header {
    background-color: #333;
    color: #fff;
}

.dark-theme .el-main {
    background-color: #2c2c2c;
    color: #fff;
}

.light-theme .el-header {
    background-color: #f5f5f5;
    color: #333;
}

.light-theme .el-main {
    background-color: #fff;
    color: #333;
}

.icon-select-container {
    height: 100%;
    display: flex;
    align-items: center;
}

.icon-select-container .el-icon {
    margin-right: 8px;
}

.custom-select {
    transition: background-color 0.3s, color 0.3s;
}

.light-select {
    background-color: #fff;
    color: #333;
}

.dark-select {
    background-color: #333;
    color: #fff;
}

.dark-theme .el-select .el-input__inner {
    background-color: #333;
    color: #fff;
}

.light-theme .el-select .el-input__inner {
    background-color: #fff;
    color: #333;
}

.dark-theme .el-select-dropdown {
    background-color: #333;
    color: #fff;
}

.light-theme .el-select-dropdown {
    background-color: #fff;
    color: #333;
}
</style>