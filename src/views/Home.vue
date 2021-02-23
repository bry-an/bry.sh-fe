<template>
  <div class="home">
    <div class="title">
      <h1># bry.sh #</h1>
      <h3>Custom URL shortener</h3>
    </div>
    <div class="input">
      <p>
        <label for="url-input"> Enter a URL to shorten </label>
        <input
          id="url-input"
          placeholder="www.reallylongwebsite.com"
          type="text"
          @keyup.enter="submit"
        >
        <button
          class="submit-button"
          @click="submit"
        >
          Shorten
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
}
</script>
<style lang="scss" scoped>
@import "@/assets/bry.scss";

.home {
  font-family: "PT Mono", monospace;
  color: $light-green;
}
.input {
  margin-top: 2rem;

  #url-input {
    margin-top: 0.5rem;
    width: 50%;
    height: 2rem;
    font-size: 1.5rem;
    font-family: "PT Mono", monospace;
    border-radius: 3px;
  }
}
.submit-button {
  background-color: $light-green;
  border: 1px solid $dark-purple;
  height: 2.2rem;
  margin-left: 1rem;
  cursor: pointer;
  border-radius: 5px;
  color: $dark-purple;
  font-family: "PT mono", monospace;
  font-size: 1.16rem;
}

.title {
  text-align: center;
}
label {
  display: block;
}
</style>
