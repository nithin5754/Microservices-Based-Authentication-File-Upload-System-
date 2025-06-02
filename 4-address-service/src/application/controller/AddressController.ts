import { Request, Response } from "express";
import { AddressUseCase } from "../../core/useCase/AddressUsecase";

class AddressController {
  constructor(private readonly addressUsecase: AddressUseCase) {
    this.addNewAddress = this.addNewAddress.bind(this);
  }

  async addNewAddress(req: Request, res: Response): Promise<void> {
    const { userId, city, state, postal_code, other } = req.body;

    try {
      if (!userId || !city || !postal_code || !state) {
        res.status(404).json({ sucess: false, data: "credentials missing" });
        return;
      }

      let result = await this.addressUsecase.addAddress({
        userId,
        city,
        other,
        postal_code,
        state,
      });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ status: false, data: error });
      return;
    }
  }
}

export { AddressController };
