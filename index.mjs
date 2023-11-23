import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: './tmp'  
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://www.amazon.it/gp/bestsellers/pc/460188031?ref_=Oct_d_obs_S&pd_rd_w=WSoCo&content-id=amzn1.sym.1313435c-7acb-44fd-893e-6941fd07beac&pf_rd_p=1313435c-7acb-44fd-893e-6941fd07beac&pf_rd_r=E4Q27S1QJ7FKD9FV4Y3P&pd_rd_wg=XXnGc&pd_rd_r=5f398f83-297a-4eef-8b4b-3a666e40e327');
  
  const parent = await page.$$(".p13n-gridRow._cDEzb_grid-row_3Cywl > #gridItemRoot")

  let title = "";
  let price = "";
  let image = "";
  let items = []

  for (const child of parent) {
  try {
    title = await page.evaluate(el => el.querySelector("span > div ").textContent, child)
  } catch (error) {
    title = null;
  }
  try {
    price = await page.evaluate(el => el.querySelector("div > div > a > div > span > span").textContent, child)
  } catch (error) {
    price = null;
  }  
  try {
    image = await page.evaluate(el => el.querySelector("div > img").getAttribute("src"), child)
  } catch (error) {
    image = null;
  }
  
  if(title !== 'Null') {
    items.push({title, price, image})
  }
}

console.log(items.length)

console.log(items)

  // await browser.close();
})();