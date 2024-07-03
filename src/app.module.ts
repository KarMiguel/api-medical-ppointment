import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MedicalModule } from "./medical/medical.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [MedicalModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
