const { test } = require('@playwright/test');

const ExcelUtils = require('../utils/ExcelUtils');
const { LoginPage } = require('../pages/LoginPage');
const { WasteManagementPage } = require('../pages/WasteManagementPage');

const testData = ExcelUtils.getData(
    './testData/LoginData.xlsx',
    'Sheet2'
);

for (const data of testData) {

    test.describe.serial(
        `Waste Management - ${data.Email}`,
        () => {

            test.setTimeout(180000);

            let page;
            let login;
            let waste;

            test.beforeAll(async ({ browser }) => {

                const context = await browser.newContext();

                page = await context.newPage();

                login = new LoginPage(page);

                waste = new WasteManagementPage(page);

                await page.goto('/login');

                await login.login(
                    data.Email,
                    data.Password
                );

                await page.waitForLoadState('networkidle');

                await login.enterOTP();

            });


//             test('TC001 - Create Waste Entry High Bin001 Dose Calibrator',
//                 async () => {

//                     await waste.createWasteHighBin001();

//                 });


//             test('TC002 - Create Waste Entry High Bin002 Dose Calibrator',
//                 async () => {

//                     await waste.createWasteHighBin002();

//                 });

//             test('TC003 - Create Waste Entry High Bin003 Dose Calibrator',
//                 async () => {

//                     await waste.createWasteHighBin003();

//                 });


//             test('TC004 - Create Waste Entry High Bin004 Dose Calibrator',
//                 async () => {

//                     await waste.createWasteHighBin004();

//                 });

//             test('TC005 - Create Waste Entry Medium Bin001 Dose Calibrator',
//                 async () => {

//                     await waste.createWasteMediumBin001();
                
//                 });

//             test('TC006 - Create Waste Entry Medium Bin002 Dose Calibrator',
//                 async () => {
                    
//                     await waste.createWasteMediumBin002();
//                 });

//             test('TC007 - Create Waste Entry Medium Bin003 Dose Calibrator',
//                 async () => {

//                     await waste.createWasteMediumBin003();

//                 });

//             test('TC008 - Create Waste Entry Medium Bin004 Dose Calibrator',
//                 async () => {

//                     await waste.createWasteMediumBin004();

//                 });

//             test('TC009 - Create Waste Entry Low Bin001 Dose Calibrator',
//                 async () => {

//                    await waste.createWasteLowBin001();

//                 });

           
//             test('TC010 - Create Waste Entry Low Bin002 Dose Calibrator',
//                 async () => {

//                      await waste.createWasteLowBin002();

//                 });
// test('TC011 - Create Waste Entry Low Bin003 Dose Calibrator',
// async () => {

//       await waste.createWasteLowBin003();


// });
// test('TC012 - Create Waste Entry Low Bin004 Dose Calibrator', async () => {

//     await waste.createWasteLowBin004();

// });

// test('TC013 - Create Waste Entry High Bin001 GM Survey', async () => {

//     await waste.createWasteHighBin001GMSurvey();

// });

// test('TC014 - Create Waste Entry High Bin001 Liquid Scintillation', async () => {

//     await waste.createWasteHighBin001LiquidScintillation();

// });

// test('TC015 - Create Waste Entry High Bin001 NaI Detector', async () => {

//     await waste.createWasteHighBin001NaIDetector();

// });

// test('TC016 - Create Waste Entry Medium Bin001 GM Survey', async () => {

//     await waste.createWasteMediumBin001GMSurvey();

// });

// test('TC017 - Create Waste Entry Activity Decimal Value', async () => {

//     await waste.createWasteActivityDecimal();

// });

// test('TC018 - Create Waste Entry Activity Integer Value', async () => {

//     await waste.createWasteActivityInteger();

// });

// test('TC019 - Create Waste Entry Minimum Activity', async () => {

//     await waste.createWasteMinimumActivity();

// });

// test('TC020 - Create Waste Entry Maximum Activity', async () => {

//     await waste.createWasteMaximumActivity();

// });

test('TC021 - Cancel Add Waste Entry', async () => {

    await waste.cancelWasteEntry();

});

test('TC022 - Close Add Waste Entry', async () => {

    await waste.closeWasteEntry();

});

test('TC023 - Receiving Log Validation', async () => {

    await waste.verifyReceivingLogValidation();

});

test('TC024 - Bin Validation', async () => {

    await waste.verifyBinValidation();

});

// test('TC025 - Activity Validation', async () => {

//     await waste.verifyActivityValidation();

// });

// test('TC026 - Instrument Validation', async () => {

//     await waste.verifyInstrumentValidation();

// });

test('TC027 - Counting Method Validation', async () => {

    await waste.verifyMethodValidation();

});

// test('TC028 - Location Validation', async () => {

//     await waste.verifyLocationValidation();

// });

test('TC029 - Survey Reading Validation', async () => {

    await waste.verifySurveyReadingValidation();

});

test('TC030 - Verify Default Entry Date', async () => {

    await waste.verifyDefaultEntryDate();

});

test('TC031 - Verify Observation Textbox', async () => {

    await waste.verifyDefaultObservationTextbox();

});

test('TC032 - Verify Continue Button', async () => {

    await waste.verifyContinueButtonVisible();

});

test('TC033 - Create High Bin001 Again', async () => {

    await waste.createWasteHighBin001();

});

test('TC034 - Create Medium Bin001 Again', async () => {

    await waste.createWasteMediumBin001();

});

test('TC035 - Create Low Bin001 Again', async () => {

    await waste.createWasteLowBin001();

});

test('TC036 - Create High Bin002 Again', async () => {

    await waste.createWasteHighBin002();

});

test('TC037 - Create Medium Bin002 Again', async () => {

    await waste.createWasteMediumBin002();

});

test('TC038 - Create Low Bin002 Again', async () => {

    await waste.createWasteLowBin002();

});

test('TC039 - Create Activity Decimal', async () => {

    await waste.createWasteActivityDecimal();

});

test('TC040 - Create Maximum Activity', async () => {

    await waste.createWasteMaximumActivity();

});
            test.afterAll(async () => {

                await page.close();

            });

        });

}