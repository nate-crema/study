const axios = require("axios");
const cheerio = require("cheerio");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log("Enter crolling route below: ");
rl.on("line", function(line) {
  crolling(line);
  rl.close();
});

function crolling(req_link) {
    // const req_link = "https://namu.wiki/w/%ED%95%9C%EA%B5%AD%EB%94%94%EC%A7%80%ED%84%B8%EB%AF%B8%EB%94%94%EC%96%B4%EA%B3%A0%EB%93%B1%ED%95%99%EA%B5%90";


    axios.get(req_link)
    .then(({data}) => {
        // console.log(data);
        const $ = cheerio.load(data);
        const a = $("div.wiki-heading-content");
        // console.log(Object.keys(a));

        let counter = 0;

        // console.log(Object.keys(a[0]));
        // console.log(a[0].children);

        let text = [];

        let totalCont = ``;

        for (var z = 0; z < a.length; z++) {
            text[z] = z + ":-------------------------------------------------------------------\n\n";
            
            if (a[z].children != undefined && a[z].children.length != 0) {
                for (var i = 0; i < a[z].children.length; i++) {
                    // console.log(a[0].children[i].attribs.class);
                    if (a[z].children[i].attribs.class == "wiki-paragraph") {
                        // console.log(a[0].children[i].children.length);
                        for (var j = 0; j < a[z].children[i].children.length; j++) {
                            getText(a[z].children[i].children[j], z);
                            // a[0].children[i].children[j].type == "tag" && a[0].children[i].children[j].name == "div"
                        }
                        // console.log(z + ":-------------------------");
                        // console.log(text[z]);

                        totalCont += "\n\n\n " + z + ":-----------------------\n" + text[z];
                    } else if (a[z].children[i].attribs.class == "wiki-list") {
                        // console.log(a[0].children[i].children.length);
                        for (var j = 0; j < a[z].children[i].children.length; j++) {
                            getList(a[z].children[i].children[j], z);
                            // a[0].children[i].children[j].type == "tag" && a[0].children[i].children[j].name == "div"
                        }
                        // console.log(z + ":-------------------------");
                        // console.log(text[z]);

                        totalCont += "\n\n\n " + z + ":-----------------------\n" + text[z];
                    }
                }
            }

            text[z] += "\n\n-------------------------------------------------------------------\n\n";
        }

        // console.log(totalCont);
        for (var i = 0; i < text.length; i++) {
            console.log(text[i]);
        }


        function getText(obj, z) {
            // console.log(obj.type == 'tag' && obj.name == 'strong');
            // if (obj.children != undefined && obj.children != []) {
            //     for (var i = 0; i < obj.children.length; i++) {
            //         getText(obj.children[i])
            //     }
            // } else {
                if (obj.type == "tag" && obj.name == "div") {
                    if (obj.attribs.class.includes("popper")) {
                        // continue;
                    } else {
                        for (var i = 0; i < obj.children.length; i++) {
                            getText(obj.children[i], z)
                        }
                    }                
                } else if (obj.type == "tag" && obj.name == "a") {
                    // if (obj.children)
                    // console.log(obj);
                    if (obj.children != undefined && obj.children != []) {
                        for (var i = 0; i < obj.children.length; i++) {
                            getText(obj.children[i], z)
                        }
                    } else {
                        text[z] += obj.attribs.title;
                    }
                } else if (obj.type == 'tag' && obj.name == 'strong') {
                    // console.log(obj.children);
                    for (var i = 0; i < obj.children.length; i++) {
                        getText(obj.children[i], z)
                    }
                } else if (obj.type == "text") {
                    text[z] += obj.data;
                }
            // }
        }


        function getList(obj, z) {
            // console.log(obj.type == 'tag' && obj.name == 'strong');
            // if (obj.children != undefined && obj.children != []) {
            //     for (var i = 0; i < obj.children.length; i++) {
            //         getText(obj.children[i])
            //     }
            // } else {
                // console.log(obj);
                if (obj.type == "tag" && obj.name == "li") {
                    for (var i = 0; i < obj.children.length; i++) {
                        text[z] += "• ";
                        getList(obj.children[i], z)
                        text[z] += "\n\n";
                    }
                } else if (obj.type == "tag" && obj.name == "div") {
                    if (obj.attribs.class.includes("popper")) {
                        // continue;
                    } else {
                        for (var i = 0; i < obj.children.length; i++) {
                            getList(obj.children[i], z)
                        }
                    }                
                } else if (obj.type == "tag" && obj.name == "a") {
                    // if (obj.children)
                    // console.log(obj);
                    if (obj.children != undefined && obj.children != []) {
                        for (var i = 0; i < obj.children.length; i++) {
                            getList(obj.children[i], z)
                        }
                    } else {
                        text[z] += obj.attribs.title;
                    }
                } else if (obj.type == 'tag' && obj.name == 'strong') {
                    // console.log(obj.children);
                    for (var i = 0; i < obj.children.length; i++) {
                        getList(obj.children[i], z)
                    }
                } else if (obj.type == "text") {
                    if (text[z])
                    text[z] += obj.data;
                }
            // }
        }

        // while(true) {
        //     if (Object.keys(a)[counter] == "options") {
        //         break;
        //     } else {
        //         console.log(a[counter]);
        //         counter++;
        //     }
        // }
    })
}