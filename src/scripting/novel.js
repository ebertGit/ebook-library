const cheerio = require('cheerio');
const fs = require("fs");

const util = require("../utils/util");
const conf = require("../config");

const OUT_DIR = conf.rootPath + "/download";
// 网站域名地址
const SITE_HOST = "https://www.ibiquge.la";
// 万古神帝最新章节目录
const CHAPTER_INDEX_URL = `${SITE_HOST}/7/7552/`;

/**
 * 获取最新章节的内容
 */
async function getLastChapter() {

    /* 获取最新章节的URL（html结构如下）
     * -----------------------------
     * <div id="info">
     *      <h1>万古神帝</h1>
     *      <p>作&nbsp;&nbsp;&nbsp;&nbsp;者：飞天鱼</p>
     *      <p>动&nbsp;&nbsp;&nbsp;&nbsp;作：<a href="javascript:;" onclick="showpop_addcase(7552);">加入书架</a>,  <a href="javascript:;" onclick="showpop_vote(7552);">投推荐票</a>,  <a href="#footer">直达底部</a></p>
     *      <p>最后更新：2022-12-31 17:17:00</p>
     *      <p>最新章节：<a href="https://www.ibiquge.la/7/7552/41807025.html">第三千九百四十一章 破败星海</a></p>
     * </div>
     */
    try {
        const $ = await getDocument(CHAPTER_INDEX_URL);
        // let pTagLastChapter = $("#info p").filter((n, e) => $(e).text().indexOf("最新章节") !== -1).get(0);
        // let aTagLastChapter = pTagLastChapter.children.filter(e => e.type === "tag" && e.name === "a")[0];
        let aTagLastChapter = $("#info p:contains('最新章节') a").get(0);
        let lastChapterUrl = aTagLastChapter.attribs.href;
        
        // 获取最新章节的正文内容
        await getContentFromURL(lastChapterUrl);
        
    } catch (error) {
        console.log(error);
    }
}

/**
 * 获取指定章节之后的章节内容
 * @param {string} chapterTitle - 指定章节的标题
 */
async function getChaptersAfter(chapterTitle) {
    
    /* 获取指定章节之后的章节内容（章节目录结构如下）
     * -----------------------------
     * <div id="list">
     *   <dl>
     *     <dd><a href="/7/7552/41780306.html">第三千九百三十九章 命运十二相神阵</a></dd> 
     *     <dd><a href="/7/7552/41790763.html">第三千九百四十章 时间冰蚕</a></dd>
     *   </dl>
     * </div>
     */
    try {
        const $ = await getDocument(CHAPTER_INDEX_URL);
        // 获取指定章节所在的标签
        let ddTagChapter = $(`#list dd:contains('${chapterTitle}')`);

        // 取得指定章节之后的章节
        let chapter = ddTagChapter.next();
        while (chapter.length > 0) {
            // 取得章节的URL
            let chapterUrl = $(chapter).find("a").get(0).attribs.href;
            if (!chapterUrl.match(/^http/)) {
                chapterUrl = `${SITE_HOST}${chapterUrl}`;
            }
            // 获取章节的正文内容
            await getContentFromURL(chapterUrl);
            // 间隔1秒
            await util.sleep(1000);
            // 指定下一章节
            chapter = chapter.next();
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get content from url and output to download file.
 * 
 * @param {string} url 
 */
async function getContentFromURL(url) {

    const $ = await getDocument(url);

    // 取得标题
    let title = $(".bookname h1").text().trim();
    // 取得正文部分的内容
    let content = $("#content").html();
    // 去除多余的空白和空行，去除广告等非正文内容（正文无任何html标签包裹，所以html标签包裹的匀非正文）
    let result = content.replace(/(<br>)|(&nbsp;)*/g, "").replace(/<.*>/g, "").replace(/^(\r?\n)/gm, "");

    // 内容输出到文件
    fs.writeFile(`${OUT_DIR}/${title}.txt`, `${title}\n\n${result}`, function (err) {
        if (err) {
            throw err;
        }
    });

    console.log(`[${title}] completed.`);
}

/**
 * Get document by cheerio from the response of url.
 * 
 * @param {string} url
 * @returns Document created by cheerio.
 */
async function getDocument(url) {
    const res = await fetch(url
        // , {
        // "headers": {
        //     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        //     "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
        //     "cache-control": "no-cache",
        //     "pragma": "no-cache",
        //     "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
        //     "sec-ch-ua-mobile": "?0",
        //     "sec-ch-ua-platform": "\"macOS\"",
        //     "sec-fetch-dest": "document",
        //     "sec-fetch-mode": "navigate",
        //     "sec-fetch-site": "none",
        //     "sec-fetch-user": "?1",
        //     "upgrade-insecure-requests": "1"
        // },
        // "referrerPolicy": "strict-origin-when-cross-origin",
        // "body": null,
        // "method": "GET"
        // }
    );
    const body = await res.text();
    return cheerio.load(body);
}

module.exports = {getLastChapter, getChaptersAfter}