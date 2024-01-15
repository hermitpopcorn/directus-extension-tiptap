import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import type { VideoAttributes } from "../extensions/video";

export function useVideo(editor: Editor) {
  const isVideoDrawerOpen = ref(false);

  const videoSelection = ref<VideoAttributes>({});

  function openVideoDrawer() {
    videoSelection.value = {};
    if (editor.isActive("video")) {
      videoSelection.value = editor.getAttributes("video") as VideoAttributes;
    }
    isVideoDrawerOpen.value = true;
  }

  function closeVideoDrawer() {
    isVideoDrawerOpen.value = false;
    videoSelection.value = {};
  }

  function saveVideo() {
    if (videoSelection.value) {
      editor.chain().focus().setVideo(videoSelection.value).run();
    }
    closeVideoDrawer();
  }

  return {
    isVideoDrawerOpen,
    videoSelection,
    openVideoDrawer,
    closeVideoDrawer,
    saveVideo,
  };
}
