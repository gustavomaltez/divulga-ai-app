import { AuthenticationService } from '@services';
import { Request, Response } from 'express';

export class AuthenticationController {

  constructor(private readonly service: AuthenticationService) {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response) {
    const data = await this.service.register(req.body);
    res.status(200).json(data);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await this.service.login(email, password);
    res.status(200).json(data);
  }
}