

Feature: Registration of new GuestTeacher

  Background:
    Given I open the homepage
    Then accept the cookie

  Scenario: new guestTeacher can register
    Then test email is set as shared data


  Scenario: registered user can complete his profile
    When the users decides to login
    Then the user login with the given login details


