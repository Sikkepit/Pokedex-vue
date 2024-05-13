<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import { useCapitalize } from '@/composables/capitalize';


const props = defineProps({
    pokemon: {
        type: String,
        required: true
    }
})

const pokeData = ref([]);
const imageLink = ref('');

onMounted(async() => {
    await getPokeData(props.pokemon);
})

watch(() => props.pokemon, async(newPokemon) => {
    await getPokeData(newPokemon);
})

function formatId(url) {
  url = "00" + url;
  return url.slice(-3)
}

const getPokeData = async(pokemon) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if(response.ok) {
            const json = await response.json();
            pokeData.value = json;
            imageLink.value = json;
        }
        else {
            console.error("Could not retrieve Pokemon data! Bad response.")
        }
    } 
    catch (error) {
        console.log(error)
        console.error("Could not retrieve Pokemon data! Try statement failed.")
    }   
}

function getWidth(rating) {
    return 'width:' + rating/250 * 100 + '%'
}



</script>
<template>
    <section>
        <div class="pokemon-header">
            <span> No. {{ formatId(pokeData.id) }}</span>
            <h2>{{ useCapitalize(pokemon) }}</h2>
        </div>
        
        <div class="container">
            <div class="pokemon-img">
                <img v-if="pokeData.id" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`" :alt="pokeData.name">
            </div>
            <div class="pokemon-details">
                Height: {{ pokeData.height / 10 }}m<br>
                Weight: {{ pokeData.weight / 10 }}kg
                <ul>
                    <li v-for="stat in pokeData.stats">{{ useCapitalize(stat.stat.name) }} ({{ stat.base_stat }})
                    <div class="stat-bar" :style="getWidth(stat.base_stat)"></div>
                    </li>
                </ul>
                <ul class="element-types">
                    <li v-for="pokeType in pokeData.types" :class="pokeType.type.name">{{ useCapitalize(pokeType.type.name) }}</li>
                </ul>
            </div>
        </div>
    </section>
</template>
<style scoped>

.pokemon-details, .pokemon-header {
    flex-grow: 1;
    background-color: #FFF4FA;
    padding: 2rem 3rem;
}
.pokemon-img {
    text-align: center;
    height:400px;
}
h2 {
    margin: 0;
}
ul {
    list-style: none;
    padding:0;
}
.stat-bar {
    background-color: hotpink;
    height:2rem;
    transition: width 300ms ease-in-out;
    margin-block:0.25rem;
    border-radius:15px
}
img {
    max-width: 400px;
    width:100%;
}
.element-types {
    display: flex;
    gap:1rem;
    margin-top:2rem;
}
.element-types li {
    color: white;
    background-color: cornflowerblue;
    padding:1rem;
    border-radius: 15px;
    flex: 1;
    max-width: 75px;
    text-align: center;
}

section {
    border-radius: 15px;
    background-color: hotpink;
    overflow: hidden;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
</style>    
