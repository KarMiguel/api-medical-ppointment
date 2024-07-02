import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MedicalModule } from "./medical/medical.module";

@Module({
  imports: [MedicalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
