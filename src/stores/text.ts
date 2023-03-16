import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useTextStore = defineStore('text', () => {

  const text: Ref<String> = ref('')

  const forbiddenWords: Array<String> = [
    'Rápidamente',
    'Rapidamente',
    'rapidamente',
    'rápidamente',
    'hola'
  ]

  const allParagraphs: Ref<Array<String>> = computed(function() {
    return text.value.split('\n').filter((item: String) => item !== '')
  })

  const sentences: Ref<Array<String>> = computed(function() {
    return allParagraphs.value.map(function(item) {

      const sentences: Array<String> = item
        .split(/([^.!?]*[^.!\s][.?]['"]?)(\s|$)/g)
        .filter((item: String) => item != '')
        .filter((item: String) => item != ' ')

      const finalSentences: Array<String> = []

      for (const sentence of sentences) {
        const words: number = sentence.split(' ').length
        const letters: number = sentence.split(' ').join('').length

        const level = Math.round(4.71 * (letters / words) + 0.5 * words / sentence.length - 21.43)

        if (words < 14) {
          finalSentences.push(sentence)
          continue
        }

        if (level >= 10 && level < 14) {
          finalSentences.push(`<span class='bg-yellow-300 px-4 rounded-lg'>${sentence}</span>`)
          continue
        }

        if (level >= 14) {
          finalSentences.push(`<span class='bg-red-300 px-4 rounded-lg'>${sentence}</span>`)
          continue
        }

        finalSentences.push(sentence)
      }

      return finalSentences
    }).flat()
  })

  const words: Ref<Array<String>> = computed(function() {
    const wordsArr = sentences.value.map(function(item: String) {
      return item
        .split(' ')
        .filter((item: String) => item != '')
        .filter((item: String) => item != ' ')

    }).flat()

    return wordsArr.map((item: String) => {
      if (forbiddenWords.includes(item.toLowerCase())) {
        return `<span class='bg-orange-200 px-4 rounded-lg'>${item}</span>`
      }

      return item
    })
  })

  return { text, allParagraphs, sentences, forbiddenWords, words }
})
