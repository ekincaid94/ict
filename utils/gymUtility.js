"use strict";
const _ = require("lodash");
const memberstore = require("../models/member-store.js");


const gymUtility = {

  BMICalc(id ) {
    const member = memberstore.getMember(id);
    const assessments = member.assessments;
    let BMI;
    if (assessments.length !==0){
      BMI = (assessments[0].weight / ((member.height/100) * (member.height/100))).toFixed(2)
    }
    else { BMI = (member.startingWeight / ((member.height/100) * (member.height/100))).toFixed(2)}

    return BMI;
  },

  BMICat(id){
    const BMI = this.BMICalc(id);
    if (BMI < 16){
      return "SEVERELY UNDERWEIGHT";
    }
    if (BMI >= 16 && BMI <= 18.5){
      return "UNDERWEIGHT";
    }
    if (BMI >=18.5 && BMI <= 25){
      return "NORMAL";
    }
    if (BMI >= 25 && BMI <= 30){
      return "OVERWEIGHT";
    }
    if (BMI >= 30 && BMI <= 35){
      return "MODERATELY OBESE";
    }
    if (BMI > 35&& BMI <= 40){
      return "SEVERELY OBESE";
    }
    if (BMI > 40){
      return "VERY SEVERELY OBESE";
    }
  },

  isIdealWeight(id) {
    let isIdealWeight = false;
    let bmi =  this. BMICalc(id);
    if(bmi >= 18.5 && bmi <= 24.9){
      isIdealWeight = true;
    }
    return isIdealWeight;
  },


  trend(id) {
    const member = memberstore.getMember(id);
    const assessments = member.assessments;
    let trend =false ;
    let weight;
    if (assessments.length >=1) {
      weight = assessments[0].Weight;
    }
    
    if ( member.startingWeight > weight ){
    trend=true;
    }
    return trend;
  }

}

module.exports = gymUtility;





