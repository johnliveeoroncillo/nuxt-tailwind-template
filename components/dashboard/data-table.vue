<template>
    <templates-pagination-table :data.sync="paginationData" />
</template>

<script setup lang="ts">
interface Data {
    invoice: string;
    paymentStatus: string;
    totalAmount: string;
    paymentMethod: string;
}

const paginationData = reactive<Pagination<Data>>({
    pagination: {
        page: 1,
        max_page: 2,
        total_rows: 5,
        limit: 2
    },
    columns: [
        {
            key: 'invoice',
            label: 'Invoice',
            sort: true,
        },
        {
            key: 'paymentStatus',
            label: 'Payment Status',
            class: '',
        },
        {
            key: 'totalAmount',
            label: 'Total Amount',
            class: '',
        },
        {
            key: 'paymentMethod',
            label: 'Payment Method',
            class: '',
        },
    ],
    data: [
        {
            invoice: 'INV001',
            paymentStatus: 'Paid',
            totalAmount: '$250.00',
            paymentMethod: 'Credit Card',
        },
        {
            invoice: 'INV002',
            paymentStatus: 'Pending',
            totalAmount: '$150.00',
            paymentMethod: 'PayPal',
        },
        {
            invoice: 'INV003',
            paymentStatus: 'Unpaid',
            totalAmount: '$350.00',
            paymentMethod: 'Bank Transfer',
        },
        {
            invoice: 'INV004',
            paymentStatus: 'Paid',
            totalAmount: '$450.00',
            paymentMethod: 'Credit Card',
        },
        {
            invoice: 'INV005',
            paymentStatus: 'Paid',
            totalAmount: '$550.00',
            paymentMethod: 'PayPal',
        },
    ]
})
</script>