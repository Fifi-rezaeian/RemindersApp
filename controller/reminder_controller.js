let database = require("../database");

let remindersController = {
  // Show a list of reminders
  list: (req, res) => {
    res.render('reminder/index', { reminders: database.cindy.reminders })
  },

  // Show a Create Reminder Page
  new: (req, res) => {
    res.render('reminder/create')
  },

  // Show the details of a Single Reminder
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })
    if (searchResult != undefined) {
      res.render('reminder/single-reminder', { reminderItem: searchResult })
    } else {
      res.render('reminder/index', { reminders: database.cindy.reminders })
    }
  },

  // Create a reminder
  // ⚠️ TODO: Currently hardcoded to always create a reminder for Cindy only. You need to make this dynamic. 
  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false
    }
    database.cindy.reminders.push(reminder);
    res.redirect('/reminders');
  },

  // Show the Edit Reminder Page
  edit: (req, res) => {
    // ⭐️ your implementation here ⭐️
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    })

    res.render('reminder/edit', {
      reminderItem: searchResult, 
      titleVar: searchResult.title, 
      descVar: searchResult.description, 
      completeVar: searchResult.completed
    })
  },

  // Edit the Reminder
  update: (req, res) => {
    // ⭐️ your implementation here ⭐️

    const userEvents = database.cindy.reminders
    let reminderToFind = req.params.id;

    for (let i = 0; i < userEvents.length; i++) {
      if (reminderToFind == userEvents[i].id) {
        userEvents[i].title = req.body.title;
        userEvents[i].description = req.body.description;
        if (req.body.completed == 'true') {
          userEvents[i].completed = true;
        } else {
          userEvents[i].completed = false;
        }
        
      }
    }

    res.redirect('/reminders');
  },

  // Delete the Reminder
  delete: (req, res) => {
    // ⭐️ your implementation here ⭐️

    const userEvents = database.cindy.reminders
    let reminderToFind = req.params.id;

    for (let i = 0; i < userEvents.length; i++) {
      if (reminderToFind == userEvents[i].id) {
        userEvents.splice(i, 1)
      }
    }
    res.redirect('/reminders')
  }
}

module.exports = remindersController;
