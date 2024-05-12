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

</script>
<template>
    <section>
        <input type="text" name="search-bar" placeholder="Search Pokedex..." v-model="inputValue" @input="emit('search-query', inputValue)">
        <button @click="toggleSorting">{{ buttonText }}</button>
    </section>
</template>
<style scoped>
section {
    margin-bottom:2rem;
    border-radius: 15px;
    background-color: cornflowerblue;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
}
label {
    margin-right:1rem;
}
input {
    font-family: inherit;
    border: 1px solid cornflowerblue;
    padding: 1rem;
    border-radius: 15px;
    width: 100%;
}
input:focus {
    outline: 2px solid hotpink;
}
button {
    background: transparent;
    width:6rem;
    border:0;
    color:white;
    cursor: pointer;
}

</style>