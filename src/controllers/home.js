import sql from '../db/db.js';

async function getAllData() {
    const data = await sql`
    select
        *
    from services
    `;

    return data
}

async function addServiceToDb(service) {
    await sql`
    insert into services
        (service_name, location, business_name)
    values
        (${service.name}, ${service.location}, ${service.business_name})
    `;
}


const homeController = {
    getIndex: async (req, res) => {
        const data = await getAllData();
        res.json({data});
    },

    addService: async (req, res) => {
        const serviceToAdd = req.body;
        console.log(serviceToAdd);
        await addServiceToDb(serviceToAdd);
        res.json('Added service!');
    }
}

export default homeController;