<script setup>
import { defineProps, defineEmits, computed, ref, onMounted } from 'vue';
import { useCapitalize } from '@/composables/capitalize';

const props = defineProps({
    pokeData: {
        type: Array,
        required: true,
    },
    searchQuery: {
      type: String,
      required: true
    },
    isAlphabetical: {
      type: Boolean,
      required: true
    }
})



const emit = defineEmits(['details-viewed']);

const filteredPokemon = computed(() => {
  if(props.isAlphabetical) {
  return props.pokeData.filter(pokemon => pokemon.name.includes(props.searchQuery) || 
        formatId(getIdFromUrl(pokemon.url)).includes(props.searchQuery)).sort((a, b) => a.name.localeCompare(b.name));
  }
  else {
    return props.pokeData.filter(pokemon => pokemon.name.includes(props.searchQuery) || 
        formatId(getIdFromUrl(pokemon.url)).includes(props.searchQuery))
  }
})

function getIdFromUrl(url) {
  url = url.slice(0, -1);
  const index = url.lastIndexOf('/')
  return url.slice(index+1);
}

function formatId(url) {
  url = "00" + url;
  return url.slice(-3)
}

const viewDetails = (pokemonName) => {
  emit('details-viewed', pokemonName)
}

</script>

<template>
  <section class="list">
    <button v-for="pokemon in filteredPokemon" :key="pokemon.url" class="item" @click="viewDetails(pokemon.name)">
      <div class="pokemon-img">
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(pokemon.url)}.png`" :alt="'Picture of ' + useCapitalize(pokemon.name)">
      </div>
      <div>
        <span class="pokemon-id">No. {{ formatId(getIdFromUrl(pokemon.url)) }}</span><br>
        <span class="pokemon-name">{{ useCapitalize(pokemon.name) }}</span>
      </div>
    </button>
  </section>
</template>

<style scoped>
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap:2rem;
    overflow-y: scroll;
    overflow-x: hidden;
    padding:1rem;
    margin: -1rem;
    scroll-snap-type: y mandatory;
  }

  @media (min-width:800px) {
    .list {
     max-height: 1140px;
    }
  }

  .item {
    all:unset;
    display: flex;
    align-items: center;
    gap: 2rem;
    border-radius: 15px;
    background-color: #FFF4FA;
    overflow: hidden;
    transition: scale 250ms;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    scroll-snap-align: start;
  }
  .item:hover {
    scale: 1.05;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    cursor: pointer;
  }
  .item:focus {
    outline: 3px solid cornflowerblue;
  }
  .pokemon-name {
    font-size: 18px;
  }
  .pokemon-id {
    font-size:13px;
    font-weight:300;
  }
  .pokemon-img {
    background-color: hotpink;
    padding:0.5rem;
  }
  .icon {
    height:20px;
    width:20px;
    rotate:90deg;
    margin-inline: auto 2rem;
    fill: rgb(70, 17, 43);
    flex-shrink: 0;
  }

</style>