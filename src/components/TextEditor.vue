<template>
    <!-- <vue-simplemde v-model="editorText" :highlight="true" @input="handleInput" ref="markdownEditor" /> -->
    <vue-editor v-model="editorText" @text-change="save" ref="markdownEditor"></vue-editor>
</template>

<script>
    import { defineComponent } from 'vue';

    // import VueSimplemde from 'vue-simplemde'
    import { VueEditor } from "vue3-editor";

    export default defineComponent({
        data(){
            return {
                editorText: "",
                editorOptions: {
                    hideModeSwitch: true
                }
            }
        },
        name: 'TextEditor',
        props: ['text'],
        components: {
            // VueSimplemde
            VueEditor
        },
        methods: {
            save(){
                this.$emit("myChange", this.$refs.markdownEditor.modelValue)
            }
        },
        created() {
           if(this.text){
               this.editorText = this.text
           } 
        },
    });

</script>

<style lang="css" scope>
    @import '~simplemde/dist/simplemde.min.css';
</style>