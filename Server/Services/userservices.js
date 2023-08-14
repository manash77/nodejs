exports.getExpenses = (req,where) =>{
    return req.user.getExpenses(where);
}

exports.getFiles = (req) =>{
    return req.user.getUserfiles();
}