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
import { PatientService } from "../services/patient.service";
import { Patient, Prisma } from "@prisma/client";
import { PatientDto } from "../dtos/patientDTO.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("Patients")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("api/v1/patients")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createPatientDto: PatientDto
  ): Promise<Patient> {
    return this.patientService.create(createPatientDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Patient> {
    return this.patientService.findOne(+id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) data: PatientDto
  ): Promise<Patient> {
    return this.patientService.update(+id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<Patient> {
    return this.patientService.delete(+id);
  }
}
