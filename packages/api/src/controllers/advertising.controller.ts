import { AdvertisingService } from '@services';
import { Request, Response } from 'express';

export class AdvertisingController {

  constructor(private readonly service: AdvertisingService) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.list = this.list.bind(this);
    this.rate = this.rate.bind(this);
  }

  async create(req: Request, res: Response) {
    const { price, title, description, imageUrl } = req.body;
    if (!title) res.status(400).json({ message: 'Title is required' });
    if (!price) res.status(400).json({ message: 'Price is required' });
    if (isNaN(price)) res.status(400).json({ message: 'Price is invalid' });
    if (!imageUrl) res.status(400).json({ message: 'Image is required' });

    const advertisingData = { price, title, description, imageUrl };
    const advertising = await this.service.create(req.user.id, advertisingData);
    res.status(200).json(advertising);
  }

  async update(req: Request, res: Response) {
    const { price, title, description, imageUrl } = req.body;
    if (!title) res.status(400).json({ message: 'Title is required' });
    if (!price) res.status(400).json({ message: 'Price is required' });
    if (isNaN(price)) res.status(400).json({ message: 'Price is invalid' });
    if (!imageUrl) res.status(400).json({ message: 'Image is required' });

    const advertisingData = { price, title, description, imageUrl };
    const advertising = await this.service.update(req.user.id, req.params.id, advertisingData);
    res.status(200).json(advertising);
  }

  async delete(req: Request, res: Response) {
    await this.service.delete(req.user.id, req.params.id);
    res.status(200).json();
  }

  async list(req: Request, res: Response) {
    const advertisingList = await this.service.get(req.params?.id);
    res.status(200).json(advertisingList);
  }

  async rate(req: Request, res: Response) {
    const { rating } = req.body;
    if (!rating) res.status(400).json({ message: 'Rating is required' });
    if (isNaN(rating)) res.status(400).json({ message: 'Rating is invalid' });

    await this.service.rate(req.params.id, rating);
    res.status(200).json();
  }
}