// src/medical/dtos/create-appointment.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDateString, IsInt } from "class-validator";

export class AppointmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  patientId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  doctorId: number;
}
