<!-- eslint-disable vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -->
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
        :class="`absolute z-50 mt-2 rounded-md shadow-lg ${[
          widthClass,
          alignmentClasses,
        ].join(' ')}`"
        style="display: none"
        @click="open = false"
      >
        <div
          :class="`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses.join(
            ' '
          )}`"
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
  type PropType,
  type Ref,
  type SetupContext,
} from 'vue';

export default defineComponent({
  /** Props Definition */
  props: {
    align: {
      type: String,
      default: 'right',
    },
    width: {
      type: Number,
      default: 48,
    },
    contentClasses: {
      type: Array as PropType<string[]>,
      default: () => ['py-1', 'bg-white dark:bg-gray-700'],
    },
  },
  /**
   * Setup
   *
   * @param props - Props
   * @param _context - Setup Context
   */
  setup(props, _context: SetupContext) {
    const open: Ref<boolean> = ref(false);

    const widthClass: ComputedRef<string | undefined> = computed(() => {
      return {
        48: 'w-48',
      }[props.width.toString()];
    });

    const alignmentClasses: ComputedRef<string> = computed(() => {
      if (props.align === 'left') {
        return 'origin-top-left left-0';
      } else if (props.align === 'right') {
        return 'origin-top-right right-0';
      }
      return 'origin-top';
    });

    const closeOnEscape = (e: KeyboardEvent) => {
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
