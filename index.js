console.log("welcome");
const contacts = require("contacts.js");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      return console.log(listContacts);

    case "get":
      const oneContact = await contacts.getContactById(id);
      // ... id
      return console.log(oneContact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      // ... name email phone
      return console.log(newContact);

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      // ... id
      return console.log(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);
invokeAction({ action: "list" });
