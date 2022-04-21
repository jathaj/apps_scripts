//A short script for creating issues on a Github repo upon submission of a Google form.
//Just paste this into the apps script on the sheet linked to your form and edit the fields to fit your use case

const token = "PASTE ACCESS TOKEN HERE";
const handle = "PASTE GITHUB HANDLE HERE";
const repo = "PASTE GITHUB REPO HERE";

let url = `https://api.github.com/repos/${handle}/${repo}/issues`

function onFormSubmit(e)
{
 
    let title = e.values[1];
    let userID = e.values[3];
    let description = e.values[2];
    let org = e.values[4];
    let goal = e.values[5];

    let body = `Title: ${title}
                User ID: ${userID}
                Org: ${org}
                description: ${description}
                desired outcome: ${goal}`;

    let payload = {
        "title": title,
        "body": body
    };
 
    let options = {
        "method": "POST",
        "contentType": "application/vnd.github.v3+json",
        "headers": {"Accept": "application/vnd.github.v3+json", "Authorization" : `token ${token}`},
        "payload": JSON.stringify(payload)
    };
   let response = UrlFetchApp.fetch(url, options);
}
