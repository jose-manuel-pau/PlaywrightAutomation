Feature: Ecommerce validations

  @Validation
  @foo
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username                   | password    |
    | test_practise@gmail.com   | 1111111111  |
    | hello@123.com             | Iamhello@12 |
