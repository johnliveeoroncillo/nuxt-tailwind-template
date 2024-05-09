<template>
    <div class="p-6 text-left !pt-10">
        <!-- <svg class="mx-auto mb-4 w-14 h-14 text-green-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> -->
        <h3 class="mb-8 text-lg !font-bold text-gray-700">{{data.message || "Are you sure you want to delete this data?"}}</h3>
        <div class="text-right">
            <custom-button-loader data-modal-toggle="popup-modal" type="button" class="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg inline-flex items-center px-6 py-2 text-center mr-2" @click="$parent.$parent.callback" id="confirm_yes">
                {{ data.yesText || 'Yes' }}
            </custom-button-loader>
            <custom-button-loader data-modal-toggle="popup-modal" type="button" class="bg-gray-200 !text-blueGray-600 hover:bg-gray-300 rounded-lg border border-gray-200 font-medium px-6 py-2 hover:text-gray-900 focus:z-10" @click="$parent.$parent.close" id="confirm_close">{{ data.noText || 'No' }}</custom-button-loader>
        </div>
    </div>
</template>

<script>
export default {
    computed:   {
        data() {
            return this.$parent.$parent.data;
        }
    }
}
</script>