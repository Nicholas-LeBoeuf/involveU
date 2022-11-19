export interface Club {
  clubID?: number;
  ownerID: number;
  clubName: string;
  clubAffiliation: string;
  clubBio: string;
  clubVision: string;
  clubLogo: string;
  clubAdvisor: number;
  clubValues: string;
  clubMission: string;
}

export interface addEBoardMember {
  userID: number;
  role: string;
}

export interface removeEBoardMember {
  userID: number;
}

export interface AssignRemoveAdvisor {
  clubID: number;
  advisorID: number;
}
