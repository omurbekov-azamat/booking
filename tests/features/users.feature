Feature: Users

  In order to use the system, users must be logged-in.
  For this we have registration and login pages.

  @userLogin
  Scenario: User Login
    Given I am on login page
    When I enter form fields:
      | email    | admin@gmail.com |
      | password | 123            |
    And I click "Sign in" button
    Then I see "Admin Adminich"  user menu.

  @createHotel
  Scenario: create Hotel
    Given I am on login page
    When I enter form fields:
      | email    | admin@gmail.com |
      | password | 123             |
    And I click "Sign in" button
    Then I see "Admin Adminich"  user menu.
    And I click "hello, Admin Adminich" button
    Then I see "Profile" link on open user menu
    And I click "Profile" link
    Then I am on Profile page
    Then I see "Create hotel" button
    And I click "Create hotel" button on profile page
    Then I am on create hotel page
    When I enter form fields:
      | name    | Novotel        |
      | address | Tynystanova 35 |
      | star    | 5              |
    And I click "Create" button on Create form
    Then I am on Profile page