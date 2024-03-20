import sql from '../db/db.js';
import path from 'path';

async function getAllData() {
    const data = await sql`
    select
        *
    from services
    `;

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

async function editServiceInDb(service) {
    await sql`
    update services set
        service_name = ${service.name},
        cost = ${service.cost},
        location = ${service.location},
        business_name = ${service.business_name},
        booking_url = ${service.booking_url},
        booking_name = ${service.booking_name},
        rating = ${service.rating}
    `
}


const homeController = {

    getServices: async (req, res) => {
        const data = await getAllData();
        res.json(data);
    },

    addService: async (req, res) => {
        const serviceToAdd = req.body;
        console.log(serviceToAdd);
        await addServiceToDb(serviceToAdd);
        res.json('Added service!');
    }
}

export default homeController;