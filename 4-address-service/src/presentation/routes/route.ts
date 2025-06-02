import express from "express";
import { AddressController } from "../../application/controller/AddressController";
import { AddressRepository } from "../../infrastructure/database/repository/AddressRepo";
import { AddressUseCase } from "../../core/useCase/AddressUsecase";

const router = express.Router();

const addressRepository = new AddressRepository();
const addressUsecase = new AddressUseCase(addressRepository);
const addressController = new AddressController(addressUsecase);

router.post("/add-address", addressController.addNewAddress);
