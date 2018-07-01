import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { mensajes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
  notes(){
    return mensajes.find({});
  }
});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Meteor.call('notes.insert', text);

    target.text.value = '';

    $('#addModal').modal('close');

    return false;
  }
});

Template.mensajes.events({
  'click .delete-mensajes':function(){
    Meteor.call('mensajes.remove', this);
    return false;
  }
});
