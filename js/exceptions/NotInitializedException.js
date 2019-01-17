/**
 * @copyright: Kevin Heim
 * @author: Kevin Heim
 Copyright 2018
 See Readme for license 
 ****/
class NotInitializedException extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotInitializedException';
    }
  }