import {
    defineStore
} from 'pinia'
import shipmentsData from '../mock/shipments.json'

export const useShipmentStore = defineStore('shipment', {
    state: () => ({
        shipments: JSON.parse(localStorage.getItem('shipments')) || shipmentsData,
        interval: null,
    }),
    actions: {
        getShipmentById(id) {
            return this.shipments.find((s) => s.id == id)
        },
        updateShipment(id, newData) {
            const index = this.shipments.findIndex((s) => s.id == id)
            if (index !== -1) {
                this.shipments[index] = newData
                localStorage.setItem('shipments', JSON.stringify(this.shipments)) // ✅ Simpan ke localStorage
            }
        },
        startRealTimeUpdates() {
            if (this.interval) return
            this.interval = setInterval(() => {
                const random = Math.floor(Math.random() * this.shipments.length)
                if (this.shipments[random].status === 'Not Assigned') {
                    this.shipments[random].status = 'Assigned'
                } else {
                    this.shipments[random].status = 'Not Assigned'
                }
                localStorage.setItem('shipments', JSON.stringify(this.shipments)) // ✅ Simpan juga update random
            }, 5000)
        },
    },
})
