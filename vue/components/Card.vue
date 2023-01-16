<template>
  <v-card
    class="mx-auto"
    width="176"
    height="258"
    elevation="4"
  >
    <div style="background-color: white; height: 25%; padding: 1em;">
      <v-icon
        large
      >
        {{ icons.mdiBookOpenBlankVariant }}
      </v-icon>
    </div>
    <div style="background-color: lightgray; height: 75%;">
      <v-card-title class="title text-h6">
        <slot name="title">{{ title }}</slot>
      </v-card-title>
      <v-card-text>
        <p class="text--secondary"><slot name="author">{{ author }}</slot></p>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          阅读章节内容
        </v-btn>
      </v-card-actions>
      </div>
  </v-card>
</template>

<script>
  import { mdiBookOpenBlankVariant } from '@mdi/js';

  export default {
    name: "Card",
    props: {
      title: {
        type: String,
        default: "章节标题"
      },
      author: {
        type: String,
        default: "作者XXX"
      }
    },
    data() {
      return {
        icons: {
          mdiBookOpenBlankVariant
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 4em;
  }
</style>