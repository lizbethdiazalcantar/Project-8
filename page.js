module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    numberField: '#number',
    codeField: '#code',
    cvcField: '.card-code #code',


    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    //messageButton: '//input[@id="comment"]',
    supportiveButton: 'div=Supportive',
    paymentButton: '//div[@class="pp-text"]',
    addCardButton: '//div[starts-with(text(), "Add card")]',
    linkButton: 'button=Link',
    messageButton: '#comment',
    orderRequirementsButton: '//div[starts-with(text(), "Order requirements")]',
    blanketHandkerchiefsToggle: '.r-sw',
    blanketHandkerchiefsToggleOn: `.switch-input`,
    iceCreamCounter:'.counter-value',
    moreIceCream: '.counter-plus',
    closePaymentButton: '.payment-picker .close-button ',
    orderButton: '//div[@class="smart-button-wrapper"]',


    // Modals
    phoneNumberModal: '.modal',
    paymentModal: 'div=Payment method',
    cardNumberModal: '.card-number',
    carSearchModal: 'div=Car search',
    driverInfoModal: '.order-subbody',


    //Fields
    //iceCreamOptions: '//div[@class="r-group-items"]',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);

        const toField = await $(this.toField);
        await toField.setValue(to);

        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    
    fillCreditCard: async function(number, code){
        
        //Payment method
        const paymentButton = await $(this.paymentButton);
        await paymentButton.waitForDisplayed();
        await paymentButton.click();

        const paymentModal = await $(this.paymentModal);
        await paymentModal.waitForDisplayed();
        
        //Click on Add card

        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        //Adding card field
        const cardNumberModal = await $(this.cardNumberModal);
        await cardNumberModal.waitForDisplayed();
        //await cardNumberModal.click();

        //Set values
        const cardNumber = await $(this.numberField);
        await cardNumber.setValue(number);
        const cvcNumber = await $(this.cvcField);
        await cvcNumber.waitForDisplayed();
        await cvcNumber.click();
        await cvcNumber.setValue(code);

        await browser.keys('Tab');

        //Link card
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();

        const closePaymentModal = await $(this.closePaymentButton);
        await closePaymentModal.waitForDisplayed();
        await closePaymentModal.click();

       
    },

    fillMessage: async function(message) {
        const messageButton = await $(this.messageButton);
        await messageButton.scrollIntoView();
        await messageButton.setValue(message);
    },

    chooseSupportivePlan: async function() {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.waitForClickable();
        await supportiveButton.click();
        return supportiveButton;
    }

    


};