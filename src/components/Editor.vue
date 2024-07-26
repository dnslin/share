<template>
    <Editor height="820px" :theme="theme" :language="language" :value="code" :options="MONACO_EDITOR_OPTIONS"
        @mount="handleMount" @change="formatCode" className="editor-container" />
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { Editor } from '@guolao/vue-monaco-editor';

const props = defineProps({
    theme: {
        type: String,
        default: 'vs-dark',
    },
    language: {
        type: String,
        default: 'javascript',
    },
});

const MONACO_EDITOR_OPTIONS = {
    automaticLayout: true,
    formatOnType: true,
    formatOnPaste: true,
};

const code = ref(`_____ _                    
/  ___| |                   
\\ \`--.| |__   __ _ _ __ ___ 
 \`--. \\ '_ \\ / _\` | '__/ _ \\
/\\__/ / | | | (_| | | |  __/
/\\____/|_| |_|\\__,_|_|  \\___|                 欢迎您使用Share分享代码 by-dnslin`);
const editorRef = shallowRef();
const handleMount = (editor) => (editorRef.value = editor);

// your action
function formatCode() {
    editorRef.value?.getAction('editor.action.formatDocument').run();
}
</script>
