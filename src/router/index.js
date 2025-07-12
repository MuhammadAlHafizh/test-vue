import {
    createRouter,
    createWebHistory
} from 'vue-router'
import ShipmentList from '../modules/shipment/ShipmentList.vue'
import ShipmentDetail from '../modules/shipment/ShipmentDetail.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            component: ShipmentList
        },
        {
            path: '/shipment/:id',
            component: ShipmentDetail
        },
    ],
})
