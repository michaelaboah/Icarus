import { createUnionType, registerEnumType } from "type-graphql";
import { Equipment } from "./Equipment";
import { ConsoleItem } from "./ConsoleItem";

export enum SampleRate {
  SD = "44.1 kHz",
  HD = "48 kHz",
  UHD = "96 kHz",
}

registerEnumType(SampleRate, {
  name: "SampleRate",
  description: "Standard sampling rates found within the recording industry",
});

export enum MidiType {
  USB,
  SERIAL,
}

registerEnumType(MidiType, {
  name: "MidiType",
  description: "Common types of Midi connection interfaces",
});

export enum Analog {
  XLR_ANALOG,
  XLR_DIGITAL,
  TS,
  TRS,
  TRRS,
}

registerEnumType(Analog, {
  name: "Analog",
  description: "Common types of Analog or Copper based connections.",
});

export enum RJ45 {
  DANTE,
  AVB,
  AVB_MILAN,
  AES67,
  ULTRANET,
}

export enum Protocol {
  DANTE,
  AES_67,
  AVB,
  AVB_MILAN,
  OPTOCORE,
  ULTRANET,
}

registerEnumType(Protocol, {
  name: "Protocol",
  description: "Network based audio protocols.",
});

export const ItemResult = createUnionType({
  name: "ItemResult",
  types: () => [ConsoleItem, Equipment] as const,
  resolveType: (value) => {
    if (typeof value === typeof ConsoleItem) {
      return ConsoleItem;
    }
    return undefined;
  },
});
