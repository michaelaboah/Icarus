import { registerEnumType } from "type-graphql";

export enum Categories {
  CONSOLE,
  PROCESSOR,
  MONITORING,
  SPEAKER,
  AMPLIFIER,
  COMPUTER,
  NETWORK,
  RADIO,
  MICROPHONES,
  SPK_HARDWARE,
  GENERIC,
}

registerEnumType(Categories, {
  name: "Categories",
  description: "Possible category that an Item can be apart of.",
});

export enum SampleRate {
  SD = "44.1 kHz",
  HD = "48 kHz",
  UHD = "96 kHz",
}

registerEnumType(SampleRate, {
  name: "SampleRate",
  description: "Standard sampling rates found within the recording industry",
  valuesConfig: {
    SD: {
      description:
        "Standard-Definition or 44.1kHz Sample Rate. Used for predominately for consumer distrubution. Note: Commonly found in regular CDs.",
    },
    HD: {
      description:
        "High-Definition or 48.0kHz Sample Rate. Used for predominately for professional recording, high quality distrubution and live events. Note: Commonly found in regular Blu-Rays.",
    },
    UHD: {
      description:
        "Ultra-High-Definition or 96.0kHz Sample Rate. Used for predominately for professional recording, high quality distrubution and archival purposes. Note: Commonly found in high-end audio equipment.",
    },
  },
});

export enum MidiType {
  USB,
  SERIAL,
}

registerEnumType(MidiType, {
  name: "MidiType",
  description: "Common types of Midi connection interfaces",
  valuesConfig: {
    USB: {
      description:
        "Connection type found in most newer equipment. *Note: Signal may not be as robust as serial.",
    },
    SERIAL: {
      description:
        "Connection type found in most older / analog equipment. *Note: Conversion is likely necessary for newer equipment.",
    },
  },
});

export enum Analog {
  XLR_ANALOG,
  XLR_DIGITAL,
  TS,
  TRS,
  TRRS,
  TRI_PIN_PHOENIX,
  DUAL_PIN_PHOENIX,
  NL2,
  NL4,
  NL8,
  DC_12V,
}

registerEnumType(Analog, {
  name: "Analog",
  description:
    "Common types of Analog or Copper based connections. *Note: Generally more robust than digital counterparts, but lacks flexibility.",
  valuesConfig: {
    XLR_ANALOG: {
      description:
        "3 pin XLR connection. Most common single direction analog connection.",
    },
    XLR_DIGITAL: {
      description:
        "3 pin XLR connection. A digital connection that uses AES-3 for carrying 2 complete signals. *Note: Lower ohm rating, may not be compatible with XLR_ANALOG.",
    },
    TS: {
      description:
        "Tip-Sleeve Connection. Commonly used for musical instruments. *Note: No ground.",
    },
    TRS: {
      description:
        "Tip-Ring-Sleeve Connection. Commonly used for stereo equipment. *Note: Sleeve is ground.",
    },
    TRRS: {
      description:
        "Tip-Ring-Ring-Sleeve Connection. Commonly used for mobile audio connections. *Note: Sleeve is ground.",
    },
    DC_12V: {
      description:
        "Barrel Connector. Very basic found on lower power devices. Commonly used for recievers.",
    },
  },
});

// Add 4 wire later
export enum PowerConnector {
  IEC,
  EDISON,
  EDISON_20A,
  POWERCON_20A,
  POWERCON_32A,
  POWERCON_TRUE1,
  POWERCON_TRUE1_TOP,
  L6_20,
  L6_30,
  L6_50,
  L6_60,
}

registerEnumType(PowerConnector, {
  name: "PowerConnector",
  description: "Common connector types for power input/output.",
  valuesConfig: {
    IEC: {
      description:
        "Most common general purpose connector for connecting electrical equipment to a powersource. Max voltage: 250V. Max amperage: 16A",
    },
    EDISON: {
      description:
        "Most common general purpose connector to draw electricity from a powersource. Max voltage: 120. Max amperage: 15A",
    },
    EDISON_20A: {
      description:
        "Similar to an EDISON plug, but with a higher max amperage. Max voltage: 120. Max amperage: 20A",
    },
    POWERCON_20A: {
      description:
        "Most common general purpose connector for live electrical connections. Designed for rugged applications. Max voltage: 250V. Max amperage: 20A. *Note: CANNOT be disconnected under live load.",
    },
    POWERCON_32A: {
      description:
        "An extremely robust and reliable locking single phase AC appliance cable connector for high current capacity. Max voltage: 250V. Max amperage: 32A. *Note: CANNOT be disconnected under live load.",
    },
    POWERCON_TRUE1: {
      description:
        "Locking connector for outdoor live electrical connections. Designed for rugged applications. Max voltage: 250V. Max amperage: 20A. *Note: CAN be disconnected under live load.",
    },
    POWERCON_TRUE1_TOP: {
      description:
        "Successor to POWERCON_TRUE1. Designed for rugged, outdoor, live, applications. Max voltage: 250V. Max amperage: 20A. *Note: CAN be disconnected under live load.",
    },
    L6_20: {
      description:
        "High voltage locking connector, the 20 stands for 20 Amps. Max voltage: 250V. *Note: Also known as 3-Wire",
    },
    L6_30: {
      description:
        "High voltage locking connector, the 30 stands for 30 Amps. Max voltage: 250V. *Note: Also known as 3-Wire",
    },
    L6_50: {
      description:
        "High voltage locking connector, the 50 stands for 50 Amps. Max voltage: 250V. *Note: Also known as 3-Wire",
    },
    L6_60: {
      description:
        "High voltage locking connector, the 60 stands for 60 Amps. Max voltage: 250V. *Note: Also known as 3-Wire",
    },
  },
});

export enum Protocol {
  DANTE,
  AES_67,
  AVB,
  AVB_MILAN,
  OPTOCORE,
  ULTRANET,
  IP,
}

registerEnumType(Protocol, {
  name: "Protocol",
  description: "Network based audio protocols and computer connections.",
  valuesConfig: {
    DANTE: {
      description:
        "Most common Audio over IP (AoI) & Audio of Ethernet (AoE) protocol. Packatizes and distributes audio signals across connected devices with low latency. Compatible with any network switch. *Note: Proprietary by Audinate",
    },
    AES_67: {
      description:
        "Technical standard of audio over IP protocol. Packatizes and distributes audio signals across connected devices with low latency. Compatible with any network switch & DANTE devices.",
    },
    AVB: {
      description:
        "Audio-Video-Bridging. Streams audio & video signals across connected devices with low latency. Compatible with selected network switchs. *Note: Open-Source",
    },
    AVB_MILAN: {
      description:
        "AVB Standardized. Streams audio & video signals across connected devices with low latency. Compatible with selected network switchs. *Note: Managed by AVNU Aliance.",
    },
    OPTOCORE: {
      description:
        "Audio over Fiber, networked & P2P systems. Streams audio signals across connected devices with low latency. Compatible with selected Optocore gear. *Note: Proprietary by Optocore.",
    },
    ULTRANET: {
      description:
        "Audio over Ethernet. Streams 16 audio signals across connected devices with low latency. Compatible with selected gear from Music Tribe child companies. *Note: Proprietary by Music Tribe.",
    },
    IP: {
      description:
        "Standard IP connection, for LAN or WAN connections. IPv4 is most commonly used for local networks and is the basis for other IP basesd protocols.",
    },
  },
});

export enum ComputerPorts {
  USB_A,
  USB_B,
  USB_C,
  HDMI,
  MINI_HDMI,
  DISPLAYPORT,
  MINI_DISPLAYPORT,
  MIRCO_B,
  SD_CARD,
  FIREWIRE,
}

registerEnumType(ComputerPorts, {
  name: "Computer Ports",
  description: "An array representation of the ports available on a computer.",
});

export enum NetworkType {
  SWITCH_MANAGED,
  SWITCH_UNMANAGED,
  ROUTER,
  ACCESS_POINT,
  ROUTER_SW_AP,
  INJECTOR,
  MODEM,
  NIC,
  REPEATER,
  NETWORK_BRIDGE,
}

registerEnumType(NetworkType, {
  name: "NetworkType",
  description: "Assignable types for various types of networking equipment",
});

export enum MicrophoneType {
  PRE_POLORAIZED_CONDENSOR,
  CONDENSOR,
  RIBBON,
  DYNAMIC,
}

registerEnumType(MicrophoneType, {
  name: "MicrophoneType",
  description: "The type of micrphone source medium",
});

export enum PolarPattern {
  SUPERCARDIOID,
  CARDIOID,
  OMNI,
  HYPERCARDIOID,
  FIGURE_8,
}

registerEnumType(PolarPattern, {
  name: "PolarPattern",
  description:
    "The signal pickup pattern, multiple patterns can be assigned to multiple microphones",
});

export enum DiaphagmSize {
  SMALL,
  MED,
  LARGE,
}

registerEnumType(DiaphagmSize, {
  name: "DiaphagmSize",
  description: "The size of the input medium",
});

export enum TransmitterConnector {
  SHURE_TA4, //Shure
  MICRODOT, //DPA
  TRRS, //1/8
  TRI_PIN, //sennheiser
}

registerEnumType(TransmitterConnector, {
  name: "TransmitterConnector",
  valuesConfig: {
    SHURE_TA4: {
      description: "Shure's proprietary connector",
    },
    MICRODOT: {
      description: "DPA's proprietary connector",
    },
    TRRS: {
      description: 'Basic 1/8" connector',
    },
    TRI_PIN: {
      description: "Sennheiser's proprietary connector",
    },
  },
});