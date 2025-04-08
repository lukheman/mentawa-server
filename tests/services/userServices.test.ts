import { userRegister, userTokenValidation } from "../../src/services/userServices"
import { userGetByMachineId, userGetByEmail, userAdd } from '../../src/models/model_user'
import { StatusType } from "../../src/types"

// craete mock
jest.mock('../../src/models/model_user')

describe('User Registration', () => {

    // clear mock
    beforeEach(() => {
        jest.clearAllMocks()
    })


    it('should detect existing email', async () => {

        (userGetByEmail as jest.Mock).mockResolvedValue({ email: 'test@test.com' })

        const result = await userRegister('akmal', 'test@test.com', 'password123', 'machineid123')

        expect(result).toEqual({
            status: StatusType.ERROR,
            message: 'email already exist'
        })

    })

    it('should detect existing machineId', async () => {

        // simulation if email does't exist
        (userGetByEmail as jest.Mock).mockResolvedValue(null);

        (userGetByMachineId as jest.Mock).mockResolvedValue({ machineId: 'machineid123' });

        const result = await userRegister('akmal', 'test@test.com', 'password123', 'machineid123')

        expect(result).toEqual({
            status: StatusType.ERROR,
            message: 'machineId already exist'
        })

    })

    it('should successfully registered', async () => {

        // simulation if email does't exist
        (userGetByEmail as jest.Mock).mockResolvedValue(null);

        // simulation if machineId does't exist
        (userGetByMachineId as jest.Mock).mockResolvedValue(null);

        const result = await userRegister('akmal', 'test@test.com', 'password123', 'machineid123')

        expect(result).toEqual({
            status: StatusType.SUCCESS,
            message: 'user successfully registered',
        })

    })

})

describe('User Token Validation', () => {

    it('should machineId is not registered', async () => {

        (userGetByMachineId as jest.Mock).mockResolvedValue(null)

        const result = await userTokenValidation('test@test.com', 'machineid123', 'token123')

        expect(result).toEqual({
            status: StatusType.ERROR,
            message: 'machineId is not registered'
        })

    })

    it('should user successfully validated', async () => {

        (userGetByMachineId as jest.Mock).mockResolvedValue({
            token: 'token123',
            email: 'test@test.com'
        })

        const result = await userTokenValidation('test@test.com', 'machineid123', 'token123')

        expect(result).toEqual({
            status: StatusType.SUCCESS,
            message: 'user validated'
        })

    })

    it('should email or user is invalid', async () => {

        (userGetByMachineId as jest.Mock).mockResolvedValue({
            token: 'token123',
            email: 'test@test.com'
        })

        const result = await userTokenValidation('est@test.com', 'machineid123', 'token123')

        expect(result).toEqual({
            status: StatusType.ERROR,
            message: 'email or token is invalid'
        })

    })

})
