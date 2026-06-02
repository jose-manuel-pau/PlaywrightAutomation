const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcel(searchText, replaceText, change, filePath) {
    const workbookExcel = new ExcelJS.Workbook();

    await workbookExcel.xlsx.readFile(filePath);

    const worksheet = workbookExcel.getWorksheet('Sheet1');

    if (!worksheet) {
        throw new Error('Worksheet "Sheet1" not found');
    }

    readExcel(worksheet, searchText, replaceText, change);

    await workbookExcel.xlsx.writeFile(filePath);
}
// update Mango Price 350
//writeExcel("Mango",350,{rowChange:0,colChange:2},"/home/jm-pau/Downloads/excelTest.xlsx").catch(console.error);

async function readExcel(worksheet, searchText, replaceText, change) {
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log(rowNumber);
                console.log(colNumber);

                worksheet.getCell(rowNumber, colNumber + change.colChange).value = replaceText;
            }
        });
    });
}

test('Upload download excel Validations', async ({ page }, testInfo) => {
    const textSearch = "Mango";
    const updatedValue = "350";
    const filePath = testInfo.outputPath('download.xlsx');

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadPromise;
    await download.saveAs(filePath);

    await writeExcel("Mango", 350, { rowChange: 0, colChange: 2 }, filePath);

    await page.locator("#fileinput").setInputFiles(filePath);

    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({ has: textLocator });

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);
});
