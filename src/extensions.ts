import type { Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Highlight } from "@tiptap/extension-highlight";
import { CharacterCount } from "@tiptap/extension-character-count";

export const extensions: Extensions = [StarterKit, Underline, Highlight, CharacterCount];
