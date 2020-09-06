"use strict";

const logger = require("../utils/logger");
const memberstore = require("../models/member-store");
const gymUtility = require("../utils/gymUtility");
const uuid = require("uuid");

const member = {
  index(request, response) {
    const memberId = request.params.id;
    const assessment = request.params.assessmentid;
    logger.debug("Member id = ", memberId);
    const viewData = {
      title: "member",
      member: memberstore.getMember(memberId),
      BMI: gymUtility.BMICalc(memberId),
      WeightCategory: gymUtility.BMICat(memberId),
      IdealBodyWeight: gymUtility.isIdealWeight(memberId),
    };
    response.render("member", viewData);
  },

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    memberstore.removeAssessment(memberId, assessmentId);
    response.redirect("/member/" + memberId);
  },

  addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberstore.getMember(memberId);
    const newAssessment = {
      id: uuid.v1(),
      weight: request.body.weight,  //weight, chest, thigh,upperarm,waist, hips, comment
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      Comment: request.body.comment,
    };
    logger.debug("New Assessment = ", newAssessment);
    memberstore.addAssessment(memberId, newAssessment);
    response.redirect("/member/" + memberId);
  },

 editMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Editing Member ${memberId}`);
    const viewData = {
      title: "Edit Member",
      member: memberstore.getMember(memberId),
    };
    response.render("settings", viewData);
  },

  updateMember (request, response) {
    const memberId = request.params.id;
    const member = memberstore.getMember(memberId)
    const newMember = {
      firstName: request.body.firstName,
      lastName: request.body. lastName,
      address: request.body.address,
      gender: request.body.gender,
      email: request.body.email,
      password: request.body.password,
    };
    logger.debug(`Updating Member Info ${memberId} from Member ${memberId}`);
    memberstore.updateMember(member, newMember);
    response.redirect("/member/" + memberId);
  }
};

module.exports = member;

module.exports = member;

