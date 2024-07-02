// src/medical/controllers/doctor.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { DoctorService } from "../services/doctor.service";
import { Doctor, Prisma } from "@prisma/client";
import { DoctorDto } from "../dtos/doctorDto.dto";

@Controller("doctors")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }


  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Doctor> {
    return this.doctorService.findOne(+id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) data: DoctorDto): Promise<Doctor> {
    return this.doctorService.create(data);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) data: DoctorDto
  ): Promise<Doctor> {
    return this.doctorService.update(+id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<Doctor> {
    return this.doctorService.delete(+id);
  }
}
