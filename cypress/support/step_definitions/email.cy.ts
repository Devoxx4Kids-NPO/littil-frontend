import {Then} from "@badeball/cypress-cucumber-preprocessor";
import {getSharedData, setSharedData} from "../../utils/shared-data";

Then ('the current timestamp is stored to monitor for new emails', () => {
  const timestamp = new Date();
  setSharedData('storedTimeStamp', timestamp)
});

Then('there is one email sent',  () => {
  let targetTimestamp: Date = getSharedData('storedTimeStamp');

  cy.mhGetAllMails().then((emails) => {
    const filtered = emails.filter(email => new Date(email.Created) > targetTimestamp);
    cy.wrap(filtered).as('recentEmails');
  });
  cy.get('@recentEmails').then((emails) => {
    cy.log(`Found ${emails.length} emails after the timestamp`);
    expect(emails.length).to.equal(1);
    cy.wrap(emails[0]).as('selectedEmail');
  });
});

Then('there are {int} emails sent',  (expectedNumberOfEmails: number) =>{
  let targetTimestamp: Date = getSharedData('storedTimeStamp');

  cy.mhGetAllMails().then((emails) => {
    const filtered= emails.filter(email => new Date(email.Created) > targetTimestamp);
    cy.wrap(filtered).as('recentEmails');
  });
  cy.get('@recentEmails').then((emails) => {
    cy.log(`Found ${emails.length} emails after the timestamp`);
    expect(emails.length).to.be.equal(expectedNumberOfEmails)

  });
});

Then('one of the mails is sent to the user', () => {
  const emailAddress: string = getSharedData('emailAddress');
  cy.get('@recentEmails').mhFilterByRecipient(emailAddress)
    .then((emails) => {
      expect(emails.length).to.equal(1);
      cy.wrap(emails[0]).as('selectedEmail');
    });
});

Then('one of the mails is sent to another user', () => {
  const emailAddress: string = getSharedData('emailAddress');
  cy.get('@recentEmails').then((emails) => {
    const typedEmails = emails as unknown as mailhog.Item[];

    const filteredEmails = typedEmails.filter(email =>
      !email.To.some(recipient =>
        `${recipient.Mailbox}@${recipient.Domain}` === emailAddress
      )
    );
    expect(filteredEmails.length).to.be.equal(1);
    cy.log('found user : '+ filteredEmails[0].toString());
    cy.wrap(filteredEmails[0]).as('selectedEmail')
  });
});

Then('the user gets the login details from the email', () =>{
  cy.get('@selectedEmail')
    .mhGetBody()
    .then((body) => {
      const keyword = "Uw wachtwoord";
      const regex = new RegExp(`${keyword}:\\s*([^<\\s]+)`, "i");
      let match = body.match(regex);
      let password: string | null = null;
      if (match) {
        password = match[1];
        setSharedData('password', password);
      }
      if (!password) {
        throw new Error('Password was not found in the email body');
      }
    });
});

Then('the body of this email contains {string}', (expectedString: string) => {
  cy.get('@selectedEmail')
    .mhGetBody()
    .then((body) => {
      const match =  body.match(expectedString);
      expect(match).not.to.be.null;
      expect(match).to.contain(expectedString);
    });
});

Then('the body of this email contains the contact information with the email address of the user', () => {
  const emailAddress: string = getSharedData('emailAddress');
  const expectedString: string = 'Contact gegevens: '+ emailAddress
  cy.log(expectedString);
  cy.get('@selectedEmail')
    .mhGetBody()
    .then((body) => {
      const match =  body.match(expectedString);
      expect(match).not.to.be.null;
      expect(match).to.contain(expectedString);
    });
});
