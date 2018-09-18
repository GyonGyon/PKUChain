import { abi, address } from './bitmonkeyCompiled'
import nervos, {transaction} from '../config/nervos'

const bitmonkeyContract = new nervos.appchain.Contract(abi, address)

export { transaction, bitmonkeyContract }
