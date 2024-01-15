import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";
import type { ImageAttributes } from "../extensions/image";

/**
 * Composable for managing image functionality in the tiptap editor.
 *
 * @param editor The tiptap editor instance.
 * @returns An object containing image functions and state.
 */
export function useImage(editor: Editor) {
  /**
   * Open state of image drawer.
   */
  const imageDrawerOpen = ref(false);

  const openImageTab = ref("media");

  /**
   * Image selection.
   */
  const imageSelection = ref<ImageAttributes>({});

  /**
   * Opens the image selector and sets the value of the image selection.
   */
  function imageOpen() {
    imageSelection.value = {};
    if (editor.isActive("image")) {
      const attributes = editor.getAttributes("image") as ImageAttributes;
      imageSelection.value = attributes;
      if (attributes.id) {
        openImageTab.value = "media";
      } else if (attributes.src) {
        openImageTab.value = "embed";
      }
    }

    imageDrawerOpen.value = true;
  }

  /**
   * Closes the image drawer and clears the image selection.
   */
  function imageClose() {
    imageDrawerOpen.value = false;
    imageSelection.value = {};
  }

  /**
   * Sets the selected image in the editor.
   */
  function imageSave() {
    if (imageSelection.value) {
      editor.chain().focus().setImage(imageSelection.value).run();
    }
    imageClose();
  }

  /**
   * Selects a directus image and updates the image selection value.
   *
   * @param image The directus image object to be selected.
   */
  function imageSelect(image: Record<string, never>) {
    imageSelection.value = {
      id: image.id,
      alt: image.title,
      filename: image.filename_download,
      width: image.width,
      height: image.height,
    };
  }

  return { imageDrawerOpen, imageSelection, imageSelect, imageOpen, imageClose, imageSave, openImageTab };
}
