//const stonesService = require('../services/stonesService');

// exports.isItemOwner = async (req, res, next) => {
//    const item = await stonesService.getOne(req.params.itemId).lean();
//    if (item.owner != req.user?._id) {
//       return res.redirect('/vault/dashboard');
//    };
//    req.item = item;
//    next();
// };