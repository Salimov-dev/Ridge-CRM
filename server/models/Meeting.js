import { Schema, model } from "mongoose";

const schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    dateOfMeeting: String,
    meetingsStatus: {type: Schema.Types.ObjectId, ref: 'MeetingStatus'},
    timeOfMeeting: String,
    comment: String,
    location: {
        city: String,
        district: String,
        adress: String,
        latitude: Number,
        longitude: Number,
        zoom: Number,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: "updated_at"}
})

export default model("Meeting", schema);