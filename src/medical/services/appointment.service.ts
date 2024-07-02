// src/medical/services/appointment.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Appointment, Prisma } from "@prisma/client";
import { AppointmentDto } from "../dtos/appointmentDto.dto";

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Appointment[]> {
    return this.prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
  }

  async create(data: AppointmentDto): Promise<Appointment> {
    try {
      return this.prisma.appointment.create({
        data: {
          date: data.date,
          patient: {
            connect: { id: data.patientId },
          },
          doctor: {
            connect: { id: data.doctorId },
          },
        },
        include: {
          patient: true,
          doctor: true,
        },
      });
    } catch (error) {
      throw new BadRequestException("Failed to create appointment");
    }
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(id: number, data: AppointmentDto): Promise<Appointment> {
    await this.findOne(id);
    try {
      return this.prisma.appointment.update({
        where: { id },
        data: {
          date: data.date,
          patient: {
            connect: { id: data.patientId },
          },
          doctor: {
            connect: { id: data.doctorId },
          },
        },
        include: {
          patient: true,
          doctor: true,
        },
      });
    } catch (error) {
      throw new BadRequestException("Failed to update appointment");
    }
  }

  async delete(id: number): Promise<Appointment> {
    await this.findOne(id);
    try {
      return this.prisma.appointment.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException("Failed to delete appointment");
    }
  }
}
