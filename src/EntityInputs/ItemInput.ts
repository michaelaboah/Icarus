import { InputType, Field } from "type-graphql";
import { ConsoleItem } from "../entities/categories/ConsoleItem";
import { ProcessorInput } from "./ProcessorInput";
import { ConsoleInput } from "./ConsoleInput";
import { Categories } from "../EntityAbstractions/ItemEnums";
import { AmplifierInput } from "./AmplifierInput";
import { AmplifierItem } from "../entities/categories/AmplifierItem";
import { ProcessingItem } from "../entities/categories/ProcessingItem";
import { ComputerItem } from "../entities/categories/ComputerItem";
import { ComputerInput } from "./ComputerInput";
import NetworkInput from "./NetworkInput";
import NetworkItem from "../entities/categories/NetworkItem";
import { MicrophoneInput } from "./MicrophoneInput";
import { MicrophoneItem } from "../entities/categories/MicrophoneItem";
import { RFItemInput } from "./RFItemInput";
import { RFItem } from "../entities/categories/RFItem";
import { SpeakerInput } from "./SpeakerInput";
import { SpeakerItem } from "../entities/categories/SpeakerItem";
import MonitoringItem from "../entities/categories/MonitoringItem";
import MonitoringInput from "./MonitoringInput";

@InputType()
export class ItemInput {
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

  @Field(() => AmplifierInput, { nullable: true })
  amplifier?: AmplifierItem;

  @Field(() => ConsoleInput, { nullable: true })
  console?: ConsoleItem;

  @Field(() => ComputerInput, { nullable: true })
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

  @Field(() => ComputerInput, { nullable: true })
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

  @Field(() => [String], { nullable: true })
  notes?: string[];
}
