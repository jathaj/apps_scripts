//A short script for creating issues on a Github repo upon submission of a Google form.
//Just paste this into the apps script on the sheet linked to your form and edit the fields to fit your use case

const token = "PASTE ACCESS TOKEN HERE";
const handle = "PASTE GITHUB HANDLE HERE";
const repo = "PASTE GITHUB REPO HERE";

let url = `https://api.github.com/repos/${handle}/${repo}/issues`

function onFormSubmit(e)
{
    const title = e.values[4];
    const priority = e.values[9];
    const suNet = e.values[1];
    const app = e.values[7];
    const otherApps = e.values[8]
    const description = e.values[5];
    const org = e.values[2];
    const goal = e.values[6];

//formats github issue if the relevant variables are not empty
    if(title && suNet && description && org && goal){
      const body = `Title: ${title}

                Priority: ${priority}

                Submitter SUNet: ${suNet}

                Submitter organization: ${org}

                App: ${app}

                Other apps involved: ${otherApps}

                Description of issue: ${description}

                Outcome desired by submitter: ${goal}`;

      const payload = {
          "title": title,
          "body": body
      };
 
      const options = {
          "method": "POST",
          "contentType": "application/vnd.github.v3+json",
          "headers": {"Accept": "application/vnd.github.v3+json", "Authorization" : `token ${token}`},
          "payload": JSON.stringify(payload)
      };
    const response = UrlFetchApp.fetch(url, options);
  }
}
