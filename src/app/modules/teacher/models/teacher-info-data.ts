export type TeacherInfoData = Root2[]

export interface Root2 {
  TEACHER_DATA: TeacherData
}

export interface TeacherData {
  TR: any
  NO: any
  ImageByte: any
  TC: string
  TN: string
  TID: number
  FN: string
  SRN: any
  FCN: any
  MN?: string
  MCN: any
  JD: string
  DOF?: string
  SMN: string
  PAD?: string
  PMD?: string
  NID: any
  FB: any
  EML: any
  GC?: string
  RC?: string
  BPC?: string
  TI?: Ti[]
  EI?: Ei[]
  EXI?: Exi[]
}

export interface Ti {
  TTI: number
  TN: string
  TY: string
  CD: string
  IN: string
}

export interface Ei {
  TAI: number
  EN: string
  PY: string
  R: string
  INS: string
}

export interface Exi {
  TEXI: number
  FD: string
  TD: string
  DG: string
  INS: string
}
