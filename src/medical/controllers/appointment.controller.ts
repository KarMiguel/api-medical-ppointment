// src/medical/controllers/appointment.controller.ts

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
import { AppointmentService } from "../services/appointment.service";
import { Appointment } from "@prisma/client";
import { AppointmentDto } from "../dtos/appointmentDto.dto";

@Controller("appointments")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Post()
  create(
    @Body(new ValidationPipe()) data: AppointmentDto
  ): Promise<Appointment> {
    return this.appointmentService.create(data);
  }
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) data: AppointmentDto
  ): Promise<Appointment> {
    return this.appointmentService.update(+id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<Appointment> {
    return this.appointmentService.delete(+id);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Appointment> {
    return this.appointmentService.findOne(+id);
  }
}
