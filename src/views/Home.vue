<template>
  <div class="home">
    <div>
      <h1 class="title">
        bry.sh/
      </h1> <span class="subtitle">custom-url-shortener</span>
    </div>
    <div class="input">
      <h5>Lucky Mode</h5>
      <p class="input-field">
        <label for="url-input"> Enter a url</label>
        <input
          id="url-input"
          v-model="url"
          placeholder="www.reallylongwebsite.com"
          type="text"
          @keyup.enter="getLucky"
        >
        <button
          class="submit-button"
          @click="getLucky"
        >
          Shorten
        </button>
      </p>
      <div v-if="generatedSlug">
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
        <h5>Custom Mode</h5>
        <p class="input-field">
          <label for="custom-url-input">Enter a url</label>
          <input
            id="custom-url-input"
            v-model="customUrl"
            placeholder="www.reallylongwebsite.com"
            type="text"
            @keyup.enter="getCustom"
          >
          <label for="slug-input">Enter a custom slug</label>
          <input
            id="slug-input"
            v-model="customSlug"
            placeholder="cool-site"
            type="text"
            @keyup.enter="getCustom"
          >
          <button
            class="submit-button custom"
            @click="getCustom"
          >
            Shorten
          </button>
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
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import {useStore} from 'vuex'

export default {
  setup() {
    const url = ref('')
    const generatedSlug = ref('')
    const store = useStore()
    const copySuccess = ref(false)
    const copyError = ref(false)
    const customUrl = ref('')
    const customSlug = ref('')
    const shortenedCustomUrl = ref('')
    const copyText = ref('Copy')
    const shortenedUrl = computed(() => generatedSlug.value ? `bry.sh/${generatedSlug.value}` : '')

    const cb = (data) =>  {
      generatedSlug.value = data.data.hash
    }
    const cbCustom = (data) => {
      shortenedCustomUrl.value = `bry.sh/${data.data.slug}`
    }
    const congrats = ['Nice', 'Sweet', 'Crackin', 'Boom', 'Right on', 'Smokin', 'Hot diggity']
    const randomCongrat = computed(() => congrats[Math.floor(Math.random() * 7)])
    const getLucky = () => { 
      customSlug.value = ''
      customUrl.value = ''
      generatedSlug.value = ''
      shortenedCustomUrl.value = ''
      store.dispatch('shortenUrl', url.value).then(cb)
    }
    const getCustom = () => { 
      url.value = ''
      generatedSlug.value = ''
      shortenedCustomUrl.value = ''
      store.dispatch('shortenCustomUrl', { slug: customSlug.value, url: customUrl.value }).then(cbCustom)
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
      customSlug,
      copyText,
      getLucky,
      getCustom,

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
    font-size: 1.5rem;
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
  &.custom {
    display: block;
    margin-left: 0;
  }
}

.subtitle {
  font-size: $font-xl;
}
label {
  display: block;
}
.result-title {
  margin: 2rem 0 1rem 3rem;
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

</style>
