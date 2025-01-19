const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    //1. Setting the address
    //Check fields are filled with expected values

    it('should set the address', async () => {
        await browser.url(`/`)
        //Fill in the address
        const fromAddress = 'East 2nd Street, 601';
        const toAddress = '1300 1st St';
        await page.fillAddresses(fromAddress,toAddress);
        //const phoneNumberButton = await $(page.phoneNumberButton);
        //await phoneNumberButton.waitForDisplayed();
        //await phoneNumberButton.click();
        //const phoneNumberModal = await $(page.phoneNumberModal);
        //Get values from fields
        const fromAddressValue = await $(page.fromField).getValue();
        const toAddressValue = await $(page.toField).getValue();
        
        //Compare values to check they match
        await expect(fromAddressValue).toEqual(fromAddress);
        await expect(toAddressValue).toEqual(toAddress);

    })

    

    //2. Selecting a Supportive plan
    it('should select a supportive plan', async () => {
        await browser.url(`/`)
        //Fill in the address
        const fromAddress = 'East 2nd Street, 601';
        const toAddress = '1300 1st St';
        await page.fillAddresses(fromAddress,toAddress);
        

        const supportivePlan = await page.chooseSupportivePlan();
        await expect(supportivePlan.parentElement()).toHaveElementClass('active');
       
    })
    

    //3. Filling in the phone number
    it('should fill in the phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        //Get value from field
        const phoneNumberValue = await $(page.phoneNumberField).getValue();
        await expect(phoneNumberValue).toEqual(phoneNumber);


    })

    //4. Adding a credit card
    it('should add a credit card', async () => {

        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //fill & submit card info
        const cardNumber ='1234 0000 4321';
        const cvcNumber ='12';
        await page.fillCreditCard(cardNumber, cvcNumber);

        const linkedCardElement= '.checkbox-label #card-1';
        const linkedCard = await $(linkedCardElement);
        await expect(linkedCard).toBeExisting();

    })
    

    //5. Write a message for the driver
    it('should write message to driver', async () => {

        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        //Send message to driver
        const message='Be careful with the snow';
        await page.fillMessage(message);

        //Get message value
        const messageValue = await $(page.messageButton).getValue();
        await expect(messageValue).toEqual(message);

    })

    //6. Ordering a blanket & handkerchiefs
    it('should order a blanket & handkerchiefs', async () => {

        //Select supportive plan 
        await browser.url(`/`)
        //Fill in the address
        const fromAddress = 'East 2nd Street, 601';
        const toAddress = '1300 1st St';
        await page.fillAddresses(fromAddress,toAddress);
        
       //Choose supportive option
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        //Turn on Blanket & handkerchiefs
        const blanketHandkerchiefs = await $(page.blanketHandkerchiefsToggle);
        await blanketHandkerchiefs.waitForDisplayed();
        await blanketHandkerchiefs.click();
        const activeBlankethandkerchiefs = await $(page.blanketHandkerchiefsToggleOn);
        await expect(activeBlankethandkerchiefs).toBeChecked();
    })

    //7. Ordering 2 Ice Creams
    it('should order 2 ice creams', async () => {

        //Select supportive plan 
        await browser.url(`/`)
        //Fill in the address
        const fromAddress = 'East 2nd Street, 601';
        const toAddress = '1300 1st St';
        await page.fillAddresses(fromAddress,toAddress);
        //Fill in number
        //const phoneNumberButton = await $(page.phoneNumberButton);
        //await phoneNumberButton.waitForDisplayed();
        //await phoneNumberButton.click();
       //Choose supportive option
        const supportiveButton = await $(page.supportiveButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();

        //Order 2 ice creams
        const moreIceCream = await $(page.moreIceCream);
        await moreIceCream.waitForDisplayed();
        await moreIceCream.click();
        await moreIceCream.click();
        
       // const orderIceCream = await helper.getElementByText('0');


        //Get ice cream value counter
        const iceCreamValue = await $(page.iceCreamCounter).getText();
        await expect(iceCreamValue).toBe('2');

    })

    //8. The car search modal appears
    it('the car search modal should appear', async () => {
        await browser.url(`/`)
        //Fill in & submit address
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        //fill & submit card info
        const cardNumber ='1234 0000 4321';
        const cvcNumber ='12';
        await page.fillCreditCard(cardNumber, cvcNumber);

         //Close payment modal
        // const closePaymentButton = await $(page.closePaymentButton);
         //await closePaymentButton.waitForClickable();
         //await closePaymentButton.click();
 

        //Send message to driver
        const message='Be careful with the snow';
        await page.fillMessage(message);

        //Order taxi
        const orderButton = await $(page.orderButton);
        await orderButton.waitForClickable();
        await orderButton.click();

        //Check that car search model appears
        //Searching for car
        const carSearchModal = await $(page.carSearchModal);
        await expect(carSearchModal).toBeDisplayed();

    })

    //9. Waiting for the driver info to appear in the modal
    it('should wait for the car modal to appear', async () => {
        //driver info should appear

        await browser.url(`/`)
        //Fill in & submit address
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        //fill & submit card info
        const cardNumber = helper.getCardNumber();
        const cvcNumber = helper.getCVC();
        await page.fillCreditCard(cardNumber, cvcNumber);

        //Send message to driver
        const message='Be careful with the snow';
        await page.fillMessage(message);

        //Order taxi
        const orderBUtton = await $(page.orderButton);
        await orderBUtton.waitForDisplayed();
        await orderBUtton.click();

        //Check that driver info appears
        const driverInfoModal = await $(page.driverInfoModal);
        await expect(driverInfoModal).toBeDisplayed();

    })

})

