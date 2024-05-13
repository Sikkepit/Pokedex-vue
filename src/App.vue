<script setup>
import { onMounted, ref, computed } from 'vue';
import PokeList from './components/PokeList.vue';
import SearchBar from  './components/SearchBar.vue';
import DetailView from './components/DetailView.vue';

const pokeData = ref([]);
const searchQuery = ref('');
const activePokemon = ref('bulbasaur');
const sortAlphabetical = ref(false);

const getPokeData = async() => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150');
      if(response.ok) {
        const json = await response.json();
        pokeData.value = json.results;
        localStorage.setItem('pokedata', JSON.stringify(json.results))
      }
      else {
        console.error("Could not retrieve Pokemon data! Bad response.")
      }
    } catch (error) {
      console.error("Could not retrieve Pokemon data! Try statement failed.")
    }   
  }


onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('pokedata'));
  if(!savedData) {
    getPokeData();
  }
  else{
    pokeData.value = savedData
  }
  
})

const handleSearchQuery = (query) => {
  searchQuery.value = query.toLowerCase();
}

const showDetails = (pokemonName) => {
  activePokemon.value = pokemonName;
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: "smooth",
});
}

const handleIsAlphabetical = (isAlphabetical) => {
  sortAlphabetical.value = isAlphabetical;
}


</script>

<template>
  <div class="container">
    <div class="left-col">
      <SearchBar @search-query="handleSearchQuery" @is-alphabetical="handleIsAlphabetical" />
      <DetailView :pokemon="activePokemon"/>
    </div>
    <div>
      <PokeList :pokeData="pokeData" :searchQuery="searchQuery" :isAlphabetical ="sortAlphabetical" @details-viewed="showDetails"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap:2rem;
}
.left-col {
  display: flex;
  flex-direction: column;
  gap:2rem;
}

@media (max-width:850px) {
  .container {
  grid-template-columns: 1fr;
  }
  .left-col {
    flex-direction: column-reverse;
  }
}
</style>
