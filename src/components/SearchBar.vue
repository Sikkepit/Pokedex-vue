<script setup>
import { ref } from 'vue';

const inputValue = ref('');
const emit = defineEmits(['search-query']);

</script>
<template>
    <section>
        <input type="text" name="search-bar" placeholder="Search Pokedex..." v-model="inputValue" @input="emit('search-query', inputValue)">
    </section>
</template>
<style scoped>
section {
    margin-bottom:2rem;
    border-radius: 15px;
    background-color: #FFF4FA;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: flex;
}
label {
    margin-right:1rem;
}
input {
    font-family: inherit;
    border: 1px solid hotpink;
    padding: 1rem;
    border-radius: 15px;
    width: 100%;
}
input:focus {
    outline: 2px solid hotpink;
}

</style>