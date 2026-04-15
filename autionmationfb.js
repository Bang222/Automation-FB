require("dotenv").config();
const {postIds} = require('./data/postData');
const {commentsFs,randomComment} = require('./function/commentsFs')
const {delay,randomDelay} = require('./function/delay')



const puppeteer = require("puppeteer");
const fs = require("fs");

const EMAIL = process.env.FB_EMAIL;
const PASSWORD = process.env.FB_PASSWORD;


(
  async () => {

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
        '--start-maximized',
        '--disable-blink-features=AutomationControlled'
    ]
  });
const page = await browser.newPage();

////login-------------------------
  if (fs.existsSync("cookies.json")) {

    const cookies = JSON.parse(fs.readFileSync("cookies.json"));

    await page.setCookie(...cookies);

    console.log("Đã load cookie");

  }

  await page.goto("https://facebook.com/login");

  await delay(randomDelay(3000,6000));

  // Nếu chưa login
if (page.url().includes("login")) {

  console.log("Đang login Facebook....");
   await delay(randomDelay(3000,6000));
  // chờ ô email load
//  await page.waitForSelector('[name="email"]', { timeout: 10000 })

//   await page.type('[name="email"]', EMAIL, { delay: 200 });

//   await delay(randomDelay(1000,2000));

  // chờ ô password
  await page.waitForSelector('[name="pass"]', { timeout: 10000 });

  await page.type('[name="pass"]', PASSWORD, { delay: 100 });

  await delay(randomDelay(2000,3000));

  // await page.click('[aria-label*="Log in"]');

  await page.waitForNavigation({ waitUntil: "networkidle2" });

  const cookies = await page.cookies();

  fs.writeFileSync("cookies.json", JSON.stringify(cookies));

  console.log("Đã lưu cookie");

}
////login----------------------------------------
//  let timer = await delay(randomDelay(4000000,5000000));

  for (let postId of postIds) {

    const url = `${postId}`;


    await page.goto(url, {waitUntil:"networkidle2"});

    await delay(randomDelay(3000,5000));

    // Scroll giống người
    await page.evaluate(() => {
      window.scrollBy(0,10000);
    });

    await delay(randomDelay(2000,4000));
    await page.goto(url, {waitUntil:"networkidle2"});
    commentsFs(randomComment(),page)

    await delay(randomDelay(18000,30000));
    console.log("Chờ bài tiếp theo");

    }

      console.log("Hoàn thành");

    })(); 

          // const check =  await page.waitForSelector('[data-ad-rendering-role="like_button"]',{visible:true});
    // const likeButton = await page.$('[data-ad-rendering-role="like_button"]');
    // console.log("check: ",check)
    // if (likeButton) {
     
    //   const label = await page.evaluate(el => el.getAttribute("aria-label"), likeButton);

    //   if (label.includes("Thích")) {
    //     await likeButton.click();
    //     console.log("Đã like bài");
    //   } else {
    //     console.log("Bài đã được like trước đó");
    //   }
    // }

        // await delay(randomDelay(12000,20000));