<template>
  <div class="home">
    <div>
      <h1 class="title">
        bry.sh/
      </h1> <span class="subtitle">custom-url-shortener</span>
    </div>
    <div class="input">
      <h5>lucky-mode</h5>
      <p class="input-field">
        <label for="url-input"> Enter a url </label>
        <input
          id="url-input"
          v-model="url"
          type="text"
          @keyup.enter="getLucky"
          @input="checkLuckyUrlValidation"
        >
        <button
          class="submit-button"
          @click="getLucky"
        >
          Shorten
        </button>
      </p>
      <p
        :class="['error-lucky', 'invisible', {'visible': invalidUrl}]"
      >
        Hey now, that doesn't look like a valid url. Do you have an http(s):// in there?
      </p>
      <div :class="['invisible', {'visible': generatedSlug}]">
        <p
          class="result-title"
        >
          {{ randomCongrat }}, that long url is now <span
            class="result"
          >{{ shortenedUrl }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 0 24 24"
            width="24"
            class="icon"
            @click="copy"
          ><path
            d="M0 0h24v24H0z"
            fill="none"
          /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
          <span
            class="copy-text"
            @click="copy"
          >{{ copyText }}</span>
        </p>
      </div>
      <div class="input">
        <h5>custom-mode</h5>
        <p class="input-field">
          <label for="custom-url-input">Enter a url</label>
          <input
            id="custom-url-input"
            v-model="customUrl"
            type="text"
            @keyup.enter="getCustom"
            @input="checkCustomValidation"
          >
          <span
            :class="['error-custom', 'invisible', {'visible': invalidCustomUrl}]"
          >Hey now, that doesn't look like a valid url. Do you have an http(s):// in there?</span>
          <label for="slug-input">Enter a custom slug</label>
          <input
            id="slug-input"
            v-model="customSlug"
            type="text"
            @input="checkSlugValidation"
            @keyup.enter="getCustom"
          >
          <button
            class="submit-button"
            @click="getCustom"
          >
            Shorten
          </button>
          <span
            :class="['error-custom', 'invisible', {'visible': invalidSlug}]"
          >The slug has to be at least 4 characters. <br>If it's any consolation, we can encode about 1.7 million urls with 4 alphanumeric characters. </span>
        </p>
        <div v-if="shortenedCustomUrl">
          <p
            class="result-title"
          >
            {{ randomCongrat }}, that long url is now <span
              class="result"
            >{{ shortenedCustomUrl }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              width="24"
              class="icon"
              @click="copy"
            ><path
              d="M0 0h24v24H0z"
              fill="none"
            /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
            <span
              class="copy-text"
              @click="copy"
            >{{ copyText }}</span>
          </p>
        </div>
        <div v-if="alreadyExistsError">
          <p class="result-title">
            Oh no! That slug <span class="error">already exists</span> for a different url. Try something else!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import {useStore} from 'vuex'
import {testUrl, testSlug} from '../utils/index.js'

export default {
  setup() {
    const store = useStore()
    const generatedSlug = ref('')
    const customSlug = ref('')
    const shortenedCustomUrl = ref('')
    const url = ref('http://')
    const customUrl = ref('http://')
    const copyText = ref('Copy')
    const copySuccess = ref(false)
    const copyError = ref(false)
    const invalidUrl = ref(false)
    const invalidCustomUrl = ref(false)
    const invalidSlug = ref(false)
    const alreadyExistsError = ref(false)

    const congrats = ['Just when you thought things couldn\'t get any better', 'Crackin', 'Hot diggity']

    const shortenedUrl = computed(() => generatedSlug.value ? `bry.sh/${generatedSlug.value}` : '')
    const randomCongrat = computed(() => congrats[Math.floor(Math.random() * 3)])

    const cb = (data) =>  {
      generatedSlug.value = data.data.hash
    }

    const getLucky = () => { 
      customSlug.value = ''
      invalidSlug.value = false
      alreadyExistsError.value = false
      customUrl.value = 'http://'
      invalidCustomUrl.value = false
      generatedSlug.value = ''
      shortenedCustomUrl.value = ''
      if (testUrl(url.value) === false) {
        invalidUrl.value = true
        return
      }
      store.dispatch('shortenUrl', url.value).then(cb)
    }
    const cbCustom = (data) => {
      if (!data || !data.data) return
      const res = data.data
      if (res.alreadyExists && !res.sameUrl) {
        alreadyExistsError.value = true
        return
      }
      shortenedCustomUrl.value = `bry.sh/${res.slug}`

    }
    const getCustom = () => { 
      url.value = 'http://'
      invalidUrl.value = false
      alreadyExistsError.value = false
      generatedSlug.value = ''
      shortenedCustomUrl.value = ''
      const cleanSlug = (input) => input.replace(/[^\w\s]/g, '').replace(/\s+/g, '-')

      customSlug.value = cleanSlug(customSlug.value)

      if (testSlug(customSlug.value) === false) {
        invalidSlug.value = true
      }
      if (testUrl(customUrl.value) === false) {
        invalidCustomUrl.value = true
      }

      if (invalidSlug.value || invalidCustomUrl.value) return

      store.dispatch('shortenCustomUrl', { slug: customSlug.value, url: customUrl.value }).then(cbCustom)
    }
    const checkLuckyUrlValidation = (e, custom = false) => {
      const input = e.target.value
      if (invalidUrl.value || invalidCustomUrl.value) {
        if (testUrl(input)) {
          if (custom) {
            invalidCustomUrl.value = false
          } else {
            invalidUrl.value = false
          }
        }
      }
    }
    
    const checkCustomValidation = (e) => checkLuckyUrlValidation(e, true)

    const checkSlugValidation = (e) => {
      if (invalidSlug.value) {
        if (testSlug(e.target.value)) {
          invalidSlug.value = false
        }
      }
    }

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(shortenedCustomUrl.value || shortenedUrl.value)
        copySuccess.value = true
        copyText.value = 'Copied!'
        setTimeout(() => {
          copyText.value = 'Copy'
        }, 1000 * 2)
      } catch(e) {
        copySuccess.value = false
        copyError.value = true
      }
    }

    // expose to template
    return {
      url,
      generatedSlug,
      randomCongrat,
      copy,
      shortenedUrl,
      customUrl,
      shortenedCustomUrl,
      invalidUrl,
      invalidCustomUrl,
      invalidSlug,
      customSlug,
      copyText,
      getLucky,
      getCustom,
      checkLuckyUrlValidation,
      checkCustomValidation,
      checkSlugValidation,
      alreadyExistsError,
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/bry.scss";

.home {
  font-family: "PT Mono", monospace;
  color: $light-green;
}
.title {
  display: inline;
}
.input {
  margin-top: 2rem;

  input {
    margin: 1rem 0;
    width: 50%;
    height: 2rem;
    font-size: 1.3rem;
    font-family: "PT Mono", monospace;
    border-radius: 3px;
  }
}
.submit-button {
  background-color: $light-green;
  border: 1px solid white;
  height: 2.3rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 5px;
  color: $dark-purple;
  font-family: "PT mono", monospace;
  font-size: 1.16rem;
}

.subtitle {
  font-size: $font-xl;
}
label {
  display: block;
}
.result-title {
  margin: 1rem 0 1rem 3rem;
}
.result {
  color: $camel;
  font-size: $font-medium;
  margin-left: 1rem;
}
.icon {
  filter: invert(96%) sepia(6%) saturate(3147%) hue-rotate(197deg) brightness(95%) contrast(87%);
  margin-left: 1rem;
  cursor: pointer;
}
.copy-text {
  color: $thistle;
  font-size: $font-small;
  cursor: pointer;
}
.input-field {
  margin: 1rem 0 0 3rem;
}
.error {
  color: $sienna;
}
.error-lucky {
  margin-left: 3rem;
  color: $sienna;
}
.error-custom {
  color: $sienna;
  display: block;
  margin-bottom: 1rem;
  line-height: 2rem;
}
.invisible {
  visibility: hidden;
}
.visible {
  visibility: visible;
}

</style>
