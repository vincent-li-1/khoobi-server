import sql from '../db/db.js';

async function addInterestedUserToDb(interestedUser) {
    await sql`
    insert into interested_users
        (
            firstname,
            email
        )
    values
        (
            ${interestedUser.firstName}, 
            ${interestedUser.email}
        )
    `;
}


const serviceController = {
    submitInterest: async (req, res) => {
        const interestedUser = {
            firstName: req.body.firstName,
            email: req.body.email
        }
        try {
            await addInterestedUserToDb(interestedUser);
            res.status(200);
            return res.json('Interest submitted');
        }
        catch (err) {
            res.status(400).send(err)
        }

    }
}

export default serviceController;