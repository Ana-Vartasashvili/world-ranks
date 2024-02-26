<script setup lang="ts">
import ChevronLeft from '@/assets/icons/ChevronLeft.vue'
import ChevronRight from '@/assets/icons/ChevronRight.vue'
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  pageSize: number
  totalItems: number
}>()
const emit = defineEmits(['update:currentPage'])

const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))

const goToPage = (pageNumber: number) => {
  emit('update:currentPage', pageNumber)
}
</script>

<template>
  <div class="flex justify-end mt-4">
    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
      <a
        href="#"
        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="goToPage(props.currentPage - 1)"
      >
        <span class="sr-only">Previous</span>
        <ChevronLeft />
      </a>

      <a
        href="#"
        :class="[
          'relative',
          'inline-flex',
          'items-center',
          'px-4',
          'py-2',
          'text-sm',
          'font-semibold',
          'text-white',
          {
            'bg-indigo-600': 1 === currentPage,
            'ring-1 ring-inset ring-gray-300 hover:text-wr-grey-600 hover:bg-gray-50':
              1 !== currentPage,
          },
        ]"
        @click="goToPage(1)"
      >
        1
      </a>
      <span
        v-if="currentPage > 4"
        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
      >
        ...
      </span>

      <template v-for="pageNumber in totalPages">
        <template v-if="pageNumber > currentPage - 3 && pageNumber < currentPage + 3">
          <a
            href="#"
            v-if="pageNumber !== 1 && pageNumber !== totalPages"
            :key="pageNumber"
            :class="[
              'relative',
              'inline-flex',
              'items-center',
              'px-4',
              'py-2',
              'text-sm',
              'font-semibold',
              'text-white',
              {
                'bg-indigo-600': pageNumber === currentPage,
                'ring-1 ring-inset ring-gray-300 hover:text-wr-grey-600 hover:bg-gray-50':
                  pageNumber !== currentPage,
              },
            ]"
            @click="goToPage(pageNumber)"
          >
            {{ pageNumber }}
          </a>
        </template>
      </template>

      <span
        v-if="currentPage < totalPages - 3"
        class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
      >
        ...
      </span>
      <a
        href="#"
        :class="[
          'relative',
          'inline-flex',
          'items-center',
          'px-4',
          'py-2',
          'text-sm',
          'font-semibold',
          'text-white',
          {
            'bg-indigo-600': totalPages === currentPage,
            'ring-1 ring-inset ring-gray-300 hover:text-wr-grey-600 hover:bg-gray-50':
              totalPages !== currentPage,
          },
        ]"
        @click="goToPage(totalPages)"
      >
        {{ totalPages }}
      </a>

      <a
        href="#"
        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:text-wr-grey-600 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        @click="goToPage(props.currentPage + 1)"
      >
        <span class="sr-only">Next</span>
        <ChevronRight />
      </a>
    </nav>
  </div>
</template>
