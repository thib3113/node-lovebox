export type JWS = `${string}.${string}.${string}`;
export type pairingCode = `${string}-${string}`;
export type UUID = `${string}-${string}-${string}-${string}`;
export type email = `${string}@${string}`;
export type ISODate = string;
export type mongoId = string;
export type base64Url = `data:${string};base64,${string}`;
export type OLEDPictureBytes = Uint8Array;

export enum PRIVACY_POLICIES {
    ONLY_ME = 'ONLY_ME',
    ADMIN_AND_ME = 'ADMIN_AND_ME'
}

export interface BoxSettings {
    __typename?: 'BoxSettings';
    /**
     * some id seems to be mongoId, other more nanoid ?
     */
    _id: string;
    color: string;
    companyId?: string;
    signature: string;
    picture: string | null;
    nickname: string;
    notifications: NotificationSettings;
    admin: User;
    privacyPolicy: PRIVACY_POLICIES;
    pairingCode: pairingCode;
    isConnected: boolean;
    isAdmin: boolean;
    /**
     * number or for color model C<number>
     */
    hardware: string;
    hasColor: true | null;
    connectionDate: string | null;
    macAddress: string | null;
}

export interface NotificationSettings {
    __typename?: 'NotificationSettings';
    disableUntil: null | ISODate;
    messageRead: boolean;
    heartReceived: boolean;
}

export interface Device {
    __typename?: 'Device';
    /**
     * can be uuid or mongoId
     */
    _id: string;
    appVersion: string;
    os: string;
}

export interface Profile {
    name: string;
    picture: string;
}

export interface Day {
    title?: string;
    key?: string;
    cronNumber?: number;
}

export interface Time {
    meridiem: Meridiem;
    hour: Day;
    minute: Day;
    title: string;
    date: ISODate;
}

export interface Meridiem {
    title: string;
    key: 'am' | 'pm';
}

export interface SpecialDate {
    __typename?: 'SpecialDate';
    _id: UUID;
    name: null | string;
    date: DateClass;
    dateType: string;
}

export interface DateClass {
    month: Day;
    monthDay: Day;
    id?: string;
    nameEn?: string;
    nameFr?: string;
    date?: ISODate;
    title?: string;
}

// ----

export interface GetMessage {
    _id: string;
    channel: null | string;
    content: null | string;
    type: number;
    recipient: string;
    date: Date;
    status: MessageStatus;
    statusList: Array<statuses> | null;
    drawing: Drawing | null;
    base64: null | string;
    bytes: number[] | null;
    premium: boolean | null;
    heartsSent: boolean;
    isChannelMessage: null;
    textOnly: boolean | null;
    textCentered: boolean | null;
    gifId: null;
    url: string;
    urlId: null;
    frames: null;
    senderUser: SenderUser;
    privacyPolicy: string;
    commentsCount: number;
}

export interface Drawing {
    base64: null;
    rotate: null;
}

export interface SenderUser {
    _id: string;
    firstName: string;
    email: string;
}

export interface MessageStatus {
    label: string;
    __typename: 'MessageStatus';
}

export interface NewMessageStatus {
    label: string;
    date: ISODate;
    __typename: 'NewMessageStatus';
}

export type statuses = MessageStatus | NewMessageStatus;
// -- _typename

export interface Admin {
    _id: string;
    firstName: string;
    email: email;
}

export interface User {
    __typename?: 'User';
    _id?: mongoId;
    createdAt?: ISODate;
    firstName: string;
    email: string;
    beta?: number;
    settings?: Settings;
    addresses?: Array<any>;
    boxes?: Array<BoxSettings>;
    roles?: Array<any>;
    device?: Device;
    profile?: Profile;
    reminder?: number;
    subscription?: null;
    fcmToken?: string;
    language?: string;
    loveCoins?: number;
    lastSentMessage?: ISODate;
}

export interface Settings {
    streak: number;
    loveGoal: 'TwiceAWeek' | string;
    reminders: Array<ReminderDate>;
    specialDates: Array<SpecialDate>;
    notifications: NotificationUserSettings;
    __typename?: 'Settings';
}

export interface NotificationUserSettings {
    __typename?: 'NotificationUserSettings';
    generalMessageRead: boolean;
    generalHeartReceived: boolean;
    marketingOffers: boolean;
    marketingOffersPush: boolean;
    marketingOffersEmail: boolean;
}

export interface ReminderDate {
    __typename?: 'ReminderDate';
    day: Day;
    meridiem: null;
    number: {} | unknown;
    weekday: {} | unknown;
    time: Time;
}

// types names are not known, only an idea
export enum MESSAGE_TYPES {
    COLOR_PICTURE = 6,
    OLED = 7
}

export interface Message {
    _id?: mongoId;
    channel?: string;
    base64?: base64Url;
    bytes?: OLEDPictureBytes;
    content?: string;
    date?: ISODate;
    frames?: Array<base64Url>;
    gifId?: string;
    premium?: boolean;
    privacyPolicy?: PRIVACY_POLICIES;
    recipient?: string;
    senderUser?: User;
    status?: MessageStatus | null;
    statusList?: Array<statuses>;
    textOnly?: boolean;
    textCentered?: boolean;
    type?: MESSAGE_TYPES;
    url?: string;
    urlId?: string;
    addedLoveCoins?: number;
    __typename?: 'Message';
    heartsSent?: boolean;
    commentsCount?: number;
}
