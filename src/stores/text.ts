import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useTextStore = defineStore('text', () => {

  const text: Ref<String> = ref('')

  const allParagraphs: Ref<Array<String>> = computed(function() {
    return text.value.split('\n').filter((item: String) => item !== '')
  })

  const sentences: Ref<Array<Array<String>>> = computed(function() {
    return allParagraphs.value.map(function(item) {
      // /([^.!?]*[^.!?\s][.!?]['"]?)(\s|$)/g
      return item
        .split(/([^.!?]*[^.!\s][.?]['"]?)(\s|$)/g)
        .filter((item: String) => item != '')
        .filter((item: String) => item != ' ')
    })
  })

  return { text, allParagraphs, sentences }
})
