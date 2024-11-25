import {Request, Response} from 'express'
import { RefreshtokenUser } from '../../Services/RefreshToken/RefreshTokenServices';

class RefreshtokenController{
 async handle(request: Request, response: Response){
    const {token_refresh} = request.body
    const refreshtokenController = new RefreshtokenUser();
    const token = await refreshtokenController.refreshtoken(token_refresh);
    return response.json(token)
 }

}
export {RefreshtokenController}