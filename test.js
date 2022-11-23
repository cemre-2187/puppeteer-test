const puppeteer = require('puppeteer');
const cron = require('node-cron');

const product = {};

let searchProductTask;

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://amazon.com');
    // await page.reload();
    // ----------------------------- CHANGE LOCATION ----------------------------- //
    // FIXME: ConfirmClose button doesn't work..
    const locationbtn = '#nav-global-location-popover-link'
    const modal = '.a-popover.a-popover-modal.a-declarative'
    const locationInput = '#GLUXZipUpdateInput'
    const applyBtn = '#GLUXZipUpdate > span > input'

    await page.waitForSelector(locationbtn)
    await page.click(locationbtn)
    await page.waitForSelector(modal)
    await page.waitForSelector(locationInput, { visible: true })
    await page.type(locationInput, '10001')
    await page.click(applyBtn, { visible: true })
    await page.reload()


    let interval = 0;
    const data = ['B09YRR2LS5', 'B09W18N3GT', 'B00LU4CZP8', 'B07G1VKCND', 'B07R2P8XZ5', 'B09GK6431D', 'B0838177ZX', 'B09H5MKPP4', 'B01K3SOW98', 'B01M2A4IK1', 'B08KHD615K', 'B09BZ4NV2R']
    // await page.type('#twotabsearchtextbox', 'B09W18N3GT')


    const calculateStock = async () => {
        console.log('Cron is started')
        let stock;
        let limit;
        await page.goto(`https://amazon.com/dp/${data[interval]}`)
        // await page.waitForNavigation()
        const subscribeDiv = '#buyBoxAccordion'
        const oneTime = '#newAccordionRow > div > div.a-accordion-row-a11y.a-accordion-row.a-declarative.accordion-header.mobb-header-css > i'
        const addToCartBtn = '#add-to-cart-button'
        const goToCartBtn = '#sw-gtc'
        const qtyBtn = '#quantity'
        const qtyTen = '#quantity_10'
        const qtyInput = 'input[name="quantityBox"]'
        const updateMsgContent = 'div.sc-quantity-update-message.a-spacing-top-mini > div > div > div > span'

        const subscribe = await page.$(subscribeDiv)

        if (subscribe) {
            console.log('Subs var')
            await page.click(oneTime)
            await page.waitForSelector(addToCartBtn)
            await page.evaluate(() => document.getElementById('add-to-cart-button').click())
            // await page.click(addToCartBtn, { delay: 5000 })
            await page.waitForSelector(goToCartBtn)
            await page.click(goToCartBtn)
            await page.waitForSelector(qtyBtn)
            await page.click(qtyBtn)
            await page.waitForSelector(qtyTen)
            await page.click(qtyTen)
            await page.waitForSelector(qtyInput)
            await page.type(qtyInput, '999')
            await page.keyboard.press('Enter')
            // await page.waitForSelector(updateMsgContent)
            // const stockContent = await page.$(updateMsgContent)
            // const value = await page.evaluate(el => el.textContent, stockContent)
            const noAvailable = await page.$(updateMsgContent)
            if (noAvailable) {
                console.log('999 yok')
                const stockContent = await page.$(updateMsgContent)
                const value = await page.evaluate(el => el.textContent, stockContent)
                if (value.includes('limit')) {
                    console.log('LİMİTLİ')
                } else {
                    const matchedArray = value.match(/This seller has only (\d+) of these available/i);
                    stock = matchedArray[1]
                    console.log('STOK', stock)
                }
            }
            //console.log('VALUE', value)
            // console.log('matchd', matchedArray)
            // await page.evaluate(() => {
            //     document.querySelector('span.a-size-small.sc-action-delete > span > input').click()
            // })
            await page.click('span.a-size-small.sc-action-delete > span > input', { delay: 2000 })
            console.log(a)
            // await page.click('span.a-size-small.sc-action-delete > span > input', { delay: 2000 })
            interval += 1

        } else {
            await page.waitForSelector(addToCartBtn)
            await page.click(addToCartBtn, { delay: 2000 })
            await page.waitForSelector(goToCartBtn)
            await page.click(goToCartBtn)
            await page.waitForSelector(qtyBtn)
            await page.click(qtyBtn)
            await page.waitForSelector(qtyTen)
            await page.click(qtyTen)
            await page.waitForSelector(qtyInput)
            await page.type(qtyInput, '999')
            await page.keyboard.press('Enter')
            // await page.waitForSelector(updateMsgContent)
            const noAvailable = await page.$(updateMsgContent)
            if (noAvailable) {
                console.log('999 yok')
                const stockContent = await page.$(updateMsgContent)
                const value = await page.evaluate(el => el.textContent, stockContent)
                if (value.includes('limit')) {
                    console.log('LİMİTLİ')
                } else {
                    const matchedArray = value.match(/This seller has only (\d+) of these available/i);
                    stock = matchedArray[1]
                    console.log('STOK', stock)
                }
            }

            //console.log('VALUE', value)
            // console.log('matchd', matchedArray)
            await page.click('span.a-size-small.sc-action-delete > span > input', { delay: 2000 })
            // await page.evaluate(() => document.querySelectorAll('span.a-size-small.sc-action-delete > span > input').click())
            interval += 1

        }


        //await page.waitForTimeout(1000)

    }

    searchProductTask = cron.schedule(`*/20 * * * * *`, () => {
        console.log('searchProductTask')
        calculateStock()
    }
    )

    searchProductTask.start()



    // ----------------------------- PRODUCTS HAVE ONE SELLER ----------------------------- //
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
