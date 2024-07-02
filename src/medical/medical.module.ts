// src/medical/medical.module.ts
import { Module } from '@nestjs/common';
import { PatientController } from './controllers/patient.controller';
import { DoctorController } from './controllers/doctor.controller';
import { AppointmentController } from './controllers/appointment.controller';
import { PatientService } from './services/patient.service';
import { AppointmentService } from './services/appointment.service';
import { PrismaService } from 'src/prisma.service';
import { DoctorService } from './services/doctor.service';

@Module({
  imports: [],
  controllers: [PatientController, DoctorController, AppointmentController],
  providers: [PrismaService, PatientService, DoctorService, AppointmentService],
})
export class MedicalModule {}
