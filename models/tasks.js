const {Schema,model} = require("mongoose")

const taskSchema = Schema({
    task:{
        type:String,
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})

const Task = model("task",taskSchema)

module.exports = Task;