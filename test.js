const puppeteer = require('puppeteer');
const product = {};

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com/dp/B01BIAF5ZK');
    // await page.reload();



    // ----------------------------- CHANGE LOCATION ----------------------------- //
    // FIXME: ConfirmClose button doesn't work..
    const locationbtn = '#nav-global-location-popover-link'
    const modal = '.a-popover.a-popover-modal.a-declarative'
    await page.waitForSelector(locationbtn)
    await page.click(locationbtn)
    await page.waitForSelector(modal)
    await page.waitForSelector('#GLUXZipUpdateInput')
    await page.type('#GLUXZipUpdateInput', '10001')
    await page.click('#GLUXZipUpdate > span > input')
    // const btn = await page.$('#GLUXConfirmClose')
    //console.log(btn)
    await page.waitForSelector('#a-popover-2')
    await page.click('#GLUXConfirmClose')
    // await page.evaluate(() => {
    //     const btn = document.querySelector('#GLUXConfirmClose')
    //     btn.click()
    //     console.log(btn)
    // })

    // ----------------------------- PRODUCTS HAVE ONE SELLER ----------------------------- //
    // await page.waitForSelector('#dp')

    // const offersBox = await page.$('.olp-text-box');

    // if (!offersBox) {
    //     // await page.waitForSelector('#add-to-cart-button')
    //     await page.click('#add-to-cart-button')
    //     await page.waitForSelector('#attach-sidesheet-view-cart-button')
    //     await page.evaluate(async () => {
    //         setTimeout(() => {
    //             const goToCartBtn = document.querySelector('#attach-sidesheet-view-cart-button > span > input')
    //             goToCartBtn.click();
    //             console.log('asdasd')
    //             const select = document.querySelector('#quantity')
    //             console.log('SELECT', select)
    //             select.click()
    //         }, 2000)
    //     })

    //     // await page.click('#attach-sidesheet-view-cart-button > span > input')
    //     // await page.waitForSelector('#quantity')
    //     // await page.click('#quantity')
    //     // const goToCart = await page.$('#attach-sidesheet-view-cart-button > span > input')
    //     // if (goToCart) await page.click('#attach-sidesheet-view-cart-button > span > input')
    //     // else console.log('ANAN')
    // }



    // await page.waitForSelector('.olp-text-box')
    // let element = await page.$('.olp-text-box');
    // let value = await page.evaluate(el => el.textContent.trim(), element)
    // console.log(parseInt(value.substring(value.indexOf('(') + 1, value.indexOf(')') + 1)))

    // const offerCount = parseInt(value.substring(value.indexOf('(') + 1, value.indexOf(')') + 1))
    // await page.click('.olp-text-box')

    // // await page.waitForSelector('input[name="submit.addToCart"]')
    // // const addToCartBtn = await page.$('input[name="submit.addToCart"]')

    // // await page.click('input[name="submit.addToCart"]')
    // let count = 0

    // function addAllOffers() {
    //     return new Promise((resolve, reject) => {
    //         const addToCartInterval = setInterval(async () => {
    //             console.log('COUNT______: ', count)
    //             if (count < offerCount) {
    //                 await page.click(`#a-autoid-2-offer-${count}-announce`)
    //                 count += 1
    //             }
    //             else {
    //                 clearInterval(addToCartInterval)
    //                 resolve()

    //             }
    //         }, 3000)
    //     })
    // }


    // addAllOffers().then(async () => {
    //     await page.click('#aod-close')
    //     await page.click('#nav-cart')
    //     let stockCount

    //     await page.waitForSelector('select[name="quantity"]', { timeout: 0 })


    //     let count = 0;
    //     let interval = 1

    //     const calcualteStock = setInterval(async () => {
    //         if (interval <= offerCount) {
    //             const select = await page.$('select[name="quantity"]')
    //             if (select) {
    //                 await select.click()
    //                 await page.waitForSelector('#quantity_10')
    //                 await page.click('#quantity_10')
    //                 await page.waitForSelector('input[name="quantityBox"]')
    //                 await page.type('input[name="quantityBox"]', '999')
    //                 await page.keyboard.press('Enter')
    //                 await page.waitForSelector('.sc-quantity-update-message')
    //                 const stockContent = await page.$('div.sc-quantity-update-message.a-spacing-top-mini > div > div > div > span')
    //                 const value = await page.evaluate(el => el.textContent, stockContent)
    //                 console.log('VALUE', value)
    //                 const matchedArray = value.match(/This seller has only (\d+) of these available/i);
    //                 console.log('matchd', matchedArray)
    //                 const stock = matchedArray[1]
    //                 console.log('STOK', stock)
    //                 count += stock
    //                 const deleteBtn = page.$('div.a-row.sc-action-links > span.a-size-small.sc-action-delete > span > input')
    //                 console.log(deleteBtn, 'ahahhah')
    //                 await page.click(deleteBtn)
    //             }
    //         } else {
    //             clearInterval(calcualteStock)
    //         }
    //         interval += 1

    //     }, 7000)

    //     // for (const el of select) {
    //     //     await el.click()
    //     // }





    //     async function calculateStock() {
    //         const getQtyBtnIds = await page.evaluate(() => {
    //             //const mainDiv = document.querySelector('div[data-name="Active Items"]');
    //             //const firstProduct = mainDiv.querySelector('div[data-asin]');
    //             const select = document.querySelectorAll('select[name="quantity"]');
    //             console.log('NSDKSJDFKJKD', select)

    //             // const btnSpans = document.querySelectorAll('[data-a-class="quantity"]')
    //             Array.from(select).map((el, index) => {
    //                 console.log('ELLELELLEL', el)
    //                 if (index === 1) el.click();
    //             })

    //             return select[0];
    //             // return select

    //         })
    //     }

    //     calculateStock()
    // })
})()










    // // await page.click('#add-to-cart-button')
    // // await page.waitForNavigation();
    // // await page.waitForSelector('#desktop-ptc-button-celWidget');
    // // await page.click('#sw-gtc');
    // // await page.waitForSelector('#quantity');
    // // await page.waitForTimeout(1000);
    // // await page.click('#quantity')
    // // await page.waitForSelector('#quantity_10', { timeout: 0 })
    // // await page.click('#quantity_10')
    // // await page.waitForSelector('.sc-update-quantity-input', { timeout: 0 })
    // // await page.type('.sc-update-quantity-input', '999');
    // // // await page.click('#a-autoid-5-announce');
    // // await page.keyboard.press('Enter');
    // // await page.waitForSelector('div[data-feature-id="imb-message-container"] > .a-spacing-none.a-spacing-top-mini');
    // // let element = await page.$('div[data-feature-id="imb-message-container"] > .a-spacing-none.a-spacing-top-mini');
    // // let value = await page.evaluate(el => el.textContent.trim(), element)
    // // if (value.includes('this seller has a limit of')) {
    // //     const quantity = value.substring(value.indexOf('this seller has a limit of' + 25), value.length - 1);
    // //     product.limit = true;
    // //     product.quantity = quantity;
    // // };
    // // console.log(product);
    // // // Wait for the results page to load and display the results.
    // // const resultsSelector = '#sc-important-message-alert #single-imb-message';
    // // await page.waitForSelector(resultsSelector);

    // // // Extract the results from the page.
    // // const links = await page.evaluate(resultsSelector => {
    // //     const text = document.querySelector(resultsSelector).textContent
    // //     console.log(text)
    // //     return text
    // // });

    // // console.log('LINK__: ', links)

    // // await page.waitForSelector('span[data-feature-id="single-imb-message"]', { timeout: 0 })
    // // const qty = await page.$$eval('span[data-feature-id="single-imb-message"]', el => el)
    // // console.log('QUANTITY', qty)
