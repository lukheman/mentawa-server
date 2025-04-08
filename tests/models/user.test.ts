import { userGetByEmail } from "../../src/models/model_user"

describe('User', function() {

    it('should return user', async function() {

        const user = await userGetByEmail('akmal@gmail.com')
        console.info(user)

    })

})
