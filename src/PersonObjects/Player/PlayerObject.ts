import * as augmentationMethods from "./PlayerObjectAugmentationMethods";
import * as bladeburnerMethods from "./PlayerObjectBladeburnerMethods";
import * as corporationMethods from "./PlayerObjectCorporationMethods";
import * as gangMethods from "./PlayerObjectGangMethods";
import * as generalMethods from "./PlayerObjectGeneralMethods";
import * as serverMethods from "./PlayerObjectServerMethods";
import * as workMethods from "./PlayerObjectWorkMethods";

import { setPlayer } from "../../Player";
import { Sleeve } from "../Sleeve/Sleeve";
import { Exploit } from "../../Exploits/Exploit";

import { LocationName } from "../../Enums";
import { Corporation } from "../../Corporation/Corporation";
import { Gang } from "../../Gang/Gang";
import { Bladeburner } from "../../Bladeburner/Bladeburner";
import { HacknetNode } from "../../Hacknet/HacknetNode";

import { HashManager } from "../../Hacknet/HashManager";

import { MoneySourceTracker } from "../../utils/MoneySourceTracker";
import { constructorsForReviver, Generic_toJSON, Generic_fromJSON, IReviverValue } from "../../utils/JSONReviver";
import { JSONMap } from "../../Types/Jsonable";
import { PlayerAchievement } from "../../Achievements/Achievements";
import { cyrb53 } from "../../utils/StringHelperFunctions";
import { getRandomInt } from "../../utils/helpers/getRandomInt";
import { CONSTANTS } from "../../Constants";
import { Work } from "src/Work/Work";
import { Person } from "../Person";
import { Player as IPlayer } from "@nsdefs";

export class PlayerObject extends Person implements IPlayer {
  // Player-specific properties
  bitNodeN = 1; //current bitnode
  corporation: Corporation | null = null;
  gang: Gang | null = null;
  bladeburner: Bladeburner | null = null;
  currentServer = "";
  factions: string[] = [];
  factionInvitations: string[] = [];
  hacknetNodes: (HacknetNode | string)[] = []; // HacknetNode object or hostname of Hacknet Server
  has4SData = false;
  has4SDataTixApi = false;
  hashManager = new HashManager();
  hasTixApiAccess = false;
  hasWseAccount = false;
  jobs: Record<string, string> = {};
  karma = 0;
  numPeopleKilled = 0;
  location = LocationName.TravelAgency;
  money = 1000 + CONSTANTS.Donations;
  moneySourceA = new MoneySourceTracker();
  moneySourceB = new MoneySourceTracker();
  playtimeSinceLastAug = 0;
  playtimeSinceLastBitnode = 0;
  lastAugReset = -1;
  lastNodeReset = -1;
  purchasedServers: string[] = [];
  scriptProdSinceLastAug = 0;
  sleeves: Sleeve[] = [];
  sleevesFromCovenant = 0;
  sourceFiles = new JSONMap<number, number>();
  exploits: Exploit[] = [];
  achievements: PlayerAchievement[] = [];
  terminalCommandHistory: string[] = [];
  identifier: string;
  lastUpdate = 0;
  lastSave = 0;
  totalPlaytime = 0;

  currentWork: Work | null = null;
  focus = false;

  entropy = 0;

  // Player-specific methods
  init = generalMethods.init;
  startWork = workMethods.startWork;
  processWork = workMethods.processWork;
  finishWork = workMethods.finishWork;
  applyForSoftwareJob = generalMethods.applyForSoftwareJob;
  applyForSoftwareConsultantJob = generalMethods.applyForSoftwareConsultantJob;
  applyForItJob = generalMethods.applyForItJob;
  applyForSecurityEngineerJob = generalMethods.applyForSecurityEngineerJob;
  applyForNetworkEngineerJob = generalMethods.applyForNetworkEngineerJob;
  applyForBusinessJob = generalMethods.applyForBusinessJob;
  applyForBusinessConsultantJob = generalMethods.applyForBusinessConsultantJob;
  applyForSecurityJob = generalMethods.applyForSecurityJob;
  applyForAgentJob = generalMethods.applyForAgentJob;
  applyForEmployeeJob = generalMethods.applyForEmployeeJob;
  applyForPartTimeEmployeeJob = generalMethods.applyForPartTimeEmployeeJob;
  applyForWaiterJob = generalMethods.applyForWaiterJob;
  applyForPartTimeWaiterJob = generalMethods.applyForPartTimeWaiterJob;
  applyForJob = generalMethods.applyForJob;
  canAccessBladeburner = bladeburnerMethods.canAccessBladeburner;
  canAccessCorporation = corporationMethods.canAccessCorporation;
  canAccessGang = gangMethods.canAccessGang;
  canAccessGrafting = generalMethods.canAccessGrafting;
  canAfford = generalMethods.canAfford;
  gainMoney = generalMethods.gainMoney;
  getCurrentServer = serverMethods.getCurrentServer;
  getGangFaction = gangMethods.getGangFaction;
  getGangName = gangMethods.getGangName;
  getHomeComputer = serverMethods.getHomeComputer;
  getNextCompanyPosition = generalMethods.getNextCompanyPosition;
  getUpgradeHomeRamCost = serverMethods.getUpgradeHomeRamCost;
  getUpgradeHomeCoresCost = serverMethods.getUpgradeHomeCoresCost;
  gotoLocation = generalMethods.gotoLocation;
  hasGangWith = gangMethods.hasGangWith;
  hasTorRouter = serverMethods.hasTorRouter;
  hasProgram = generalMethods.hasProgram;
  inGang = gangMethods.inGang;
  isAwareOfGang = gangMethods.isAwareOfGang;
  isQualified = generalMethods.isQualified;
  loseMoney = generalMethods.loseMoney;
  reapplyAllAugmentations = generalMethods.reapplyAllAugmentations;
  reapplyAllSourceFiles = generalMethods.reapplyAllSourceFiles;
  recordMoneySource = generalMethods.recordMoneySource;
  setMoney = generalMethods.setMoney;
  startBladeburner = bladeburnerMethods.startBladeburner;
  startCorporation = corporationMethods.startCorporation;
  startFocusing = generalMethods.startFocusing;
  startGang = gangMethods.startGang;
  takeDamage = generalMethods.takeDamage;
  travel = generalMethods.travel;
  giveExploit = generalMethods.giveExploit;
  giveAchievement = generalMethods.giveAchievement;
  getCasinoWinnings = generalMethods.getCasinoWinnings;
  quitJob = generalMethods.quitJob;
  hasJob = generalMethods.hasJob;
  createHacknetServer = serverMethods.createHacknetServer;
  queueAugmentation = generalMethods.queueAugmentation;
  receiveInvite = generalMethods.receiveInvite;
  gainCodingContractReward = generalMethods.gainCodingContractReward;
  stopFocusing = generalMethods.stopFocusing;
  prestigeAugmentation = generalMethods.prestigeAugmentation;
  prestigeSourceFile = generalMethods.prestigeSourceFile;
  calculateSkillProgress = generalMethods.calculateSkillProgress;
  hospitalize = generalMethods.hospitalize;
  checkForFactionInvitations = generalMethods.checkForFactionInvitations;
  setBitNodeNumber = generalMethods.setBitNodeNumber;
  canAccessCotMG = generalMethods.canAccessCotMG;
  sourceFileLvl = generalMethods.sourceFileLvl;
  applyEntropy = augmentationMethods.applyEntropy;
  focusPenalty = generalMethods.focusPenalty;

  constructor() {
    super();
    // Let's get a hash of some semi-random stuff so we have something unique.
    this.identifier = cyrb53(
      "I-" +
        new Date().getTime() +
        navigator.userAgent +
        window.innerWidth +
        window.innerHeight +
        getRandomInt(100, 999),
    );
  }

  whoAmI(): string {
    return "Player";
  }

  /** Serialize the current object to a JSON save state. */
  toJSON(): IReviverValue {
    return Generic_toJSON("PlayerObject", this);
  }

  /** Initializes a PlayerObject object from a JSON save state. */
  static fromJSON(value: IReviverValue): PlayerObject {
    const player = Generic_fromJSON(PlayerObject, value.data);
    player.hp = { current: player.hp?.current ?? 10, max: player.hp?.max ?? 10 };
    player.money ??= 0;
    player.updateSkillLevels();
    if (Array.isArray(player.sourceFiles)) {
      // Expect pre-2.3 sourcefile format here.
      type OldSourceFiles = { n: number; lvl: number }[];
      player.sourceFiles = new JSONMap((player.sourceFiles as OldSourceFiles).map(({ n, lvl }) => [n, lvl]));
    }
    return player;
  }
}

setPlayer(new PlayerObject());

constructorsForReviver.PlayerObject = PlayerObject;
