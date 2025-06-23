Feature: A user can search to make contact

  Background:
    When the user open the homepage
    Then the user accept the cookie message


  Scenario: a guestTeacher can contact a school
    Given the login details of an existing user with the role 'guestTeacher'

    When the user decides to login
    Then the user login with the given login details

    When the user decides to navigate to the main menu option 'Zoeken'
    Then the user set the distance to '250'
    Then the user starts the search
    Then one of the found users is selected on the map
    Then the user decides to make contact
    Then the user accept his email address as contact information
    Then the user set a message 'I Would like to give a workshop.'

    Then the current timestamp is stored to monitor for new emails
    Then the user sends the message
    Then there are 2 emails sent

    Then one of the mails is sent to the user
    Then the body of this email contains 'U heeft op ons LITTIL platform contact gezocht met een andere persoon voor een gastles.'
    Then the body of this email contains the contact information with the email address of the user
    Then the body of this email contains 'I Would like to give a workshop.'

    Then one of the mails is sent to another user
    Then the body of this email contains 'Er is iemand die contact met u wilt opnemen voor een gastles.'
    Then the body of this email contains the contact information with the email address of the user
    Then the body of this email contains 'I Would like to give a workshop.'

    Then the user log out


  Scenario: a guestTeacher can cancel the contact
    Given the login details of an existing user with the role 'guestTeacher'

    When the user decides to login
    Then the user login with the given login details

    When the user decides to navigate to the main menu option 'Zoeken'
    Then the user set the distance to '250'
    Then the user starts the search
    Then one of the found users is selected on the map
    Then the user decides to make contact
    Then the user accept his email address as contact information
    Then the user set a message 'I Would like to give a workshop.'

    Then the current timestamp is stored to monitor for new emails
    Then the user cancel the action to send a message for contact
    Then there are 0 emails sent

    Then the user log out


  Scenario: a school can contact a guestTeacher
    Given the login details of an existing user with the role 'school'

    When the user decides to login
    Then the user login with the given login details

    When the user decides to navigate to the main menu option 'Zoeken'
    Then the user set the distance to '250'
    Then the user starts the search
    Then one of the found users is selected on the map
    Then the user decides to make contact
    Then the user set the contact information as 'My mobile number is ...'
    Then the user set a message 'I Would like to give a workshop.'

    Then the current timestamp is stored to monitor for new emails
    Then the user sends the message
    Then there are 2 emails sent

    Then one of the mails is sent to the user
    Then the body of this email contains 'U heeft op ons LITTIL platform contact gezocht met een andere persoon voor een gastles.'
    Then the body of this email contains 'Contact gegevens: My mobile number is ...'
    Then the body of this email contains 'I Would like to give a workshop.'

    Then one of the mails is sent to another user
    Then the body of this email contains 'Er is iemand die contact met u wilt opnemen voor een gastles.'
    Then the body of this email contains 'Contact gegevens: My mobile number is ...'
    Then the body of this email contains 'I Would like to give a workshop.'

    Then the user log out


  Scenario: a school can contact a guestTeacher for a specific module
    # set the module Hedycode to active for a guestTeacher
    Given the login details of an existing user with the role 'guestTeacher'

    When the user decides to login
    Then the user login with the given login details
    Then the user decides to change his profile
    Then the user can go to the modules page
    Then the user can set the status of the module 'Hedycode' to checked
    Then the user can save the modules

    Then the user log out

    # school search for guestTeacher with the given module
    Given the login details of an existing user with the role 'school'

    When the user decides to login
    Then the user login with the given login details

    When the user decides to navigate to the main menu option 'Zoeken'
    Then the user set the distance to '250'
    Then the user set select the 'Hedycode' module on the search page
    Then the user starts the search
    Then one of the found users is selected on the map
    Then the user decides to make contact
    Then the user set the contact information as 'My mobile number is ...'
    Then the user set a message 'I Would like to give a workshop.'

    Then the current timestamp is stored to monitor for new emails
    Then the user sends the message
    Then there are 2 emails sent

    Then the user log out
