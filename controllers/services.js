import sql from '../db/db.js';
import path from 'path';

async function getData(serviceType, location) {
    const data = await sql`SELECT * FROM services WHERE service_name=${serviceType} AND location=${location}`;

    return data;
}

async function addServiceToDb(service) {
    await sql`
    insert into services
        (
            service_name, 
            cost, 
            location, 
            business_name,
            booking_url,
            booking_name,
            rating
        )
    values
        (
            ${service.name}, 
            ${service.cost},
            ${service.location}, 
            ${service.business_name},
            ${service.booking_url},
            ${service.booking_name},
            ${service.rating}
        )
    `;
}

async function editServiceInDb(serviceId, service) {
    await sql`
    update services set
        service_name = ${service.name},
        cost = ${service.cost},
        location = ${service.location},
        business_name = ${service.business_name},
        booking_url = ${service.booking_url},
        booking_name = ${service.booking_name},
        rating = ${service.rating}
    where
        id = ${serviceId}
    `;
}

async function deleteServiceInDb(serviceId) {
    await sql`
    delete from services where
        id = ${serviceId}
    `;
}

const serviceController = {

    getServices: async (req, res) => {
        console.log('Getting');
        const serviceType = req.params.service.toLowerCase();
        const location = req.params.location.toLowerCase();
        const services = await getData(serviceType, location);
        res.json(services);
    },

    addService: async (req, res) => {
        const serviceToAdd = req.body;
        serviceToAdd.name = serviceToAdd.name.toLowerCase();
        serviceToAdd.location = serviceToAdd.location.toLowerCase();
        await addServiceToDb(serviceToAdd);
        res.json('Added service!');
    },

    editService: async (req, res) => {
        const serviceToEdit = req.body;
        await editServiceInDb(req.params.id, serviceToEdit);
        res.json('Edited service!');
    },

    deleteService: async (req, res) => {
        await deleteServiceInDb(req.params.id);
        res.json('Deleted service!');
    }
}

export default serviceController;