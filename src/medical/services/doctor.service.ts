import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Doctor, Prisma } from "@prisma/client";
import { DoctorDto } from "../dtos/doctorDto.dto";

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany();
  }

  async create(data: Prisma.DoctorCreateInput): Promise<Doctor> {
    try {
      return this.prisma.doctor.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException("Failed to create doctor");
    }
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(id);
    }
    return doctor;
  }

  async update(id: number, data: DoctorDto): Promise<Doctor> {
    await this.findOne(id);
    try {
      return this.prisma.doctor.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException("Failed to update doctor");
    }
  }

  async delete(id: number): Promise<Doctor> {
    await this.findOne(id);
    try {
      return this.prisma.doctor.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException("Failed to delete doctor");
    }
  }
}
