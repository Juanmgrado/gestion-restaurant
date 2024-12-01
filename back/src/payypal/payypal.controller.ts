import { Controller, Post, Body, Param } from "@nestjs/common";
import { PayPalService } from "./payypal.service";

@Controller('paypal')
export class PayPalController {
  constructor(private readonly payPalService: PayPalService) {}

  @Post('orders')
  async createOrder() {
    return this.payPalService.createOrder();
  }

  @Post('orders/:orderId/capture')
  async captureOrder(@Param('orderId') orderId: string) {
    return this.payPalService.captureOrder(orderId);
  }
}
