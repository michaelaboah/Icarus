import { ObjectType, InputType, Field } from "type-graphql";
import { NetworkPort, PhysicalPort } from "./FieldObjects";
import Power from "./Power";
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

  @Field(() => Power)
  power: Power;
}
