import { ObjectType, InputType, Field } from "type-graphql";
import { NetworkPort, PhysicalPort } from "./FieldObjects";
import { IElectrical } from "./IElectrical";
import { TransmitterConnector } from "./ItemEnums";

@ObjectType()
@InputType("TransmitterInput")
export class Transmitter {
  @Field(() => TransmitterConnector)
  connector: TransmitterConnector;
}

@ObjectType()
@InputType("RecieverInput")
export class Reciever {
  @Field(() => [NetworkPort])
  network_ports: NetworkPort[];

  @Field(() => [PhysicalPort])
  physical_ports: PhysicalPort[];

  @Field(() => Boolean)
  cascade_antenna: boolean;

  @Field(() => IElectrical)
  power: IElectrical;
}
