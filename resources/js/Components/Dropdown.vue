<!-- eslint-disable vuejs-accessibility/click-events-have-key-events-->
<template>
  <div class="relative">
    <div @click="open = !open">
      <slot name="trigger" />
    </div>

    <!-- Full Screen Dropdown Overlay -->
    <div v-show="open" class="fixed inset-0 z-40" @click="open = false" />

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="open"
        class="absolute z-50 mt-2 rounded-md shadow-lg"
        :class="[widthClass, alignmentClasses]"
        style="display: none"
        @click="open = false"
      >
        <div
          class="rounded-md ring-1 ring-black ring-opacity-5"
          :class="contentClasses"
        >
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  type ComputedRef,
  type Ref,
} from 'vue';

export default defineComponent({
  /** Props Definition */
  props: {
    alignment: { type: String, default: 'right' },
    width: { type: String, default: '48' },
    contentClasses: {
      type: Array,
      default: () => ['py-1', 'bg-white'],
    },
  },
  /**
   * Setup
   *
   * @param props - Props
   */
  setup(props) {
    const open: Ref<boolean> = ref(false);

    const widthClass: ComputedRef<string | undefined> = computed(() => {
      return {
        '48': 'w-48',
      }[props.width.toString()];
    });

    const alignmentClasses: ComputedRef<string> = computed(() => {
      if (props.alignment === 'left') {
        return 'origin-top-left left-0';
      } else if (props.alignment === 'right') {
        return 'origin-top-right right-0';
      } else {
        return 'origin-top';
      }
    });

    const closeOnEscape = e => {
      if (open.value && e.key === 'Escape') {
        open.value = false;
      }
    };

    onMounted(() => document.addEventListener('keydown', closeOnEscape));
    onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));

    return {
      open,
      widthClass,
      alignmentClasses,
      closeOnEscape,
    };
  },
});
</script>
