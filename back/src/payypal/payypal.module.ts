import { Module } from "@nestjs/common";
import { PayPalService } from "./payypal.service";
import { PayPalController } from "./payypal.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [PayPalService],
  controllers: [PayPalController],
})
export class PayPalModule {}
