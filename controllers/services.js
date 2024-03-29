import sql from '../db/db.js';

async function getData(serviceType, locations) {
    const data = await sql`SELECT * FROM services WHERE service_name=${serviceType} AND location IN ${ sql(locations) } ORDER BY cost ASC`;
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

async function getTagsInDb(serviceId) {
    let tagIds = await sql`SELECT tagId FROM tagsxservices WHERE serviceId=${serviceId}`
    tagIds = tagIds.map(entry => entry.tagid);
    const tags = await sql`SELECT tag FROM tags WHERE id IN ${ sql(tagIds) }`
    return tags.map(resObject => resObject.tag);
}

async function getLocationsInDb() {
    let locations = await sql`SELECT location from services ORDER BY location asc`;
    return locations.map(entry => entry.location).filter((location, index, array) => {
       return array.indexOf(location) === index;
    }).sort();
}

const serviceController = {
    getServices: async (req, res) => {
        const serviceType = req.params.service.toLowerCase();
        const locations = req.params.locations.toLowerCase().split(',');
        const services = await getData(serviceType, locations);
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
    },

    getTags: async (req, res) => {
        const tags = await getTagsInDb(req.params.serviceId);
        res.json(tags);
    },

    getLocations: async (req, res) => {
        const locations = await getLocationsInDb();
        res.json(locations);
    }
}

export default serviceController;