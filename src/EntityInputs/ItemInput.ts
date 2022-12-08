import { InputType, Field } from "type-graphql";
import AmplifierItem from "../entities/categories/AmplifierItem";
import ComputerItem from "../entities/categories/ComputerItem";
import ConsoleItem from "../entities/categories/ConsoleItem";
import MicrophoneItem from "../entities/categories/MicrophoneItem";
import MonitoringItem from "../entities/categories/MonitoringItem";
import NetworkItem from "../entities/categories/NetworkItem";
import ProcessingItem from "../entities/categories/ProcessingItem";
import RFItem from "../entities/categories/RFItem";
import { SpeakerItem } from "../entities/categories/SpeakerItem";
import { Dimension } from "../EntityAbstractions/FieldObjects";
import { Categories } from "../EntityAbstractions/ItemEnums";
import AmplifierInput from "./AmplifierInput";
// import ComputerInput from "./ComputerInput";
import ConsoleInput from "./ConsoleInput";
import MicrophoneInput from "./MicrophoneInput";
import MonitoringInput from "./MonitoringInput";
import NetworkInput from "./NetworkInput";
import ProcessorInput from "./ProcessorInput";
import RFItemInput from "./RFItemInput";
import SpeakerInput from "./SpeakerInput";

@InputType()
export default class ItemInput {
  @Field(() => Categories)
  category: Categories;

  @Field()
  model: string;

  @Field()
  manufacturer: string;

  @Field(() => String)
  publicNotes: string;

  @Field(() => Number)
  cost: number;

  @Field({ nullable: true })
  weight: number;

  @Field({ nullable: true })
  searchModel?: string;

  @Field(() => AmplifierItem, { nullable: true })
  amplifier?: AmplifierItem;

  @Field(() => ConsoleItem, { nullable: true })
  console?: ConsoleItem;

  @Field(() => ComputerItem, { nullable: true })
  computer?: ComputerItem;

  @Field(() => ProcessingItem, { nullable: true })
  processor?: ProcessingItem;

  @Field(() => NetworkItem, { nullable: true })
  network_item?: NetworkItem;

  @Field(() => MicrophoneItem, { nullable: true })
  microphone?: MicrophoneItem;

  @Field(() => RFItem, { nullable: true })
  rf_item?: RFItem;

  @Field(() => SpeakerItem, { nullable: true })
  speaker_item?: SpeakerItem;

  @Field(() => MonitoringItem, { nullable: true })
  monitoring_item?: MonitoringItem;

  @Field(() => Dimension, { nullable: true })
  dimensions?: Dimension;

  @Field(() => [String], { nullable: true })
  notes?: string[];
}

@InputType()
export class ItemInputEdit {
  @Field(() => Categories)
  category?: Categories;

  @Field()
  model?: string;

  @Field()
  manufacturer?: string;

  @Field(() => String)
  publicNotes?: string;

  @Field(() => Number)
  cost?: number;

  @Field({ nullable: true })
  weight?: number;

  @Field({ nullable: true })
  searchModel?: string;

  @Field(() => AmplifierInput, { nullable: true })
  amplifier?: AmplifierItem;

  @Field(() => ConsoleInput, { nullable: true })
  console?: ConsoleItem;

  @Field(() => ComputerItem, { nullable: true })
  computer?: ComputerItem;

  @Field(() => ProcessorInput, { nullable: true })
  processor?: ProcessingItem;

  @Field(() => NetworkInput, { nullable: true })
  network_item?: NetworkItem;

  @Field(() => MicrophoneInput, { nullable: true })
  microphone?: MicrophoneItem;

  @Field(() => RFItemInput, { nullable: true })
  rf_item?: RFItem;

  @Field(() => SpeakerInput, { nullable: true })
  speaker_item?: SpeakerItem;

  @Field(() => MonitoringInput, { nullable: true })
  monitoring_item?: MonitoringItem;

  @Field(() => Dimension, { nullable: true })
  dimensions?: Dimension;

  @Field(() => [String], { nullable: true })
  notes?: string[];
}
