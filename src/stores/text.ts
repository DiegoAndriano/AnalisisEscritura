import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useTextStore = defineStore('text', () => {

  const text: Ref<String> = ref('')

  const allParagraphs: Ref<Array<String>> = computed(function() {
    return text.value.split('\n').filter((item: String) => item !== '')
  })

  const sentences: Ref<Array<String>> = computed(function() {
    return allParagraphs.value.map(function(item) {
      // /([^.!?]*[^.!?\s][.!?]['"]?)(\s|$)/g
      return item
        .split(/([^.!?]*[^.!\s][.?]['"]?)(\s|$)/g)
        .filter((item: String) => item != '')
        .filter((item: String) => item != ' ')
    }).flat()
  })

  const words: Ref<Array<String>> = computed(function() {
    return sentences.value.map(function(item) {
      // /([^.!?]*[^.!?\s][.!?]['"]?)(\s|$)/g
      return item
        .split(" ")
        .filter((item: String) => item != '')
        .filter((item: String) => item != ' ')
    }).flat()
  })

  const forbiddenWords: Array<String> = [
    "Rápidamente"
  ];

  return { text, allParagraphs, sentences, forbiddenWords, words }
})
