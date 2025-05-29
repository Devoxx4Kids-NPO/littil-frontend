Feature: Registration of new GuestTeacher

  Background:
    Given I open the homepage
    Then accept the cookie

  Scenario: new guestTeacher can register
    #Given user Jeffrey is new to the platform
    When the new guestTeacher indicates he want to register
    Then he is presented with a registration form
    When he gives his email as "test-mwi-24@littil.org"
    Then he confirms the registration
    Then the account is created and confirmed
    Then an email is send with the login details
    Then the user continues with Login
    Then the user login for the first time and accept the account
    # new scenario ?
    # not able to complete profile for new registered user, bug in frontend
    #Then the user wants to complete his profile as guestTeacher
    Then the user can logout

  Scenario: new guestTeacher cannot register for existing email


  Scenario: registered user can complete his profile
    When the users decides to login
    Then the user login with the given login details
    When the logged in user indicates he want to change his profile
    Then the user can complete his profile as guestTeacher

  Scenario: registered user can delete his account
    When the users decides to login
    Then the user login with the given login details
    When the logged in user indicates he want to change his profile
    Then the user deletes his profile

#    When Jeffrey indicates he wants to register as a teacher
#    Then he is presented with a registration form
#    When he gives his first name as Jeffrey
#    And his surname as Wang
#    And his email as jeffrey.wang@outlook.com
#    And his password as superSecret
#    And his post code as 3081
#    And his country as the Netherlands
#    And his available days as Monday,Wednesday,Friday
#    And his profile text as Liefst alleen groep acht.
#    And indicates that he agrees with the privacy statement
#    And he confirms the registration
#    Then he receives an email at jeffrey.wang@outlook.com asking to activate his account
#    When he follows the activation instructions in the email
#    Then his account is activated
