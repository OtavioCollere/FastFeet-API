import { RegisterRecipientUseCase } from "@/domain/store/application/use-cases/recipients/register-recipient";
import { Module } from "@nestjs/common";
import { RegisterRecipientController } from "./controllers/recipients/register-recipient.controller";
import { GetRecipientUseCase } from "@/domain/store/application/use-cases/recipients/get-recipient";
import { GetRecipientController } from "./controllers/recipients/get-recipient.controller";
import { DatabaseModule } from "../database/database.module";
import { DeleteRecipientUseCase } from "@/domain/store/application/use-cases/recipients/delete-recipient";
import { UpdateRecipientUseCase } from "@/domain/store/application/use-cases/recipients/update-recipient";
import { DeleteRecipientController } from "./controllers/recipients/delete-recipient.controller";
import { UpdateRecipientController } from "./controllers/recipients/update-recipient.controller";
import { CompleteDeliveryController } from "./controllers/orders/complete-delivery.controller";
import { CreateOrderController } from "./controllers/orders/create-order.controller";
import { DeleteOrderController } from "./controllers/orders/delete-order.controller";
import { GetOrderController } from "./controllers/orders/get-order.controller";
import { PickUpOrderController } from "./controllers/orders/pickup-order.controller";
import { ReturnOrderController } from "./controllers/orders/return-order.controller";
import { CompleteDeliveryUseCase } from "@/domain/store/application/use-cases/orders/complete-delivery";
import { CreateOrderUseCase } from "@/domain/store/application/use-cases/orders/create-order";
import { DeleteOrderUseCase } from "@/domain/store/application/use-cases/orders/delete-order";
import { GetOrderUseCase } from "@/domain/store/application/use-cases/orders/get-order";
import { PickupOrderUseCase } from "@/domain/store/application/use-cases/orders/pickup-order";
import { ReturnOrderUseCase } from "@/domain/store/application/use-cases/orders/return-order";
import { UpdateOrderUseCase } from "@/domain/store/application/use-cases/orders/update-order";
import { RegisterUserUseCase } from "@/domain/store/application/use-cases/users/register-user";
import { AuthenticateUserUseCase } from "@/domain/store/application/use-cases/users/authenticate-user";


@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    RegisterRecipientController,
    GetRecipientController,
    DeleteRecipientController,
    UpdateRecipientController,

    CompleteDeliveryController,
    CreateOrderController,
    DeleteOrderController,
    GetOrderController,
    PickUpOrderController,
    ReturnOrderController,

  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,

    RegisterRecipientUseCase,
    GetRecipientUseCase,
    DeleteRecipientUseCase,
    UpdateRecipientUseCase,

    CompleteDeliveryUseCase,
    CreateOrderUseCase,
    DeleteOrderUseCase,
    GetOrderUseCase,
    PickupOrderUseCase,
    ReturnOrderUseCase,
    UpdateOrderUseCase
  ]
})
export class HttpModule{}