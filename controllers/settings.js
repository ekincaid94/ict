// "use strict";

// const logger = require("../utils/logger");
// const memberstore = require("../models/member-store");

// const settings = {
//   index(request, response) {
//     const memberId = request.params.id;
//     logger.debug(`Editing member ${memberId} from Member ${memberId}`);
//     const viewData = {
//       title: "Edit Details",
//       member: memberstore.getMember(memberId),
//     };
//     response.render("member", viewData);
//   },

//   update(request, response) {
//     const memberId = request.params.id;
//     const newDetails = {
//       FirstName: request.body.FirstName,
//       LastName: request.body.LastName,
//       Email: request.body.Email,
//       Password: request.body.Password,
//       Address: request.body.Address,
//     };
//     logger.debug(`Updating Member ${memberId}`);
//     memberstore.updateMember(memberId);
//     response.redirect("/member/" + memberId);
//   }
// };

// module.exports = settings;
