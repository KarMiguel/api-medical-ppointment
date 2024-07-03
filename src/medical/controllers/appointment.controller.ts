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
  UseGuards,
} from "@nestjs/common";
import { AppointmentService } from "../services/appointment.service";
import { Appointment } from "@prisma/client";
import { AppointmentDto } from "../dtos/appointmentDto.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("Appointments")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/v1/appointments")
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
