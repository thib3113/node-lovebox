import { gql } from 'graphql-request';

//this file contain retro engineered queries, that are not implemented at the moment

const addLovebox = gql`
    mutation addLovebox($box: AddBoxInput) {
        addLovebox(box: $box) {
            _id
            color
            companyId
            connectionDate
            nickname
            notifications {
                disableUntil
                messageRead
                heartReceived
            }
            pairingCode
            isConnected
            isAdmin
            hardware
            hasColor
            admin {
                _id
                firstName
                email
            }
            privacyPolicy
            signature
            macAddress
            picture
        }
    }
`;
const addUserToBox = gql`
    mutation addUserToBox($boxId: String!, $email: String!) {
        addUserToBox(boxId: $boxId, email: $email) {
            boxId
            user {
                firstname
                email
            }
        }
    }
`;

const disableHelper = gql`
    mutation disableHelper($helper: String!) {
        disableHelper(helper: $helper)
    }
`;
const getInvitationLink = gql`
    mutation getInvitationLink($boxId: String) {
        getInvitationLink(boxId: $boxId)
    }
`;
const myReferral = gql`
    mutation myReferral {
        myReferral {
            discountCode
            godsons
        }
    }
`;
const refreshPairingCode = gql`
    mutation refreshPairingCode($boxId: String!) {
        refreshPairingCode(boxId: $boxId)
    }
`;
const removeLovebox = gql`
    mutation removeLovebox($boxId: String) {
        removeLovebox(boxId: $boxId)
    }
`;
const removeUserFromBox = gql`
    mutation removeUserFromBox($boxId: String!, $email: String!) {
        removeUserFromBox(boxId: $boxId, email: $email) {
            boxId
            email
        }
    }
`;

// const sendMessageV1 = gql`
//     mutation sendMessageV1(
//         $base64: String
//         $bytes: [Int]
//         $recipient: String
//         $date: Date
//         $options: JSON
//         $timezone: Int
//         $appVersion: String
//     ) {
//         sendMessageV1(
//             base64: $base64
//             bytes: $bytes
//             recipient: $recipient
//             date: $date
//             options: $options
//             timezone: $timezone
//             appVersion: $appVersion
//         ) {
//             _id
//             base64
//             bytes
//             content
//             date
//             frames
//             gifId
//             premium
//             privacyPolicy
//             recipient
//             senderUser {
//                 _id
//                 firstName
//                 email
//             }
//             status {
//                 label
//             }
//             textOnly
//             textCentered
//             type
//             url
//             urlId
//             addedLoveCoins
//         }
//     }
// `;
const resendMessageV1 = gql`
    mutation resendMessageV1($messageId: String!, $recipient: String, $date: Date, $options: JSON, $timezone: Int, $appVersion: String) {
        resendMessageV1(
            messageId: $messageId
            recipient: $recipient
            date: $date
            options: $options
            timezone: $timezone
            appVersion: $appVersion
        ) {
            _id
            base64
            bytes
            content
            date
            frames
            gifId
            premium
            privacyPolicy
            recipient
            senderUser {
                _id
                firstName
                email
            }
            status {
                label
            }
            textOnly
            textCentered
            type
            url
            urlId
        }
    }
`;
const setBoxColor = gql`
    mutation setBoxColor($boxId: String, $color: String) {
        setBoxColor(boxId: $boxId, color: $color)
    }
`;
const setBoxSignature = gql`
    mutation setBoxSignature($boxId: String, $signature: String) {
        setBoxSignature(boxId: $boxId, signature: $signature)
    }
`;
const changeBoxSettings = gql`
    mutation changeBoxSettings($boxId: String, $settings: JSON) {
        changeBoxSettings(boxId: $boxId, settings: $settings)
    }
`;
const setDevice = gql`
    mutation setDevice($deviceId: String!, $deviceParams: JSON) {
        setDevice(deviceId: $deviceId, deviceParams: $deviceParams) {
            _id
        }
    }
`;
const editEmail = gql`
    mutation editEmail($oldEmail: String!, $newEmail: String!) {
        editEmail(oldEmail: $oldEmail, newEmail: $newEmail)
    }
`;
const setFcmTokenWithOs = gql`
    mutation setFcmTokenWithOs($fcmToken: String, $os: String) {
        setFcmTokenWithOs(fcmToken: $fcmToken, os: $os)
    }
`;
const setLanguage = gql`
    mutation setLanguage($language: String) {
        setLanguage(language: $language)
    }
`;
const editFirstname = gql`
    mutation editFirstname($firstname: String!) {
        editFirstname(firstname: $firstname)
    }
`;
const setNickname = gql`
    mutation setNickname($nickname: String!, $boxId: String!) {
        setNickname(nickname: $nickname, boxId: $boxId) {
            _id
            nickname
            notifications {
                disableUntil
                messageRead
                heartReceived
            }
        }
    }
`;
const setNotifications = gql`
    mutation setNotifications($notifications: String, $boxId: String) {
        setNotifications(notifications: $notifications, boxId: $boxId)
    }
`;
const updateUserBoxSettings = gql`
    mutation updateUserBoxSettings($userBoxSettings: UserBoxSettingsInput, $boxId: String!) {
        updateUserBoxSettings(userBoxSettings: $userBoxSettings, boxId: $boxId) {
            _id
            nickname
            color
            picture
        }
    }
`;
const editPassword = gql`
    mutation editPassword($oldPassword: String!, $newPassword: String!, $newPassword2: String!) {
        editPassword(oldPassword: $oldPassword, newPassword: $newPassword, newPassword2: $newPassword2)
    }
`;
const setPremium = gql`
    mutation setPremium($premium: Int) {
        setPremium(premium: $premium)
    }
`;
const setProfilePicture2 = gql`
    mutation setProfilePicture2($base64: String) {
        setProfilePicture2(base64: $base64)
    }
`;
const setWithWho = gql`
    mutation setWithWho($boxId: String!, $withWho: JSON) {
        setWithWho(boxId: $boxId, withWho: $withWho)
    }
`;
const setBoxPrivacyPolicy = gql`
    mutation setBoxPrivacyPolicy($boxId: String!, $privacyPolicy: MessagePrivacyPolicy!, $updateOldMessages: Boolean) {
        setBoxPrivacyPolicy(boxId: $boxId, privacyPolicy: $privacyPolicy, updateOldMessages: $updateOldMessages) {
            _id
            privacyPolicy
        }
    }
`;
const setMessagePrivacyPolicy = gql`
    mutation setMessagePrivacyPolicy($messageId: String!, $privacyPolicy: MessagePrivacyPolicy!) {
        setMessagePrivacyPolicy(messageId: $messageId, privacyPolicy: $privacyPolicy) {
            _id
            privacyPolicy
        }
    }
`;
const useInvitationLink = gql`
    mutation useInvitationLink($invitationLink: String) {
        useInvitationLink(invitationLink: $invitationLink)
    }
`;
const setHeartsRain = gql`
    mutation setHeartsRain($heartId: String!) {
        setHeartsRain(heartId: $heartId)
    }
`;
const resendMessage = gql`
    mutation resendMessage($messageId: String!, $recipient: String, $date: Date, $options: JSON, $timezone: Int, $appVersion: String) {
        resendMessage(
            messageId: $messageId
            recipient: $recipient
            date: $date
            options: $options
            timezone: $timezone
            appVersion: $appVersion
        ) {
            _id
            type
            channel
            recipient
            url
            date
            status {
                label
            }
            statusList {
                label
                date
            }
            senderUser {
                _id
                firstName
                email
            }
            privacyPolicy
        }
    }
`;
const activateColorFeature = gql`
    mutation activateColorFeature($boxId: String!, $colorActivationCode: String!) {
        activateColorFeature(boxId: $boxId, colorActivationCode: $colorActivationCode) {
            _id
            hasColor
        }
    }
`;
const activateColorFeatureFromPurchase = gql`
    mutation activateColorFeatureFromPurchase($boxId: String!, $purchaseReceipt: JSON, $paymentIntentId: String) {
        activateColorFeatureFromPurchase(boxId: $boxId, purchaseReceipt: $purchaseReceipt, paymentIntentId: $paymentIntentId) {
            _id
            hasColor
        }
    }
`;
const sendTroubleshootData = gql`
    mutation sendTroubleshootData($testName: String!, $success: Boolean!, $failureReason: String) {
        sendTroubleshootData(testName: $testName, success: $success, failureReason: $failureReason)
    }
`;
const updateBoxAdmin = gql`
    mutation updateBoxAdmin($boxId: String!, $newAdminId: String!) {
        updateBoxAdmin(boxId: $boxId, newAdminId: $newAdminId) {
            _id
        }
    }
`;
const removeSender = gql`
    mutation removeSender($boxId: String!, $senderId: String!) {
        removeSender(boxId: $boxId, senderId: $senderId)
    }
`;
const makePayment = gql`
    mutation makePayment($countryCode: String!) {
        makePayment(countryCode: $countryCode)
    }
`;
const addRelation = gql`
    mutation addRelation(
        $name: String!
        $relationType: String!
        $picture: String!
        $color: String!
        $pairing: String!
        $loveGoal: String!
        $reminders: [JSON]
        $specialDates: [JSON]
        $timezone: Int!
    ) {
        addRelation(
            name: $name
            relationType: $relationType
            picture: $picture
            color: $color
            pairing: $pairing
            loveGoal: $loveGoal
            reminders: $reminders
            specialDates: $specialDates
            timezone: $timezone
        ) {
            _id
            name
            relationType
            picture
            color
            streak
            boxId
            loveGoal
            streakDeadline
            lastCompletedStreak
            reminders {
                day
                meridiem
                number
                time
                weekday
            }
            specialDates {
                _id
                name
                date
                dateType
            }
            addresses {
                firstname
                lastname
                streetAddress
                zipCode
                city
                country
                state
            }
        }
    }
`;
const updateRelation = gql`
    mutation updateRelation(
        $relationId: String!
        $name: String
        $relationType: String
        $picture: String
        $color: String
        $pairing: String
        $loveGoal: String
        $reminders: [JSON]
        $specialDates: [JSON]
        $addresses: [JSON]
        $timezone: Int!
    ) {
        updateRelation(
            relationId: $relationId
            name: $name
            relationType: $relationType
            picture: $picture
            color: $color
            pairing: $pairing
            loveGoal: $loveGoal
            reminders: $reminders
            specialDates: $specialDates
            addresses: $addresses
            timezone: $timezone
        ) {
            _id
            name
            relationType
            picture
            color
            streak
            boxId
            loveGoal
            streakDeadline
            lastCompletedStreak
            reminders {
                day
                meridiem
                number
                time
                weekday
            }
            specialDates {
                _id
                name
                date
                dateType
            }
            addresses {
                firstname
                lastname
                streetAddress
                zipCode
                city
                country
                state
            }
        }
    }
`;
const deleteRelation = gql`
    mutation deleteRelation($relationId: String!) {
        deleteRelation(relationId: $relationId) {
            _id
        }
    }
`;
const updateSettings = gql`
    mutation updateSettings($settings: SettingsInput) {
        updateSettings(settings: $settings) {
            streak
            loveGoal
            streakDeadline
            lastCompletedStreak
            reminders {
                day
                meridiem
                number
                time
                weekday
            }
            specialDates {
                _id
                name
                date
                dateType
            }
            notifications {
                generalMessageRead
                generalHeartReceived
                marketingOffers
                marketingOffersPush
                marketingOffersEmail
            }
        }
    }
`;
const updateAddresses = gql`
    mutation updateAddresses($addresses: [JSON]) {
        updateAddresses(addresses: $addresses) {
            firstname
            lastname
            streetAddress
            zipCode
            city
            country
            state
        }
    }
`;
const canLinkLovebox = gql`
    mutation canLinkLovebox($pairing: String!, $boxNickname: String) {
        canLinkLovebox(pairing: $pairing, boxNickname: $boxNickname) {
            _id
            color
            connectionDate
            nickname
            notifications {
                disableUntil
                messageRead
                heartReceived
            }
            pairingCode
            isConnected
            isAdmin
            hardware
            hasColor
            admin {
                _id
                firstName
                email
            }
            privacyPolicy
            signature
            macAddress
        }
    }
`;
const unlockSticker = gql`
    mutation unlockSticker($stickerId: String!) {
        unlockSticker(stickerId: $stickerId)
    }
`;
const unlockTemplate = gql`
    mutation unlockTemplate($templateId: String!) {
        unlockTemplate(templateId: $templateId)
    }
`;
const validateUserSubscription = gql`
    mutation validateUserSubscription(
        $subscription: SubscriptionInput!
        $channel: ChannelsTypes
        $templateId: String
        $channelId: String
        $channelName: String
        $isLoveboxBAndW: Boolean
    ) {
        validateUserSubscription(
            subscription: $subscription
            channel: $channel
            templateId: $templateId
            channelId: $channelId
            channelName: $channelName
            isLoveboxBAndW: $isLoveboxBAndW
        )
    }
`;
const deleteUserAccount = gql`
    mutation deleteUserAccount {
        deleteUserAccount
    }
`;
const deleteChannel = gql`
    mutation deleteChannel($channelId: String!) {
        deleteChannel(channelId: $channelId)
    }
`;
const followChannel = gql`
    mutation followChannel($channelId: String!, $boxId: String!, $sendTime: SendTime, $weekdays: [Int]) {
        followChannel(channelId: $channelId, boxId: $boxId, sendTime: $sendTime, weekdays: $weekdays) {
            _id
            followers
            nameFr
            nameEn
        }
    }
`;
const unfollowChannel = gql`
    mutation unfollowChannel($channelId: String!, $boxId: String!) {
        unfollowChannel(channelId: $channelId, boxId: $boxId) {
            _id
            followers
            nameFr
            nameEn
        }
    }
`;
const commentMessage = gql`
    mutation commentMessage($messageId: String!, $text: String!) {
        commentMessage(messageId: $messageId, text: $text) {
            _id
            recipient
            commentsCount
            comments {
                _id
                creationDate
                sender {
                    _id
                    name
                    picture
                }
                text
            }
        }
    }
`;
const createCustomChannel = gql`
    mutation createCustomChannel($input: CustomChannelInput!) {
        createCustomChannel(input: $input) {
            _id
            nameFr
            nameEn
            picture
            editablePrivateChannel
            photoChannelCount
            photosList
            previews {
                thumbnailEn
                thumbnailFr
            }
            followers
            premium
            privateChannelOwner {
                _id
                name
                picture
            }
        }
    }
`;

const getLocalMessages = gql`
    query getLocalMessages {
        failedMessages @client {
            _id
            channel
            content
            type
            recipient
            date
            status {
                label
            }
            statusList {
                label
                date
            }
            drawing {
                base64
                rotate
            }
            base64
            bytes
            premium
            textOnly
            textCentered
            gifId
            url
            urlId
            frames
            senderUser {
                _id
                firstName
                email
            }
            privacyPolicy
            box
        }
    }
`;

const message = gql`
    query message($messageId: String!) {
        message(messageId: $messageId) {
            _id
            channel
            content
            type
            recipient
            date
            status {
                label
            }
            statusList {
                label
                date
            }
            drawing {
                base64
                rotate
            }
            base64
            bytes
            premium
            heartsSent
            textOnly
            textCentered
            gifId
            url
            urlId
            frames
            senderUser {
                _id
                firstName
                email
            }
            privacyPolicy
            commentsCount
            comments {
                _id
                creationDate
                sender {
                    _id
                    name
                    picture
                }
                text
            }
        }
    }
`;
const getReadMessages = gql`
    query getReadMessages($messagesIds: [String]) {
        getReadMessages(messagesIds: $messagesIds)
    }
`;
const stickersPart = gql`
    query stickersPart($skip: Int) {
        stickersPart(skip: $skip) {
            _id
            base64
            base64Lovepix
            isAvailable
            rank
        }
    }
`;
const newStickersPart = gql`
    query newStickersPart($skip: Int, $hasColor: Boolean, $unlocked: Boolean, $tag: String) {
        newStickersPart(skip: $skip, hasColor: $hasColor, unlocked: $unlocked, tag: $tag) {
            _id
            url
            rank
            unlocked
            hasColor
            type
            tags
            price
        }
    }
`;
const getRelationsByDeadline = gql`
    query getRelationsByDeadline($timezone: Int!) {
        getRelationsByDeadline(timezone: $timezone)
    }
`;
const templateCategories = gql`
    query templateCategories($appVersion: String, $hasColor: Boolean, $limit: Int) {
        templateCategories(appVersion: $appVersion, hasColor: $hasColor, limit: $limit)
            @connection(key: "templateCategories", filter: ["hasColor"]) {
            _id
            titleFr
            titleEn
            subCategories {
                _id
                titleFr
                titleEn
                presentation
                templates {
                    _id
                    name
                    elements {
                        x
                        y
                        rotate
                        scale
                        type
                        fontFamily
                        fontSize
                        color
                        width
                        height
                        textAlign
                        defaultTextFr
                        defaultTextEn
                        image
                        isGif
                    }
                    background {
                        id
                        type
                        url
                    }
                    backgroundCover
                    isPreSubscription
                    thumbnailFr
                    thumbnailEn
                    focusOnText
                    requiresPhoto
                    textSize
                    textFont
                    textColor
                    tags
                    price
                    premium
                    isGif
                    subCategories
                    isBlackAndWhite
                    blurhash
                }
            }
        }
    }
`;
const getAllLoveboxTemplatesFilters = gql`
    query getAllLoveboxTemplatesFilters {
        getLoveboxTemplatesFilters {
            _id
            titleFr
            titleEn
        }
    }
`;
const getLoveboxTemplates = gql`uery getLoveboxTemplates($limit: Int, $skip: Int, $filters: [String]!) @connection(key: "getLoveboxTemplates", filter: ["filters"]) {
  getLoveboxTemplates(limit: $limit, skip: $skip, filters: $filters) {
    _id
        name
        elements {
          x
          y
          rotate
          scale
          type
          fontFamily
          fontSize
          color
          width
          height
          textAlign
          defaultTextFr
          defaultTextEn
          image
          isGif
        }
        background {
            id
            type
            url
        }
        backgroundCover
        isPreSubscription
        premium
        thumbnailFr
        thumbnailEn
        focusOnText
        textSize
        textFont
        textColor
        requiresPhoto
        subCategories
        tags
        price
        isGif
        isBlackAndWhite
        blurhash
      }
}

`;
const templatesPart = gql`
    query templatesPart($appVersion: String, $limit: Int, $skip: Int, $subCategory: String!) {
        templatesPart(appVersion: $appVersion, limit: $limit, skip: $skip, subCategory: $subCategory)
            @connection(key: "templatesPart", filter: ["subCategory"]) {
            _id
            name
            elements {
                x
                y
                rotate
                scale
                type
                fontFamily
                fontSize
                color
                width
                height
                textAlign
                defaultTextFr
                defaultTextEn
                image
                isGif
            }
            background {
                id
                type
                url
            }
            backgroundCover
            isPreSubscription
            premium
            thumbnailFr
            thumbnailEn
            focusOnText
            textSize
            textFont
            textColor
            requiresPhoto
            subCategories
            tags
            price
            isGif
            isBlackAndWhite
            blurhash
        }
    }
`;
const promotionCode = gql`
    query promotionCode($code: String!) {
        promotionCode(code: $code) {
            _id
            type
            code
            used
        }
    }
`;
const assistantMessage = gql`
    query assistantMessage($input: AssistantInput!) {
        assistantMessage(input: $input) {
            text
        }
    }
`;
const customChannelExamples = gql`uery customChannelExamples($input: CustomChannelInput!) {
  customChannelExamples(input: $input) {
    url
  }
}

`;
const canLinkLoveboxOnboarding = gql`
    query canLinkLoveboxOnboarding($pairing: String!) {
        canLinkLoveboxOnboarding(pairing: $pairing)
    }
`;
const getRecentTemplates = gql`
    query getRecentTemplates {
        recentTemplates @client
    }
`;
const channels = gql`
    query channels($channelsInput: ChannelsInput) {
        channels(channelsInput: $channelsInput) {
            _id
            nameFr
            nameEn
            picture
            previews {
                thumbnailEn
                thumbnailFr
            }
            editablePrivateChannel
            photoChannelCount

            followers
            premium
            privateChannelOwner {
                _id
                name
                picture
            }
        }
    }
`;
const getEditablePrivateChannel = gql`
    query getEditablePrivateChannel($channelId: String) {
        getEditablePrivateChannel(channelId: $channelId) {
            _id
            nameFr
            nameEn
            picture
            previews {
                thumbnailEn
                thumbnailFr
            }
            photosList
            followers
            premium
            privateChannelOwner {
                _id
                name
                picture
            }
            privateChannelSettings {
                contentType
                infos
                tone
                length
            }
        }
    }
`;
