"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
//const assessmentstore = require("../models/assessment-store.js");
const memberstore = require("../models/member-store");
const gymUtility = require("../utils/gymUtility");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const viewData = {
      title: "Trainer Dashboard",
      members: memberstore.getAllMembers()
    };
    logger.info("about to render", memberstore.getAllMembers());
    response.render("dashboard", viewData);
  },
  
  memberIndex(request,response){
   const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug("Member id = ", memberId);
    const viewData = {
      title: "TrainerView Dashboard",
      member: memberstore.getMember(memberId),
      assessment: memberstore.getAssessment(memberId, assessmentId),
      BMI: gymUtility.BMICalc(memberId),
      idealBodyWeight: gymUtility.BMICat(memberId),
      isIdealWeight: gymUtility.isIdealWeight(memberId),
    };
    response.render("dashboardTrainerView", viewData);
  },
  
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberstore.removeMember(memberId);
    response.redirect("/dashboard");
  },

  addMember(request, response) {
    const loggedInUser = accounts.getCurrentTrainer(request);
    const newMember = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingWeight: request.body.startingWeight,
       id: uuid.v1(),
      userid: loggedInUser.id,
      assessments: [],
    };
    logger.debug("Creating a new Member", newMember);
    memberstore.addMember(newMember);
    response.redirect("/dashboard");
  },
  
  addComment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    const assessment = memberstore.getAssessment(memberId, assessmentId)
    const comment = {
      Comment: request.body.Comment,
    };
    logger.debug(`Updating Assessment for Member ${memberId}`);
    memberstore.addComment(assessment, comment);
    response.redirect("/DashboardTrainerView/" + memberId);
  }

};


module.exports = dashboard;





 