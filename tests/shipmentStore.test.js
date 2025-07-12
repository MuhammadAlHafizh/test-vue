import {
    describe,
    it,
    expect,
    beforeEach
} from 'vitest'
import {
    setActivePinia,
    createPinia
} from 'pinia'
import {
    useShipmentStore
} from '../src/stores/shipmentStore'

describe('shipmentStore', () => {
    let store

    beforeEach(() => {
        setActivePinia(createPinia())
        store = useShipmentStore()
    })

    it('should update shipment status & transporterId', () => {
        const old = store.getShipmentById(1)
        expect(old.status).toBe('Not Assigned')

        store.updateShipment(1, {
            ...old,
            transporterId: 99,
            status: 'Assigned',
        })

        const updated = store.getShipmentById(1)
        expect(updated.status).toBe('Assigned')
        expect(updated.transporterId).toBe(99)
    })
})
