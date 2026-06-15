Feature: Ecommerce validations

  @Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with "test_practise@gmail.com" and "12345ABab$"
    When Add "ZARA COAT 4" to Cart
    Then The "ZARA COAT 3" is added to Cart
    When Enter valid details and Place the order
    Then Verify order is present in the OderHistory

  @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    | username                   | password    |
    | test_practise@gmail.com   | 1111111111  |
    | hello@123.com             | Iamhello@12 |
