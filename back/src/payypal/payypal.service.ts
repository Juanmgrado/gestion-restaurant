import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrderRequest,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PayPalService {
  private client: Client;
  private ordersController: OrdersController;

  constructor(private configService: ConfigService) {
    this.client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: this.configService.get<string>("PAYPAL_CLIENT_ID"),
        oAuthClientSecret: this.configService.get<string>("PAYPAL_CLIENT_SECRET"),
      },
      environment: Environment.Sandbox,
      logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
      },
    });

    this.ordersController = new OrdersController(this.client);
  }

  async createOrder(): Promise<any> {
    // Asegúrate de que la estructura sea correcta según `OrderRequest`
    const requestBody: OrderRequest = {
      intent: CheckoutPaymentIntent.Capture, // Usamos el enum de PayPal
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: "5", // Monto de la compra
          },
        },
      ],
      applicationContext: {
        returnUrl: "http://localhost:3000/success", // URL de retorno en caso de éxito
        cancelUrl: "http://localhost:3000/cancel",  // URL de cancelación
      },
    };

    try {
      // Llamamos al método `ordersCreate` para crear la orden
      const response = await this.ordersController.ordersCreate({
        body: requestBody,  // Pasamos el cuerpo con el tipo adecuado
        prefer: "return=minimal",  // Preferencia de respuesta
      });

      // Retornamos la respuesta obtenida de PayPal
      return response.body;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  async captureOrder(orderId: string): Promise<any> {
    try {
      const { body } = await this.ordersController.ordersCapture({
        id: orderId,
        prefer: "return=minimal",
      });

      return body; // Retorna el body directamente
    } catch (error) {
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}
