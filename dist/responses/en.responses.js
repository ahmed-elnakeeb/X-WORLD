"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = void 0;
exports.responses = {
    general: {
        created: "Record created successfully",
        updated: "Record updated successfully",
        deleted: "Record deleted successfully",
        noDataFound: "No data found",
        invalidId: "Invalid Id",
        invalidCategoryId: "Invalid Category Id",
        invalidColorId: "Invalid Color Id",
        invalidFile: "Invalid file. Accepted files should be less than 5 MB and of one of the following types: png, jpg, jpeg, mp4, m4a, or ogg.",
        fileUploaded: "File saved successfully",
        unauthorized: "You are do not have permissions to preform this action",
    },
    categories: {
        invalidArTitle: "The Arabic Title field should consist of only Arabic characters and be between 5 and 255 characters in length.",
        fieldArRequried: 'The Arabic title is required',
        invalidEnTitle: "The English Title field should consist of only English characters and be between 5 and 255 characters in length.",
        fieldErRequried: 'The English title is required',
        alreadyExsist: "This Category Is Already Exist",
    },
    colors: {
        invalidHexCode: "Invalid color hex code",
        invalidName: "The color name should be between 2 and 50 characters in length.",
        alreadyExsist: "This color Is Already Exist"
    },
    users: {
        invalidDeviceId: "Invalid device ID",
        invalidFCMId: "Invalid FCM ID",
        deviceIdRequried: "Device ID is required",
        invalidGender: "Gender should be one of (MALE - FEMALE)",
        GenderRequried: "Gender is required",
        invalidCategoryId: "Invalid Category Id",
        invalidAge: "Invalid Age. It should be between 7 and 100 years",
        AgeRequried: "Age is required",
        alreadyExsist: "This user Is Already Exist",
        InvalidToken: "Invalid auth token",
        userNotFound: "User not found please register",
        userBanned: "You are beanned till ( {{end_ban_date}} )",
        noDataToBeChanged: "No data to be changed",
        dublicatedFCM: "Dublicated FCM",
        logedInSuccessfully: "Loged in successfully"
    },
    tweets: {
        invalidTweetText: "Tweet text should be between 2 and 255 characters in length.",
        invalidFileId: "Invalid file ID",
        textOrFileRequried: "Request data should contain either a file or text it cannot be neither, and it cannot be both.",
        invalidCountryName: "Country name should be between 3 and 70 characters in length.",
        countryNameRequried: "Country name is requried",
        invalidLongitude: "Longitude should be a number between -180 and 180.",
        longitudeRequried: "Longitude is requried",
        invalidLatitude: "Latitude should be a number between -90 and 90.",
        latitudeRequried: "Latitude is requried",
        invalidColorId: "Invalid Category Id",
        colorIdRequried: "Color Id is requried",
        tweetCreated: "Your tweet has been posted",
        tweetDeleted: "Your tweet has been deleted",
        invalidTweetId: "Invalid tweet ID",
        invalidBoostsCount: "Invalid boosts count",
        rocketsIsNotEnough: "You dont have enough rockets. Your courrent rockets is ({{rockets_count}}) ",
        tweetBoosted: "Your tweet has been boosted till ({{end_boost_date}})",
        voted: "Your vote has been saved",
        alreadyTwoTweetsOnBoostMode: "The maximum count of boosted tweets for all users is exceeded"
    },
    comments: {
        invalidFileId: "Invalid file ID",
        commentCreated: "Your comment has been posted successfully",
        commentDeleted: "Your comment has been deleted",
    },
    notifications: {
        voteText: "You got {{editable}} votes on your tweet",
        commentText: "You got {{editable}} comments on your tweet",
        chatText: "You got {{editable}} comments on your tweet",
    },
    chats: {
        status: {
            PENDING: "Pending",
            ACCEPTED: "Accepted",
            REJECTED: "rejected",
        },
        alreadySent: "You already sent an request to this user and the ststus is {{status}}",
        requestSent: "Your chat request has been sent",
        canNotChatYourSelf: "You cant not send a chat request to your self",
        youAlreadyRespondedToThisRequest: "You already responded to this request",
        requestAccepted: "Request accepted successfully",
        requestRejected: "Request rejected successfully",
        chatNotAccepted: "You can't send a message to a {{status}} chat request",
        cantAccessThisChat: "You don't have access to this chat",
        invalidId: "Invalid chat ID",
        invalidFileId: "Invalid file ID",
        invalidMessageText: "Message text should be between 1 and 255 characters in length.",
        textOrFileRequried: "Request data should contain either a file or message it cannot be neither, and it cannot be both.",
        messageSent: "Your message has been sent",
    }
};
//# sourceMappingURL=en.responses.js.map