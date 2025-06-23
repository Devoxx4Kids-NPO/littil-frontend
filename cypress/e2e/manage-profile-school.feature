Feature: a User with the role school can manage all his profile information

  Background:
    Given the login details of an existing user with the role 'school'
    When the user open the homepage
    Then the user accept the cookie message

  Scenario: a user with the role School can update the information in the profile
    When the user decides to login
    Then the user login with the given login details
    Then the user decides to change his profile

    Then the user set the name of the school as 'Primary School'
    Then the user set the address as 'Kerkstraat 11'
    Then the user set the postalcode as '9745CC'

    Then the user set his firstname as 'Peter'
    Then the user set the prefix of his surname as 'de'
    Then the user set his surname as 'Vries'

    Then the user save the changes of the school profile

    Then the user log out


  Scenario: a user with the role school can cancel the changes when updating the profile
    When the user decides to login
    Then the user login with the given login details
    Then the user decides to change his profile

    # set to known values and save
    Then the user set the name of the school as 'Primary School'
    Then the user set the address as 'Kerkstraat 11'
    Then the user set the postalcode as '9745CC'

    Then the user set his firstname as 'Peter'
    Then the user set the prefix of his surname as 'de'
    Then the user set his surname as 'Vries'

    Then the user save the changes of the school profile

    # set to new values
    Then the user set the name of the school as 'Other Primary School'
    Then the user set the address as 'Kerkweg 21'
    Then the user set the postalcode as '4231AB'

    Then the user set his firstname as 'Piet'
    Then the user set the prefix of his surname as 'van de'
    Then the user set his surname as 'Buurt'

    When the user cancel the changes of the profile

    # the old values should be there
    # TODO bug - the schoolName is not set to the original value with cancelChanges
    #Then the actual value of the schoolName is 'Primary School'
    Then the actual value of the address is 'Kerkstraat 11'
    Then the actual value of the postalcode is '9745CC'

    Then the actual value of the firstname is 'Peter'
    Then the actual value of the prefix is 'de'
    Then the actual value of the surname is 'Vries'

    Then the user log out


  Scenario: a user with role school has no modules page
    When the user decides to login
    Then the user login with the given login details
    Then the user decides to change his profile

    Then the user has no modules page

    Then the user log out
