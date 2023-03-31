var puppeteer = require("puppeteer");


async function extractData(){

    var browser = await puppeteer.launch({headless:false});


    var page = await browser.newPage();

    await page.goto("https://github.com/acciojob/accio-assignment-repo-template");

    await page.waitForSelector("#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-sidebar > div > div:nth-child(5) > div > ul > li");

    var repoName = await page.evaluate(function(){
        return document.querySelector('[data-pjax="#repo-content-pjax-container"]').innerText;
    });

    console.log("Repo-Name :-",repoName);

    var Stars = await page.evaluate(function(){
        var repoName = document.querySelector('[data-pjax="#repo-content-pjax-container"]').innerText;
        return document.querySelector(`a[href="/acciojob/${repoName}/stargazers"]>strong`).innerText;
    });

    console.log("Stars :-",Stars);

    var Watchs = await page.evaluate(function(){
        var repoName = document.querySelector('[data-pjax="#repo-content-pjax-container"]').innerText;
        return document.querySelector(`a[href="/acciojob/${repoName}/watchers"]>strong`).innerText;
    });

    console.log("Watchers :-",Watchs);

    var Forks = await page.evaluate(function(){
        var repoName = document.querySelector('[data-pjax="#repo-content-pjax-container"]').innerText;
        return document.querySelector(`a[href="/acciojob/${repoName}/forks"]>strong`).innerText;
    });

    console.log("Forks :-",Forks);

    // browser.close();

    var Contributer = await page.evaluate(function(){
         var contri = [];
         var arr = Array.from(document.querySelectorAll("#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-sidebar > div > div:nth-child(5) > div > ul > li"));

        
         arr.forEach((con) =>{
            contri.push(con.innerText);
         });
        

         return contri;

    });

    console.log("Contributors :-");

    Contributer.forEach((c)=>{
        console.log("            ",c);
    });

    browser.close();


}

extractData();