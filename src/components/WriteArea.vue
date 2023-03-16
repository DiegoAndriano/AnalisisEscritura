<script setup lang='ts'>
import { useTextStore } from '@/stores/text'
import { ref, onMounted, computed } from 'vue'
import type { Ref } from 'vue'

const textStore = useTextStore()

let placeholders = [
  'Theodore está en la tumba. \n Las palabras, mientras las escribo, tienen tan poco sentido como...',
  'Si de verdad les interesa lo que voy a contarles, lo primero que querrán saber es dónde...',
  'Dormíamos en lo que, en otros tiempos, había sido el gimnasio. El suelo, de madera barnizada...'
]

const text: Ref<String> = ref(placeholders[Math.floor(Math.random() * placeholders.length)])

onMounted(() => updateText())

let updateText = function() {
  textStore.text = text.value
}

</script>
<template>
  <div class='flex flex-col justify-around'>
    <textarea @keyup='updateText' rows='5' class='w-full px-4 my-6' v-model='text'></textarea>

    <div class='py-6' v-for='(paragraph, index) in textStore.allParagraphs' :key='index + "2"'>
      <p>{{ `${index} ${paragraph}` }}</p>
    </div>
    <div v-for='(sentence, index ) in textStore.sentences' :key='index + "1"'>
      <p v-html='sentence'></p>
    </div>
    <div v-for='(word, index ) in textStore.words' :key='index + "3"'>
      <p v-html='word'></p>
    </div>
  </div>
</template>
