const { I } = inject();

Given("I am on login page", () => {
  I.amOnPage("/login");
  I.wait(1);
});

When("I enter form fields:", (tableData) => {
  tableData.rows.forEach((row) => {
    const [fieldName, fieldValue] = row.cells;
    I.fillField(fieldName.value, fieldValue.value);
  });
  I.wait(1);
});

When("I click {string} button", (buttonName) => {
  I.click(`//button[contains(text(),"${buttonName}")]`);
});

Then("I see {string}  user menu.", (text) => {
  const uppercaseText = "Hello, " + text;
  I.see(uppercaseText.toUpperCase());
});
