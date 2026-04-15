
const {delay,randomDelay} = require('./delay');
const {comments} = require('../data/postData')

async function commentsFs(commentText,page) {
  try {


      let labelComment = "Viết bình luận công khai…" 
      // || "Hãy gửi bình luận đầu tiên của bạn…"
      await page.waitForSelector(`div[aria-label="${labelComment}"]`, {timeout:5000});

      const commentBox = await page.$(`div[aria-label="${labelComment}"]`);

      if (commentBox) {

        await commentBox.click();

        await delay(randomDelay(1000,2000));

        await page.keyboard.type(commentText, {delay:100});

        await delay(randomDelay(1000,2000));

        await page.keyboard.press("Enter");

        console.log("Đã comment:", commentText);

      } else {

        console.log("Không tìm thấy ô comment");

      }

    } catch(err) {

      console.log("Lỗi comment:", err);

    }
}
function randomComment() {
  return comments[Math.floor(Math.random() * comments.length)];
}
module.exports = {
    commentsFs,
    randomComment
}