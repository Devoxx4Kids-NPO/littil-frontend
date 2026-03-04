Feature: A User with the role guest teacher can manage all his profile information

  Background:
    Given the login details of an existing user with the role 'guestTeacher'
    When the user open the homepage
    Then the user accept the cookie message


  Scenario: a user with role guestTeacher can update the information in the profile
    When the user decides to login
    Then the user login with the given login details

    Then the user decides to change his profile

    Then the user cannot set the name of a school
    Then the user set the address as 'Dorpstraat 1'
    Then the user set the postalcode as '2441CE'

    Then the user set his firstname as 'Jan'
    Then the user set the prefix of his surname as 'de'
    Then the user set his surname as 'Bont'

    Then the user can set the availability for day 'Maandag' to checked
    Then the user can set the availability for day 'Dinsdag' to unchecked
    Then the user can set the availability for day 'Woensdag' to checked
    Then the user can set the availability for day 'Donderdag' to unchecked
    Then the user can set the availability for day 'Vrijdag' to checked
    Then the user can set the availability for day 'Zaterdag' to unchecked
    Then the user can set the availability for day 'Zondag' to checked

    Then the user can save the changes of the guest teacher profile

    Then the user log out


  Scenario: a user with role guestTeacher can cancel the changes when updating the profile
    When the user decides to login
    Then the user login with the given login details

    Then the user decides to change his profile

    # set to known values and save
    Then the user set the address as 'Dorpstraat 1'
    Then the user set the postalcode as '2441CE'

    Then the user set his firstname as 'Jan'
    Then the user set the prefix of his surname as 'de'
    Then the user set his surname as 'Bont'

    Then the user can set the availability for day 'Dinsdag' to unchecked
    Then the user can set the availability for day 'Zondag' to checked

    Then the user can save the changes of the guest teacher profile

    # set to new values
    Then the user set the address as 'Zuiderkstraat 9'
    Then the user set the postalcode as '4231BB'

    Then the user set his firstname as 'Piet'
    Then the user set the prefix of his surname as 'van de'
    Then the user set his surname as 'Buurt'

    Then the user can set the availability for day 'Dinsdag' to checked
    Then the user can set the availability for day 'Zondag' to unchecked

    When the user cancel the changes of the profile

    # the old values should be there
    Then the actual value of the address is 'Dorpstraat 1'
    Then the actual value of the postalcode is '2441CE'

    Then the actual value of the firstname is 'Jan'
    Then the actual value of the prefix is 'de'
    Then the actual value of the surname is 'Bont'

    Then the actual value of the availability for day 'Dinsdag' is unchecked
    Then the actual value of the availability for day 'Zondag' is checked

    Then the user log out


  Scenario: a user with role guestTeacher can change his preferred modules
    When the user decides to login
    Then the user login with the given login details

    Then the user decides to change his profile

    Then the user can go to the modules page
    Then the user can change the status of the module 'Scratch'
    Then the user can change the status of the module "MBot's"
    Then the user can change the status of the module 'Lego Mindstorms'

    Then the user can save the modules

    Then the user log out



  Scenario: a user with role guestTeacher can cancel the changes when updating his preferred modules
    Given the login details of an existing user with the role 'guestTeacher'
    When the user decides to login
    Then the user login with the given login details

    Then the user decides to change his profile
    Then the user can go to the modules page

    # set to known values and save
    Then the user can set the status of the module 'Scratch' to checked
    Then the user can set the status of the module "MBot's" to unchecked
    Then the user can set the status of the module 'Lego Mindstorms' to checked
    Then the user can save the modules

    # set to new values
    Then the user can set the status of the module 'Scratch' to unchecked
    Then the user can set the status of the module "MBot's" to checked
    Then the user can set the status of the module 'Lego Mindstorms' to unchecked

    When the user can cancel the changes of the modules
    # the old values should be there
    Then the actual value of the module 'Scratch' is checked
    Then the actual value of the module "MBot's" is unchecked
    Then the actual value of the module 'Lego Mindstorms' is checked

    Then the user log out
