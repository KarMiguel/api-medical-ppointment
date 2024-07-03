// src/medical/medical.module.ts
import { Module } from "@nestjs/common";
import { PatientController } from "./controllers/patient.controller";
import { DoctorController } from "./controllers/doctor.controller";
import { AppointmentController } from "./controllers/appointment.controller";
import { PatientService } from "./services/patient.service";
import { AppointmentService } from "./services/appointment.service";
import { PrismaService } from "src/prisma.service";
import { DoctorService } from "./services/doctor.service";
import { UserService } from "./services/user.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  controllers: [PatientController, DoctorController, AppointmentController],
  providers: [
    PrismaService,
    PatientService,
    DoctorService,
    AppointmentService,
    UserService,
  ],
})
export class MedicalModule {}
