import mongoose  from "mongoose";

const dMChannelSchema = new mongoose.Schema({
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
},{timestamps:true});

const DMChannel = mongoose.model('DMChannel',dMChannelSchema);
export default DMChannel;