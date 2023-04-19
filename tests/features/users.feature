Feature: Users

  In order to use the system, users must be logged-in.
  For this we have registration and login pages.

  @userLogin
  Scenario: User Login
    Given I am on login page
    When I enter form fields:
      | email    | user@gmail.com |
      | password | 123            |
    And I click "Sign in" button
    Then I see "Admin Adminich"  user menu.