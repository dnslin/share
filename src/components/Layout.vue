<template>
    <div :class="['common-layout', isActive ? 'light-theme' : 'dark-theme']">
        <el-container>
            <el-header :class="headerClasses">
                <el-row class="items-center header-row">
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
                        <el-button type="primary" class="mr-2" @click="openSubmitDialog">提交</el-button>
                        <el-button type="danger" @click="openDeleteDialog">删除</el-button>
                    </el-col>
                    <el-col :span="1" class="flex justify-center">
                        <el-switch inline-prompt :active-icon="dayIcon" :inactive-icon="darkIcon" v-model="isActive"
                            @change="toggleActive" />
                    </el-col>
                </el-row>
            </el-header>
            <el-main :class="mainClasses">
                <div class="editor-container">
                    <Editor :theme="editorTheme" :language="editorLanguage" />
                </div>
            </el-main>
        </el-container>
        <el-dialog v-model="submitDialogVisible" title="请输入密码" width="30%" :modal=true custom-class="custom-dialog">
            <el-input v-model="submitPassword" placeholder="密码" show-password />
            <span slot="footer" class="footer-dialog">
                <el-button @click="submitDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </span>
        </el-dialog>

        <el-dialog v-model="deleteDialogVisible" title="请输入密码" width="30%" :modal=true custom-class="custom-dialog">
            <el-input v-model="deletePassword" placeholder="密码" show-password />
            <span slot="footer" class="footer-dialog">
                <el-button @click="deleteDialogVisible = false">取消</el-button>
                <el-button type="danger" @click="handleDelete">删除</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Editor from './Editor.vue';
import dayIcon from '../assets/day.svg?component';
import darkIcon from '../assets/dark.svg?component';
import languageList from '../const/language.js'
import { ElMessage } from 'element-plus';
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
    'bg-gray-100 text-gray-900': isActive.value,
    'bg-gray-900 text-gray-100': !isActive.value,
    'p-2': true,
    'shadow-sm': true,
    'border-b': true,
    'border-gray-300': isActive.value,
    'border-gray-600': !isActive.value
}))

const mainClasses = computed(() => ({
    'bg-gray-100 text-gray-900': isActive.value,
    'bg-gray-900 text-gray-100': !isActive.value,
    'p-4': true,
    'shadow-inner': true,
    'rounded-lg': true,
    'border': true,
    'border-gray-300': isActive.value,
    'border-gray-600': !isActive.value,
    'flex': true,
    'flex-1': true,
    'overflow-auto': true
}))

const submitDialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const submitPassword = ref('');
const deletePassword = ref('');

const openSubmitDialog = () => {
    submitDialogVisible.value = true;
};

const openDeleteDialog = () => {
    deleteDialogVisible.value = true;
};

const handleSubmit = () => {
    submitDialogVisible.value = false;
    ElMessage.success('提交成功');
    // Add your submit logic here
    console.log('Submitted with password:', submitPassword.value);
};

const handleDelete = () => {
    deleteDialogVisible.value = false;
    ElMessage.success('删除成功');
    // Add your delete logic here
    console.log('Deleted with password:', deletePassword.value);
};
</script>

<style lang="scss" scoped>
.common-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    /* 设置宽度为浏览器的宽度 */
    font-family: 'Arial', sans-serif;
    background-color: var(--background-color);
    padding: 0;
    /* 移除内边距 */
}

.el-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    background-color: var(--container-bg-color);
    margin: 0 auto;
    /* 居中对齐 */
    width: 100%;
    /* 使容器宽度占满父容器 */
}

.icon-select-container {
    display: flex;
    align-items: center;
    padding: 0.25rem;
    /* 调整内边距 */
    border-radius: 8px;
    background-color: var(--select-bg-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-select {
    width: 12rem;
    /* 调整宽度 */
    margin-left: 0.5rem;
    border: none;
    background: transparent;
    color: inherit;
    font-size: 0.875rem;
    /* 调整字体大小 */
    transition: background-color 0.3s, color 0.3s;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    box-shadow: 0 1px 3px rgba(228, 224, 224, 0.281);
}

:deep(.el-select__wrapper) {
    background: var(--select-bg-color) !important;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

:deep(.el-select-dropdown__wrap) {
    background: var(--select-bg-color) !important;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.light-theme {
    --background-color: #f5f7fa;
    --container-bg-color: #ffffff;
    --select-bg-color: #EEF2F7;
    --header-bg-color: #ffffff;
    --header-text-color: #333;
    --main-text-color: #333;
    --button-bg-color: #007bff;
    --button-text-color: #fff;
    --button-hover-bg-color: #0069d9;
}

.dark-theme {
    --background-color: #181a1b;
    --container-bg-color: #2c2c2c;
    --select-bg-color: #3a3a3a;
    --header-bg-color: #333;
    --header-text-color: #fff;
    --main-text-color: #fff;
    --button-bg-color: #28a745;
    --button-text-color: #fff;
    --button-hover-bg-color: #218838;
}

.el-header {
    background-color: var(--header-bg-color);
    color: var(--header-text-color);
    border-bottom: 1px solid #e0e0e0;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    /* 调整内边距 */
}

.header-row {
    align-items: center;
    /* 垂直居中 */
}

.el-main {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
    padding: 1rem;
    border-radius: 0 0 8px 8px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    /* 使主内容区域占满剩余空间 */
    flex-direction: column;
    flex: 1;
    overflow: auto;
}

.el-button {
    background-color: var(--button-bg-color) !important;
    color: var(--button-text-color) !important;
    border: none;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;
    padding: 0.5rem 1rem;
    font-size: 1rem;
}

.el-button:focus,
.el-button:hover {
    background-color: var(--button-hover-bg-color) !important;
    transform: translateY(-2px);
}

.el-button[type="danger"] {
    background-color: #dc3545 !important;
    color: #fff !important;
}

.el-button[type="danger"]:focus,
.el-button[type="danger"]:hover {
    background-color: #c82333 !important;
}

:deep(.editor-container) {
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(24, 23, 23, 0.1);
    overflow: hidden;
    background-color: var(--main-bg-color);
    flex: 1;
    /* 使编辑器占满剩余空间 */
    display: flex;
    flex-direction: column;
}

:deep(.custom-dialog) {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    width: 30%;
    margin: 0 auto;
    margin-top: 20vh;

}

:deep(.custom-dialog .el-dialog__header) {
    background-color: #2d8cf0;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

:deep(.custom-dialog .el-dialog__footer) {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

:deep(.el-dialog__body .el-input) {
    margin-bottom: 10px;
}
</style>
