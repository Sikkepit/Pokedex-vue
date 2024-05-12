<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const isAlphabetical = ref(false);
const emit = defineEmits(['search-query', 'is-alphabetical']);
const buttonText = ref('Sort by name');
function toggleSorting() {
    isAlphabetical.value = !isAlphabetical.value;
    buttonText.value = isAlphabetical.value ? 'Sort by ID' : 'Sort by name'
    emit('is-alphabetical', isAlphabetical.value)
}
function clearInput() {
    inputValue.value="";
    emit('search-query', '')
}

</script>
<template>
    <section>
        <input type="text" name="search-bar" placeholder="Search Pokedex..." v-model="inputValue" @input="emit('search-query', inputValue)">
        <button class="clear-button" @click="clearInput">Clear</button>
        <button @click="toggleSorting">{{ buttonText }}</button>
    </section>
</template>
<style scoped>
section {
    border-radius: 15px;
    background-color: cornflowerblue;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
}
section:focus-within {
    outline: 1px solid hotpink;
}
label {
    margin-right:1rem;
}
input {
    font-family: inherit;
    border-block: 1px solid cornflowerblue;
    border-inline-start: 1px solid cornflowerblue;
    border-inline-end: 0;
    padding: 1rem;
    border-radius: 15px 0px 0px 15px;
    width: 100%;
}
input:focus {
    outline: 1px solid hotpink;
}
button {
    background: transparent;
    width:6rem;
    border:0;
    color:white;
    cursor: pointer;
}
.clear-button {
    background-color: white;
    border-radius: 0px 15px 15px 0px;
    border-block: 1px solid cornflowerblue;
    border-inline-end: 1px solid cornflowerblue;
    color: cornflowerblue;
}

</style>