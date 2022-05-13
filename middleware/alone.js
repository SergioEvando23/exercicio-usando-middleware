const error = (error, req, res, next) => {
    res.status(error.status || 501).json({error: "você está sozinho nessa!"});
}  

module.exports = error;