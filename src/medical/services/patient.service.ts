import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Patient, Prisma } from "@prisma/client";
import { PatientDto } from "../dtos/patient.dto";

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async create(data: PatientDto): Promise<Patient> {
    try {
      return this.prisma.patient.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException("Failed to create patient");
    }
  }

  async update(id: number, data: PatientDto): Promise<Patient> {
    await this.findOne(id);
    try {
      return this.prisma.patient.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException("Failed to update patient");
    }
  }
  async delete(id: number): Promise<Patient> {
    await this.findOne(id);
    try {
      return this.prisma.patient.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException("Failed to delete patient");
    }
  }
}
