import {
    defineStore
} from 'pinia'
import transportersData from '../mock/transporters.json'

export const useTransporterStore = defineStore('transporter', {
    state: () => ({
        transporters: transportersData,
    }),
})
