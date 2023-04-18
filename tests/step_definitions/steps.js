const { I } = inject();

Given('I am on login page', () => {
    I.amOnPage('/login');
    I.wait(30);
});

When('I enter form fields:', (tableData) => {
    tableData.rows.forEach(row => {
        const [fieldName, fieldValue] = row.cells;
        I.fillField(fieldName.value, fieldValue.value);
    });

    I.wait(30);
});

When('I click {string} button', (buttonName) => {
    I.click(`//button[contains(text(),"${buttonName}")]`);
});

Then('I see user menu.', () => {
    const text = 'Hello';
    I.seeTextEquals(text.toUpperCase());
});
