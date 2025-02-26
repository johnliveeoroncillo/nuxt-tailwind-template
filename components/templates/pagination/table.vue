<template>
    <div class="flex flex-col w-full h-full">
        <ScrollArea class="flex-1">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead v-for="(column, i) in columns" :key="i" class="bg-primary font-medium" :class="{ [column.class]: 1, 'hover:bg-blue-800 cursor-pointer': column.sort }" @click="sort(column)">
                            <div class="flex justify-between items-center text-slate-200 dark:text-slate-400">
                                {{ column.label }}
                                <ChevronsUpDown v-if="column.sort" :size="16" />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="(data, i) in rows" :key="i">
                        <TableCell v-for="(row, i) in data.details" :key="i">{{ row }}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </ScrollArea>
        <div>
            <Pagination v-slot="{ page }" :items-per-page="props.data.pagination?.limit ?? pageLimit" :total="props.data.pagination.total_rows" :sibling-count="1" show-edges :default-page="1" v-model:page="props.data.pagination.page">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst />
                <PaginationPrev />

                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'">
                        {{ item.value }}
                    </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>

                <PaginationNext />
                <PaginationLast />
                </PaginationList>
            </Pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ChevronsUpDown } from "lucide-vue-next";
import { defineProps } from "vue";
import type { Columns } from '@/composables/composables.interface';

const config = useRuntimeConfig()
const pageLimit = ref<number>(config.public.PAGE_LIMIT);

const emits = defineEmits();

// Accepting generic type from parent
const props = defineProps<{
    data: Pagination<any>; // Use `any` since it will be provided dynamically from the parent
}>();

const columns = computed(() => {
    const cols = props.data.columns;
    return cols;
});

const rows = computed(() => {
    const data = props.data.data.map((e) => {
        const det = {
            details: [] as string[],
        };
        for (const col of columns.value) {
            det.details.push(e?.[col.key] ?? '');
        }
        return det;
    });

    return data;
})

const sort = (column: Columns) => {
    if (!column.sort) {
        return;
    }

    if (!props.data.sort) {
        props.data.sort = {}
    }
    props.data.sort[column.key] = props.data.sort[column.key] === 'ASC' ? 'DESC' : 'ASC';

    emits('update:data', props.data);
}
</script>
