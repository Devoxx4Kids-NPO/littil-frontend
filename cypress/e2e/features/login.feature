Feature: Verify text on the homepage

  Background:
    Given I open the homepage
    Then accept the cookie


  Scenario: guestTeacher can change profile"
    When the guestTeacher logs into the system
    When the logged in user indicates he want to change his profile
