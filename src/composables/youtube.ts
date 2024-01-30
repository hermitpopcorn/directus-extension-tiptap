import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import type { YouTubeAttributes } from "../extensions/youtube";

export function useYouTube(editor: Editor) {
  const isEmbedYouTubeDrawerOpen = ref(false);

  const embedYouTubeSelection = ref<YouTubeAttributes>({});

  function openEmbedYouTubeDrawer() {
    embedYouTubeSelection.value = {};
    if (editor.isActive("iframe")) {
      embedYouTubeSelection.value = editor.getAttributes("iframe") as YouTubeAttributes;
    }
    isEmbedYouTubeDrawerOpen.value = true;
  }

  function closeEmbedYouTubeDrawer() {
    isEmbedYouTubeDrawerOpen.value = false;
    embedYouTubeSelection.value = {};
  }

  function saveYouTubeEmbed() {
    if (embedYouTubeSelection.value) {
      editor.chain().focus().setYouTube(embedYouTubeSelection.value).run();
    }
    closeEmbedYouTubeDrawer();
  }

  return {
    isEmbedYouTubeDrawerOpen,
    embedYouTubeSelection,
    openEmbedYouTubeDrawer,
    closeEmbedYouTubeDrawer,
    saveYouTubeEmbed,
  };
}
