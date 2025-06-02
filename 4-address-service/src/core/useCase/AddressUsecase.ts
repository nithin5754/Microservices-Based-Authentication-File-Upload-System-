import axios from "axios";
import { AddressRepository } from "../../infrastructure/database/repository/AddressRepo";
import { IAddress } from "../../types/IAddress";

class AddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async addAddress({
    userId,
    state,
    postal_code,
    city,
    other,
  }: {
    userId: string;
    postal_code: string;
    city: string;
    other: string;
    state: string;
  }): Promise<{ success: boolean; data: IAddress | null }> {
    const existUser = await axios.get(
      `${process.env.API_GATEWAY as string}/auth/user/${userId}`
    );

    console.log("exist user", existUser);

    if (!existUser.data) {
      return { success: false, data: null };
    }
    console.log("user data from the file repo", existUser.data);

    const result: IAddress | null = await this.addressRepository.addAddress({
      city,
      other,
      postal_code,
      state,
      userId,
    });

    return { success: true, data: result };
  }
}

export {AddressUseCase}
