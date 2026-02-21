Feature: A new user can register as school or guest teacher and delete his account

  Background:
    Given the user open the homepage
    Then the user accept the cookie message

  Scenario: a new user can register as school
    # Given the user is new to the platform
    Given the current timestamp is stored to monitor for new emails
    When the new user decides to start the registration
    Then the registration form is present
    Then the user sets his unique email address
    Then the user confirms the registration
    Then the account is created and confirmed
    Then there is one email sent
    Then one of the mails is sent to the user
    Then the user gets the login details from the email

    Then the user continues the registration with Login
    Then the user login for the first time and accept the account

    Then the user decides to create a profile for a school

    Then the user set the name of the school as 'Primary School'
    Then the user set the address as 'Kerkstraat 11'
    Then the user set the postalcode as '9745CC'

    Then the user set his firstname as 'Peter'
    Then the user set the prefix of his surname as 'de'
    Then the user set his surname as 'Vries'

    Then the user save the changes of the school profile

    Then the user log out

    # the registered user can delete his account
    When the user decides to login
    Then the user login with the given login details

    When the user decides to change his profile
    Then the user deletes his school profile
    # TODO implement the following step
    # implement : Then the user is logged out

  Scenario: a new user can register as guest teacher
    #Given user is new to the platform
    Given the current timestamp is stored to monitor for new emails
    When the new user decides to start the registration
    Then the registration form is present
    Then the user sets his unique email address
    Then the user confirms the registration
    Then the account is created and confirmed
    Then there is one email sent
    Then one of the mails is sent to the user
    Then the user gets the login details from the email
    Then the user stops the registration

    When the user decides to login
    Then the user login for the first time and accept the account

    Then the user set the address as 'Dorpstraat 1'
    Then the user set the postalcode as '2441CE'

    Then the user set his firstname as 'Jan'
    Then the user set the prefix of his surname as 'de'
    Then the user set his surname as 'Bont'

    Then the user can save the changes of the guest teacher profile

    Then the user log out

    # the registered user can delete his account
    When the user decides to login
    Then the user login with the given login details
    Then the user decides to change his profile
    Then the user deletes his guest teacher profile
    # TODO implement the following step
    # implement : Then the user is logged out
