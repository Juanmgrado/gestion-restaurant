import { Module } from "@nestjs/common";
import { PayPalController } from "./payypal.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [],
  controllers: [PayPalController],
})
export class PayPalModule {}
