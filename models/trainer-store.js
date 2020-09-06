"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const trainerstore = {
  
  store: new JsonStore("./models/trainer-store.json", { trainers: [] }),
  collection: 'trainers',
    
  getAllTrainers() {
    return this.store.findAll(this.collection);
  },

  getTrainer(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  addTrainer(trainer) {
    this.store.add(this.collection, trainer);
    this.store.save();
  },
  
  getTrainerById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
   trainerCheckPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },

  removeTrainer(id) {
    const trainer = this.getTrainer(id);
    this.store.remove(this.collection, trainer);
    this.store.save();
  },

  removeAllTrainers() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

};

module.exports = trainerstore;