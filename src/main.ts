import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Medical Appointment")
    .setDescription("The  API description")
    .setVersion("1.0")
    .addTag("Auth", "Operações relacionadas à autenticação")
    .addTag("Doctors", "Operações relacionadas aos médicos")
    .addTag("Patients", "Operações relacionadas aos pacientes")
    .addTag("Appointments", "Operações relacionadas aos agendamentos")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}
bootstrap();
