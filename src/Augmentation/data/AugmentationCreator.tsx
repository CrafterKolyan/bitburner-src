import { Augmentation, IConstructorParams } from "../Augmentation";
import { AugmentationNames } from "./AugmentationNames";
import { Player } from "@player";
import { CompletedProgramName } from "../../Programs/Programs";
import { WHRNG } from "../../Casino/RNG";
import React from "react";
import { FactionNames } from "../../Faction/data/FactionNames";
import { CONSTANTS } from "../../Constants";

interface CircadianBonus {
  bonuses: {
    [key: string]: number | undefined;
    agility?: number;
    agility_exp?: number;
    charisma?: number;
    charisma_exp?: number;
    company_rep?: number;
    crime_money?: number;
    crime_success?: number;
    defense?: number;
    defense_exp?: number;
    dexterity?: number;
    dexterity_exp?: number;
    faction_rep?: number;
    hacking?: number;
    hacking_chance?: number;
    hacking_exp?: number;
    hacking_grow?: number;
    hacking_money?: number;
    hacking_speed?: number;
    hacknet_node_core_cost?: number;
    hacknet_node_level_cost?: number;
    hacknet_node_money?: number;
    hacknet_node_purchase_cost?: number;
    hacknet_node_ram_cost?: number;
    strength?: number;
    strength_exp?: number;
    work_money?: number;
  };
  description: string;
}

function getRandomBonus(): CircadianBonus {
  const bonuses = [
    {
      bonuses: {
        hacking_chance: 1.25,
        hacking_speed: 1.1,
        hacking_money: 1.25,
        hacking_grow: 1.1,
      },
      description:
        "Increases the player's hacking chance by 25%.<br>" +
        "Increases the player's hacking speed by 10%.<br>" +
        "Increases the amount of money the player's gains from hacking by 25%.<br>" +
        "Improves grow() by 10%.",
    },
    {
      bonuses: {
        hacking: 1.15,
        hacking_exp: 2,
      },
      description:
        "Increases the player's hacking skill by 15%.<br>" +
        "Increases the player's hacking experience gain rate by 100%.",
    },
    {
      bonuses: {
        strength: 1.25,
        strength_exp: 2,
        defense: 1.25,
        defense_exp: 2,
        dexterity: 1.25,
        dexterity_exp: 2,
        agility: 1.25,
        agility_exp: 2,
      },
      description:
        "Increases all of the player's combat stats by 25%.<br>" +
        "Increases all of the player's combat stat experience gain rate by 100%.",
    },
    {
      bonuses: {
        charisma: 1.5,
        charisma_exp: 2,
      },
      description:
        "This augmentation increases the player's charisma by 50%.<br>" +
        "Increases the player's charisma experience gain rate by 100%.",
    },
    {
      bonuses: {
        hacknet_node_money: 1.2,
        hacknet_node_purchase_cost: 0.85,
        hacknet_node_ram_cost: 0.85,
        hacknet_node_core_cost: 0.85,
        hacknet_node_level_cost: 0.85,
      },
      description:
        "Increases the amount of money produced by Hacknet Nodes by 20%.<br>" +
        "Decreases all costs related to Hacknet Node by 15%.",
    },
    {
      bonuses: {
        company_rep: 1.25,
        faction_rep: 1.15,
        work_money: 1.7,
      },
      description:
        "Increases the amount of money the player gains from working by 70%.<br>" +
        "Increases the amount of reputation the player gains when working for a company by 25%.<br>" +
        "Increases the amount of reputation the player gains for a faction by 15%.",
    },
    {
      bonuses: {
        crime_success: 2,
        crime_money: 2,
      },
      description:
        "Increases the player's crime success rate by 100%.<br>" +
        "Increases the amount of money the player gains from crimes by 100%.",
    },
  ];

  const randomNumber = new WHRNG(Math.floor(Player.lastUpdate / 3600000));
  for (let i = 0; i < 5; i++) randomNumber.step();

  return bonuses[Math.floor(bonuses.length * randomNumber.random())];
}

export const initSoAAugmentations = (): Augmentation[] => [
  new Augmentation({
    name: AugmentationNames.WKSharmonizer,
    repCost: 1e4,
    moneyCost: 1e6,
    info:
      `A copy of the WKS harmonizer from the MIA leader of the ${FactionNames.ShadowsOfAnarchy} ` +
      "injects *Γ-based cells that provides general enhancement to the body.",
    stats: (
      <>
        This augmentation makes many aspects of infiltration easier and more productive. Such as increased timer,
        rewards, reduced damage taken, etc.
      </>
    ),
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.MightOfAres,
    repCost: 1e4,
    moneyCost: 1e6,
    info:
      "Extra-ocular neurons taken from old martial art master. Injecting them gives the user the ability to " +
      "predict the enemy's attack before they even know it themselves.",
    stats: (
      <>This augmentation makes the Slash minigame easier by showing you via an indicator when the slash in coming.</>
    ),
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.WisdomOfAthena,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "A connective brain implant to SASHA that focuses on pattern recognition and predictive templating.",
    stats: <>This augmentation makes the Bracket minigame easier by removing all '[' ']'.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.ChaosOfDionysus,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Opto-occipito implant to process visual signals before brain interpretation.",
    stats: <>This augmentation makes the Backwards minigame easier by flipping the words.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.BeautyOfAphrodite,
    repCost: 1e4,
    moneyCost: 1e6,
    info:
      "Pheromone extruder injected in the thoracodorsal nerve. Emits pleasing scent guaranteed to " +
      "make conversational partners more agreeable.",
    stats: <>This augmentation makes the Bribe minigame easier by indicating the incorrect paths.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.TrickeryOfHermes,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Penta-dynamo-neurovascular-valve inserted in the carpal ligament, enhances dexterity.",
    stats: <>This augmentation makes the Cheat Code minigame easier by allowing the opposite character.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.FloodOfPoseidon,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Transtinatium VVD reticulator used in optico-sterbing recognition.",
    stats: <>This augmentation makes the Symbol matching minigame easier by indicating the correct choice.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.HuntOfArtemis,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "magneto-turboencabulator based on technology by Micha Eike Siemon, increases the user's electro-magnetic sensitivity.",
    stats: (
      <>
        This augmentation makes the Minesweeper minigame easier by showing the location of all mines and keeping their
        position.
      </>
    ),
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
  new Augmentation({
    name: AugmentationNames.KnowledgeOfApollo,
    repCost: 1e4,
    moneyCost: 1e6,
    info: "Neodynic retention fjengeln spoofer using -φ karmions, net positive effect on implantee's delta wave.",
    stats: <>This augmentation makes the Wire Cutting minigame easier by indicating the incorrect wires.</>,
    isSpecial: true,
    factions: [FactionNames.ShadowsOfAnarchy],
  }),
];

export const initGeneralAugmentations = (): Augmentation[] => [
  new Augmentation({
    name: AugmentationNames.HemoRecirculator,
    moneyCost: 4.5e7,
    repCost: 1e4,
    info: "A heart implant that greatly increases the body's ability to effectively use and pump blood.",
    strength: 1.08,
    defense: 1.08,
    agility: 1.08,
    dexterity: 1.08,
    factions: [FactionNames.Tetrads, FactionNames.TheDarkArmy, FactionNames.TheSyndicate],
  }),
  new Augmentation({
    name: AugmentationNames.Targeting1,
    moneyCost: 1.5e7,
    repCost: 5e3,
    info:
      "A cranial implant that is embedded within the inner ear structures and optic nerves. It regulates " +
      "and enhances balance and hand-eye coordination.",
    dexterity: 1.1,
    factions: [
      FactionNames.SlumSnakes,
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.Sector12,
      FactionNames.Ishima,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.Targeting2,
    moneyCost: 4.25e7,
    repCost: 8.75e3,
    info:
      "This upgraded version of the 'Augmented Targeting' implant is capable of augmenting " +
      "reality by digitally displaying weaknesses and vital signs of threats.",
    prereqs: [AugmentationNames.Targeting1],
    dexterity: 1.2,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.Sector12,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.Targeting3,
    moneyCost: 1.15e8,
    repCost: 2.75e4,
    info: "The latest version of the 'Augmented Targeting' implant adds the ability to lock-on and track threats.",
    prereqs: [AugmentationNames.Targeting2, AugmentationNames.Targeting1],
    dexterity: 1.3,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
      FactionNames.TheCovenant,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.SyntheticHeart,
    moneyCost: 2.875e9,
    repCost: 7.5e5,
    info:
      "This advanced artificial heart, created from plasteel and graphene, is capable of pumping blood " +
      "more efficiently than an organic heart.",
    agility: 1.5,
    strength: 1.5,
    factions: [
      FactionNames.KuaiGongInternational,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.SpeakersForTheDead,
      FactionNames.NWO,
      FactionNames.TheCovenant,
      FactionNames.Daedalus,
      FactionNames.Illuminati,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.SynfibrilMuscle,
    repCost: 4.375e5,
    moneyCost: 1.125e9,
    info:
      "The myofibrils in human muscles are injected with special chemicals that react with the proteins inside " +
      "the myofibrils, altering their underlying structure. The end result is muscles that are stronger and more elastic. " +
      "Scientists have named these artificially enhanced units 'synfibrils'.",
    strength: 1.3,
    defense: 1.3,
    factions: [
      FactionNames.KuaiGongInternational,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.SpeakersForTheDead,
      FactionNames.NWO,
      FactionNames.TheCovenant,
      FactionNames.Daedalus,
      FactionNames.Illuminati,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.CombatRib1,
    repCost: 7.5e3,
    moneyCost: 2.375e7,
    info:
      "The rib cage is augmented to continuously release boosters into the bloodstream " +
      "which increase the oxygen-carrying capacity of blood.",
    strength: 1.1,
    defense: 1.1,
    factions: [
      FactionNames.SlumSnakes,
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.Volhaven,
      FactionNames.Ishima,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.CombatRib2,
    repCost: 1.875e4,
    moneyCost: 6.5e7,
    info:
      "An upgraded version of the 'Combat Rib' augmentation that adds potent stimulants which " +
      "improve focus and endurance while decreasing reaction time and fatigue.",
    prereqs: [AugmentationNames.CombatRib1],
    strength: 1.14,
    defense: 1.14,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.Volhaven,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.CombatRib3,
    repCost: 3.5e4,
    moneyCost: 1.2e8,
    info:
      "The latest version of the 'Combat Rib' augmentation releases advanced anabolic steroids that " +
      "improve muscle mass and physical performance while being safe and free of side effects.",
    prereqs: [AugmentationNames.CombatRib2, AugmentationNames.CombatRib1],
    strength: 1.18,
    defense: 1.18,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
      FactionNames.BladeIndustries,
      FactionNames.TheCovenant,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.NanofiberWeave,
    repCost: 3.75e4,
    moneyCost: 1.25e8,
    info:
      "Synthetic nanofibers are woven into the skin's extracellular matrix using electrospinning, " +
      "which improves its regenerative and extracellular homeostasis abilities.",
    strength: 1.2,
    defense: 1.2,
    factions: [
      FactionNames.TheDarkArmy,
      FactionNames.TheSyndicate,
      FactionNames.OmniTekIncorporated,
      FactionNames.BladeIndustries,
      FactionNames.TianDiHui,
      FactionNames.SpeakersForTheDead,
      FactionNames.FulcrumSecretTechnologies,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.SubdermalArmor,
    repCost: 8.75e5,
    moneyCost: 3.25e9,
    info:
      "The NEMEAN Subdermal Weave is a thin, light-weight, graphene plating that houses a dilatant fluid. " +
      "The material is implanted underneath the skin, and is the most advanced form of defensive enhancement " +
      "that has ever been created. The dilatant fluid, despite being thin and light, is extremely effective " +
      "at stopping piercing blows and reducing blunt trauma. The properties of graphene allow the plating to " +
      "mitigate damage from any fire or electrical traumas.",
    defense: 2.2,
    factions: [
      FactionNames.TheSyndicate,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.Illuminati,
      FactionNames.Daedalus,
      FactionNames.TheCovenant,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.WiredReflexes,
    repCost: 1.25e3,
    moneyCost: 2.5e6,
    info:
      "Synthetic nerve-enhancements are injected into all major parts of the somatic nervous system, " +
      "supercharging the spread of neural signals and increasing reflex speed.",
    agility: 1.05,
    dexterity: 1.05,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.SlumSnakes,
      FactionNames.Sector12,
      FactionNames.Volhaven,
      FactionNames.Aevum,
      FactionNames.Ishima,
      FactionNames.TheSyndicate,
      FactionNames.TheDarkArmy,
      FactionNames.SpeakersForTheDead,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBoneLacings,
    repCost: 1.125e6,
    moneyCost: 4.25e9,
    info: "Graphene is grafted and fused into the skeletal structure, enhancing bone density and tensile strength.",
    strength: 1.7,
    defense: 1.7,
    factions: [FactionNames.FulcrumSecretTechnologies, FactionNames.TheCovenant],
  }),
  new Augmentation({
    name: AugmentationNames.BionicSpine,
    repCost: 4.5e4,
    moneyCost: 1.25e8,
    info:
      "The spine is reconstructed using plasteel and carbon fibers. " +
      "It is now capable of stimulating and regulating neural signals " +
      "passing through the spinal cord, improving senses and reaction speed. " +
      "The 'Bionic Spine' also interfaces with all other 'Bionic' implants.",
    strength: 1.15,
    defense: 1.15,
    agility: 1.15,
    dexterity: 1.15,
    factions: [
      FactionNames.SpeakersForTheDead,
      FactionNames.TheSyndicate,
      FactionNames.KuaiGongInternational,
      FactionNames.OmniTekIncorporated,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBionicSpine,
    repCost: 1.625e6,
    moneyCost: 6e9,
    info:
      "An upgrade to the 'Bionic Spine' augmentation. The spine is fused with graphene " +
      "which enhances durability and supercharges all body functions.",
    prereqs: [AugmentationNames.BionicSpine],
    strength: 1.6,
    defense: 1.6,
    agility: 1.6,
    dexterity: 1.6,
    factions: [FactionNames.FulcrumSecretTechnologies, FactionNames.ECorp],
  }),
  new Augmentation({
    name: AugmentationNames.BionicLegs,
    repCost: 1.5e5,
    moneyCost: 3.75e8,
    info: "Cybernetic legs, created from plasteel and carbon fibers, enhance running speed.",
    agility: 1.6,
    factions: [
      FactionNames.SpeakersForTheDead,
      FactionNames.TheSyndicate,
      FactionNames.KuaiGongInternational,
      FactionNames.OmniTekIncorporated,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBionicLegs,
    repCost: 7.5e5,
    moneyCost: 4.5e9,
    info:
      "An upgrade to the 'Bionic Legs' augmentation. The legs are fused " +
      "with graphene, greatly enhancing jumping ability.",
    prereqs: [AugmentationNames.BionicLegs],
    agility: 2.5,
    factions: [FactionNames.MegaCorp, FactionNames.ECorp, FactionNames.FulcrumSecretTechnologies],
  }),
  new Augmentation({
    name: AugmentationNames.SpeechProcessor,
    repCost: 7.5e3,
    moneyCost: 5e7,
    info:
      "A cochlear implant with an embedded computer that analyzes incoming speech. " +
      "The embedded computer processes characteristics of incoming speech, such as tone " +
      "and inflection, to pick up on subtle cues and aid in social interactions.",
    charisma: 1.2,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.Chongqing,
      FactionNames.Sector12,
      FactionNames.NewTokyo,
      FactionNames.Aevum,
      FactionNames.Ishima,
      FactionNames.Volhaven,
      FactionNames.Silhouette,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.TITN41Injection,
    repCost: 2.5e4,
    moneyCost: 1.9e8,
    info:
      "TITN is a series of viruses that targets and alters the sequences of human DNA in genes that " +
      "control personality. The TITN-41 strain alters these genes so that the subject becomes more " +
      "outgoing and sociable.",
    charisma: 1.15,
    charisma_exp: 1.15,
    factions: [FactionNames.Silhouette],
  }),
  new Augmentation({
    name: AugmentationNames.EnhancedSocialInteractionImplant,
    repCost: 3.75e5,
    moneyCost: 1.375e9,
    info:
      "A cranial implant that greatly assists in the user's ability to analyze social situations " +
      "and interactions. The system uses a wide variety of factors such as facial expression, body " +
      "language, voice tone, and inflection to determine the best course of action during social " +
      "situations. The implant also uses deep learning software to continuously learn new behavior " +
      "patterns and how to best respond.",
    charisma: 1.6,
    charisma_exp: 1.6,
    factions: [
      FactionNames.BachmanAssociates,
      FactionNames.NWO,
      FactionNames.ClarkeIncorporated,
      FactionNames.OmniTekIncorporated,
      FactionNames.FourSigma,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.BitWire,
    repCost: 3.75e3,
    moneyCost: 1e7,
    info:
      "A small brain implant embedded in the cerebrum. This regulates and improves the brain's computing " +
      "capabilities.",
    hacking: 1.05,
    factions: [FactionNames.CyberSec, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.ArtificialBioNeuralNetwork,
    repCost: 2.75e5,
    moneyCost: 3e9,
    info:
      "A network consisting of millions of nanoprocessors is embedded into the brain. " +
      "The network is meant to mimic the way a biological brain solves a problem, with each " +
      "nanoprocessor acting similar to the way a neuron would in a neural network. However, these " +
      "nanoprocessors are programmed to perform computations much faster than organic neurons, " +
      "allowing the user to solve much more complex problems at a much faster rate.",
    hacking_speed: 1.03,
    hacking_money: 1.15,
    hacking: 1.12,
    factions: [FactionNames.BitRunners, FactionNames.FulcrumSecretTechnologies],
  }),
  new Augmentation({
    name: AugmentationNames.ArtificialSynapticPotentiation,
    repCost: 6.25e3,
    moneyCost: 8e7,
    info:
      "The body is injected with a chemical that artificially induces synaptic potentiation, " +
      "otherwise known as the strengthening of synapses. This results in enhanced cognitive abilities.",
    hacking_speed: 1.02,
    hacking_chance: 1.05,
    hacking_exp: 1.05,
    factions: [FactionNames.TheBlackHand, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.EnhancedMyelinSheathing,
    repCost: 1e5,
    moneyCost: 1.375e9,
    info:
      "Electrical signals are used to induce a new, artificial form of myelinogenesis in the human body. " +
      "This process results in the proliferation of new, synthetic myelin sheaths in the nervous " +
      "system. These myelin sheaths can propagate neuro-signals much faster than their organic " +
      "counterparts, leading to greater processing speeds and better brain function.",
    hacking_speed: 1.03,
    hacking_exp: 1.1,
    hacking: 1.08,
    factions: [FactionNames.FulcrumSecretTechnologies, FactionNames.BitRunners, FactionNames.TheBlackHand],
  }),
  new Augmentation({
    name: AugmentationNames.SynapticEnhancement,
    repCost: 2e3,
    moneyCost: 7.5e6,
    info:
      "A small cranial implant that continuously uses weak electrical signals to stimulate the brain and " +
      "induce stronger synaptic activity. This improves the user's cognitive abilities.",
    hacking_speed: 1.03,
    factions: [FactionNames.CyberSec, FactionNames.Aevum],
  }),
  new Augmentation({
    name: AugmentationNames.NeuralRetentionEnhancement,
    repCost: 2e4,
    moneyCost: 2.5e8,
    info:
      "Chemical injections are used to permanently alter and strengthen the brain's neuronal " +
      "circuits, strengthening the ability to retain information.",
    hacking_exp: 1.25,
    factions: [FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.DataJack,
    repCost: 1.125e5,
    moneyCost: 4.5e8,
    info:
      "A brain implant that provides an interface for direct, wireless communication between a computer's main " +
      "memory and the mind. This implant allows the user to not only access a computer's memory, but also alter " +
      "and delete it.",
    hacking_money: 1.25,
    factions: [
      FactionNames.BitRunners,
      FactionNames.TheBlackHand,
      FactionNames.NiteSec,
      FactionNames.Chongqing,
      FactionNames.NewTokyo,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENM,
    repCost: 1.5e4,
    moneyCost: 2.5e8,
    info:
      "A thin device embedded inside the arm containing a wireless module capable of connecting " +
      "to nearby networks. Once connected, the Netburner Module is capable of capturing and " +
      "processing all of the traffic on that network. By itself, the Embedded Netburner Module does " +
      "not do much, but a variety of very powerful upgrades can be installed that allow you to fully " +
      "control the traffic on a network.",
    hacking: 1.08,
    factions: [
      FactionNames.BitRunners,
      FactionNames.TheBlackHand,
      FactionNames.NiteSec,
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMCore,
    repCost: 175e3,
    moneyCost: 2.5e9,
    info:
      "The Core library is an implant that upgrades the firmware of the Embedded Netburner Module. " +
      "This upgrade allows the Embedded Netburner Module to generate its own data on a network.",
    prereqs: [AugmentationNames.ENM],
    hacking_speed: 1.03,
    hacking_money: 1.1,
    hacking_chance: 1.03,
    hacking_exp: 1.07,
    hacking: 1.07,
    factions: [
      FactionNames.BitRunners,
      FactionNames.TheBlackHand,
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMCoreV2,
    repCost: 1e6,
    moneyCost: 4.5e9,
    info:
      "The Core V2 library is an implant that upgrades the firmware of the Embedded Netburner Module. " +
      "This upgraded firmware allows the Embedded Netburner Module to control information on " +
      "a network by re-routing traffic, spoofing IP addresses, and altering the data inside network " +
      "packets.",
    prereqs: [AugmentationNames.ENMCore, AugmentationNames.ENM],
    hacking_speed: 1.05,
    hacking_money: 1.3,
    hacking_chance: 1.05,
    hacking_exp: 1.15,
    hacking: 1.08,
    factions: [
      FactionNames.BitRunners,
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.BladeIndustries,
      FactionNames.OmniTekIncorporated,
      FactionNames.KuaiGongInternational,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMCoreV3,
    repCost: 1.75e6,
    moneyCost: 7.5e9,
    info:
      "The Core V3 library is an implant that upgrades the firmware of the Embedded Netburner Module. " +
      "This upgraded firmware allows the Embedded Netburner Module to seamlessly inject code into " +
      "any device on a network.",
    prereqs: [AugmentationNames.ENMCoreV2, AugmentationNames.ENMCore, AugmentationNames.ENM],
    hacking_speed: 1.05,
    hacking_money: 1.4,
    hacking_chance: 1.1,
    hacking_exp: 1.25,
    hacking: 1.1,
    factions: [
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.Daedalus,
      FactionNames.TheCovenant,
      FactionNames.Illuminati,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMAnalyzeEngine,
    repCost: 6.25e5,
    moneyCost: 6e9,
    info:
      "Installs the Analyze Engine for the Embedded Netburner Module, which is a CPU cluster " +
      "that vastly outperforms the Netburner Module's native single-core processor.",
    prereqs: [AugmentationNames.ENM],
    hacking_speed: 1.1,
    factions: [
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.Daedalus,
      FactionNames.TheCovenant,
      FactionNames.Illuminati,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ENMDMA,
    repCost: 1e6,
    moneyCost: 7e9,
    info:
      "This implant installs a Direct Memory Access (DMA) controller into the " +
      "Embedded Netburner Module. This allows the Module to send and receive data " +
      "directly to and from the main memory of devices on a network.",
    prereqs: [AugmentationNames.ENM],
    hacking_money: 1.4,
    hacking_chance: 1.2,
    factions: [
      FactionNames.ECorp,
      FactionNames.MegaCorp,
      FactionNames.FulcrumSecretTechnologies,
      FactionNames.NWO,
      FactionNames.Daedalus,
      FactionNames.TheCovenant,
      FactionNames.Illuminati,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.Neuralstimulator,
    repCost: 5e4,
    moneyCost: 3e9,
    info:
      "A cranial implant that intelligently stimulates certain areas of the brain " +
      "in order to improve cognitive functions.",
    hacking_speed: 1.02,
    hacking_chance: 1.1,
    hacking_exp: 1.12,
    factions: [
      FactionNames.TheBlackHand,
      FactionNames.Chongqing,
      FactionNames.Sector12,
      FactionNames.NewTokyo,
      FactionNames.Aevum,
      FactionNames.Ishima,
      FactionNames.Volhaven,
      FactionNames.BachmanAssociates,
      FactionNames.ClarkeIncorporated,
      FactionNames.FourSigma,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.NeuralAccelerator,
    repCost: 2e5,
    moneyCost: 1.75e9,
    info:
      "A microprocessor that accelerates the processing " +
      "speed of biological neural networks. This is a cranial implant that is embedded inside the brain.",
    hacking: 1.1,
    hacking_exp: 1.15,
    hacking_money: 1.2,
    factions: [FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG1,
    repCost: 1e4,
    moneyCost: 7e7,
    info:
      "The first generation of Cranial Signal Processors. Cranial Signal Processors " +
      "are a set of specialized microprocessors that are attached to " +
      "neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
      "so that the brain doesn't have to.",
    hacking_speed: 1.01,
    hacking: 1.05,
    factions: [FactionNames.CyberSec, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG2,
    repCost: 1.875e4,
    moneyCost: 1.25e8,
    info:
      "The second generation of Cranial Signal Processors. Cranial Signal Processors " +
      "are a set of specialized microprocessors that are attached to " +
      "neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
      "so that the brain doesn't have to.",
    prereqs: [AugmentationNames.CranialSignalProcessorsG1],
    hacking_speed: 1.02,
    hacking_chance: 1.05,
    hacking: 1.07,
    factions: [FactionNames.CyberSec, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG3,
    repCost: 5e4,
    moneyCost: 5.5e8,
    info:
      "The third generation of Cranial Signal Processors. Cranial Signal Processors " +
      "are a set of specialized microprocessors that are attached to " +
      "neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
      "so that the brain doesn't have to.",
    prereqs: [AugmentationNames.CranialSignalProcessorsG2, AugmentationNames.CranialSignalProcessorsG1],
    hacking_speed: 1.02,
    hacking_money: 1.15,
    hacking: 1.09,
    factions: [FactionNames.NiteSec, FactionNames.TheBlackHand, FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG4,
    repCost: 1.25e5,
    moneyCost: 1.1e9,
    info:
      "The fourth generation of Cranial Signal Processors. Cranial Signal Processors " +
      "are a set of specialized microprocessors that are attached to " +
      "neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
      "so that the brain doesn't have to.",
    prereqs: [
      AugmentationNames.CranialSignalProcessorsG3,
      AugmentationNames.CranialSignalProcessorsG2,
      AugmentationNames.CranialSignalProcessorsG1,
    ],
    hacking_speed: 1.02,
    hacking_money: 1.2,
    hacking_grow: 1.25,
    factions: [FactionNames.TheBlackHand, FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.CranialSignalProcessorsG5,
    repCost: 2.5e5,
    moneyCost: 2.25e9,
    info:
      "The fifth generation of Cranial Signal Processors. Cranial Signal Processors " +
      "are a set of specialized microprocessors that are attached to " +
      "neurons in the brain. These chips process neural signals to quickly and automatically perform specific computations " +
      "so that the brain doesn't have to.",
    prereqs: [
      AugmentationNames.CranialSignalProcessorsG4,
      AugmentationNames.CranialSignalProcessorsG3,
      AugmentationNames.CranialSignalProcessorsG2,
      AugmentationNames.CranialSignalProcessorsG1,
    ],
    hacking: 1.3,
    hacking_money: 1.25,
    hacking_grow: 1.75,
    factions: [FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.NeuronalDensification,
    repCost: 1.875e5,
    moneyCost: 1.375e9,
    info:
      "The brain is surgically re-engineered to have increased neuronal density " +
      "by decreasing the neuron gap junction. Then, the body is genetically modified " +
      "to enhance the production and capabilities of its neural stem cells.",
    hacking: 1.15,
    hacking_exp: 1.1,
    hacking_speed: 1.03,
    factions: [FactionNames.ClarkeIncorporated],
  }),
  new Augmentation({
    name: AugmentationNames.NuoptimalInjectorImplant,
    repCost: 5e3,
    moneyCost: 2e7,
    info:
      "This torso implant automatically injects nootropic supplements into " +
      "the bloodstream to improve memory, increase focus, and provide other " +
      "cognitive enhancements.",
    company_rep: 1.2,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.Volhaven,
      FactionNames.NewTokyo,
      FactionNames.Chongqing,
      FactionNames.ClarkeIncorporated,
      FactionNames.FourSigma,
      FactionNames.BachmanAssociates,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.SpeechEnhancement,
    repCost: 2.5e3,
    moneyCost: 1.25e7,
    info:
      "An advanced neural implant that improves your speaking abilities, making " +
      "you more convincing and likable in conversations and overall improving your " +
      "social interactions.",
    company_rep: 1.1,
    charisma: 1.1,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.SpeakersForTheDead,
      FactionNames.FourSigma,
      FactionNames.KuaiGongInternational,
      FactionNames.ClarkeIncorporated,
      FactionNames.BachmanAssociates,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.FocusWire,
    repCost: 7.5e4,
    moneyCost: 9e8,
    info: "A cranial implant that stops procrastination by blocking specific neural pathways in the brain.",
    hacking_exp: 1.05,
    strength_exp: 1.05,
    defense_exp: 1.05,
    dexterity_exp: 1.05,
    agility_exp: 1.05,
    charisma_exp: 1.05,
    company_rep: 1.1,
    work_money: 1.2,
    factions: [
      FactionNames.BachmanAssociates,
      FactionNames.ClarkeIncorporated,
      FactionNames.FourSigma,
      FactionNames.KuaiGongInternational,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.PCDNI,
    repCost: 3.75e5,
    moneyCost: 3.75e9,
    info:
      "Installs a Direct-Neural Interface jack into your arm that is compatible with most " +
      "computers. Connecting to a computer through this jack allows you to interface with " +
      "it using the brain's electrochemical signals.",
    company_rep: 1.3,
    hacking: 1.08,
    factions: [
      FactionNames.FourSigma,
      FactionNames.OmniTekIncorporated,
      FactionNames.ECorp,
      FactionNames.BladeIndustries,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.PCDNIOptimizer,
    repCost: 5e5,
    moneyCost: 4.5e9,
    info:
      "This is a submodule upgrade to the PC Direct-Neural Interface augmentation. It " +
      "improves the performance of the interface and gives the user more control options " +
      "to a connected computer.",
    prereqs: [AugmentationNames.PCDNI],
    company_rep: 1.75,
    hacking: 1.1,
    factions: [FactionNames.FulcrumSecretTechnologies, FactionNames.ECorp, FactionNames.BladeIndustries],
  }),
  new Augmentation({
    name: AugmentationNames.PCDNINeuralNetwork,
    repCost: 1.5e6,
    moneyCost: 7.5e9,
    info:
      "This is an additional installation that upgrades the functionality of the " +
      "PC Direct-Neural Interface augmentation. When connected to a computer, " +
      "the Neural Network upgrade allows the user to use their own brain's " +
      "processing power to aid the computer in computational tasks.",
    prereqs: [AugmentationNames.PCDNI],
    company_rep: 2,
    hacking: 1.1,
    hacking_speed: 1.05,
    factions: [FactionNames.FulcrumSecretTechnologies],
  }),
  new Augmentation({
    name: AugmentationNames.ADRPheromone1,
    repCost: 3.75e3,
    moneyCost: 1.75e7,
    info:
      "The body is genetically re-engineered so that it produces the ADR-V1 pheromone, " +
      "an artificial pheromone discovered by scientists. The ADR-V1 pheromone, when excreted, " +
      "triggers feelings of admiration and approval in other people.",
    company_rep: 1.1,
    faction_rep: 1.1,
    factions: [
      FactionNames.TianDiHui,
      FactionNames.TheSyndicate,
      FactionNames.NWO,
      FactionNames.MegaCorp,
      FactionNames.FourSigma,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ADRPheromone2,
    repCost: 6.25e4,
    moneyCost: 5.5e8,
    info:
      "The body is genetically re-engineered so that it produces the ADR-V2 pheromone, " +
      "which is similar to but more potent than ADR-V1. This pheromone, when excreted, " +
      "triggers feelings of admiration, approval, and respect in others.",
    company_rep: 1.2,
    faction_rep: 1.2,
    factions: [
      FactionNames.Silhouette,
      FactionNames.FourSigma,
      FactionNames.BachmanAssociates,
      FactionNames.ClarkeIncorporated,
    ],
  }),
  new Augmentation({
    name: AugmentationNames.ShadowsSimulacrum,
    repCost: 3.75e4,
    moneyCost: 4e8,
    info:
      "A crude but functional matter phase-shifter module that is embedded " +
      "in the brainstem and cerebellum. This augmentation was developed by " +
      "criminal organizations and allows the user to project and control holographic " +
      "simulacrums within a large radius. These simulacrums are commonly used for " +
      "espionage and surveillance work.",
    company_rep: 1.15,
    faction_rep: 1.15,
    factions: [FactionNames.TheSyndicate, FactionNames.TheDarkArmy, FactionNames.SpeakersForTheDead],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeCPUUpload,
    repCost: 3.75e3,
    moneyCost: 1.1e7,
    info:
      "Uploads the architecture and design details of a Hacknet Node's CPU into " +
      "the brain. This allows the user to engineer custom hardware and software  " +
      "for the Hacknet Node that provides better performance.",
    hacknet_node_money: 1.15,
    hacknet_node_purchase_cost: 0.85,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeCacheUpload,
    repCost: 2.5e3,
    moneyCost: 5.5e6,
    info:
      "Uploads the architecture and design details of a Hacknet Node's main-memory cache " +
      "into the brain. This allows the user to engineer custom cache hardware for the  " +
      "Hacknet Node that offers better performance.",
    hacknet_node_money: 1.1,
    hacknet_node_level_cost: 0.85,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeNICUpload,
    repCost: 1.875e3,
    moneyCost: 4.5e6,
    info:
      "Uploads the architecture and design details of a Hacknet Node's Network Interface Card (NIC) " +
      "into the brain. This allows the user to engineer a custom NIC for the Hacknet Node that " +
      "offers better performance.",
    hacknet_node_money: 1.1,
    hacknet_node_purchase_cost: 0.9,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeKernelDNI,
    repCost: 7.5e3,
    moneyCost: 4e7,
    info:
      "Installs a Direct-Neural Interface jack into the arm that is capable of connecting to a " +
      "Hacknet Node. This lets the user access and manipulate the Node's kernel using " +
      "electrochemical signals.",
    hacknet_node_money: 1.25,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.HacknetNodeCoreDNI,
    repCost: 1.25e4,
    moneyCost: 6e7,
    info:
      "Installs a Direct-Neural Interface jack into the arm that is capable of connecting " +
      "to a Hacknet Node. This lets the user access and manipulate the Node's processing logic using " +
      "electrochemical signals.",
    hacknet_node_money: 1.45,
    factions: [FactionNames.Netburners],
  }),
  new Augmentation({
    name: AugmentationNames.Neurotrainer1,
    repCost: 1e3,
    moneyCost: 4e6,
    info:
      "A decentralized cranial implant that improves the brain's ability to learn. It is " +
      "installed by releasing millions of nanobots into the human brain, each of which " +
      "attaches to a different neural pathway to enhance the brain's ability to retain " +
      "and retrieve information.",
    hacking_exp: 1.1,
    strength_exp: 1.1,
    defense_exp: 1.1,
    dexterity_exp: 1.1,
    agility_exp: 1.1,
    charisma_exp: 1.1,
    factions: [FactionNames.CyberSec, FactionNames.Aevum],
  }),
  new Augmentation({
    name: AugmentationNames.Neurotrainer2,
    repCost: 1e4,
    moneyCost: 4.5e7,
    info:
      "A decentralized cranial implant that improves the brain's ability to learn. This " +
      "is a more powerful version of the Neurotrainer I augmentation, but it does not " +
      "require Neurotrainer I to be installed as a prerequisite.",
    hacking_exp: 1.15,
    strength_exp: 1.15,
    defense_exp: 1.15,
    dexterity_exp: 1.15,
    agility_exp: 1.15,
    charisma_exp: 1.15,
    factions: [FactionNames.BitRunners, FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.Neurotrainer3,
    repCost: 2.5e4,
    moneyCost: 1.3e8,
    info:
      "A decentralized cranial implant that improves the brain's ability to learn. This " +
      "is a more powerful version of the Neurotrainer I and Neurotrainer II augmentation, " +
      "but it does not require either of them to be installed as a prerequisite.",
    hacking_exp: 1.2,
    strength_exp: 1.2,
    defense_exp: 1.2,
    dexterity_exp: 1.2,
    agility_exp: 1.2,
    charisma_exp: 1.2,
    factions: [FactionNames.NWO, FactionNames.FourSigma],
  }),
  new Augmentation({
    name: AugmentationNames.Hypersight,
    repCost: 1.5e5,
    moneyCost: 2.75e9,
    info:
      "A bionic eye implant that grants sight capabilities far beyond those of a natural human. " +
      "Embedded circuitry within the implant provides the ability to detect heat and movement " +
      "through solid objects such as walls, thus providing 'x-ray vision'-like capabilities.",
    dexterity: 1.4,
    hacking_speed: 1.03,
    hacking_money: 1.1,
    factions: [FactionNames.BladeIndustries, FactionNames.KuaiGongInternational],
  }),
  new Augmentation({
    name: AugmentationNames.LuminCloaking1,
    repCost: 1.5e3,
    moneyCost: 5e6,
    info:
      "A skin implant that reinforces the skin with highly-advanced synthetic cells. These " +
      "cells, when powered, have a negative refractive index. As a result, they bend light " +
      "around the skin, making the user much harder to see with the naked eye.",
    agility: 1.05,
    crime_money: 1.1,
    factions: [FactionNames.SlumSnakes, FactionNames.Tetrads],
  }),
  new Augmentation({
    name: AugmentationNames.LuminCloaking2,
    repCost: 5e3,
    moneyCost: 3e7,
    info:
      "This is a more advanced version of the LuminCloaking-V1 augmentation. This skin implant " +
      "reinforces the skin with highly-advanced synthetic cells. These " +
      "cells, when powered, are capable of not only bending light but also of bending heat, " +
      "making the user more resilient as well as stealthy.",
    prereqs: [AugmentationNames.LuminCloaking1],
    agility: 1.1,
    defense: 1.1,
    crime_money: 1.25,
    factions: [FactionNames.SlumSnakes, FactionNames.Tetrads],
  }),
  new Augmentation({
    name: AugmentationNames.SmartSonar,
    repCost: 2.25e4,
    moneyCost: 7.5e7,
    info: "A cochlear implant that helps the player detect and locate enemies using sound propagation.",
    dexterity: 1.1,
    dexterity_exp: 1.15,
    crime_money: 1.25,
    factions: [FactionNames.SlumSnakes],
  }),
  new Augmentation({
    name: AugmentationNames.PowerRecirculator,
    repCost: 2.5e4,
    moneyCost: 1.8e8,
    info:
      "The body's nerves are attached with polypyrrole nanocircuits that " +
      "are capable of capturing wasted energy, in the form of heat, " +
      "and converting it back into usable power.",
    hacking: 1.05,
    strength: 1.05,
    defense: 1.05,
    dexterity: 1.05,
    agility: 1.05,
    charisma: 1.05,
    hacking_exp: 1.1,
    strength_exp: 1.1,
    defense_exp: 1.1,
    dexterity_exp: 1.1,
    agility_exp: 1.1,
    charisma_exp: 1.1,
    factions: [FactionNames.Tetrads, FactionNames.TheDarkArmy, FactionNames.TheSyndicate, FactionNames.NWO],
  }),
  new Augmentation({
    name: AugmentationNames.QLink,
    repCost: 1.875e6,
    moneyCost: 2.5e13,
    info:
      `A brain implant that wirelessly connects you to the ${FactionNames.Illuminati}'s ` +
      "quantum supercomputer, allowing you to access and use its incredible " +
      "computing power.",
    hacking: 1.75,
    hacking_speed: 2,
    hacking_chance: 2.5,
    hacking_money: 4,
    factions: [FactionNames.Illuminati],
  }),
  new Augmentation({
    name: AugmentationNames.SPTN97,
    repCost: 1.25e6,
    moneyCost: 4.875e9,
    info:
      "The SPTN-97 gene is injected into the genome. The SPTN-97 gene is an " +
      "artificially-synthesized gene that was developed by DARPA to create " +
      "super-soldiers through genetic modification. The gene was outlawed in " +
      "2056.",
    strength: 1.75,
    defense: 1.75,
    dexterity: 1.75,
    agility: 1.75,
    hacking: 1.15,
    factions: [FactionNames.TheCovenant],
  }),
  new Augmentation({
    name: AugmentationNames.HiveMind,
    repCost: 1.5e6,
    moneyCost: 5.5e9,
    info:
      `A brain implant developed by ${FactionNames.ECorp}. They do not reveal what ` +
      "exactly the implant does, but they promise that it will greatly " +
      "enhance your abilities.",
    hacking_grow: 3,
    stats: null,
    factions: [FactionNames.ECorp],
  }),
  new Augmentation({
    name: AugmentationNames.TheRedPill,
    repCost: 2.5e6,
    moneyCost: 0,
    info: "It's time to leave the cave.",
    stats: null,
    isSpecial: true,
    factions: [FactionNames.Daedalus],
  }),
  new Augmentation({
    name: AugmentationNames.CordiARCReactor,
    repCost: 1.125e6,
    moneyCost: 5e9,
    info:
      "The thoracic cavity is equipped with a small chamber designed " +
      "to hold and sustain hydrogen plasma. The plasma is used to generate " +
      "fusion power through nuclear fusion, providing limitless amounts of clean " +
      "energy for the body.",
    strength: 1.35,
    defense: 1.35,
    dexterity: 1.35,
    agility: 1.35,
    strength_exp: 1.35,
    defense_exp: 1.35,
    dexterity_exp: 1.35,
    agility_exp: 1.35,
    factions: [FactionNames.MegaCorp],
  }),
  new Augmentation({
    name: AugmentationNames.SmartJaw,
    repCost: 3.75e5,
    moneyCost: 2.75e9,
    info:
      "A bionic jaw that contains advanced hardware and software " +
      "capable of psychoanalyzing and profiling the personality of " +
      "others using optical imaging software.",
    charisma: 1.5,
    charisma_exp: 1.5,
    company_rep: 1.25,
    faction_rep: 1.25,
    factions: [FactionNames.BachmanAssociates],
  }),
  new Augmentation({
    name: AugmentationNames.Neotra,
    repCost: 5.625e5,
    moneyCost: 2.875e9,
    info:
      "A highly-advanced techno-organic drug that is injected into the skeletal " +
      "and integumentary system. The drug permanently modifies the DNA of the " +
      "body's skin and bone cells, granting them the ability to repair " +
      "and restructure themselves.",
    strength: 1.55,
    defense: 1.55,
    factions: [FactionNames.BladeIndustries],
  }),
  new Augmentation({
    name: AugmentationNames.Xanipher,
    repCost: 8.75e5,
    moneyCost: 4.25e9,
    info:
      "A concoction of advanced nanobots that is orally ingested into the " +
      "body. These nanobots induce physiological changes and significantly " +
      "improve the body's functioning in all aspects.",
    hacking: 1.2,
    strength: 1.2,
    defense: 1.2,
    dexterity: 1.2,
    agility: 1.2,
    charisma: 1.2,
    hacking_exp: 1.15,
    strength_exp: 1.15,
    defense_exp: 1.15,
    dexterity_exp: 1.15,
    agility_exp: 1.15,
    charisma_exp: 1.15,
    factions: [FactionNames.NWO],
  }),
  new Augmentation({
    name: AugmentationNames.HydroflameLeftArm,
    repCost: 1.25e6,
    moneyCost: 2.5e12,
    info:
      "The left arm of a legendary BitRunner who ascended beyond this world. " +
      "It projects a light blue energy shield that protects the exposed inner parts. " +
      "Even though it contains no weapons, the advanced tungsten titanium " +
      "alloy increases the user's strength to unbelievable levels.",
    strength: 2.8,
    factions: [FactionNames.NWO],
  }),
  new Augmentation({
    name: AugmentationNames.nextSENS,
    repCost: 4.375e5,
    moneyCost: 1.925e9,
    info:
      "The body is genetically re-engineered to maintain a state " +
      "of negligible senescence, preventing the body from " +
      "deteriorating with age.",
    hacking: 1.2,
    strength: 1.2,
    defense: 1.2,
    dexterity: 1.2,
    agility: 1.2,
    charisma: 1.2,
    factions: [FactionNames.ClarkeIncorporated],
  }),
  new Augmentation({
    name: AugmentationNames.OmniTekInfoLoad,
    repCost: 6.25e5,
    moneyCost: 2.875e9,
    info:
      "OmniTek's data and information repository is uploaded " +
      "into your brain, enhancing your programming and " +
      "hacking abilities.",
    hacking: 1.2,
    hacking_exp: 1.25,
    factions: [FactionNames.OmniTekIncorporated],
  }),
  new Augmentation({
    name: AugmentationNames.PhotosyntheticCells,
    repCost: 5.625e5,
    moneyCost: 2.75e9,
    info:
      "Chloroplasts are added to epidermal stem cells and are applied " +
      "to the body using a skin graft. The result is photosynthetic " +
      "skin cells, allowing users to generate their own energy " +
      "and nutrition using solar power.",
    strength: 1.4,
    defense: 1.4,
    agility: 1.4,
    factions: [FactionNames.KuaiGongInternational],
  }),
  new Augmentation({
    name: AugmentationNames.Neurolink,
    repCost: 8.75e5,
    moneyCost: 4.375e9,
    info:
      "A brain implant that provides a high-bandwidth, direct neural link between your " +
      `mind and the ${FactionNames.BitRunners}' data servers, which reportedly contain ` +
      "the largest database of hacking tools and information in the world.",
    hacking: 1.15,
    hacking_exp: 1.2,
    hacking_chance: 1.1,
    hacking_speed: 1.05,
    programs: [CompletedProgramName.ftpCrack, CompletedProgramName.relaySmtp],
    factions: [FactionNames.BitRunners],
  }),
  new Augmentation({
    name: AugmentationNames.TheBlackHand,
    repCost: 1e5,
    moneyCost: 5.5e8,
    info:
      "A highly advanced bionic hand. This prosthetic not only " +
      "enhances strength and dexterity but it is also embedded " +
      "with hardware and firmware that lets the user connect to, access, and hack " +
      "devices and machines by just touching them.",
    strength: 1.15,
    dexterity: 1.15,
    hacking: 1.1,
    hacking_speed: 1.02,
    hacking_money: 1.1,
    factions: [FactionNames.TheBlackHand],
  }),
  new Augmentation({
    name: AugmentationNames.CRTX42AA,
    repCost: 4.5e4,
    moneyCost: 2.25e8,
    info:
      "The CRTX42-AA gene is injected into the genome. " +
      "The CRTX42-AA is an artificially-synthesized gene that targets the visual and prefrontal " +
      "cortex and improves cognitive abilities.",
    hacking: 1.08,
    hacking_exp: 1.15,
    factions: [FactionNames.NiteSec],
  }),
  new Augmentation({
    name: AugmentationNames.Neuregen,
    repCost: 3.75e4,
    moneyCost: 3.75e8,
    info:
      "A drug that genetically modifies the neurons in the brain " +
      "resulting in neurons that never die, continuously " +
      "regenerate, and strengthen themselves.",
    hacking_exp: 1.4,
    factions: [FactionNames.Chongqing],
  }),
  new Augmentation({
    name: AugmentationNames.CashRoot,
    repCost: 1.25e4,
    moneyCost: 1.25e8,
    info: (
      <>
        A collection of digital assets saved on a small chip. The chip is implanted into your wrist. A small jack in the
        chip allows you to connect it to a computer and upload the assets.
      </>
    ),
    startingMoney: 1e6,
    programs: [CompletedProgramName.bruteSsh],
    factions: [FactionNames.Sector12],
  }),
  new Augmentation({
    name: AugmentationNames.NutriGen,
    repCost: 6.25e3,
    moneyCost: 2.5e6,
    info:
      "A thermo-powered artificial nutrition generator. Endogenously " +
      "synthesizes glucose, amino acids, and vitamins and redistributes them " +
      "across the body. The device is powered by the body's naturally wasted " +
      "energy in the form of heat.",
    strength_exp: 1.2,
    defense_exp: 1.2,
    dexterity_exp: 1.2,
    agility_exp: 1.2,
    factions: [FactionNames.NewTokyo],
  }),
  new Augmentation({
    name: AugmentationNames.PCMatrix,
    repCost: 100e3,
    moneyCost: 2e9,
    info:
      "A 'Probability Computation Matrix' is installed in the frontal cortex. This implant " +
      "uses advanced mathematical algorithms to rapidly identify and compute statistical " +
      "outcomes of nearly every situation.",
    charisma: 1.0777,
    charisma_exp: 1.0777,
    work_money: 1.777,
    faction_rep: 1.0777,
    company_rep: 1.0777,
    crime_success: 1.0777,
    crime_money: 1.0777,
    programs: [CompletedProgramName.deepScan1, CompletedProgramName.autoLink],
    factions: [FactionNames.Aevum],
  }),
  new Augmentation({
    name: AugmentationNames.INFRARet,
    repCost: 7.5e3,
    moneyCost: 3e7,
    info: "A tiny chip that sits behind the retina. This implant lets the user visually detect infrared radiation.",
    crime_success: 1.25,
    crime_money: 1.1,
    dexterity: 1.1,
    factions: [FactionNames.Ishima],
  }),
  new Augmentation({
    name: AugmentationNames.DermaForce,
    repCost: 1.5e4,
    moneyCost: 5e7,
    info:
      "Synthetic skin that is grafted onto the body. This skin consists of " +
      "millions of nanobots capable of projecting high-density muon beams, " +
      "creating an energy barrier around the user.",
    defense: 1.4,
    factions: [FactionNames.Volhaven],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBrachiBlades,
    repCost: 2.25e5,
    moneyCost: 2.5e9,
    info:
      "An upgrade to the BrachiBlades augmentation. It infuses " +
      "the retractable blades with an advanced graphene material " +
      "making them stronger and lighter.",
    prereqs: [AugmentationNames.BrachiBlades],
    strength: 1.4,
    defense: 1.4,
    crime_success: 1.1,
    crime_money: 1.3,
    factions: [FactionNames.SpeakersForTheDead],
  }),
  new Augmentation({
    name: AugmentationNames.GrapheneBionicArms,
    repCost: 5e5,
    moneyCost: 3.75e9,
    info:
      "An upgrade to the Bionic Arms augmentation. It infuses the " +
      "prosthetic arms with an advanced graphene material " +
      "to make them stronger and lighter.",
    prereqs: [AugmentationNames.BionicArms],
    strength: 1.85,
    dexterity: 1.85,
    factions: [FactionNames.TheDarkArmy],
  }),
  new Augmentation({
    name: AugmentationNames.BrachiBlades,
    repCost: 1.25e4,
    moneyCost: 9e7,
    info: "A set of retractable plasteel blades that are implanted in the arm, underneath the skin.",
    strength: 1.15,
    defense: 1.15,
    crime_success: 1.1,
    crime_money: 1.15,
    factions: [FactionNames.TheSyndicate],
  }),
  new Augmentation({
    name: AugmentationNames.BionicArms,
    repCost: 6.25e4,
    moneyCost: 2.75e8,
    info: "Cybernetic arms created from plasteel and carbon fibers that completely replace the user's organic arms.",
    strength: 1.3,
    dexterity: 1.3,
    factions: [FactionNames.Tetrads],
  }),
  new Augmentation({
    name: AugmentationNames.SNA,
    repCost: 6.25e3,
    moneyCost: 3e7,
    info:
      "A cranial implant that affects the user's personality, making them better " +
      "at negotiation in social situations.",
    work_money: 1.1,
    company_rep: 1.15,
    faction_rep: 1.15,
    factions: [FactionNames.TianDiHui],
  }),
  new Augmentation({
    name: AugmentationNames.NeuroreceptorManager,
    repCost: 0.75e5,
    moneyCost: 5.5e8,
    info:
      "A brain implant carefully assembled around the synapses, which " +
      "micromanages the activity and levels of various neuroreceptor " +
      "chemicals and modulates electrical activity to optimize concentration, " +
      "allowing the user to multitask much more effectively.",
    stats: (
      <>
        This augmentation removes the penalty for not focusing on actions such as working in a job or working for a
        faction.
      </>
    ),
    factions: [FactionNames.TianDiHui],
  }),

  // new Augmentation({
  //   name: AugmentationNames.UnnamedAug2,
  //   repCost: 500e3,
  //   moneyCost: 5e9,
  //   info: "Undecided description",
  //   startingMoney: 100e6,
  //   programs: [Programs.HTTPWormProgram.name, Programs.SQLInjectProgram.name],
  //   factions: [FactionNames.OmniTekIncorporated],
  // }),

  // Grafting-exclusive Augmentation
  new Augmentation({
    name: AugmentationNames.CongruityImplant,
    repCost: Infinity,
    moneyCost: 50e12,
    info: (
      <>
        Developed by a pioneer in Grafting research, this implant generates pulses of stability which seem to have a
        nullifying effect versus the Entropy virus.
        <br />
        <br />
        <b>Note:</b> For unknown reasons, the lowercase <code>n</code> appears to be an integral component to its
        functionality.
      </>
    ),
    stats: <>This Augmentation removes the Entropy virus, and prevents it from affecting you again.</>,
    factions: [],
  }),

  // Sleeve exclusive augmentations
  new Augmentation({
    name: AugmentationNames.ZOE,
    isSpecial: true,
    repCost: Infinity,
    moneyCost: 1e12,
    info:
      "Zoë's Omnicerebrum Ënhancer for sleeves inserts an omnicerebrum into your sleeve. " +
      "An omnicerebrum is a near perfect simulation of the human brain, allowing it to take advantage of a larger variety of augments. " +
      "But you should know about this BitRunner, since you have one of these yourself!",
    stats: <>Allows sleeves to benefit from Stanek's Gift but it is less powerful if several are installed.</>,
    factions: [
      /*Technically in FactionNames.ChurchOfTheMachineGod but not really for display reasons */
    ],
  }),
];

export const initBladeburnerAugmentations = (): Augmentation[] => [
  new Augmentation({
    name: AugmentationNames.EsperEyewear,
    repCost: 1.25e3,
    moneyCost: 1.65e8,
    info:
      "Ballistic-grade protective and retractable eyewear that was designed specifically " +
      "for Bladeburner units. This " +
      "is implanted by installing a mechanical frame in the skull's orbit. " +
      "This frame interfaces with the brain and allows the user to " +
      "automatically extrude and extract the eyewear. The eyewear protects " +
      "against debris, shrapnel, lasers, blinding flashes, and gas. It is also " +
      "embedded with a data processing chip that can be programmed to display an " +
      "AR HUD to assist the user in field missions.",
    bladeburner_success_chance: 1.03,
    dexterity: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.EMS4Recombination,
    repCost: 2.5e3,
    moneyCost: 2.75e8,
    info:
      "A DNA recombination of the EMS-4 Gene. This genetic engineering " +
      "technique was originally used on Bladeburners during the Synthoid uprising " +
      "to induce wakefulness and concentration, suppress fear, reduce empathy, " +
      "improve reflexes, and improve memory among other things.",
    bladeburner_success_chance: 1.03,
    bladeburner_analysis: 1.05,
    bladeburner_stamina_gain: 1.02,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.OrionShoulder,
    repCost: 6.25e3,
    moneyCost: 5.5e8,
    info:
      "A bionic shoulder augmentation for the right shoulder. Using cybernetics, " +
      "the ORION-MKIV shoulder enhances the strength and dexterity " +
      "of the user's right arm. It also provides protection due to its " +
      "crystallized graphene plating.",
    defense: 1.05,
    strength: 1.05,
    dexterity: 1.05,
    bladeburner_success_chance: 1.04,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.HyperionV1,
    repCost: 1.25e4,
    moneyCost: 2.75e9,
    info:
      "A pair of mini plasma cannons embedded into the hands. The Hyperion is capable " +
      "of rapidly firing bolts of high-density plasma. The weapon is meant to " +
      "be used against augmented enemies as the ionized " +
      "nature of the plasma disrupts the electrical systems of Augmentations. However, " +
      "it can also be effective against non-augmented enemies due to its high temperature " +
      "and concussive force.",
    bladeburner_success_chance: 1.06,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.HyperionV2,
    repCost: 2.5e4,
    moneyCost: 5.5e9,
    info:
      "A pair of mini plasma cannons embedded into the hands. This augmentation " +
      "is more advanced and powerful than the original V1 model. This V2 model is " +
      "more power-efficient, more accurate, and can fire plasma bolts at a much " +
      "higher velocity than the V1 model.",
    prereqs: [AugmentationNames.HyperionV1],
    bladeburner_success_chance: 1.08,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.GolemSerum,
    repCost: 3.125e4,
    moneyCost: 1.1e10,
    info:
      "A serum that permanently enhances many aspects of human capabilities, " +
      "including strength, speed, immune system enhancements, and mitochondrial efficiency. The " +
      "serum was originally developed by the Chinese military in an attempt to " +
      "create super soldiers.",
    strength: 1.07,
    defense: 1.07,
    dexterity: 1.07,
    agility: 1.07,
    bladeburner_stamina_gain: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.VangelisVirus,
    repCost: 1.875e4,
    moneyCost: 2.75e9,
    info:
      "A synthetic symbiotic virus that is injected into human brain tissue. The Vangelis virus " +
      "heightens the senses and focus of its host, and also enhances its intuition.",
    dexterity_exp: 1.1,
    bladeburner_analysis: 1.1,
    bladeburner_success_chance: 1.04,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.VangelisVirus3,
    repCost: 3.75e4,
    moneyCost: 1.1e10,
    info:
      "An improved version of Vangelis, a synthetic symbiotic virus that is " +
      "injected into human brain tissue. On top of the benefits of the original " +
      "virus, this also grants accelerated healing and enhanced " +
      "reflexes.",
    prereqs: [AugmentationNames.VangelisVirus],
    defense_exp: 1.1,
    dexterity_exp: 1.1,
    bladeburner_analysis: 1.15,
    bladeburner_success_chance: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.INTERLINKED,
    repCost: 2.5e4,
    moneyCost: 5.5e9,
    info:
      "The DNA is genetically modified to enhance the human's body " +
      "extracellular matrix (ECM). This improves the ECM's ability to " +
      "structurally support the body and grants heightened strength and " +
      "durability.",
    strength_exp: 1.05,
    defense_exp: 1.05,
    dexterity_exp: 1.05,
    agility_exp: 1.05,
    bladeburner_max_stamina: 1.1,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeRunner,
    repCost: 2e4,
    moneyCost: 8.25e9,
    info:
      `A cybernetic foot augmentation that was specifically created for ${FactionNames.Bladeburners} ` +
      "during the Synthoid Uprising. The organic musculature of the human foot " +
      "is enhanced with flexible carbon nanotube matrices that are controlled by " +
      "intelligent servo-motors.",
    agility: 1.05,
    bladeburner_max_stamina: 1.05,
    bladeburner_stamina_gain: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmor,
    repCost: 1.25e4,
    moneyCost: 1.375e9,
    info:
      `A powered exoskeleton suit designed as armor for ${FactionNames.Bladeburners} units. This ` +
      "exoskeleton is incredibly adaptable and can protect the wearer from blunt, piercing, " +
      "concussive, thermal, chemical, and electric trauma. It also enhances the user's " +
      "physical abilities.",
    strength: 1.04,
    defense: 1.04,
    dexterity: 1.04,
    agility: 1.04,
    bladeburner_stamina_gain: 1.02,
    bladeburner_success_chance: 1.03,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorPowerCells,
    repCost: 1.875e4,
    moneyCost: 2.75e9,
    info:
      "Upgrades the BLADE-51b Tesla Armor with Ion Power Cells, which are capable of " +
      "more efficiently storing and using power.",
    prereqs: [AugmentationNames.BladeArmor],
    bladeburner_success_chance: 1.05,
    bladeburner_stamina_gain: 1.02,
    bladeburner_max_stamina: 1.05,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorEnergyShielding,
    repCost: 2.125e4,
    moneyCost: 5.5e9,
    info:
      "Upgrades the BLADE-51b Tesla Armor with a plasma energy propulsion system " +
      "that is capable of projecting an energy shielding force field.",
    prereqs: [AugmentationNames.BladeArmor],
    defense: 1.05,
    bladeburner_success_chance: 1.06,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorUnibeam,
    repCost: 3.125e4,
    moneyCost: 1.65e10,
    info:
      "Upgrades the BLADE-51b Tesla Armor with a concentrated deuterium-fluoride laser " +
      "weapon. It's precision and accuracy makes it useful for quickly neutralizing " +
      "threats while keeping casualties to a minimum.",
    prereqs: [AugmentationNames.BladeArmor],
    bladeburner_success_chance: 1.08,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorOmnibeam,
    repCost: 6.25e4,
    moneyCost: 2.75e10,
    info:
      "Upgrades the BLADE-51b Tesla Armor Unibeam augmentation to use a " +
      "multiple-fiber system. This upgraded weapon uses multiple fiber laser " +
      "modules that combine together to form a single, more powerful beam of up to " +
      "2000MW.",
    prereqs: [AugmentationNames.BladeArmorUnibeam],
    bladeburner_success_chance: 1.1,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladeArmorIPU,
    repCost: 1.5e4,
    moneyCost: 1.1e9,
    info:
      "Upgrades the BLADE-51b Tesla Armor with an AI Information Processing " +
      "Unit that was specially designed to analyze Synthoid related data and " +
      "information.",
    prereqs: [AugmentationNames.BladeArmor],
    bladeburner_analysis: 1.15,
    bladeburner_success_chance: 1.02,
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
  new Augmentation({
    name: AugmentationNames.BladesSimulacrum,
    repCost: 1.25e3,
    moneyCost: 1.5e11,
    info:
      "A highly-advanced matter phase-shifter module that is embedded " +
      "in the brainstem and cerebellum. This augmentation allows " +
      "the user to project and control a holographic simulacrum within an " +
      "extremely large radius. These specially-modified holograms were specifically " +
      "weaponized by Bladeburner units to be used against Synthoids.",
    stats: (
      <>
        This augmentation allows you to perform Bladeburner actions and other actions (such as working, committing
        crimes, etc.) at the same time.
      </>
    ),
    isSpecial: true,
    factions: [FactionNames.Bladeburners],
  }),
];

export const initChurchOfTheMachineGodAugmentations = (): Augmentation[] => [
  new Augmentation({
    name: AugmentationNames.StaneksGift1,
    repCost: 0,
    moneyCost: 0,
    info:
      'Allison "Mother" Stanek imparts you with her gift. An ' +
      "experimental Augmentation implanted at the base of the neck. " +
      "It allows you to overclock your entire system by carefully " +
      "changing the configuration.",
    isSpecial: true,
    hacking_chance: 0.9,
    hacking_speed: 0.9,
    hacking_money: 0.9,
    hacking_grow: 0.9,
    hacking: 0.9,
    strength: 0.9,
    defense: 0.9,
    dexterity: 0.9,
    agility: 0.9,
    charisma: 0.9,
    hacking_exp: 0.9,
    strength_exp: 0.9,
    defense_exp: 0.9,
    dexterity_exp: 0.9,
    agility_exp: 0.9,
    charisma_exp: 0.9,
    company_rep: 0.9,
    faction_rep: 0.9,
    crime_money: 0.9,
    crime_success: 0.9,
    hacknet_node_money: 0.9,
    hacknet_node_purchase_cost: 1.1,
    hacknet_node_ram_cost: 1.1,
    hacknet_node_core_cost: 1.1,
    hacknet_node_level_cost: 1.1,
    work_money: 0.9,
    stats: <>Its unstable nature decreases all your stats by 10%</>,
    factions: [FactionNames.ChurchOfTheMachineGod],
  }),
  new Augmentation({
    name: AugmentationNames.StaneksGift2,
    repCost: 1e6,
    moneyCost: 0,
    info:
      "The next evolution is near, a coming together of man and machine. A synthesis greater than the birth of the human " +
      "organism. Time spent with the gift has allowed for acclimatization of the invasive augment and the toll it takes upon " +
      "your frame granting a 5% reduced penalty to all stats.",
    prereqs: [AugmentationNames.StaneksGift1],
    isSpecial: true,
    hacking_chance: 0.95 / 0.9,
    hacking_speed: 0.95 / 0.9,
    hacking_money: 0.95 / 0.9,
    hacking_grow: 0.95 / 0.9,
    hacking: 0.95 / 0.9,
    strength: 0.95 / 0.9,
    defense: 0.95 / 0.9,
    dexterity: 0.95 / 0.9,
    agility: 0.95 / 0.9,
    charisma: 0.95 / 0.9,
    hacking_exp: 0.95 / 0.9,
    strength_exp: 0.95 / 0.9,
    defense_exp: 0.95 / 0.9,
    dexterity_exp: 0.95 / 0.9,
    agility_exp: 0.95 / 0.9,
    charisma_exp: 0.95 / 0.9,
    company_rep: 0.95 / 0.9,
    faction_rep: 0.95 / 0.9,
    crime_money: 0.95 / 0.9,
    crime_success: 0.95 / 0.9,
    hacknet_node_money: 0.95 / 0.9,
    hacknet_node_purchase_cost: 1.05 / 1.1,
    hacknet_node_ram_cost: 1.05 / 1.1,
    hacknet_node_core_cost: 1.05 / 1.1,
    hacknet_node_level_cost: 1.05 / 1.1,
    work_money: 0.95 / 0.9,
    stats: <>The penalty for the gift is reduced to 5%</>,
    factions: [FactionNames.ChurchOfTheMachineGod],
  }),
  new Augmentation({
    name: AugmentationNames.StaneksGift3,
    repCost: 1e8,
    moneyCost: 0,
    info:
      "The synthesis of human and machine is nothing to fear. It is our destiny. " +
      "You will become greater than the sum of our parts. As One. Embrace your gift " +
      "fully and wholly free of it's accursed toll. Serenity brings tranquility in the form " +
      "of no longer suffering a stat penalty. ",
    prereqs: [AugmentationNames.StaneksGift2, AugmentationNames.StaneksGift1],
    isSpecial: true,
    hacking_chance: 1 / 0.95,
    hacking_speed: 1 / 0.95,
    hacking_money: 1 / 0.95,
    hacking_grow: 1 / 0.95,
    hacking: 1 / 0.95,
    strength: 1 / 0.95,
    defense: 1 / 0.95,
    dexterity: 1 / 0.95,
    agility: 1 / 0.95,
    charisma: 1 / 0.95,
    hacking_exp: 1 / 0.95,
    strength_exp: 1 / 0.95,
    defense_exp: 1 / 0.95,
    dexterity_exp: 1 / 0.95,
    agility_exp: 1 / 0.95,
    charisma_exp: 1 / 0.95,
    company_rep: 1 / 0.95,
    faction_rep: 1 / 0.95,
    crime_money: 1 / 0.95,
    crime_success: 1 / 0.95,
    hacknet_node_money: 1 / 0.95,
    hacknet_node_purchase_cost: 1 / 1.05,
    hacknet_node_ram_cost: 1 / 1.05,
    hacknet_node_core_cost: 1 / 1.05,
    hacknet_node_level_cost: 1 / 1.05,
    work_money: 1 / 0.95,
    stats: <>Stanek's Gift has no penalty.</>,
    factions: [FactionNames.ChurchOfTheMachineGod],
  }),
  new Augmentation({
    name: AugmentationNames.BigDsBigBrain,
    isSpecial: true,
    factions: [],
    repCost: Infinity,
    moneyCost: Infinity,
    info:
      "A chip containing the psyche of the greatest BitRunner to ever exists. " +
      "Installing this relic significantly increases ALL of your stats. " +
      "However it may have unintended consequence on the users mental well-being.",
    stats: <>Grants access to unimaginable power.</>,
    hacking: 2,
    strength: 2,
    defense: 2,
    dexterity: 2,
    agility: 2,
    charisma: 2,
    hacking_exp: 2,
    strength_exp: 2,
    defense_exp: 2,
    dexterity_exp: 2,
    agility_exp: 2,
    charisma_exp: 2,
    hacking_chance: 2,
    hacking_speed: 2,
    hacking_money: 2,
    hacking_grow: 2,
    company_rep: 2,
    faction_rep: 2,
    crime_money: 2,
    crime_success: 2,
    work_money: 2,
    hacknet_node_money: 2,
    hacknet_node_purchase_cost: 0.5,
    hacknet_node_ram_cost: 0.5,
    hacknet_node_core_cost: 0.5,
    hacknet_node_level_cost: 0.5,
    bladeburner_max_stamina: 2,
    bladeburner_stamina_gain: 2,
    bladeburner_analysis: 2,
    bladeburner_success_chance: 2,

    startingMoney: 1e12,
    programs: [
      CompletedProgramName.bruteSsh,
      CompletedProgramName.ftpCrack,
      CompletedProgramName.relaySmtp,
      CompletedProgramName.httpWorm,
      CompletedProgramName.sqlInject,
      CompletedProgramName.deepScan1,
      CompletedProgramName.deepScan2,
      CompletedProgramName.serverProfiler,
      CompletedProgramName.autoLink,
      CompletedProgramName.formulas,
    ],
  }),
];

export function initNeuroFluxGovernor(): Augmentation {
  const donationBonus = CONSTANTS.Donations / 1e6 / 100; // 1 millionth of a percent per donation
  return new Augmentation({
    name: AugmentationNames.NeuroFluxGovernor,
    repCost: 500,
    moneyCost: 750e3,
    info:
      "Undetectable adamantium nanobots injected in the users bloodstream. The NeuroFlux Governor " +
      "monitors and regulates all aspects of the human body, essentially 'governing' the body. " +
      "By doing so, it improves the users performance for most actions.",
    stats: (
      <>
        This special augmentation can be leveled up infinitely. Each level of this augmentation increases MOST
        multipliers by 1% (+{(donationBonus * 100).toFixed(6)}%), stacking multiplicatively.
      </>
    ),
    isSpecial: true,
    hacking_chance: 1.01 + donationBonus,
    hacking_speed: 1.01 + donationBonus,
    hacking_money: 1.01 + donationBonus,
    hacking_grow: 1.01 + donationBonus,
    hacking: 1.01 + donationBonus,
    strength: 1.01 + donationBonus,
    defense: 1.01 + donationBonus,
    dexterity: 1.01 + donationBonus,
    agility: 1.01 + donationBonus,
    charisma: 1.01 + donationBonus,
    hacking_exp: 1.01 + donationBonus,
    strength_exp: 1.01 + donationBonus,
    defense_exp: 1.01 + donationBonus,
    dexterity_exp: 1.01 + donationBonus,
    agility_exp: 1.01 + donationBonus,
    charisma_exp: 1.01 + donationBonus,
    company_rep: 1.01 + donationBonus,
    faction_rep: 1.01 + donationBonus,
    crime_money: 1.01 + donationBonus,
    crime_success: 1.01 + donationBonus,
    hacknet_node_money: 1.01 + donationBonus,
    hacknet_node_purchase_cost: 1 / (1.01 + donationBonus),
    hacknet_node_ram_cost: 1 / (1.01 + donationBonus),
    hacknet_node_core_cost: 1 / (1.01 + donationBonus),
    hacknet_node_level_cost: 1 / (1.01 + donationBonus),
    work_money: 1.01 + donationBonus,
    factions: Object.values(FactionNames).filter(
      (factionName) =>
        ![FactionNames.ShadowsOfAnarchy, FactionNames.Bladeburners, FactionNames.ChurchOfTheMachineGod].includes(
          factionName,
        ),
    ),
  });
}

export function initUnstableCircadianModulator(): Augmentation {
  //Time-Based Augment Test
  const randomBonuses = getRandomBonus();

  const UnstableCircadianModulatorParams: IConstructorParams = {
    name: AugmentationNames.UnstableCircadianModulator,
    moneyCost: 5e9,
    repCost: 3.625e5,
    info:
      "An experimental nanobot injection. Its unstable nature leads to " +
      "unpredictable results based on your circadian rhythm.",
    factions: [FactionNames.SpeakersForTheDead],
  };
  Object.keys(randomBonuses.bonuses).forEach(
    (key) => ((UnstableCircadianModulatorParams as any)[key] = randomBonuses.bonuses[key]),
  );

  return new Augmentation(UnstableCircadianModulatorParams);
}
