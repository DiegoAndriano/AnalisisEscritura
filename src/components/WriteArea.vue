<script setup lang='ts'>
import { useTextStore } from "@/stores/text"
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

const textStore = useTextStore();

let placeholders = [
  "Theodore está en la tumba. \n Las palabras, mientras las escribo, tienen tan poco sentido como...",
  "Si de verdad les interesa lo que voy a contarles, lo primero que querrán saber es dónde...",
  "Dormíamos en lo que, en otros tiempos, había sido el gimnasio. El suelo, de madera barnizada...",
];

const text: Ref<String> = ref(placeholders[Math.floor(Math.random() * placeholders.length)]);

onMounted(() => updateText())

let updateText = function(){
  textStore.text = text.value
}

</script>
<template>
  <textarea @keyup='updateText' rows='25' class='w-full px-4 my-6' v-model="text"></textarea>
</template>
